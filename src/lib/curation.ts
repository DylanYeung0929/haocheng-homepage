// 照片策展：前端读取/保存后台选片结果（Cloudflare Worker + KV）。
// Worker 不可用时静默回退默认图，站点行为与未接入前完全一致。

import { useEffect, useState, useSyncExternalStore } from "react";
import { loadPhotoUrl } from "./photos";

export type ImgRef =
  | { t: "archive"; locId: string; file: string }
  | { t: "asset"; key: string };

export type Curation = {
  v: 1;
  /** 首页精选卡片：slotId（home.featured.<id>）-> 覆盖图 */
  homeFeatured?: Record<string, ImgRef>;
  slots?: Record<string, ImgRef>;
  locCovers?: Record<string, ImgRef>;
  locHidden?: string[];
  photoHidden?: Record<string, string[]>;
};

const empty: Curation = { v: 1 };

let curation: Curation = empty;
let loadStarted = false;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

export function getCuration(): Curation {
  return curation;
}

async function fetchCuration() {
  try {
    const res = await fetch("/api/curation", { headers: { accept: "application/json" } });
    if (!res.ok) return;
    const data = (await res.json()) as unknown;
    if (data && typeof data === "object" && !Array.isArray(data)) {
      curation = data as Curation;
      emit();
    }
  } catch {
    // 无 Worker（如纯 vite dev）时保持默认
  }
}

export function useCuration(): Curation {
  const value = useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    () => curation,
  );
  useEffect(() => {
    if (!loadStarted) {
      loadStarted = true;
      void fetchCuration();
    }
  }, []);
  return value;
}

export async function saveCuration(next: Curation): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/curation", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(next),
    });
    if (res.ok) {
      curation = next;
      emit();
      return { ok: true };
    }
    let error = `保存失败（${res.status}）`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) error = data.error;
    } catch {
      // 保留默认错误信息
    }
    return { ok: false, error };
  } catch {
    return { ok: false, error: "网络错误，未连接后台服务" };
  }
}

export async function login(password: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) return { ok: true };
    let error = "登录失败";
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) error = data.error;
    } catch {
      // 保留默认错误信息
    }
    return { ok: false, error };
  } catch {
    return { ok: false, error: "无法连接后台服务" };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch("/api/logout", { method: "POST" });
  } catch {
    // 忽略
  }
}

export async function checkSession(): Promise<boolean> {
  try {
    const res = await fetch("/api/session");
    return res.ok;
  } catch {
    return false;
  }
}

// ---- 素材库（works/ honors/），同步可用 ----

const assetModules = import.meta.glob("../assets/{works,honors}/**/*.{jpg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export type AssetFile = { key: string; url: string; group: string; name: string };

export const assetFiles: AssetFile[] = Object.entries(assetModules)
  .map(([path, url]) => {
    const key = path.replace("../assets/", "");
    const [group, ...rest] = key.split("/");
    return { key, url, group, name: rest.join("/") };
  })
  .sort((a, b) => a.key.localeCompare(b.key));

export function assetUrl(key: string): string | undefined {
  return assetModules[`../assets/${key}`];
}

// ---- React 辅助 ----

/** 把 ImgRef 解析成可用的图片 URL；无覆盖时返回 fallback。 */
export function useImgUrl(ref: ImgRef | undefined, fallback: string): string {
  const [url, setUrl] = useState(fallback);
  const sig = ref ? (ref.t === "asset" ? `asset:${ref.key}` : `archive:${ref.locId}/${ref.file}`) : "";
  useEffect(() => {
    if (!ref) {
      setUrl(fallback);
      return;
    }
    if (ref.t === "asset") {
      setUrl(assetUrl(ref.key) ?? fallback);
      return;
    }
    let alive = true;
    loadPhotoUrl(ref.locId, ref.file)
      .then((resolved) => {
        if (alive) setUrl(resolved);
      })
      .catch(() => {
        if (alive) setUrl(fallback);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig, fallback]);
  return url;
}
