export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid size-10 place-items-center rounded-[50%] border border-black/15 bg-white/60 text-base font-bold text-stone-800"
        style={{
          backgroundImage: "linear-gradient(135deg,#fef3c7,#cffafe 45%,#ede9fe)",
        }}
        aria-hidden="true"
      >
        昊
      </span>
      <span className="font-serif text-lg text-stone-800">杨昊诚</span>
    </div>
  );
}
