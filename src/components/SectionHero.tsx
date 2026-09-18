import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { themes } from "../lib/themes";

type Props = {
  eyebrow: string;
  titleEn: string;
  titleZh: string;
  desc: string;
  theme: keyof typeof themes;
  stats?: [string, string][];
  children?: ReactNode;
};

export function SectionHero({ eyebrow, titleEn, titleZh, desc, theme, stats, children }: Props) {
  const t = themes[theme];
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
    },
    { scope: root },
  );
  return (
    <section ref={root} className="relative isolate min-h-[92dvh] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background: `radial-gradient(52rem 30rem at 82% -8%, ${t.gradFrom}26, transparent 62%), radial-gradient(40rem 26rem at 6% 104%, ${t.gradTo}2e, transparent 60%)`,
        }}
      />
      <div className="relative mx-auto grid min-h-[92dvh] max-w-7xl items-center gap-12 px-5 pb-16 pt-28 lg:px-8">
        <div className="max-w-3xl">
          <p className={`display-en hero-detail mb-5 text-sm ${t.text}`}>
            {eyebrow}
          </p>
          <h1 className="display-en text-balance text-6xl leading-[.9] text-stone-900 lg:text-8xl xl:text-9xl">
            <span className="hero-line block">{titleEn}<span className="accent-dot">.</span></span>
          </h1>
          <p className="hero-line mt-6 text-2xl font-semibold tracking-[.06em] text-stone-700">{titleZh}</p>
          <p className="hero-detail mt-7 max-w-xl text-pretty text-base font-semibold leading-8 text-stone-500">
            {desc}
          </p>
          {stats ? (
            <ul className={`hero-detail mt-12 grid max-w-xl grid-cols-3 gap-5 border-t ${t.border} pt-7`}>
              {stats.map(([num, label]) => (
                <li key={label}>
                  <strong className={`block text-3xl font-bold ${t.text}`}>{num}</strong>
                  <span className="mt-1 block text-xs text-stone-400">{label}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
