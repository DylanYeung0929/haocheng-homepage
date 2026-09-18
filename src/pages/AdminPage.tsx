import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Images,
  LayoutGrid,
  Loader2,
  Lock,
  LogOut,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { featured, type FeaturedItem } from "./HomePage";
import { photoLocations, type PhotoLocation } from "../data/photoLocations";
import { coverOf, filesOfLocation, loadPhotoUrl } from "../lib/photos";
import { checkSession, login, logout, saveCuration, useCuration, useImgUrl } from "../lib/curation";
import type { Curation, ImgRef } from "../lib/curation";
import { slotGroups, type SlotDef } from "../lib/slots";
import { PhotoPicker } from "../components/admin/PhotoPicker";

type TabId = "home" | "covers" | "photos" | "slots";
type Toast = { kind: "ok" | "error"; msg: string };
type PickerState =
  | { kind: "featured"; item: FeaturedItem }
  | { kind: "cover"; loc: PhotoLocation }
  | { kind: "slot"; slot: SlotDef };

const tabs: { id: TabId; label: string; icon: typeof LayoutGrid }[] = [
  { id: "home", label: "首页精选", icon: LayoutGrid },
  { id: "covers", label: "地点封面", icon: ImageIcon },
  { id: "photos", label: "照片筛选", icon: SlidersHorizontal },
  { id: "slots", label: "页面配图", icon: Sparkles },
];

export function AdminPage() {
  const curation = useCuration();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<TabId>("home");
  const [toast, setToast] = useState<Toast | null>(null);
  const [saving, setSaving] = useState(false);
  const [picker, setPicker] = useState<PickerState | null>(null);

  useEffect(() => {
    let alive = true;
    void checkSession().then((ok) => {
      if (alive) setAuthed(ok);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const update = async (mutate: (draft: Curation) => void, msg: string) => {
    const draft = JSON.parse(JSON.stringify(curation)) as Curation;
    mutate(draft);
    setSaving(true);
    const res = await saveCuration(draft);
    setSaving(false);
    setToast(res.ok ? { kind: "ok", msg } : { kind: "error", msg: res.error ?? "保存失败" });
  };

  const handlePick = (ref: ImgRef) => {
    if (!picker) return;
    if (picker.kind === "featured") {
      const key = `home.featured.${picker.item.id}`;
      void update((draft) => {
        draft.slots = { ...(draft.slots ?? {}), [key]: ref };
      }, "已保存，公开页刷新即生效");
    } else if (picker.kind === "slot") {
      const { slot } = picker;
      void update((draft) => {
        draft.slots = { ...(draft.slots ?? {}), [slot.id]: ref };
      }, `已更新「${slot.label}」`);
    } else {
      const { loc } = picker;
      void update((draft) => {
        draft.locCovers = { ...(draft.locCovers ?? {}), [loc.id]: ref };
      }, `已更新「${loc.name}」封面`);
    }
    setPicker(null);
  };

  if (authed === null) {
    return (
      <main className="grid min-h-dvh place-items-center text-sm text-stone-400">
        <Loader2 className="size-6 animate-spin" aria-label="正在检查登录状态" />
      </main>
    );
  }

  if (!authed) {
    return <LoginGate onAuthed={() => setAuthed(true)} />;
  }

  return (
    <main className="min-h-dvh pb-24">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#faf7f2]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Lock className="size-5 text-amber-500" aria-hidden="true" />
            <div>
              <h1 className="text-base font-bold text-stone-900">照片策展后台</h1>
              <p className="text-xs text-stone-400">
                {saving ? "保存中…" : "改动即时生效，无需重新部署"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#home"
              className="rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:bg-white"
            >
              查看主页
            </a>
            <button
              onClick={() => {
                void logout().then(() => setAuthed(false));
              }}
              className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:bg-white"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              退出登录
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-5 pb-3 lg:px-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                tab === item.id
                  ? "bg-stone-900 text-white"
                  : "border border-black/10 bg-white/70 text-stone-500 hover:bg-white"
              }`}
            >
              <item.icon className="size-3.5" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        {tab === "home" && (
          <section className="space-y-4" aria-label="首页精选图">
            <p className="text-sm leading-7 text-stone-500">
              首页「精选」四张卡片。没有自定义的项目继续使用原始配图或渐变占位。
            </p>
            {featured.map((item) => (
              <FeaturedRow
                key={item.id}
                item={item}
                override={curation.slots?.[`home.featured.${item.id}`]}
                onPick={() => setPicker({ kind: "featured", item })}
                onReset={() =>
                  void update((draft) => {
                    if (draft.slots) delete draft.slots[`home.featured.${item.id}`];
                  }, "已恢复默认图")
                }
              />
            ))}
          </section>
        )}

        {tab === "covers" && <CoversTab curation={curation} update={update} setPicker={setPicker} />}

        {tab === "photos" && <PhotosTab curation={curation} update={update} />}

        {tab === "slots" && <SlotsTab curation={curation} update={update} setPicker={setPicker} />}
      </div>

      <AnimatePresence>
        {picker && (
          <PhotoPicker
            title={
              picker.kind === "featured"
                ? `选择「${picker.item.title}」的图片`
                : picker.kind === "cover"
                  ? `选择「${picker.loc.name}」的封面`
                  : `选择「${picker.slot.label}」的图片`
            }
            locationId={picker.kind === "cover" ? picker.loc.id : undefined}
            onPick={handlePick}
            onClose={() => setPicker(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className={`fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg ${
              toast.kind === "ok" ? "bg-stone-900 text-white" : "bg-red-600 text-white"
            }`}
            role="status"
          >
            {toast.kind === "ok" ? (
              <Check className="size-4 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function LoginGate({ onAuthed }: { onAuthed: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError("");
    const res = await login(password);
    setBusy(false);
    if (res.ok) onAuthed();
    else setError(res.error ?? "登录失败");
  };

  return (
    <main className="grid min-h-dvh place-items-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-black/10 bg-white/85 p-8 shadow-xl shadow-stone-900/5 backdrop-blur"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-amber-100">
            <Lock className="size-5 text-amber-600" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-base font-bold text-stone-900">照片策展后台</h1>
            <p className="text-xs text-stone-400">请输入管理口令</p>
          </div>
        </div>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoFocus
          placeholder="管理口令"
          className="mt-6 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-stone-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
        />
        {error && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600" role="alert">
            <AlertCircle className="size-3.5" aria-hidden="true" />
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-stone-700 disabled:opacity-40"
        >
          {busy && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          登录
        </button>
      </form>
    </main>
  );
}

function FeaturedRow({
  item,
  override,
  onPick,
  onReset,
}: {
  item: FeaturedItem;
  override?: ImgRef;
  onPick: () => void;
  onReset: () => void;
}) {
  const src = useImgUrl(override, item.img ?? "");
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white/85 p-4">
      <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-amber-50/60">
        {src ? (
          <img src={src} alt={item.title} className="size-full object-cover" />
        ) : (
          <item.Icon className="size-8 text-amber-400" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-stone-900">{item.title}</p>
        <p className="mt-0.5 truncate text-xs text-stone-400">
          {item.tag} · 槽位 home.featured.{item.id}
        </p>
        <p className={`mt-1 text-xs font-semibold ${override ? "text-amber-600" : "text-stone-400"}`}>
          {override ? "使用自定义图片" : "使用默认图片"}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <button
          onClick={onPick}
          className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-amber-600"
        >
          选择图片
        </button>
        {override && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold text-stone-500 transition-colors hover:bg-stone-50"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            恢复默认
          </button>
        )}
      </div>
    </div>
  );
}

function CoversTab({
  curation,
  update,
  setPicker,
}: {
  curation: Curation;
  update: (mutate: (draft: Curation) => void, msg: string) => Promise<void>;
  setPicker: (state: PickerState) => void;
}) {
  const [query, setQuery] = useState("");
  const hidden = useMemo(() => new Set(curation.locHidden ?? []), [curation.locHidden]);
  const locations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photoLocations;
    return photoLocations.filter(
      (loc) => loc.name.toLowerCase().includes(q) || loc.year.includes(q),
    );
  }, [query]);
  const hiddenLocs = useMemo(
    () => photoLocations.filter((loc) => hidden.has(loc.id)),
    [hidden],
  );

  const setHidden = (loc: PhotoLocation, value: boolean) =>
    void update(
      (draft) => {
        const list = new Set(draft.locHidden ?? []);
        if (value) list.add(loc.id);
        else list.delete(loc.id);
        draft.locHidden = [...list];
      },
      value ? `已隐藏「${loc.name}」` : `已恢复「${loc.name}」`,
    );

  return (
    <section className="space-y-5" aria-label="地点封面管理">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-7 text-stone-500">
          替换地点封面，或隐藏整个地点（公开页不再显示）。共 {photoLocations.length} 个地点。
        </p>
        <label className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2">
          <Search className="size-3.5 text-stone-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索地点"
            className="w-40 bg-transparent text-xs text-stone-700 placeholder:text-stone-400 focus:outline-none"
          />
        </label>
      </div>

      {hiddenLocs.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
          <p className="text-xs font-bold text-amber-800">
            已隐藏 {hiddenLocs.length} 个地点
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {hiddenLocs.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setHidden(loc, false)}
                className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
              >
                <EyeOff className="size-3" aria-hidden="true" />
                {loc.name}
                <span className="text-amber-500">恢复</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {locations.map((loc) => (
          <CoverCard
            key={loc.id}
            loc={loc}
            override={curation.locCovers?.[loc.id]}
            hidden={hidden.has(loc.id)}
            onPick={() => setPicker({ kind: "cover", loc })}
            onReset={() =>
              void update((draft) => {
                if (draft.locCovers) delete draft.locCovers[loc.id];
              }, `已恢复「${loc.name}」默认封面`)
            }
            onToggleHidden={() => setHidden(loc, !hidden.has(loc.id))}
          />
        ))}
      </div>
    </section>
  );
}

function CoverCard({
  loc,
  override,
  hidden,
  onPick,
  onReset,
  onToggleHidden,
}: {
  loc: PhotoLocation;
  override?: ImgRef;
  hidden: boolean;
  onPick: () => void;
  onReset: () => void;
  onToggleHidden: () => void;
}) {
  const src = useImgUrl(override, coverOf(loc.id));
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white/85 ${hidden ? "border-amber-300 opacity-70" : "border-black/10"}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={src}
          alt={`${loc.name} 封面`}
          loading="lazy"
          className={`size-full object-cover ${hidden ? "grayscale" : ""}`}
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {loc.year} · {loc.count} 张
        </span>
        {override && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
            自定义
          </span>
        )}
      </div>
      <div className="space-y-2 px-3 py-3">
        <p className="truncate text-xs font-bold text-stone-900">{loc.name}</p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={onPick}
            className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-amber-600"
          >
            选封面
          </button>
          {override && (
            <button
              onClick={onReset}
              className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold text-stone-500 transition-colors hover:bg-stone-50"
            >
              恢复默认
            </button>
          )}
          <button
            onClick={onToggleHidden}
            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
              hidden
                ? "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                : "border-black/10 text-stone-500 hover:bg-stone-50"
            }`}
          >
            {hidden ? (
              <Eye className="size-3" aria-hidden="true" />
            ) : (
              <EyeOff className="size-3" aria-hidden="true" />
            )}
            {hidden ? "取消隐藏" : "隐藏"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SlotsTab({
  curation,
  update,
  setPicker,
}: {
  curation: Curation;
  update: (mutate: (draft: Curation) => void, msg: string) => Promise<void>;
  setPicker: (state: PickerState) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const groups = useMemo(
    () =>
      slotGroups
        .map((group) => ({
          title: group.title,
          slots: q
            ? group.slots.filter(
                (slot) => slot.label.toLowerCase().includes(q) || slot.id.includes(q),
              )
            : group.slots,
        }))
        .filter((group) => group.slots.length > 0),
    [q],
  );
  const total = slotGroups.reduce((sum, group) => sum + group.slots.length, 0);

  return (
    <section className="space-y-5" aria-label="其他页面配图">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-7 text-stone-500">
          项目 / 科研 / 艺术 / 视觉页共 {total} 个配图槽位，替换后公开页刷新即生效。
        </p>
        <label className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2">
          <Search className="size-3.5 text-stone-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="筛选槽位"
            className="w-40 bg-transparent text-xs text-stone-700 placeholder:text-stone-400 focus:outline-none"
          />
        </label>
      </div>
      {groups.map((group) => (
        <div key={group.title} className="rounded-2xl border border-black/10 bg-white/85 p-5">
          <h3 className="mb-3 flex items-baseline gap-2 text-sm font-bold text-stone-900">
            {group.title}
            <span className="text-xs font-semibold text-stone-400">{group.slots.length} 个槽位</span>
          </h3>
          <div className="space-y-2">
            {group.slots.map((slot) => (
              <SlotRow
                key={slot.id}
                slot={slot}
                override={curation.slots?.[slot.id]}
                onPick={() => setPicker({ kind: "slot", slot })}
                onReset={() =>
                  void update((draft) => {
                    if (draft.slots) delete draft.slots[slot.id];
                  }, `已恢复「${slot.label}」默认图`)
                }
              />
            ))}
          </div>
        </div>
      ))}
      {groups.length === 0 && (
        <p className="py-12 text-center text-sm text-stone-400">没有匹配的槽位</p>
      )}
    </section>
  );
}

function SlotRow({
  slot,
  override,
  onPick,
  onReset,
}: {
  slot: SlotDef;
  override?: ImgRef;
  onPick: () => void;
  onReset: () => void;
}) {
  const src = useImgUrl(override, "");
  return (
    <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white/70 px-3 py-2">
      <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-stone-100 text-stone-300">
        {src ? (
          <img src={src} alt="" className="size-full object-cover" />
        ) : (
          <ImageIcon className="size-4" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-stone-800">{slot.label}</p>
        <p className="truncate font-mono text-[10px] text-stone-400">{slot.id}</p>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
          override ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-400"
        }`}
      >
        {override ? "自定义" : "默认"}
      </span>
      <button
        onClick={onPick}
        className="shrink-0 rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-amber-600"
      >
        选择图片
      </button>
      {override && (
        <button
          onClick={onReset}
          className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold text-stone-500 transition-colors hover:bg-stone-50"
        >
          恢复默认
        </button>
      )}
    </div>
  );
}

function PhotosTab({
  curation,
  update,
}: {
  curation: Curation;
  update: (mutate: (draft: Curation) => void, msg: string) => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [openLoc, setOpenLoc] = useState<string | null>(null);
  const locations = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = photoLocations;
    if (!q) return base;
    return base.filter((loc) => loc.name.toLowerCase().includes(q) || loc.year.includes(q));
  }, [query]);

  const toggles = (loc: PhotoLocation, file: string, hide: boolean) =>
    void update(
      (draft) => {
        const current = new Set(draft.photoHidden?.[loc.id] ?? []);
        if (hide) current.add(file);
        else current.delete(file);
        draft.photoHidden = { ...(draft.photoHidden ?? {}), [loc.id]: [...current] };
      },
      hide ? "已隐藏该照片" : "已恢复该照片",
    );

  return (
    <section className="space-y-4" aria-label="地点内照片筛选">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-7 text-stone-500">
          展开一个地点，点击照片即可隐藏 / 恢复。隐藏的照片不会出现在公开页与灯箱中。
        </p>
        <label className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2">
          <Search className="size-3.5 text-stone-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索地点"
            className="w-40 bg-transparent text-xs text-stone-700 placeholder:text-stone-400 focus:outline-none"
          />
        </label>
      </div>
      <div className="space-y-2">
        {locations.map((loc) => {
          const hiddenFiles = curation.photoHidden?.[loc.id] ?? [];
          const open = openLoc === loc.id;
          return (
            <div key={loc.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white/85">
              <button
                onClick={() => setOpenLoc(open ? null : loc.id)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                aria-expanded={open}
              >
                <ChevronDown
                  className={`size-4 shrink-0 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-stone-900">{loc.name}</span>
                <span className="shrink-0 text-xs text-stone-400">{loc.year} · {loc.count} 张</span>
                {hiddenFiles.length > 0 && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                    隐藏 {hiddenFiles.length}
                  </span>
                )}
              </button>
              {open && (
                <LocPhotoGrid
                  locId={loc.id}
                  hidden={hiddenFiles}
                  onToggle={(file, hide) => toggles(loc, file, hide)}
                />
              )}
            </div>
          );
        })}
        {locations.length === 0 && (
          <p className="py-12 text-center text-sm text-stone-400">没有匹配的地点</p>
        )}
      </div>
    </section>
  );
}

function LocPhotoGrid({
  locId,
  hidden,
  onToggle,
}: {
  locId: string;
  hidden: string[];
  onToggle: (file: string, hide: boolean) => void;
}) {
  const hiddenSet = useMemo(() => new Set(hidden), [hidden]);
  const files = useMemo(() => filesOfLocation(locId), [locId]);
  return (
    <div className="border-t border-black/5 p-4">
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {files.map((file) => (
          <PhotoTile
            key={file}
            locId={locId}
            file={file}
            hidden={hiddenSet.has(file)}
            onToggle={() => onToggle(file, !hiddenSet.has(file))}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoTile({
  locId,
  file,
  hidden,
  onToggle,
}: {
  locId: string;
  file: string;
  hidden: boolean;
  onToggle: () => void;
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
      onClick={onToggle}
      title={hidden ? `恢复 ${file}` : `隐藏 ${file}`}
      className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
        hidden ? "border-red-300" : "border-transparent hover:border-amber-400"
      }`}
    >
      {url ? (
        <img
          src={url}
          alt={file}
          loading="lazy"
          className={`size-full object-cover transition-opacity ${hidden ? "opacity-30 grayscale" : ""}`}
        />
      ) : (
        <span className="grid size-full place-items-center bg-stone-100 text-stone-300">
          <Images className="size-4 animate-pulse" aria-hidden="true" />
        </span>
      )}
      <span
        className={`absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full backdrop-blur-sm ${
          hidden ? "bg-red-600 text-white" : "bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
        }`}
      >
        {hidden ? <EyeOff className="size-3.5" aria-hidden="true" /> : <Eye className="size-3.5" aria-hidden="true" />}
      </span>
    </button>
  );
}
