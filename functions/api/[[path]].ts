// Cloudflare Pages Function：/api/* 全部转发给 src/worker/index.ts 的 fetch 实现。
// 页面静态资源由 Pages 平台直接服务，只有 /api/* 会命中这里。
import worker, { type Env } from "../../src/worker/index";

export const onRequest = (context: { request: Request; env: Env }): Promise<Response> =>
  worker.fetch(context.request, context.env);
