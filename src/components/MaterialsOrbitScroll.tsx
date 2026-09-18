import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCuration, useImgUrl } from "../lib/curation";
import matLayer8 from "../assets/works/materials/图层 8.png";
import matRobotBody from "../assets/works/materials/robot-body.png";
import matKuma from "../assets/works/materials/库犸科技.png";
import matEsun from "../assets/works/materials/eSun-Logo.png";
import matBit from "../assets/works/materials/BIT ROBOCON 拷贝 3.png";
import matVariant from "../assets/works/materials/variant-magenta.png";
import product from "../assets/works/quad/tshirt-quad.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const items = [
  { src: matLayer8, label: "主体插画" },
  { src: matRobotBody, label: "机器人实拍" },
  { src: matKuma, label: "库犸科技" },
  { src: matEsun, label: "eSUN 易生" },
  { src: matBit, label: "BIT ROBOCON" },
  { src: matVariant, label: "配色变体" },
];

export function MaterialsOrbitScroll() {
  const root = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const productSrc = useImgUrl(useCuration().slots?.["visual.orbit.product"], product);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const radius = () => Math.min(300, (ring.current?.clientWidth ?? 640) * 0.3);
      const place = () => {
        const r = radius();
        gsap.utils.toArray<HTMLElement>(".orbit-item").forEach((el, index) => {
          const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
          gsap.set(el, { x: Math.cos(angle) * r, y: Math.sin(angle) * r, xPercent: -50, yPercent: -50 });
        });
      };
      place();
      window.addEventListener("resize", place);

      if (reduced) {
        gsap.set(".orbit-item", { opacity: 0 });
        gsap.set(".orbit-product", { opacity: 1, scale: 1 });
        gsap.set(".orbit-title", { opacity: 1 });
        gsap.set(".orbit-note", { opacity: 1 });
        return;
      }
      const spin = gsap.timeline({ repeat: -1, defaults: { duration: 34, ease: "none" } });
      spin.to(".orbit-ring", { rotation: 360 }, 0);
      spin.to(".orbit-item", { rotation: -360 }, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=170%",
          scrub: 0.6,
          pin: true,
        },
      });
      tl.to(".orbit-item", { x: 0, y: 0, scale: 0.22, ease: "power1.in", stagger: 0.04, duration: 0.9 }, 0.05);
      tl.to(".orbit-item", { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.52);
      tl.fromTo(".orbit-product", { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.4);
      tl.fromTo(".orbit-title", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.56);
      tl.fromTo(".orbit-note", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.68);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden border-t border-black/10 bg-white/60" aria-label="从素材到成品" data-cursor="SCROLL">
      <div className="grid min-h-dvh items-center gap-10 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <div className="order-2 lg:order-1">
          <p className="display-en text-sm text-orange-600">MATERIALS → DESIGN</p>
          <h2 className="display-en mt-4 text-5xl leading-[.95] text-stone-900 md:text-6xl">
            FROM PARTS
            <br />
            TO PIECE<span className="accent-dot">.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-base font-medium leading-8 text-stone-500">
            一件 T 恤纹样，由插画图层、战队标志与赞助商元素层层构成。
            它们平时各自旋转在轨道上——向下滚动，看它们如何组合成最终的成品。
          </p>
          <div className="orbit-title mt-8 rounded-2xl border border-orange-100 bg-orange-50/80 p-5 opacity-0">
            <h3 className="text-lg font-bold text-stone-900">四足机器人战队 T 恤设计</h3>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              为 Robocon 战队设计的参赛周边：以四足机器人为核心图形，
              融合战队与赞助商元素，共输出 11 套配色方案。
            </p>
          </div>
        </div>
        <div ref={ring} className="relative order-1 aspect-square w-full max-w-[640px] justify-self-center lg:order-2">
          <div className="orbit-ring absolute inset-0">
            {items.map((item, index) => (
              <OrbitItem key={item.label} item={item} index={index} />
            ))}
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="orbit-product size-[72%] rounded-2xl border border-black/10 bg-white/85 p-4 opacity-0 shadow-2xl shadow-orange-900/10">
              <img src={productSrc} alt="四足机器人 T 恤设计成品" className="size-full object-contain" />
            </div>
          </div>
          <p className="orbit-note pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-[.14em] text-stone-400 opacity-0">
            向下滚动 · 组合成品
          </p>
        </div>
      </div>
    </section>
  );
}

function OrbitItem({ item, index }: { item: (typeof items)[number]; index: number }) {
  const slots = useCuration().slots;
  const src = useImgUrl(slots?.[`visual.orbit.item.${index}`], item.src);
  return (
    <div className="orbit-item absolute left-1/2 top-1/2 w-32" aria-hidden="true">
      <img
        src={src}
        alt=""
        draggable={false}
        className="mx-auto max-h-24 w-auto max-w-32 rounded-lg border border-black/10 bg-white/90 object-contain p-2 shadow-lg shadow-stone-900/10"
      />
    </div>
  );
}
