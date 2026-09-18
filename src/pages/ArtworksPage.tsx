import { useRef } from "react";
import { Camera, Sparkles, ArrowRight, Brush, Images } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Route } from "../types";
import { SectionHero } from "../components/SectionHero";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { useCuration, useImgUrl } from "../lib/curation";
import quadTshirt from "../assets/works/quad/tshirt-quad.png";
import quadPattern from "../assets/works/quad/pattern-quad.png";
import quadWheelfoot from "../assets/works/art/quad-wheelfoot.jpg";
import volleyTshirt from "../assets/works/volleyball/tshirt-volley.png";
import volleyPattern from "../assets/works/volleyball/pattern-volley.png";
import volleyPoster from "../assets/works/volleyball/robot-volley.jpg";
import islandFinal from "../assets/works/easter/island-final.jpg";
import islandWallpaper from "../assets/works/easter/island-wallpaper.jpg";
import islandWx from "../assets/works/easter/island-wx.jpg";
import album2024 from "../assets/works/album/album-2024.png";
import album2025 from "../assets/works/album/album-2025.png";
import album2026 from "../assets/works/album/album-2026.png";
import albumEssentials from "../assets/works/album/album-Essentials.png";
import albumWorks from "../assets/works/album/album-Works.png";
import travelCover from "../assets/works/travel/travel-cover.jpg";
import photoGiza from "../assets/works/pano/giza.jpg";
import photoTallinn from "../assets/works/pano/tallinn.jpg";
import photoSphinx from "../assets/works/travel-photos/DSC07337.jpg";
import photoWaterfall from "../assets/works/travel-photos/DSC07172.jpg";
import photoHotAir from "../assets/works/travel-photos/DSC00357.jpg";
import photoStarburst from "../assets/works/travel-photos/DSC07816.jpg";
import artLogoRobocon from "../assets/works/art/logo-robocon.jpg";
import artLogoJiayue from "../assets/works/art/logo-jiayue.jpg";
import artZlogo from "../assets/works/art/zlogo.jpg";
import artWatermark from "../assets/works/art/watermark.jpg";
import artColorStrip from "../assets/works/art/color-strip.jpg";
import artColorStrip2 from "../assets/works/art/color-strip2.jpg";
import artPixelPano from "../assets/works/art/pixel-pano.jpg";
import artDangjian from "../assets/works/art/dangjian.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Work = {
  title: string;
  medium: string;
  year: string;
  note: string;
  imgs?: string[];
  grad: [string, string];
  wide?: boolean;
};

const works: Work[] = [
  {
    title: "四足机器人战队 T 恤设计",
    medium: "战队周边",
    year: "2025",
    note: "为 Robocon 战队设计的参赛周边：以四足机器人为核心图形，融合战队与赞助商元素，含轮足/四足双版本与 11 套配色方案。",
    imgs: [quadTshirt, quadPattern, quadWheelfoot],
    grad: ["#f9a8d4", "#db2777"],
    wide: true,
  },
  {
    title: "排球机器人战队 T 恤设计",
    medium: "战队周边",
    year: "2025",
    note: "同系列的另一款：排球机器人主题纹样与黑白 T 恤成品，延续同一套战队视觉语言。",
    imgs: [volleyTshirt, volleyPattern, volleyPoster],
    grad: ["#fbcfe8", "#ec4899"],
  },
  {
    title: "复活节岛旅行海报系列",
    medium: "海报 / 壁纸",
    year: "2025",
    note: "以海岸场景与国旗折翼为核心视觉的合成海报，同一画面延展出海报、壁纸与微信封面三个版本。",
    imgs: [islandFinal, islandWallpaper, islandWx],
    grad: ["#fda4af", "#e11d48"],
    wide: true,
  },
  {
    title: "手机相册封面系列",
    medium: "封面设计",
    year: "2024–2026",
    note: "为自己逐年拍摄的照片设计的相册封面：2024、2025、2026 每年一套主题色，另有 Works 与 Essentials 精选集。",
    imgs: [album2024, album2025, album2026, albumEssentials, albumWorks],
    grad: ["#f0abfc", "#c026d3"],
    wide: true,
  },
  {
    title: "旅行日记封面",
    medium: "出版物设计",
    year: "2025",
    note: "为旅行日记设计的封面：从旅途照片中提炼主视觉，配合手写体标题，可打印成册。",
    imgs: [travelCover],
    grad: ["#fecdd3", "#f43f5e"],
  },
  {
    title: "旅行日记素材原片",
    medium: "摄影素材",
    year: "2024–2026",
    note: "旅行日记的封面素材库：吉萨金字塔、塔林老城、神庙石柱与热气球日出，全部原片直出。",
    imgs: [photoGiza, photoTallinn, photoSphinx, photoWaterfall, photoHotAir, photoStarburst],
    grad: ["#f5d0fe", "#a21caf"],
    wide: true,
  },
  {
    title: "RoboCon 战队标志",
    medium: "Logo 设计",
    year: "2025",
    note: "为北理工 RoboCon 战队绘制的标志图形，贯穿 T 恤、旗面与物料延展。",
    imgs: [artLogoRobocon],
    grad: ["#fbcfe8", "#be185d"],
  },
  {
    title: "JiaYue × Dylan 联名标志",
    medium: "Logo 设计",
    year: "2025",
    note: "合作联名视觉的定稿标志：字形与图形的平衡，历经多版迭代。",
    imgs: [artLogoJiayue],
    grad: ["#f9a8d4", "#9d174d"],
  },
  {
    title: "字母标志实验「Z」",
    medium: "Logo 设计",
    year: "2025",
    note: "几何拼块构成的字母 Z 标志，带渐变的字母型实验。",
    imgs: [artZlogo],
    grad: ["#fecdd3", "#db2777"],
  },
  {
    title: "水印系统设计",
    medium: "视觉资产",
    year: "2024–2026",
    note: "「Dylan Yeung Photographie.」个人摄影署名水印：光圈图形与字体的组合，用于全部作品输出。",
    imgs: [artWatermark],
    grad: ["#fda4af", "#e11d48"],
  },
  {
    title: "照片色谱长卷",
    medium: "影像实验",
    year: "2025",
    note: "把一段时间拍下的照片按色谱重新排列，摊成属于那个季节的颜色带——共两卷。",
    imgs: [artColorStrip, artColorStrip2],
    grad: ["#f0abfc", "#c026d3"],
  },
  {
    title: "全景图 404 · 像素重构",
    medium: "数字影像",
    year: "2025",
    note: "城市全景接片的像素化实验：当分辨率被主动降级，画面只剩下色彩的秩序。",
    imgs: [artPixelPano],
    grad: ["#f5d0fe", "#a21caf"],
  },
  {
    title: "入党仪式纪念海报",
    medium: "拼贴海报",
    year: "2025",
    note: "把发展大会上的照片拼贴进金色党徽：用视觉的方式，记下这个庄重的时刻。",
    imgs: [artDangjian],
    grad: ["#fda4af", "#be185d"],
  },
  {
    title: "黑白胶卷与暗房冲洗",
    medium: "传统工艺",
    year: "2025.6",
    note: "「传统黑白胶卷摄影与暗房冲洗技术研究」项目：从装卷、显影到放大，亲手走完胶片的完整流程。",
    grad: ["#f9a8d4", "#9d174d"],
  },
];

const shows = [
  { year: "2024.12", title: "第七届「瞭望杯」大学生新媒体文化节", note: "作品获校级一等奖" },
  { year: "2025.4–5", title: "「汲识启航」人文美育系列讲座", note: "西班牙-拉美绘画、现代陶艺、大漆艺术、当代纸艺术、丝绸之路考古共 5 场" },
  { year: "2025.11", title: "北京理工大学 × Thomas 看看世界摄影分享会", note: "与摄影师 Thomas 面对面交流风光摄影" },
];

export function ArtworksPage({ navigate }: { navigate: (route: Route) => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".aw-header h2",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".aw-header", start: "top 78%", end: "top 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".work-card",
        { y: 64, opacity: 0, rotate: (i) => (i % 2 === 0 ? -4 : 4) },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".work-grid", start: "top 82%" },
        },
      );
      gsap.utils.toArray<HTMLElement>(".work-card .work-img").forEach((img, i) => {
        gsap.fromTo(
          img,
          { yPercent: i % 2 === 0 ? -10 : 10 },
          {
            yPercent: i % 2 === 0 ? 10 : -10,
            ease: "none",
            scrollTrigger: { trigger: img.closest(".work-card"), start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
      gsap.from(".show-row", {
        x: -32,
        opacity: 0,
        stagger: 0.14,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".show-list", start: "top 78%" },
      });
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <SectionHero
        eyebrow="WAYS I EXPRESS"
        titleEn="ARTWORKS"
        titleZh="艺术作品"
        desc="这里收录了我 Works 文件夹里的全部作品：战队周边、旅行海报、相册封面、Logo、水印与影像实验。它们大多从具体的生活出发——一次旅行、一个赛季、一本每年更新的相册。"
        theme="artworks"
        stats={[["14", "个作品条目"], ["9", "个系列"], ["50+", "张视觉资产"]]}
      />

      <section className="aw-header relative px-5 py-24 lg:px-8" aria-label="艺术理念">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="display-en text-sm text-stone-400">LIVE · SHOOT · DESIGN</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
            把走过的路，
            <br className="hidden sm:block" />
            做成看得见的东西。
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
            我很少为「艺术」而艺术。多数作品背后都有一个具体的故事：
            一张旅行照片、一个战队赛季、一本每年更新的相册。
            下面是全部 14 个作品条目，每一件都来自真实的生活切片。
          </p>
        </div>
      </section>

      <section className="work-grid relative px-5 pb-24 lg:px-8" aria-label="作品集">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((work, index) => (
            <WorkCard key={work.title} work={work} index={index} />
          ))}
        </div>
      </section>

      <section className="show-list relative border-t border-black/10 bg-white/40 px-5 py-24 lg:px-8" aria-label="作品发表与交流">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center gap-4">
            <Sparkles className="size-6 text-pink-500" aria-hidden="true" />
            <h2 className="display-en text-4xl text-stone-900 md:text-5xl">EXPOSURE<span className="accent-dot">.</span></h2>
          </div>
          <ol className="space-y-4">
            {shows.map((show) => (
              <li key={show.title} className="show-row flex items-start gap-5 rounded-xl border border-black/10 bg-white/80 p-5 transition-colors hover:border-pink-200">
                <span className="display-en text-2xl font-bold text-pink-300">{show.year}</span>
                <div>
                  <h3 className="text-base font-bold text-stone-800">{show.title}</h3>
                  <p className="mt-1 text-sm text-stone-400">{show.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-wrap items-center gap-5 rounded-2xl border border-pink-100 bg-pink-50/70 p-7">
            <Images className="size-8 shrink-0 text-pink-600" aria-hidden="true" />
            <p className="flex-1 text-sm leading-7 text-stone-600">
              下一步计划：把旅行日记的素材整理成一本可印刷的年度摄影集。
            </p>
            <LiquidGlassButton arrow onClick={() => navigate("visual")} className="min-h-11 px-5 text-sm font-semibold">
              看看视觉方案
            </LiquidGlassButton>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="text-sm text-stone-400">第五章 · 艺术作品</p>
          <button onClick={() => navigate("visual")} className="group flex items-center gap-2 text-sm font-semibold text-pink-700 transition-colors hover:text-pink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600">
            下一章 · 视觉方案
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const slots = useCuration().slots;
  const cover = useImgUrl(slots?.[`artworks.works.${index}.cover`], work.imgs?.[0] ?? "");
  return (
    <figure
      data-cursor="ART"
      className={`work-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-900/10 ${
        work.wide ? "sm:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden" aria-hidden="true">
        {cover ? (
          <>
            <img
              src={cover}
              alt={`${work.title} 作品图`}
              loading="lazy"
              className="work-img absolute inset-0 h-[124%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
          </>
        ) : (
          <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(135deg, ${work.grad[0]}, ${work.grad[1]})` }}>
            <Brush className="size-16 text-white/70 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
          </div>
        )}
        <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/90 drop-shadow">{work.medium}</span>
        <span className="absolute bottom-3 right-4 text-xs font-semibold text-white/90 drop-shadow">{work.year}</span>
      </div>
      <figcaption className="p-5">
        <h3 className="text-lg font-bold text-stone-900">{work.title}</h3>
        <p className="mt-3 text-sm leading-6 text-stone-500">{work.note}</p>
        {work.imgs && work.imgs.length > 1 && (
          <div className="mt-4 flex gap-2">
            {work.imgs.slice(1).map((src, i) => (
              <WorkThumb
                key={src}
                slotId={`artworks.works.${index}.img.${i}`}
                fallback={src}
                rotate={i % 2 === 0 ? -2 : 2}
              />
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

function WorkThumb({ slotId, fallback, rotate }: { slotId: string; fallback: string; rotate: number }) {
  const slots = useCuration().slots;
  const src = useImgUrl(slots?.[slotId], fallback);
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="h-12 w-16 shrink-0 rounded-md border border-black/10 object-cover transition-transform duration-300 hover:scale-110"
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}
