import { useRef } from "react";
import { Code2, GitBranch, Rocket, Terminal, ArrowRight, Trophy, Award } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Route } from "../types";
import { SectionHero } from "../components/SectionHero";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { useCuration, useImgUrl } from "../lib/curation";
import honorRoboconFirst from "../assets/honors/robocon-first.jpg";
import honorRoboconElite from "../assets/honors/robocon-elite.jpg";
import honorTiaozhan from "../assets/honors/tiaozhan-second.jpg";
import honorWukong from "../assets/honors/wukong.jpg";
import honorCcf from "../assets/honors/ccf-third.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const honors = [
  {
    name: "全国大学生机器人大赛 RoboCon",
    en: "ROBOCON 2026",
    level: "国家级一等奖",
    detail: "「沙排之王」机器人排球挑战赛 · 一等奖 + 赛事精英奖（季军）",
    time: "2026.8",
    team: "北京理工大学「沙排之王」战队",
    imgs: [honorRoboconFirst, honorRoboconElite],
    wide: true,
    grad: ["#c4b5fd", "#7c3aed"],
  },
  {
    name: "CIC「悟空杯」量子计算大赛",
    en: "WUKONG CUP",
    level: "国家级一等奖",
    detail: "量子创新赛道 · 决赛一等奖",
    time: "2025.8",
    team: "团队「好一朵美丽的茉莉花」",
    imgs: [honorWukong],
    grad: ["#a5b4fc", "#4f46e5"],
  },
  {
    name: "第十九届「挑战杯」人工智能+专项赛",
    en: "CHALLENGE CUP",
    level: "国家级二等奖",
    detail: "作品《化繁为简，量子先行》",
    time: "2025.11",
    team: "「挑战杯」参赛团队",
    imgs: [honorTiaozhan],
    grad: ["#c4b5fd", "#6d28d9"],
  },
  {
    name: "第四届 CCF 量子计算编程挑战赛",
    en: "CCF QCC",
    level: "国家级三等奖",
    detail: "高校赛道",
    time: "2025.7",
    team: "四人小队",
    imgs: [honorCcf],
    grad: ["#ddd6fe", "#7c3aed"],
  },
  {
    name: "全国大学生办公软件技能大赛",
    en: "OFFICE SKILLS",
    level: "国家级一等奖",
    detail: "办公自动化综合能力赛项",
    time: "2026.3",
    team: "个人参赛",
    grad: ["#c7d2fe", "#4338ca"],
  },
  {
    name: "全国大学生集成电路创新创业大赛",
    en: "IC INNOVATION",
    level: "省部级三等奖",
    detail: "第十届集创赛",
    time: "2026.8",
    team: "个人参赛",
    grad: ["#e9d5ff", "#7e22ce"],
  },
];

const projects = [
  {
    name: "微醺印记 · 智能酒杯",
    en: "TIPSY IMPRINT",
    time: "2025 · 主力项目",
    role: "全栈 + 硬件协同",
    desc: "一款带杯底传感模块的智能酒杯：重力与温感数据实时上传，生成式 AI 把每一次举杯、碰杯、停驻解读成专属「杯底印记」，并配套商家数据看板。",
    highlights: ["自研杯底传感模块（重力 / 温度 / 触碰）", "AI 印记生成与个性化叙事", "商家数据看板与云端部署"],
    stack: ["React", "TypeScript", "Cloudflare Pages", "GSAP", "AI 生成"],
    grad: ["#c4b5fd", "#7c3aed"],
  },
  {
    name: "个人主页",
    en: "PORTFOLIO SITE",
    time: "2026 · 进行中",
    role: "设计 + 开发",
    desc: "你现在看到的这个网站：以六大板块组织个人经历，每章一套主题色，玻璃拟态与流动渐变贯穿全站，支持移动端与深色偏好。",
    highlights: ["六章节彩色设计系统", "GSAP 滚动叙事动画", "Hash 路由 + 懒加载", "响应式适配"],
    stack: ["React", "Vite", "Tailwind", "GSAP", "Motion"],
    grad: ["#ddd6fe", "#6366f1"],
  },
  {
    name: "RoboCon「沙排之王」机器人排球",
    en: "ROBOCON 2026",
    time: "2025–2026 · 战队项目",
    role: "战队核心成员",
    desc: "第二十五届全国大学生机器人大赛：从原型机到赛机，全程参与机器人的设计、组装与调试，最终站上全国赛场领奖台。",
    highlights: ["机器人设计、组装与调试", "从原型机到赛机完整迭代", "国家级一等奖 + 赛事精英奖（季军）"],
    stack: ["机器人工程", "机械设计", "电控调试", "团队协作"],
    grad: ["#a78bfa", "#5b21b6"],
  },
  {
    name: "「挑战杯」人工智能+专项赛",
    en: "CHALLENGE CUP",
    time: "2025 · 竞赛项目",
    role: "团队核心成员",
    desc: "第十九届「挑战杯」人工智能+专项赛参赛作品《化繁为简，量子先行》：把量子计算思想带入人工智能场景，获国家级二等奖。",
    highlights: ["作品《化繁为简，量子先行》", "量子计算 × 人工智能交叉", "国家级二等奖"],
    stack: ["量子计算", "算法设计", "方案撰写", "答辩展示"],
    grad: ["#c4b5fd", "#8b5cf6"],
  },
];

const skills = [
  "TypeScript", "React", "Python", "Node.js", "Tailwind CSS", "GSAP", "Figma",
  "Git", "Cloudflare Pages", "Vite", "Framer Motion", "Arduino", "量子编程",
];

export function ProjectsPage({ navigate }: { navigate: (route: Route) => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".pj-header h2",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".pj-header", start: "top 78%", end: "top 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".project-card",
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".project-list", start: "top 80%" },
        },
      );
      gsap.from(".skill-chip", {
        scale: 0.6,
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".skill-cloud", start: "top 82%" },
      });
      gsap.fromTo(
        ".honor-header h2",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".honor-header", start: "top 78%", end: "top 42%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".honor-card",
        { y: 110, opacity: 0, rotate: (i) => (i % 2 === 0 ? -7 : 7) },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.14,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".honor-grid", start: "top 84%" },
        },
      );
      gsap.fromTo(
        ".honor-stats .honor-num",
        { textContent: 0 },
        {
          textContent: (_index: number, el: HTMLElement) => Number(el.dataset.count ?? 0),
          duration: 1.8,
          snap: { textContent: 1 },
          ease: "power2.out",
          stagger: 0.3,
          scrollTrigger: { trigger: ".honor-stats", start: "top 88%" },
        },
      );
      gsap.utils.toArray<HTMLElement>(".honor-card .honor-img").forEach((img, i) => {
        gsap.fromTo(
          img,
          { yPercent: i % 2 === 0 ? -14 : 14 },
          {
            yPercent: i % 2 === 0 ? 14 : -14,
            ease: "none",
            scrollTrigger: { trigger: img.closest(".honor-card"), start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <SectionHero
        eyebrow="THINGS I HAVE BUILT"
        titleEn="PROJECTS"
        titleZh="项目经历"
        desc="从智能酒杯到机器人赛场，从量子算法到个人网站。我喜欢把想法亲手做出来：硬件、软件、设计与算法，构建的过程就是与问题对话的过程。"
        theme="projects"
        stats={[["4", "个代表项目"], ["5", "项国家级奖项"], ["2", "个自研产品"]]}
      />

      <section className="pj-header relative px-5 py-24 lg:px-8" aria-label="项目理念">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="display-en text-sm text-stone-400">IDEATE · BUILD · SHIP</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
            想法不值钱，
            <br className="hidden sm:block" />
            把它做出来才值钱。
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
            我做项目的原则很简单：先让一个最小版本跑起来，再在真实使用中迭代。
            下面挑选了 4 个有代表性的项目——有硬件产品、有完整网站、有团队协作、也有只为自己写的小工具，
            每个都上线或被真实使用过。
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-black/10 bg-violet-50/50 px-5 py-24 lg:px-8" aria-label="荣誉墙">
        <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-violet-300/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-indigo-300/30 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="honor-header flex flex-col items-center text-center">
            <p className="display-en text-sm text-violet-600">HONORS &amp; AWARDS</p>
            <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
              拿过的奖，<span className="accent-dot">.</span>
              <br className="hidden sm:block" />
              都是和队友一起熬出来的。
            </h2>
            <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
              从大一的校级摄影奖到 RoboCon 全国季军——每一张证书背后都是一段
              通宵、调参、改方案的日子。证书原件都在下面，欢迎点开细看。
            </p>
          </div>

          <div className="honor-stats mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {[
              ["5", "国家级奖项"],
              ["1", "省部级奖项"],
              ["4", "校级奖项"],
              ["2", "项个人荣誉"],
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center">
                <span className="display-en text-6xl font-bold text-stone-900">
                  <span className="honor-num" data-count={num}>0</span>
                </span>
                <span className="mt-2 text-sm font-semibold text-stone-500">{label}</span>
              </div>
            ))}
          </div>

          <div className="honor-grid mx-auto mt-16 grid max-w-6xl gap-7 md:grid-cols-2">
            {honors.map((honor, hi) => (
              <article
                key={honor.en}
                data-cursor="AWARD"
                className={`honor-card group relative overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-lg shadow-violet-900/5 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-900/15 ${
                  honor.wide ? "md:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="relative overflow-hidden">
                    {honor.imgs ? (
                      <div className={honor.wide ? "grid md:grid-cols-2" : ""}>
                        {honor.imgs.map((src, ci) => (
                          <HonorCert
                            key={src}
                            slotId={`projects.honors.${hi}.img.${ci}`}
                            fallback={src}
                            alt={`${honor.name} 证书`}
                            level={honor.level}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="flex h-56 items-end p-5"
                        style={{ background: `linear-gradient(135deg, ${honor.grad[0]}, ${honor.grad[1]})` }}
                        aria-hidden="true"
                      >
                        <span className="display-en text-4xl font-bold tracking-[.08em] text-white/90 transition-transform duration-500 group-hover:scale-105">
                          {honor.en}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-2">
                      <Trophy className="size-4 text-violet-500" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-widest text-violet-600">{honor.level}</span>
                      <span className="ml-auto text-xs text-stone-400">{honor.time}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-stone-900">{honor.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-stone-500">{honor.detail}</p>
                    <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-stone-400">
                      <Award className="size-3.5" aria-hidden="true" />
                      {honor.team}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-list relative px-5 pb-24 lg:px-8" aria-label="项目列表">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.en}
              data-cursor="BUILD"
              className="project-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-900/10"
            >
              <div
                className="relative flex h-36 items-end p-5"
                style={{ background: `linear-gradient(135deg, ${project.grad[0]}, ${project.grad[1]})` }}
                aria-hidden="true"
              >
                <span className="display-en text-3xl font-bold tracking-[.08em] text-white/90 transition-transform duration-500 group-hover:scale-105">
                  {project.en}
                </span>
                <Code2 className="absolute right-5 top-5 size-6 text-white/70" aria-hidden="true" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-bold text-stone-900">{project.name}</h3>
                  <span className="shrink-0 text-xs text-stone-400">{project.time}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-violet-600">{project.role}</p>
                <p className="mt-4 text-sm leading-7 text-stone-500">{project.desc}</p>
                <ul className="mt-4 space-y-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-stone-600">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-black/10 pt-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative border-t border-black/10 bg-white/40 px-5 py-24 lg:px-8" aria-label="技术栈">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-center gap-4">
            <Terminal className="size-6 text-violet-500" aria-hidden="true" />
            <h2 className="display-en text-4xl text-stone-900 md:text-5xl">TOOLBOX<span className="accent-dot">.</span></h2>
          </div>
          <div className="skill-cloud flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="skill-chip rounded-xl border border-violet-100 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-600 shadow-sm transition-colors hover:border-violet-300 hover:text-violet-700">{skill}</span>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-5 rounded-2xl border border-violet-100 bg-violet-50/70 p-7">
            <Rocket className="size-8 shrink-0 text-violet-600" aria-hidden="true" />
            <p className="flex-1 text-sm leading-7 text-stone-600">
              最近在研究边缘计算与 AI 应用落地。如果你有好玩的项目想法，欢迎一起折腾。
            </p>
            <LiquidGlassButton arrow onClick={() => navigate("research")} className="min-h-11 px-5 text-sm font-semibold">
              看看我的科研
            </LiquidGlassButton>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="text-sm text-stone-400">第三章 · 项目经历</p>
          <button onClick={() => navigate("research")} className="group flex items-center gap-2 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600">
            下一章 · 科研经历
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

function HonorCert({
  slotId,
  fallback,
  alt,
  level,
}: {
  slotId: string;
  fallback: string;
  alt: string;
  level: string;
}) {
  const slots = useCuration().slots;
  const src = useImgUrl(slots?.[slotId], fallback);
  return (
    <div className="relative h-64 overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="honor-img absolute inset-0 h-[128%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute left-4 top-4 rounded-full bg-stone-900/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur">
        {level}
      </span>
    </div>
  );
}
