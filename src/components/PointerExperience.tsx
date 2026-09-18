import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

export function PointerExperience() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 520, damping: 34, mass: 0.35 });
  const y = useSpring(pointerY, { stiffness: 520, damping: 34, mass: 0.35 });
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () =>
      setEnabled(finePointer.matches && !reducedMotion.matches);
    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      const zone = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      const next = zone?.dataset.cursor ?? "";
      setLabel((current) => (current === next ? current : next));
    };
    const leave = () => setLabel("");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [pointerX, pointerY]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-800 mix-blend-difference"
        style={{ x: pointerX, y: pointerY }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-white/10 text-[9px] font-medium tracking-[.16em] text-stone-800 backdrop-blur-[2px]"
        style={{ x, y }}
        animate={{
          width: label ? 76 : 28,
          height: label ? 76 : 28,
          borderColor: label ? "rgba(139,92,246,.72)" : "rgba(41,37,36,.35)",
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
