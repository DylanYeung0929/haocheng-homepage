import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Route } from "../types";
import { Brand } from "./Brand";

const items: { route: Route; en: string; zh: string; note: string }[] = [
  { route: "footprints", en: "FOOTPRINTS", zh: "我的足迹", note: "走过的城市与路" },
  { route: "photography", en: "PHOTOGRAPHY", zh: "摄影作品", note: "光影与瞬间" },
  { route: "projects", en: "PROJECTS", zh: "项目经历", note: "动手做的东西" },
  { route: "research", en: "RESEARCH", zh: "科研经历", note: "课题与探索" },
  { route: "artworks", en: "ARTWORKS", zh: "艺术作品", note: "创作与表达" },
  { route: "visual", en: "VISUAL DESIGN", zh: "视觉方案", note: "品牌与界面" },
];

export function AppHeader({ route, navigate }: { route: Route; navigate: (route: Route) => void }) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const go = (next: Route) => { navigate(next); setOpen(false); setMobile(false); };
  return <header className="fixed inset-x-0 top-0 z-30 pt-[env(safe-area-inset-top)]">
    <div className="border-b border-black/10 bg-white/70 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
      <button onClick={() => go("home")} className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" aria-label="返回首页"><Brand /></button>
      <button className="hidden min-h-10 items-center gap-2 rounded-xl border border-black/15 bg-white/60 px-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-white/90 md:flex" onPointerEnter={() => setOpen(true)} onFocus={() => setOpen(true)} aria-expanded={open}>EXPLORE <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} /></button>
      <button className="grid size-10 place-items-center rounded-xl border border-black/15 bg-white/60 text-stone-700 md:hidden" onClick={() => setMobile(!mobile)} aria-label="打开导航">{mobile ? <X/> : <Menu/>}</button>
    </div></div>
    <AnimatePresence>{(open || mobile) && <motion.div initial={{ opacity: 0, y: -18, clipPath: "inset(0 0 100% 0 round 0 0 18px 18px)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 0 0 18px 18px)" }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .28, ease: [0.22,1,0.36,1] }} onPointerLeave={() => setOpen(false)} className="border-b border-black/10 bg-white/95 shadow-xl shadow-stone-900/5 backdrop-blur-2xl"><nav className="mx-auto grid max-w-7xl gap-px px-5 py-5 md:grid-cols-3 lg:px-8" aria-label="主要导航">{items.map(item => <button key={item.route} onClick={() => go(item.route)} className={`group rounded-xl p-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 ${route === item.route ? "bg-stone-100" : "hover:bg-stone-50"}`}><span className="block text-lg font-bold tracking-[.08em] text-stone-800">{item.en}<span className="accent-dot">.</span></span><span className="mt-3 block text-sm font-semibold text-stone-600">{item.zh}</span><span className="mt-1 block text-xs text-stone-400">{item.note}</span></button>)}</nav></motion.div>}</AnimatePresence>
  </header>;
}
