import type { ButtonHTMLAttributes, PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  arrow?: boolean;
};

export function LiquidGlassButton({ className, children, arrow = false, onPointerMove, ...props }: Props) {
  const trackLight = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  };

  return (
    <button
      {...props}
      onPointerMove={trackLight}
      className={cn("liquid-button group", className)}
    >
      <span className="liquid-button__wash" aria-hidden="true" />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
        {arrow ? <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /> : null}
      </span>
    </button>
  );
}
