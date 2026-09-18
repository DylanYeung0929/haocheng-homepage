import { useRef } from "react";
import { PenTool, LayoutTemplate, ArrowRight, SwatchBook } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Route } from "../types";
import { SectionHero } from "../components/SectionHero";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { MaterialsOrbitScroll } from "../components/MaterialsOrbitScroll";
import { colorwayFiles } from "../lib/slots";
import { useCuration, useImgUrl } from "../lib/curation";
import robotQuad from "../assets/works/quad/robot-quad.jpg";
import robotVolley from "../assets/works/volleyball/robot-volley.jpg";
import islandFinal from "../assets/works/easter/island-final.jpg";
import albumWorks from "../assets/works/album/album-Works.png";
import travelCover from "../assets/works/travel/travel-cover.jpg";
import logoRobocon from "../assets/works/art/logo-robocon.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cases = [
  {
    name: "四足机器人战队 T 恤设计",
    en: "ROBOCON T-SHIRT",
    type: "战队周边设计",
    time: "2025",
    client: "北京理工大学 RC 战队",
    background: "为 Robocon 参赛战队设计的周边 T 恤：以四足机器人为核心图形，融合战队标志与库犸科技、eSUN 等赞助商元素，从草图到印花全套输出。",
    points: ["核心插画 + 多层纹样系统", "11 套配色方案（含「初号机」限定）", "轮足 / 四足双版本", "T 恤、旗面、物料延展"],
    img: robotQuad,
    imgAlt: "四足机器人 T 恤设计海报",
  },
  {
    name: "排球机器人战队 T 恤设计",
    en: "VOLLEYBALL T-SHIRT",
    type: "战队周边设计",
    time: "2025",
    client: "北京理工大学 RC 战队",
    background: "同系列的另一款：以排球机器人为主题的纹样设计，延续同一套视觉语言，让两个赛项的周边摆在一起就是一个完整的战队系列。",
    points: ["与四足款同源的设计语言", "排球机器人主题插画", "多材质印花适配", "系列化包装与周边"],
    img: robotVolley,
    imgAlt: "排球机器人 T 恤设计海报",
  },
  {
    name: "复活节岛旅行海报",
    en: "EASTER ISLAND TRIP",
    type: "海报 / 壁纸",
    time: "2025",
    client: "个人创作",
    background: "为复活节岛之旅创作的合成海报：以海岸场景与多国国旗折翼为核心视觉，把旅途中的「足迹感」做成画面，同一视觉延展出海报、壁纸与微信封面三个尺寸版本。",
    points: ["国旗旗翼合成视觉", "三尺寸版本延展", "水印系统设计", "手机壁纸适配"],
    img: islandFinal,
    imgAlt: "复活节岛旅行海报成品",
  },
  {
    name: "手机相册封面系列",
    en: "ALBUM COVERS",
    type: "封面设计",
    time: "2024 · 至今",
    client: "个人项目",
    background: "为自己逐年拍摄的照片设计手机相册封面：每年一套主题色与排版语言，让相册列表本身成为一本可翻阅的年度设计志。",
    points: ["年度主题色系统", "2024 / 2025 / 2026 逐年迭代", "Essentials 精选集封面", "与 Lightroom 工作流配套"],
    img: albumWorks,
    imgAlt: "手机相册封面设计",
  },
  {
    name: "旅行日记封面",
    en: "TRAVEL DIARY COVER",
    type: "出版物设计",
    time: "2025",
    client: "个人出版",
    background: "为自己的旅行日记设计的封面：从上百张旅途照片中提炼主视觉，配合手写体标题，制作成可打印的日记本封面。",
    points: ["照片素材再创作", "手写体标题设计", "打印与电子双版本", "全套水印规范"],
    img: travelCover,
    imgAlt: "旅行日记封面",
  },
  {
    name: "RoboCon 战队标志设计",
    en: "TEAM LOGO",
    type: "Logo 设计",
    time: "2025",
    client: "北理工 RoboCon 战队",
    background: "为战队绘制的标志图形：贯穿 T 恤、旗面与物料延展，与「JiaYue × Dylan」联名标志同期的定稿作品。",
    points: ["战队标志图形", "多物料延展适配", "联名标志定稿", "单色 / 反白版本"],
    img: logoRobocon,
    imgAlt: "RoboCon 战队标志设计",
  },
  {
    name: "个人主页设计系统",
    en: "PORTFOLIO UI",
    type: "界面设计",
    time: "2026",
    client: "个人项目 · 本站",
    background: "你现在看到的这套界面：以「六章六色」组织信息架构，玻璃拟态统一控件语言，滚动动画承担叙事节奏——包括上面的素材环绕动效。",
    points: ["六色章节导航系统", "浅色玻璃拟态组件库", "滚动叙事动效规范", "响应式与无障碍适配"],
    img: null,
    imgAlt: "",
  },
];

export function VisualPage({ navigate }: { navigate: (route: Route) => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".vd-header h2",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".vd-header", start: "top 78%", end: "top 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".case-card",
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".case-grid", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".color-tile",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.04,
          duration: 0.5,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".color-wall", start: "top 82%" },
        },
      );
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <SectionHero
        eyebrow="DESIGN THAT SPEAKS"
        titleEn="VISUAL DESIGN"
        titleZh="视觉方案"
        desc="从战队 T 恤到旅行海报，从相册封面到 Logo 设计。设计于我，是把复杂的想法翻译成一眼能懂的画面——每一次翻译都要找到最贴切的语言。"
        theme="visual"
        stats={[["11", "套配色方案"], ["6", "个设计案例"], ["3", "类延展"]]}
      />

      <MaterialsOrbitScroll />

      <section className="vd-header relative px-5 py-24 lg:px-8" aria-label="设计理念">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="display-en text-sm text-stone-400">UNDERSTAND · TRANSLATE · DELIVER</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
            好的设计不是装饰，
            <br className="hidden sm:block" />
            是让信息自己说话。
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
            我理解的视觉设计是一套翻译系统：把品牌性格、数据规律、活动情绪，
            翻译成色彩、字体、版式与动效。下面 6 个案例覆盖了战队周边、海报、封面与界面设计，
            每个都注明设计背景与关键要点。
          </p>
        </div>
      </section>

      <section className="case-grid relative px-5 pb-24 lg:px-8" aria-label="设计案例">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, index) => (
            <article
              key={item.en}
              data-cursor="CASE"
              className="case-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-900/10"
            >
              <CaseMedia item={item} index={index} />
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                  <span className="shrink-0 text-xs text-stone-400">{item.time}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-orange-600">{item.type} · {item.client}</p>
                <p className="mt-4 text-sm leading-7 text-stone-500">{item.background}</p>
                <ul className="mt-4 space-y-2 border-t border-black/10 pt-4">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-6 text-stone-600">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="color-wall relative border-t border-black/10 bg-white/40 px-5 py-24 lg:px-8" aria-label="配色方案墙">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center gap-4">
            <SwatchBook className="size-6 text-orange-500" aria-hidden="true" />
            <h2 className="display-en text-4xl text-stone-900 md:text-5xl">COLORWAYS<span className="accent-dot">.</span></h2>
          </div>
          <p className="mb-8 max-w-2xl text-sm leading-7 text-stone-500">
            四足机器人 T 恤的 11 套配色方案：从战队经典配色到「初号机」「西瓜」等趣味变体，
            每一套都重新调整了明度与对比，保证印花在不同底色 T 恤上的可读性。
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colorwayFiles.map((item, index) => (
              <ColorTile key={item.name} name={item.name} fallback={item.url} index={index} />
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-5 rounded-2xl border border-orange-100 bg-orange-50/70 p-7">
            <PenTool className="size-8 shrink-0 text-orange-600" aria-hidden="true" />
            <p className="flex-1 text-sm leading-7 text-stone-600">
              有品牌、海报或界面需求？欢迎聊聊，从理解问题开始。
            </p>
            <LiquidGlassButton arrow onClick={() => navigate("home")} className="min-h-11 px-5 text-sm font-semibold">
              回到首页
            </LiquidGlassButton>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="text-sm text-stone-400">第六章 · 视觉方案</p>
          <button onClick={() => navigate("home")} className="group flex items-center gap-2 text-sm font-semibold text-orange-700 transition-colors hover:text-orange-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600">
            回到开头 · 首页
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

function CaseMedia({ item, index }: { item: (typeof cases)[number]; index: number }) {
  const slots = useCuration().slots;
  const src = useImgUrl(slots?.[`visual.cases.${index}`], item.img ?? "");
  if (!src) {
    return (
      <div
        className="relative flex aspect-[16/10] items-end p-4"
        style={{ background: "linear-gradient(135deg, #fcd34d, #c2410c)" }}
        aria-hidden="true"
      >
        <span className="display-en text-sm font-bold tracking-[.1em] text-white/90">{item.en}</span>
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-orange-50">
      <img
        src={src}
        alt={item.imgAlt || item.name}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="display-en absolute bottom-3 left-4 text-sm font-bold tracking-[.1em] text-white drop-shadow-md">
        {item.en}
      </span>
    </div>
  );
}

function ColorTile({ name, fallback, index }: { name: string; fallback: string; index: number }) {
  const slots = useCuration().slots;
  const src = useImgUrl(slots?.[`visual.colorways.${index}`], fallback);
  return (
    <figure className="color-tile group relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <img src={src} alt={`配色方案：${name}`} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <figcaption className="border-t border-black/10 bg-white/90 px-3 py-2 text-center text-xs font-semibold text-stone-600">{name}</figcaption>
    </figure>
  );
}
