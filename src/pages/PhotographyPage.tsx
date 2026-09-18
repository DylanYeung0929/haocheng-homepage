import { useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Camera, CalendarDays, Images, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Route } from "../types";
import { SectionHero } from "../components/SectionHero";
import { PhotoLightbox } from "../components/PhotoLightbox";
import { photoLocations, type PhotoLocation } from "../data/photoLocations";
import { useCuration, useImgUrl, type ImgRef } from "../lib/curation";
import { locationFiles } from "../lib/photos";
import gearA7r4 from "../assets/gear/sony-a7r4.jpg";
import gear70200gm2 from "../assets/gear/sony-70200gm2.jpg";
import gear70200g from "../assets/gear/sony-70200g.jpg";
import gear2470 from "../assets/gear/sigma-2470-art.jpg";
import gear60600 from "../assets/gear/sigma-60-600.jpg";
import gear3512 from "../assets/gear/sigma-35-12.jpg";
import gear15fisheye from "../assets/gear/sigma-15-fisheye.jpg";
import gearMavic3Pro from "../assets/gear/dji-mavic3pro.jpg";
import gearMavic4Pro from "../assets/gear/dji-mavic4pro.jpg";
import gearMini5Pro from "../assets/gear/dji-mini5pro.jpg";
import gearLunaUltra from "../assets/gear/insta-luna-ultra.jpg";
import gearX5 from "../assets/gear/insta-x5.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const coverModules = import.meta.glob("../assets/photo-covers/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const coverOf = (id: string) => coverModules[`../assets/photo-covers/${id}.jpg`] ?? "";

const formatDate = (date: string) => (date.length === 8 ? `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}` : date);

const gearGroups = [
  {
    title: "机身与镜头",
    en: "CAMERAS & LENSES",
    items: [
      { img: gearA7r4, name: "索尼 α7R IV（ILCE-7RM4）", note: "6100 万像素全画幅，高画质主力机身" },
      { img: gear70200gm2, name: "索尼 FE 70-200mm F2.8 GM OSS II（SEL70200GM2）", note: "第二代大师级远摄变焦，更快更轻" },
      { img: gear70200g, name: "索尼 FE 70-200mm F4 G OSS（SEL70200G）", note: "恒定 F4 远摄变焦，轻装出行" },
      { img: gear2470, name: "适马 24-70mm F2.8 DG DN | Art", note: "E 卡口标准变焦，第一代 Art" },
      { img: gear60600, name: "适马 60-600mm F4.5-6.3 DG DN OS | Sports", note: "10 倍超远摄变焦，一镜到底" },
      { img: gear3512, name: "适马 35mm F1.2 DG DN | Art", note: "F1.2 超大光圈定焦，极致虚化" },
      { img: gear15fisheye, name: "适马 15mm F1.4 DG DN Diagonal Fisheye | Art", note: "对角线鱼眼，星空与全景创意视角" },
    ],
  },
  {
    title: "无人机",
    en: "DRONES",
    items: [
      { img: gearMavic3Pro, name: "大疆 DJI Mavic 3 Pro", note: "哈苏三摄旗舰航拍，多焦段创作" },
      { img: gearMavic4Pro, name: "大疆 DJI Mavic 4 Pro", note: "新一代三摄旗舰，一亿像素照片" },
      { img: gearMini5Pro, name: "大疆 DJI Mini 5 Pro", note: "249g 级迷你旗舰，1 英寸主摄" },
    ],
  },
  {
    title: "运动相机",
    en: "ACTION CAMS",
    items: [
      { img: gearLunaUltra, name: "影石 Insta360 Luna Ultra", note: "与徕卡联合研发的双摄云台相机" },
      { img: gearX5, name: "影石 Insta360 X5", note: "8K 全景运动相机" },
    ],
  },
];

export function PhotographyPage({ navigate }: { navigate: (route: Route) => void }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<PhotoLocation | null>(null);
  const curation = useCuration();
  const filesByLoc = useMemo(() => locationFiles(), []);
  const hiddenLocs = useMemo(() => new Set(curation.locHidden ?? []), [curation]);
  const locations = useMemo(
    () => photoLocations.filter((loc) => !hiddenLocs.has(loc.id)),
    [hiddenLocs],
  );
  const totalPhotos = useMemo(() => locations.reduce((sum, loc) => sum + loc.count, 0), [locations]);
  const years = useMemo(() => [...new Set(locations.map((loc) => loc.year))].sort().reverse(), [locations]);
  const byYear = useMemo(
    () => years.map((year) => ({ year, items: locations.filter((loc) => loc.year === year) })),
    [years, locations],
  );
  const visibleFiles = (loc: PhotoLocation) => {
    const all = filesByLoc.get(loc.id) ?? [];
    const hidden = curation.photoHidden?.[loc.id];
    return hidden?.length ? all.filter((file) => !hidden.includes(file)) : all;
  };
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".ph-header h2",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".ph-header", start: "top 78%", end: "top 45%", scrub: 0.6 },
        },
      );
      gsap.utils.toArray<HTMLElement>(".ph-year").forEach((section) => {
        gsap.fromTo(
          section.querySelector(".ph-year-head"),
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 80%" },
          },
        );
        gsap.fromTo(
          section.querySelectorAll(".photo-loc-card"),
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 82%" },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".gear-group").forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll(".gear-card"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 82%" },
          },
        );
      });
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <SectionHero
        eyebrow="LIGHT AND SHADOW"
        titleEn="PHOTOGRAPHY"
        titleZh="摄影作品"
        desc="从 2021 年到今天，每一次快门都留下一个地点。这里按年份收录了全部整理成片的摄影作品——点开任意地点，即可翻阅那里的全部照片。"
        theme="photography"
        stats={[[`${locations.length}`, "个地点"], [`${totalPhotos}`, "张成片"], ["6", "年光影"]]}
      />

      <section className="ph-header relative px-5 py-24 lg:px-8" aria-label="摄影理念">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="display-en text-sm text-stone-400">SEE · WAIT · CAPTURE</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
            好照片不是拍出来的，
            <br className="hidden sm:block" />
            是等出来的。
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
            下面按年份收录了 {locations.length} 个地点、{totalPhotos} 张调整后的成片——
            从北京的清晨到复活节岛的黄昏，从校园活动到洲际旅行。
            点开一个地点，就是打开一段完整的记录。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            {years.map((year) => (
              <a key={year} href={`#ph-year-${year}`} className="rounded-full border border-amber-200 bg-amber-50/80 px-4 py-2 text-amber-700 transition-colors hover:bg-amber-100">
                {year}
              </a>
            ))}
          </div>
        </div>
      </section>

      {byYear.map(({ year, items }) => (
        <section key={year} id={`ph-year-${year}`} className="ph-year relative scroll-mt-24 px-5 pb-20 lg:px-8" aria-label={`${year} 年摄影作品`}>
          <div className="mx-auto max-w-7xl">
            <div className="ph-year-head mb-8 flex items-end justify-between gap-4 border-b border-black/10 pb-5">
              <h2 className="display-en text-4xl text-stone-900 md:text-5xl">{year}<span className="accent-dot">.</span></h2>
              <p className="pb-1 text-sm font-semibold text-stone-400">{items.length} 个地点 · {items.reduce((s, l) => s + visibleFiles(l).length, 0)} 张照片</p>
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((loc) => (
                <LocationCard
                  key={loc.id}
                  loc={loc}
                  cover={curation.locCovers?.[loc.id]}
                  count={visibleFiles(loc).length}
                  onOpen={() => setActive(loc)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="relative border-t border-black/10 bg-white/40 px-5 py-24 lg:px-8" aria-label="常用器材">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center gap-4">
            <Camera className="size-6 text-amber-500" aria-hidden="true" />
            <h2 className="display-en text-4xl text-stone-900 md:text-5xl">MY GEAR<span className="accent-dot">.</span></h2>
          </div>
          <p className="mb-14 max-w-2xl text-sm leading-7 text-stone-400">
            十二件器材，按用途排列——从 6100 万像素机身到 8K 全景相机。
          </p>
          <div className="space-y-14">
            {gearGroups.map((group) => (
              <div key={group.title} className="gear-group">
                <div className="mb-6 flex items-baseline gap-3">
                  <h3 className="text-lg font-bold text-stone-900">{group.title}</h3>
                  <span className="display-en text-xs tracking-[.16em] text-stone-400">{group.en}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="gear-card group overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/5"
                    >
                      <div className="grid aspect-square place-items-center bg-gradient-to-br from-amber-50/70 via-white to-white p-6">
                        <img
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="border-t border-black/5 px-4 py-3.5">
                        <h4 className="text-sm font-bold leading-snug text-stone-900">{item.name}</h4>
                        <p className="mt-1.5 text-xs leading-5 text-stone-500">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-14 text-sm leading-7 text-stone-400">
            器材只是工具，真正的器材是眼睛。但如果一定要说——先拍起来，比用什么拍更重要。
          </p>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="text-sm text-stone-400">第二章 · 摄影作品</p>
          <button onClick={() => navigate("projects")} className="group flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
            下一章 · 项目经历
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>

      <AnimatePresence>
        {active && <PhotoLightbox loc={active} files={visibleFiles(active)} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </main>
  );
}

function LocationCard({
  loc,
  cover,
  count,
  onOpen,
}: {
  loc: PhotoLocation;
  cover?: ImgRef;
  count: number;
  onOpen: () => void;
}) {
  const src = useImgUrl(cover, coverOf(loc.id));
  return (
    <button
      data-cursor="VIEW"
      onClick={onOpen}
      className="photo-loc-card group relative overflow-hidden rounded-xl border border-black/10 bg-white/85 text-left shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:z-10 hover:shadow-xl hover:shadow-amber-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      aria-label={`查看 ${loc.name} 的照片`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={`${loc.name} 封面`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
        <span className="absolute bottom-3 left-4 right-4 truncate text-sm font-bold text-white drop-shadow">{loc.name}</span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          <Images className="size-3" aria-hidden="true" />
          {count}
        </span>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {formatDate(loc.date) || loc.year}
        </span>
        <span className="text-xs font-semibold text-amber-600 transition-transform duration-300 group-hover:translate-x-0.5">翻开 →</span>
      </div>
    </button>
  );
}
