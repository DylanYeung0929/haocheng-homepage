import { useRef } from "react";
import { Camera, FlaskConical, Palette, ArrowUpRight, MapPin, Eye, Hammer, Search, Heart, Aperture } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Route } from "../types";
import { themes } from "../lib/themes";
import { useCuration, useImgUrl } from "../lib/curation";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import photoGiza from "../assets/works/pano/giza.jpg";
import robotQuad from "../assets/works/quad/robot-quad.jpg";
import islandFinal from "../assets/works/easter/island-final.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const entries: {
  route: Route;
  en: string;
  zh: string;
  note: string;
  stat: string;
  statLabel: string;
  theme: keyof typeof themes;
}[] = [
  { route: "footprints", en: "FOOTPRINTS", zh: "我的足迹", note: "25 个国家和地区的国旗墙与路上的故事，足迹横跨六大洲。", stat: "25", statLabel: "个国家和地区", theme: "footprints" },
  { route: "photography", en: "PHOTOGRAPHY", zh: "摄影作品", note: "风光、古迹、人文与胶片正在按系列整理，原片先收录在艺术页。", stat: "13", statLabel: "卷旅行素材", theme: "photography" },
  { route: "projects", en: "PROJECTS", zh: "项目经历", note: "从智能酒杯到机器人赛场，用代码与双手构建的答案。", stat: "5", statLabel: "项国家级奖项", theme: "projects" },
  { route: "research", en: "RESEARCH", zh: "科研经历", note: "量子计算、机器人与暗房工艺，在未知边界上的认真探索。", stat: "4", statLabel: "项课题", theme: "research" },
  { route: "artworks", en: "ARTWORKS", zh: "艺术作品", note: "海报、封面与影像实验，另一种自我表达。", stat: "14", statLabel: "个作品条目", theme: "artworks" },
  { route: "visual", en: "VISUAL DESIGN", zh: "视觉方案", note: "战队周边与视觉延展，让想法被看见的方式。", stat: "11", statLabel: "套配色", theme: "visual" },
];

const identities = [
  { Icon: Eye, title: "观察者", en: "OBSERVER", note: "背着相机走过 25 个国家和地区，相信好照片是等出来的。", theme: "photography" as const },
  { Icon: Hammer, title: "构建者", en: "BUILDER", note: "从硬件传感器到云端部署，喜欢把想法亲手做出来。", theme: "projects" as const },
  { Icon: Search, title: "研究者", en: "RESEARCHER", note: "在实验室里刨根问底，承认「不知道」是进步的开始。", theme: "research" as const },
  { Icon: Heart, title: "表达者", en: "EXPRESSER", note: "用艺术与设计把内心世界翻译给外界看。", theme: "artworks" as const },
];

const metrics = [
  { value: "25", unit: "个", label: "去过的国家和地区" },
  { value: "5", unit: "项", label: "国家级奖项" },
  { value: "2", unit: "个", label: "自研产品" },
  { value: "4", unit: "项", label: "参与过的课题" },
  { value: "11", unit: "套", label: "T 恤配色方案" },
];

const ribbon = [
  "FOOTPRINTS", "PHOTOGRAPHY", "PROJECTS", "RESEARCH", "ARTWORKS", "VISUAL DESIGN",
] as const;

const ribbonColors = [
  "#0891b2", "#d97706", "#7c3aed", "#059669", "#db2777", "#ea580c",
];

export type FeaturedItem = {
  id: string;
  route: Route;
  tag: string;
  title: string;
  note: string;
  grad: [string, string];
  Icon: LucideIcon;
  img?: string;
};

export const featured: FeaturedItem[] = [
  {
    id: "giza",
    route: "artworks",
    tag: "艺术 · ARTWORKS",
    title: "吉萨晨光",
    note: "埃及吉萨的金字塔与沙漠晨光，收录在艺术页「旅行日记素材原片」。",
    grad: ["#fde68a", "#f59e0b"],
    Icon: Aperture,
    img: photoGiza,
  },
  {
    id: "tipsy",
    route: "projects",
    tag: "项目 · PROJECTS",
    title: "微醺印记 · 智能酒杯",
    note: "杯底传感 + 生成式 AI，把每一次举杯变成专属印记。",
    grad: ["#c4b5fd", "#7c3aed"],
    Icon: Hammer,
  },
  {
    id: "easter",
    route: "artworks",
    tag: "艺术 · ARTWORKS",
    title: "复活节岛旅行海报",
    note: "以海岸场景与国旗折翼为核心视觉的合成海报，延展出三个尺寸版本。",
    grad: ["#f9a8d4", "#db2777"],
    Icon: Palette,
    img: islandFinal,
  },
  {
    id: "quad-tshirt",
    route: "visual",
    tag: "视觉 · VISUAL DESIGN",
    title: "四足机器人 T 恤设计",
    note: "Robocon 战队周边：11 套配色，从素材到成品的完整设计。",
    grad: ["#fdba74", "#ea580c"],
    Icon: Heart,
    img: robotQuad,
  },
];

export function HomePage({ navigate }: { navigate: (route: Route) => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline()
        .from(".hero-line", {
          y: 70,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-detail",
          { y: 18, opacity: 0, stagger: 0.08, duration: 0.5 },
          "-=.35",
        );
      gsap.fromTo(
        ".entry-card",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".entries", start: "top 76%" },
        },
      );
      gsap.fromTo(
        ".identity-card",
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".identity-grid", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".featured-card",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".featured-grid", start: "top 80%" },
        },
      );
      gsap.from(".metric-cell", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".metric-strip", start: "top 85%" },
      });
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <section className="relative isolate min-h-dvh overflow-hidden" data-cursor="HELLO">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(58rem 34rem at 78% -6%, rgba(245,158,11,.16), transparent 62%), radial-gradient(46rem 30rem at 8% 100%, rgba(6,182,212,.14), transparent 60%), radial-gradient(30rem 22rem at 96% 88%, rgba(236,72,153,.12), transparent 58%)",
          }}
        />
        <div className="relative mx-auto grid min-h-dvh max-w-7xl items-center gap-10 px-5 pb-16 pt-28 lg:px-8">
          <section className="max-w-3xl">
            <p className="display-en hero-detail mb-5 text-sm text-amber-600">
              PORTFOLIO · 2026 · DYLAN YEUNG
            </p>
            <h1 className="display-en text-balance text-6xl leading-[.9] text-stone-900 lg:text-8xl xl:text-9xl">
              <span className="hero-line block">DYLAN</span>
              <span className="hero-line block">YEUNG<span className="accent-dot">.</span></span>
            </h1>
            <p className="hero-detail mt-7 text-2xl font-semibold tracking-[.08em] text-stone-700">
              你好，我是杨昊诚
            </p>
            <p className="hero-detail mt-4 max-w-lg text-pretty text-base font-semibold leading-8 text-stone-500">
              一个喜欢用镜头观察世界、用代码构建想法、在实验室里刨根问底的人。
              这里收集了我的足迹、作品与经历——欢迎慢慢逛。
            </p>
            <LiquidGlassButton
              onClick={() => navigate("footprints")}
              arrow
              className="hero-detail mt-9 min-h-12 px-6 font-semibold"
            >
              开始逛
            </LiquidGlassButton>
            <ul className="hero-detail mt-12 grid max-w-xl gap-5 border-t border-black/10 pt-7 sm:grid-cols-3">
              {[
                [MapPin, "25 个国家和地区", "足迹横跨六大洲"],
                [Camera, "5 项国家级奖项", "赛场与领奖台"],
                [FlaskConical, "4 项课题", "保持刨根问底"],
              ].map(([Icon, title, body]) => {
                const I = Icon as typeof Camera;
                return (
                  <li key={String(title)} className="group relative min-h-20 overflow-hidden">
                    <I
                      className="absolute left-2 top-1/2 size-16 -translate-y-1/2 text-amber-400 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-30"
                      aria-hidden="true"
                    />
                    <strong className="relative block text-sm text-stone-800">
                      {String(title)}
                    </strong>
                    <span className="relative mt-1 block text-xs text-stone-400">
                      {String(body)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </section>

      <section className="overflow-hidden border-y border-black/10 bg-white/50 py-4" aria-label="板块标语">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {ribbon.map((word, index) => (
                <span key={`${copy}-${word}`} className="flex items-center">
                  <span className="display-en px-6 text-xl font-bold tracking-[.1em] md:text-2xl" style={{ color: ribbonColors[index] }}>
                    {word}
                  </span>
                  <span className="accent-dot text-2xl">.</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-24 lg:px-8" aria-label="关于我">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="display-en text-sm text-stone-400">ABOUT ME</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
            四个身份，
            <br className="hidden sm:block" />
            同一个好奇心。
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
            我很难用一个词定义自己：在金字塔前等日出的人是我，深夜调代码的人也是我；
            在 RoboCon 赛场边调试机器人的人是我，在暗房里冲洗第一卷黑白胶片的人也是我。
            它们共享同一种动力——想弄清楚世界是怎么运转的，然后用自己的方式把它讲出来。
          </p>
        </div>
        <div className="identity-grid mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {identities.map((item) => {
            const t = themes[item.theme];
            const Icon = item.Icon;
            return (
              <article
                key={item.en}
                className="identity-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 p-7 shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
                  style={{ background: `linear-gradient(90deg, ${t.gradFrom}, ${t.gradTo})` }}
                  aria-hidden="true"
                />
                <Icon className={`size-8 ${t.text} transition-transform duration-300 group-hover:scale-110`} aria-hidden="true" />
                <p className={`display-en mt-5 text-xs font-bold tracking-[.14em] ${t.text}`}>{item.en}</p>
                <h3 className="mt-2 text-xl font-bold text-stone-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-500">{item.note}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="metric-strip relative border-y border-black/10 bg-white/50 px-5 py-12 lg:px-8" aria-label="个人数据">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-cell text-center">
              <dd className="display-en text-4xl font-bold tabular-nums text-stone-900 md:text-5xl">
                {metric.value}
                <span className="ml-1 text-sm font-semibold text-stone-400">{metric.unit}</span>
              </dd>
              <dt className="mt-2 text-xs tracking-[.08em] text-stone-400">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="relative px-5 py-24 lg:px-8" aria-label="精选作品">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="display-en text-sm text-stone-400">SELECTED WORKS</p>
              <h2 className="display-en mt-3 text-5xl leading-[.95] text-stone-900 md:text-6xl">
                HIGHLIGHTS<span className="accent-dot">.</span>
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-7 text-stone-400 md:block">
              从六个板块里挑出的四个代表作，点进去可以看完整章节。
            </p>
          </header>
          <div className="featured-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item) => (
              <FeaturedCard key={item.id} item={item} onOpen={() => navigate(item.route)} />
            ))}
          </div>
        </div>
      </section>

      <section className="entries relative px-5 pb-24 lg:px-8" aria-label="六大板块">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="display-en text-sm text-stone-400">SIX CHAPTERS</p>
              <h2 className="display-en mt-3 text-5xl leading-[.95] text-stone-900 md:text-6xl">
                EXPLORE MY WORLD<span className="accent-dot">.</span>
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-7 text-stone-400 md:block">
              六个章节，六种颜色，记录我观察、构建与表达的不同方式。
            </p>
          </header>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => {
              const t = themes[entry.theme];
              return (
                <button
                  key={entry.route}
                  onClick={() => navigate(entry.route)}
                  data-cursor="VISIT"
                  className="entry-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-7 text-left shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1.5 opacity-80 transition-opacity group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, ${t.gradFrom}, ${t.gradTo})` }}
                    aria-hidden="true"
                  />
                  <span
                    className={`absolute -right-10 -top-10 size-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
                    style={{ background: t.gradFrom }}
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between">
                    <h3 className={`text-lg font-bold tracking-[.06em] ${t.text}`}>{entry.en}</h3>
                    <ArrowUpRight className="size-5 text-stone-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-stone-700" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-xl font-semibold text-stone-800">{entry.zh}</p>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-stone-400">{entry.note}</p>
                  <p className="mt-6 border-t border-black/10 pt-4">
                    <strong className={`block text-2xl font-bold ${t.text}`}>{entry.stat}</strong>
                    <span className="text-xs text-stone-400">{entry.statLabel}</span>
                  </p>
                </button>
              );
            })}
          </div>
          <div className="mt-16 flex items-center justify-center gap-3 text-sm text-stone-400">
            <SparklesIcon />
            每张卡片背后都有一段认真度过的时光
            <Palette className="size-4 text-pink-400" aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturedCard({ item, onOpen }: { item: FeaturedItem; onOpen: () => void }) {
  const curation = useCuration();
  const override = curation.slots?.[`home.featured.${item.id}`];
  const src = useImgUrl(override, item.img ?? "");
  const hasImage = Boolean(item.img || override);
  const Icon = item.Icon;
  return (
    <button
      onClick={onOpen}
      data-cursor="OPEN"
      className="featured-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 text-left shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
    >
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
        style={hasImage ? undefined : { background: `linear-gradient(135deg, ${item.grad[0]}, ${item.grad[1]})` }}
      >
        {hasImage ? (
          <img src={src} alt={item.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <Icon className="size-14 text-white/75 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" aria-hidden="true" />
        )}
        <span className="absolute bottom-3 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] font-bold tracking-[.12em] text-white backdrop-blur-sm">{item.tag}</span>
        <ArrowUpRight className="absolute right-4 top-4 size-5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-stone-900">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-500">{item.note}</p>
      </div>
    </button>
  );
}

function SparklesIcon() {
  return (
    <svg className="size-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.9 2.6 11.5 7a1 1 0 0 0 .6.6l4.4 1.6-4.4 1.6a1 1 0 0 0-.6.6L9.9 15.8 8.3 11.4a1 1 0 0 0-.6-.6L3.3 9.2l4.4-1.6a1 1 0 0 0 .6-.6z" />
      <path d="M19.8 15.3l.9 2.6a1 1 0 0 0 .6.6l2.6.9-2.6.9a1 1 0 0 0-.6.6l-.9 2.6-.9-2.6a1 1 0 0 0-.6-.6l-2.6-.9 2.6-.9a1 1 0 0 0 .6-.6z" transform="translate(0 2)" />
    </svg>
  );
}
