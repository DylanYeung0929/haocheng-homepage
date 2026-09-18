import { Brand } from "./Brand";
import type { Route } from "../types";

const groups = [
  { title: "EXPERIENCE", links: [["我的足迹", "footprints"], ["摄影作品", "photography"], ["艺术作品", "artworks"]] },
  { title: "SYSTEM", links: [["项目经历", "projects"], ["科研经历", "research"], ["视觉方案", "visual"]] },
] as const;

export function SiteFooter({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <footer className="border-t border-black/10 bg-white/60 px-5 py-16 text-stone-800 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div><Brand /><p className="mt-6 max-w-sm text-sm leading-7 text-stone-500">用镜头记录世界，用代码构建想法，用科研探索未知，用设计与艺术表达自我。</p></div>
        {groups.map((group) => <nav key={group.title} aria-label={group.title}><h2 className="text-xs font-semibold tracking-[.16em] text-stone-400">{group.title}</h2><ul className="mt-5 space-y-3">{group.links.map(([label, route]) => <li key={label}><button className="text-left text-base font-semibold text-stone-600 transition-colors hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" onClick={() => navigate(route as Route)}>{label}</button></li>)}</ul></nav>)}
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 border-t border-black/10 pt-6 text-xs tracking-[.08em] text-stone-400 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 杨昊诚 Dylan Yeung · 保持好奇，保持表达</p><div className="flex gap-6"><button onClick={() => navigate("home")} className="transition-colors hover:text-stone-800">HOME</button><button onClick={() => navigate("footprints")} className="transition-colors hover:text-stone-800">TOP</button></div></div>
    </footer>
  );
}
