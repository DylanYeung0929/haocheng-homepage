import type { ThemeColor } from "../types";

export const themes = {
  footprints: {
    name: "青蓝",
    text: "text-cyan-700",
    softBg: "bg-cyan-100/70",
    border: "border-cyan-200",
    gradFrom: "#06b6d4",
    gradTo: "#3b82f6",
  },
  photography: {
    name: "琥珀",
    text: "text-amber-700",
    softBg: "bg-amber-100/70",
    border: "border-amber-200",
    gradFrom: "#f59e0b",
    gradTo: "#f97316",
  },
  projects: {
    name: "紫罗兰",
    text: "text-violet-700",
    softBg: "bg-violet-100/70",
    border: "border-violet-200",
    gradFrom: "#8b5cf6",
    gradTo: "#6366f1",
  },
  research: {
    name: "翡翠绿",
    text: "text-emerald-700",
    softBg: "bg-emerald-100/70",
    border: "border-emerald-200",
    gradFrom: "#10b981",
    gradTo: "#14b8a6",
  },
  artworks: {
    name: "品红",
    text: "text-pink-700",
    softBg: "bg-pink-100/70",
    border: "border-pink-200",
    gradFrom: "#ec4899",
    gradTo: "#f43f5e",
  },
  visual: {
    name: "橙黄",
    text: "text-orange-700",
    softBg: "bg-orange-100/70",
    border: "border-orange-200",
    gradFrom: "#f97316",
    gradTo: "#eab308",
  },
} as const satisfies Record<string, ThemeColor>;
