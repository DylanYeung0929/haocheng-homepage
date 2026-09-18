import { useRef } from "react";
import { FlaskConical, Microscope, BookOpen, GraduationCap, ArrowRight, Medal, Star, Globe2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Route } from "../types";
import { SectionHero } from "../components/SectionHero";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { useCuration, useImgUrl } from "../lib/curation";
import honorExcellent from "../assets/honors/excellent-member.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const topics = [
  {
    title: "量子计算：从算法到应用",
    en: "QUANTUM COMPUTING",
    time: "2025 · 至今",
    place: "CIC「悟空杯」国一 · CCF 挑战赛国三 · 挑战杯国二",
    field: "量子计算",
    background: "量子计算处在「有用的计算」前夜：算法抽象、硬件噪声、生态不成熟，每一步都要自己趟。",
    approach: "从量子编程基础打起：参加 CCF 量子计算编程挑战赛与 CIC「悟空杯」大赛，在量子创新赛道完成整套方案设计；随后把量子思想带入「挑战杯」，作品《化繁为简，量子先行》获国家级二等奖。",
    outcome: "累计 3 项国家级奖项：悟空杯一等奖、挑战杯二等奖、CCF 挑战赛三等奖。",
    grad: ["#6ee7b7", "#059669"],
  },
  {
    title: "RoboCon「沙排之王」机器人排球挑战赛",
    en: "ROBOCON 2026",
    time: "2025–2026",
    place: "第二十五届全国大学生机器人大赛",
    field: "机器人工程",
    background: "机器人排球挑战赛要求机器人自主完成发球、接球、拦网——机械、电控、视觉、策略缺一不可。",
    approach: "作为战队核心成员全程参与设计、组装与调试，经历从原型机到赛机的完整迭代，最终站上全国赛场。",
    outcome: "国家级一等奖 + 赛事精英奖（季军），北理工「沙排之王」战队。",
    grad: ["#a7f3d0", "#10b981"],
  },
  {
    title: "传统黑白胶卷摄影与暗房冲洗技术研究",
    en: "FILM & DARKROOM",
    time: "2025.6",
    place: "自主研究项目",
    field: "传统影像工艺",
    background: "数码时代，胶片的物质性反而成了稀缺的体验：银盐颗粒、显影液的温度、暗房里的红光。",
    approach: "从装卷、拍摄到显影、定影、放大，系统研究黑白胶片的完整冲洗流程，并记录每一步的工艺参数。",
    outcome: "完成整套暗房流程，形成黑白胶片拍摄与冲洗的个人工艺笔记。",
    grad: ["#99f6e4", "#0d9488"],
  },
  {
    title: "智能杯底交互数据的个性化叙事生成",
    en: "IMPRINT NARRATIVE",
    time: "2025 · 项目衍生课题",
    place: "与「微醺印记」产品联动",
    field: "人机交互 × 生成式 AI",
    background: "智能酒杯采集的举杯、碰杯等行为数据如何被用户理解，是硬件产品的情感化关键。",
    approach: "设计行为到叙事的映射规则，用生成式 AI 把一次饮酒节奏转化为带性格标签的个人故事。",
    outcome: "内测 300+ 人次，生成印记留存率 68%，形成产品核心功能。",
    grad: ["#bef264", "#65a30d"],
  },
];

const papers = [
  { title: "《化繁为简，量子先行》", venue: "第十九届「挑战杯」全国大学生课外学术科技作品竞赛「人工智能+」专项赛 · 国家级二等奖", year: "2025" },
  { title: "量子创新赛道决赛方案", venue: "CIC「悟空杯」量子计算大赛 · 国家级一等奖", year: "2025" },
  { title: "大学生创新创业训练计划项目", venue: "校级立项 · 已结题", year: "2024–2025" },
];

const schoolAwards = [
  { name: "第七届「瞭望杯」大学生新媒体文化节", level: "校级一等奖", time: "2024.12", tag: "新媒体创作", grad: ["#6ee7b7", "#059669"] },
  { name: "北京理工大学数学建模大赛", level: "校级一等奖", time: "2026.9", tag: "数学建模", grad: ["#a7f3d0", "#10b981"] },
  { name: "「光影绘爱 特立同行」校园摄影公益活动", level: "校级三等奖", time: "2024.10", tag: "摄影公益", grad: ["#99f6e4", "#0d9488"] },
  { name: "北京理工大学校园提案大赛", level: "校级三等奖", time: "2026.5", tag: "校园提案", grad: ["#bef264", "#65a30d"] },
];

const recognitions = [
  { name: "北京理工大学五四评优 · 校级优秀团员", time: "2026.5", org: "共青团北京理工大学委员会", img: honorExcellent },
  { name: "北京理工大学班级优秀团员", time: "2026", org: "特立 2453 班" },
  { name: "2024 年级院级「五四」评优", time: "2025.4", org: "徐特立学院" },
];

const practices = [
  { name: "徐特立学院赴剑桥大学暑期科技研学实践", note: "院级优秀实践团队", time: "2025.7" },
  { name: "李泽湘双创班赴深圳暑期实习实践", note: "暑期实习 · 双创实践", time: "2025.8" },
  { name: "「国门之南·澜湄共声」赴广西跨境交流社会实践", note: "特立书院青年实践团", time: "2026.8" },
];

export function ResearchPage({ navigate }: { navigate: (route: Route) => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".rs-header h2",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".rs-header", start: "top 78%", end: "top 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".topic-card",
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".topic-list", start: "top 80%" },
        },
      );
      gsap.from(".paper-row", {
        x: -28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".paper-list", start: "top 78%" },
      });
      gsap.fromTo(
        ".honor2-header h2",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".honor2-header", start: "top 78%", end: "top 42%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".sa-card",
        { y: 80, opacity: 0, rotate: (i) => (i % 2 === 0 ? -5 : 5) },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sa-grid", start: "top 84%" },
        },
      );
      gsap.fromTo(
        ".rec-item",
        { x: (i) => (i % 2 === 0 ? -60 : 60), opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rec-list", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".prac-item",
        { scale: 0.85, y: 40, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".prac-list", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".rec-cert-img",
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ".rec-cert-img", start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".honor2-stats .honor2-num",
        { textContent: 0 },
        {
          textContent: (_index: number, el: HTMLElement) => Number(el.dataset.count ?? 0),
          duration: 1.6,
          snap: { textContent: 1 },
          ease: "power2.out",
          stagger: 0.25,
          scrollTrigger: { trigger: ".honor2-stats", start: "top 88%" },
        },
      );
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <SectionHero
        eyebrow="QUESTIONS I PURSUE"
        titleEn="RESEARCH"
        titleZh="科研经历"
        desc="4 项课题、5 项国家级奖项、2 段研学。科研教会我两件事：一是提问比回答更难，二是承认「不知道」是进步的开始。从量子计算到机器人，从暗房工艺到产品交互，我在寻找真正值得回答的问题。"
        theme="research"
        stats={[["4", "项课题"], ["5", "项国家级奖项"], ["2", "段研学"]]}
      />

      <section className="rs-header relative px-5 py-24 lg:px-8" aria-label="科研理念">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="display-en text-sm text-stone-400">ASK · EXPERIMENT · VERIFY</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
            在未知边界上，
            <br className="hidden sm:block" />
            认真地刨根问底。
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
            我的科研路线并不单一：从量子计算的算法世界，到 RoboCon 赛场上的机器人，
            再到暗房里的银盐颗粒与产品中的行为数据。
            下面按时间倒序列出 4 项代表性课题，含研究背景、方法与结论，方便你快速了解。
          </p>
        </div>
      </section>

      <section className="topic-list relative px-5 pb-24 lg:px-8" aria-label="课题列表">
        <div className="mx-auto max-w-5xl space-y-6">
          {topics.map((topic) => (
            <article
              key={topic.en}
              data-cursor="READ"
              className="topic-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10"
            >
              <div className="grid gap-6 p-7 md:grid-cols-[.8fr_1.6fr]">
                <div>
                  <div
                    className="flex h-28 items-end rounded-xl p-4"
                    style={{ background: `linear-gradient(135deg, ${topic.grad[0]}, ${topic.grad[1]})` }}
                    aria-hidden="true"
                  >
                    <span className="display-en text-xl font-bold tracking-[.06em] text-white/90">{topic.en}</span>
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <GraduationCap className="size-4" aria-hidden="true" />{topic.place}
                  </p>
                  <p className="mt-2 text-xs text-stone-400">{topic.time}</p>
                  <span className="mt-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{topic.field}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">{topic.title}</h3>
                  <dl className="mt-4 space-y-4 text-sm leading-7">
                    <div>
                      <dt className="font-bold text-emerald-700">研究背景</dt>
                      <dd className="mt-1 text-stone-500">{topic.background}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-emerald-700">方法与过程</dt>
                      <dd className="mt-1 text-stone-500">{topic.approach}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-emerald-700">结果与产出</dt>
                      <dd className="mt-1 text-stone-500">{topic.outcome}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-black/10 bg-emerald-50/50 px-5 py-24 lg:px-8" aria-label="荣誉与奖项">
        <div className="pointer-events-none absolute -left-32 top-16 size-96 rounded-full bg-emerald-300/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 bottom-16 size-96 rounded-full bg-teal-300/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <div className="honor2-header flex flex-col items-center text-center">
            <p className="display-en text-sm text-emerald-600">HONORS · RECOGNITIONS · PRACTICES</p>
            <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
              赛场之外，<span className="accent-dot">.</span>
              <br className="hidden sm:block" />
              也有被看见的时刻。
            </h2>
            <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
              除了国家级竞赛，校级奖项、团组织表彰与社会实践同样是我大学的一部分：
              用镜头服务校园、用提案改变细节、在剑桥与深圳之间打开视野。
            </p>
          </div>

          <div className="honor2-stats mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {[
              ["4", "校级奖项"],
              ["3", "项表彰"],
              ["3", "段实践"],
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center">
                <span className="display-en text-6xl font-bold text-stone-900">
                  <span className="honor2-num" data-count={num}>0</span>
                </span>
                <span className="mt-2 text-sm font-semibold text-stone-500">{label}</span>
              </div>
            ))}
          </div>

          <div className="sa-grid mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="校级奖项">
            {schoolAwards.map((award) => (
              <article
                key={award.name}
                data-cursor="AWARD"
                className="sa-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-900/15"
              >
                <div
                  className="relative flex h-28 items-end p-4"
                  style={{ background: `linear-gradient(135deg, ${award.grad[0]}, ${award.grad[1]})` }}
                  aria-hidden="true"
                >
                  <Medal className="absolute right-4 top-4 size-6 text-white/70 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/90">{award.tag}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-emerald-600">{award.level}</span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-stone-900">{award.name}</h3>
                  <p className="mt-3 text-xs text-stone-400">{award.time}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            <div className="rec-list rounded-3xl border border-black/10 bg-white/85 p-7 shadow-sm backdrop-blur md:p-9" aria-label="荣誉表彰">
              <div className="mb-7 flex items-center gap-3">
                <Star className="size-5 text-emerald-600" aria-hidden="true" />
                <h3 className="display-en text-2xl text-stone-900">RECOGNITIONS<span className="accent-dot">.</span></h3>
              </div>
              <ol className="space-y-5">
                {recognitions.map((rec, ri) => (
                  <li key={rec.name} className="rec-item flex items-start gap-4 rounded-xl border border-black/5 bg-emerald-50/60 p-4 transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
                    <RecCert
                      slotId={`research.recognitions.${ri}`}
                      fallback={rec.img}
                      initial={rec.name.slice(0, 1)}
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold leading-6 text-stone-800">{rec.name}</h4>
                      <p className="mt-1 text-xs text-stone-400">{rec.org} · {rec.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/85 p-7 shadow-sm backdrop-blur md:p-9" aria-label="社会实践">
              <div className="mb-7 flex items-center gap-3">
                <Globe2 className="size-5 text-emerald-600" aria-hidden="true" />
                <h3 className="display-en text-2xl text-stone-900">PRACTICES<span className="accent-dot">.</span></h3>
              </div>
              <ul className="prac-list space-y-4">
                {practices.map((prac) => (
                  <li key={prac.name} className="prac-item rounded-xl border border-black/5 bg-emerald-50/60 p-5 transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
                    <p className="text-xs font-bold text-emerald-600">{prac.time}</p>
                    <h4 className="mt-2 text-sm font-bold leading-6 text-stone-800">{prac.name}</h4>
                    <p className="mt-1 text-xs text-stone-400">{prac.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="paper-list relative border-t border-black/10 bg-white/40 px-5 py-24 lg:px-8" aria-label="竞赛产出">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center gap-4">
            <BookOpen className="size-6 text-emerald-600" aria-hidden="true" />
            <h2 className="display-en text-4xl text-stone-900 md:text-5xl">OUTPUTS<span className="accent-dot">.</span></h2>
          </div>
          <ol className="space-y-4">
            {papers.map((paper, index) => (
              <li key={paper.title} className="paper-row flex items-start gap-5 rounded-xl border border-black/10 bg-white/80 p-5 transition-colors hover:border-emerald-200">
                <span className="display-en text-2xl font-bold text-emerald-300">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <h3 className="text-base font-bold leading-7 text-stone-800">{paper.title}</h3>
                  <p className="mt-1 text-sm text-stone-400">{paper.venue} · {paper.year}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-wrap items-center gap-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-7">
            <Microscope className="size-8 shrink-0 text-emerald-600" aria-hidden="true" />
            <p className="flex-1 text-sm leading-7 text-stone-600">
              下一步计划：把街景分割工作扩展到实时场景，并探索科研与产品结合的更多可能。
            </p>
            <LiquidGlassButton arrow onClick={() => navigate("artworks")} className="min-h-11 px-5 text-sm font-semibold">
              看看我的艺术创作
            </LiquidGlassButton>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="text-sm text-stone-400">第四章 · 科研经历</p>
          <button onClick={() => navigate("artworks")} className="group flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
            下一章 · 艺术作品
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

function RecCert({ slotId, fallback, initial }: { slotId: string; fallback?: string; initial: string }) {
  const slots = useCuration().slots;
  const src = useImgUrl(slots?.[slotId], fallback ?? "");
  if (!src) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-200 to-teal-300 text-lg font-black text-emerald-800">
        {initial}
      </div>
    );
  }
  return (
    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-black/10">
      <img src={src} alt="荣誉证书" loading="lazy" className="rec-cert-img absolute inset-0 h-[130%] w-full object-cover" />
    </div>
  );
}
