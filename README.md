<div align="center">

# 杨昊诚 · 个人主页

### A light-themed portfolio for projects, research, photography and visual work

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)

[页面导览](#页面导览) · [本地运行](#本地运行) · [部署与策展后台](#部署与策展后台)

</div>

---

这是个人主页的浅色版本，以作品和经历为主线，展示旅行足迹、摄影、项目、科研、艺术作品与视觉设计。页面使用 React + TypeScript 构建，包含动效与照片策展后台。

> This is the light edition of my portfolio. It brings together selected work across engineering, research, photography and visual design.

## 页面导览

| 入口 | 内容 | 源码 |
| --- | --- | --- |
| 首页 | 六个主题板块的导览与精选内容 | [`HomePage.tsx`](src/pages/HomePage.tsx) |
| 我的足迹 | 城市与旅行记录 | [`FootprintsPage.tsx`](src/pages/FootprintsPage.tsx) |
| 摄影作品 | 摄影内容展示 | [`PhotographyPage.tsx`](src/pages/PhotographyPage.tsx) |
| 项目经历 | 工程与产品项目 | [`ProjectsPage.tsx`](src/pages/ProjectsPage.tsx) |
| 科研经历 | 研究课题与实践 | [`ResearchPage.tsx`](src/pages/ResearchPage.tsx) |
| 艺术作品 | 图片与创作 | [`ArtworksPage.tsx`](src/pages/ArtworksPage.tsx) |
| 视觉方案 | 视觉设计作品 | [`VisualPage.tsx`](src/pages/VisualPage.tsx) |

网站使用 URL hash 切换页面，例如 `#projects` 和 `#photography`；策展后台入口为 `#admin`。公开展示内容请以页面和源码为准。

## 技术与目录

| 路径 | 作用 |
| --- | --- |
| `src/pages/` | 各展示页面与后台页面 |
| `src/components/` | 导航、卡片、图片查看等界面组件 |
| `src/assets/` | 网站使用的作品、照片与其他本地素材 |
| `src/lib/curation.ts` | 前端读取、保存策展数据；服务不可用时回退到默认展示 |
| `src/worker/index.ts` | 登录、会话与策展 API 的 Worker 实现 |
| `functions/api/` | Cloudflare Pages Functions 的 API 入口 |

前端使用 React、Vite、Tailwind CSS、Motion 与 GSAP；站点配置包含 Cloudflare Pages / Workers 和 KV 绑定。依赖版本以 [`package.json`](package.json) 为准。

## 本地运行

需要 Node.js、npm。克隆仓库后执行：

```bash
npm ci
npm run dev
```

生产构建与本地预览：

```bash
npm run build
npm run preview
```

`npm run dev` 只启动 Vite 前端；没有 API / KV 时，照片策展数据会使用默认展示，后台的登录与保存功能需要相应的 Cloudflare 环境。

## 部署与策展后台

仓库提供两种部署脚本：

| 命令 | 对应配置 |
| --- | --- |
| `npm run deploy` | Cloudflare Pages；使用 [`wrangler.jsonc`](wrangler.jsonc) |
| `npm run deploy:workers` | Cloudflare Workers 静态资源 + API；使用 [`wrangler.workers.jsonc`](wrangler.workers.jsonc) |

部署前需要在自己的 Cloudflare 账户中配置 `CURATION` KV 绑定，并以密钥形式设置 `ADMIN_PASSWORD`。不要把后台密码提交到仓库。策展后台的保存操作需要登录；公开页面读取策展数据时无需登录。

## 版本说明

本仓库是浅色版本。深色编辑部风格及中英切换等后续设计见 [haocheng-homepage-v2](https://github.com/DylanYeung0929/haocheng-homepage-v2)。

## 许可证 / License

除另有注明外，本仓库中由 DylanYeung0929 有权授权的原创代码与文档采用 [MIT License](LICENSE)。第三方代码、依赖、合作成果、数据集、赛题、图片、字体及其他素材不因本许可证而改变授权，仍适用各自的许可与权利声明。

Unless otherwise noted, original code and documentation that DylanYeung0929 has the right to license are available under the [MIT License](LICENSE). This grant does not relicense third-party code, dependencies, jointly authored works, datasets, problem statements, images, fonts, or other assets; their respective licenses and rights remain applicable.
