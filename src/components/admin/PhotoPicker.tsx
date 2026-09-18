import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, FolderOpen, Images, X } from "lucide-react";
import { photoLocations, type PhotoLocation } from "../../data/photoLocations";
import { coverOf, locationFiles, loadPhotoUrl } from "../../lib/photos";
import { assetFiles, type ImgRef } from "../../lib/curation";

type Props = {
  title: string;
  onPick: (ref: ImgRef) => void;
  onClose: () => void;
  /** 限定某地点的照片（地点封面用） */
  locationId?: string;
};

export function PhotoPicker({ title, onPick, onClose, locationId }: Props) {
  const filesByLoc = useMemo(() => locationFiles(), []);
  const locked = Boolean(locationId);
  const [mode, setMode] = useState<"archive" | "assets">("archive");
  const [loc, setLoc] = useState<PhotoLocation | null>(
    () => photoLocations.find((item) => item.id === locationId) ?? null,
  );
  const [query, setQuery] = useState("");

  const locations = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = photoLocations.filter((item) => (filesByLoc.get(item.id)?.length ?? 0) > 0);
    if (!q) return all;
    return all.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.year.includes(q),
    );
  }, [query, filesByLoc]);

  const files = loc ? filesByLoc.get(loc.id) ?? [] : [];

  const assetsByGroup = useMemo(() => {
    const groups = new Map<string, typeof assetFiles>();
    for (const file of assetFiles) {
      const list = groups.get(file.group);
      if (list) list.push(file);
      else groups.set(file.group, [file]);
    }
    return [...groups.entries()];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      className="fixed inset-0 z-[80] flex flex-col bg-stone-950/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {loc && !locked && (
            <button
              onClick={() => setLoc(null)}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="返回地点列表"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-white">{title}</h2>
            <p className="mt-0.5 text-xs text-stone-400">
              {loc ? `${loc.name} · ${files.length} 张` : "选择要使用的图片"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!locked && !loc && (
            <>
              <TabButton active={mode === "archive"} onClick={() => setMode("archive")}>
                摄影相册
              </TabButton>
              <TabButton active={mode === "assets"} onClick={() => setMode("assets")}>
                素材库
              </TabButton>
            </>
          )}
          <button
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            aria-label="关闭选择器"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 lg:px-8">
        {mode === "assets" && !loc ? (
          <div className="space-y-8">
            {assetsByGroup.map(([group, items]) => (
              <section key={group}>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-300">
                  <FolderOpen className="size-4 text-amber-400" aria-hidden="true" />
                  {group}
                  <span className="text-xs font-normal text-stone-500">{items.length} 个文件</span>
                </h3>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                  {items.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => onPick({ t: "asset", key: item.key })}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      title={item.name}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-2 py-1 text-left text-[10px] font-semibold text-white">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : loc ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {files.map((file) => (
              <ArchiveThumb
                key={file}
                locId={loc.id}
                file={file}
                onClick={() => onPick({ t: "archive", locId: loc.id, file })}
              />
            ))}
          </div>
        ) : (
          <div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索地点（名称 / 年份）…"
              className="mb-5 w-full max-w-md rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
            />
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {locations.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLoc(item)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <img
                    src={coverOf(item.id)}
                    alt={item.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-2 py-1 text-left text-[10px] font-semibold text-white">
                    {item.name}
                    <span className="ml-1 text-stone-400">{filesByLoc.get(item.id)?.length ?? 0}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active ? "bg-amber-400 text-stone-900" : "border border-white/20 text-stone-300 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function ArchiveThumb({
  locId,
  file,
  onClick,
}: {
  locId: string;
  file: string;
  onClick: () => void;
}) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    let alive = true;
    loadPhotoUrl(locId, file)
      .then((resolved) => {
        if (alive) setUrl(resolved);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [locId, file]);
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      title={file}
    >
      {url ? (
        <img
          src={url}
          alt={file}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="grid size-full place-items-center text-stone-300">
          <Images className="size-5 animate-pulse" aria-hidden="true" />
        </span>
      )}
    </button>
  );
}
