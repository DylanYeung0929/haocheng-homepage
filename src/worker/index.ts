// Cloudflare Worker：照片策展 API。
// 由 wrangler 直接 esbuild 打包，禁止使用 "@/" 别名 import。

interface KVNamespaceLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface Env {
  CURATION: KVNamespaceLike;
  ADMIN_PASSWORD?: string;
}

const CURATION_KEY = "curation";
const SESSION_TTL = 60 * 60 * 24 * 30;
const LOGIN_MAX_FAILS = 10;
const LOGIN_WINDOW = 15 * 60;
const MAX_BODY = 512 * 1024;
const COOKIE = "hc_admin";

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extra,
    },
  });

const sha256 = async (text: string) =>
  new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)));

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get("Cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

async function getSessionToken(request: Request, env: Env): Promise<string | null> {
  const token = getCookie(request, COOKIE);
  if (!token) return null;
  const stored = await env.CURATION.get(`session:${token}`);
  return stored ? token : null;
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const failKey = `login-fail:${ip}`;
  const fails = Number((await env.CURATION.get(failKey)) ?? "0");
  if (fails >= LOGIN_MAX_FAILS) return json({ error: "尝试次数过多，请 15 分钟后再试" }, 429);

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    if (typeof body.password === "string") password = body.password;
  } catch {
    password = "";
  }

  const [given, expected] = await Promise.all([
    sha256(password),
    sha256(env.ADMIN_PASSWORD ?? ""),
  ]);
  if (!env.ADMIN_PASSWORD || !timingSafeEqual(given, expected)) {
    await env.CURATION.put(failKey, String(fails + 1), { expirationTtl: LOGIN_WINDOW });
    return json({ error: "口令不正确" }, 401);
  }

  await env.CURATION.delete(failKey);
  const token = `${crypto.randomUUID()}${crypto.randomUUID()}`;
  await env.CURATION.put(`session:${token}`, "1", { expirationTtl: SESSION_TTL });
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return json({ ok: true }, 200, {
    "Set-Cookie": `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_TTL}${secure}`,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/curation") {
      if (request.method === "GET") {
        const raw = await env.CURATION.get(CURATION_KEY);
        return new Response(raw ?? "{}", {
          headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
        });
      }
      if (request.method === "PUT") {
        if (!(await getSessionToken(request, env))) return json({ error: "未登录" }, 401);
        const text = await request.text();
        if (text.length > MAX_BODY) return json({ error: "数据过大" }, 413);
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          return json({ error: "无效 JSON" }, 400);
        }
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          return json({ error: "格式错误" }, 400);
        }
        await env.CURATION.put(CURATION_KEY, JSON.stringify(parsed));
        return json({ ok: true });
      }
      return json({ error: "Method Not Allowed" }, 405);
    }

    if (pathname === "/api/login" && request.method === "POST") return handleLogin(request, env);

    if (pathname === "/api/logout" && request.method === "POST") {
      const token = getCookie(request, COOKIE);
      if (token) await env.CURATION.delete(`session:${token}`);
      return json({ ok: true }, 200, { "Set-Cookie": `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0` });
    }

    if (pathname === "/api/session" && request.method === "GET") {
      const token = await getSessionToken(request, env);
      return token ? json({ ok: true }) : json({ ok: false }, 401);
    }

    return json({ error: "Not Found" }, 404);
  },
};
