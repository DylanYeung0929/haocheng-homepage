import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import type { PhotoLocation } from "../data/photoLocations";
import { filesOfLocation, loadPhotoUrl } from "../lib/photos";

export function PhotoLightbox({
  loc,
  files,
  onClose,
}: {
  loc: PhotoLocation;
  files?: string[];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [urls, setUrls] = useState<Record<number, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [dir, setDir] = useState(1);

  const photos = useMemo(() => files ?? filesOfLocation(loc.id), [files, loc.id]);

  const load = useCallback(
    async (i: number) => {
      if (i < 0 || i >= photos.length || urls[i]) return;
      const url = await loadPhotoUrl(loc.id, photos[i]);
      setUrls((prev) => ({ ...prev, [i]: url }));
      if (i === index) setLoaded(true);
    },
    [photos, urls, index, loc.id],
  );

  useEffect(() => {
    setLoaded(false);
    void load(index);
    void load(index + 1);
    void load(index - 1);
  }, [index, load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => Math.min(photos.length - 1, Math.max(0, i + delta)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex flex-col bg-stone-950/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${loc.name} 照片查看`}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 lg:px-8" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-white">{loc.name}</h2>
          <p className="mt-0.5 text-xs text-stone-400">
            {loc.year} · {photos.length} 张
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="font-mono text-sm text-stone-300">
            {index + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="关闭"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 lg:px-20" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="absolute left-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition-all hover:bg-black/60 disabled:opacity-20 disabled:hover:bg-black/30 lg:left-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="上一张"
        >
          <ChevronLeft className="size-6" />
        </button>
        <div className="relative flex h-full w-full items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={index}
              src={urls[index]}
              alt={`${loc.name} 照片 ${index + 1}`}
              initial={{ opacity: 0, x: 28 * dir }}
              animate={{ opacity: loaded ? 1 : 0, x: 0 }}
              exit={{ opacity: 0, x: -28 * dir }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onLoad={() => setLoaded(true)}
              className="max-h-[78dvh] max-w-full rounded-lg object-contain shadow-2xl"
              draggable={false}
            />
          </AnimatePresence>
          {!loaded && (
            <div className="absolute grid place-items-center text-stone-500">
              <Images className="size-10 animate-pulse" />
            </div>
          )}
        </div>
        <button
          onClick={() => go(1)}
          disabled={index === photos.length - 1}
          className="absolute right-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition-all hover:bg-black/60 disabled:opacity-20 disabled:hover:bg-black/30 lg:right-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="下一张"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </motion.div>
  );
}
