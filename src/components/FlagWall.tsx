import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import flagLK from "../assets/flags/lk.png";
import flagVN from "../assets/flags/vn.png";
import flagID from "../assets/flags/id.png";
import flagDE from "../assets/flags/de.png";
import flagFR from "../assets/flags/fr.png";
import flagIT from "../assets/flags/it.png";
import flagCH from "../assets/flags/ch.png";
import flagUS from "../assets/flags/us.png";
import flagAU from "../assets/flags/au.png";
import flagNO from "../assets/flags/no.png";
import flagSE from "../assets/flags/se.png";
import flagEE from "../assets/flags/ee.png";
import flagFI from "../assets/flags/fi.png";
import flagDK from "../assets/flags/dk.png";
import flagGB from "../assets/flags/gb.png";
import flagPE from "../assets/flags/pe.png";
import flagCL from "../assets/flags/cl.png";
import flagBR from "../assets/flags/br.png";
import flagAR from "../assets/flags/ar.png";
import flagUY from "../assets/flags/uy.png";
import flagEG from "../assets/flags/eg.png";
import flagET from "../assets/flags/et.png";
import flagHK from "../assets/flags/hk.png";
import flagMO from "../assets/flags/mo.png";
import flagVA from "../assets/flags/va.png";

export const countries = [
  { zh: "斯里兰卡", src: flagLK },
  { zh: "越南", src: flagVN },
  { zh: "印度尼西亚", src: flagID },
  { zh: "德国", src: flagDE },
  { zh: "法国", src: flagFR },
  { zh: "意大利", src: flagIT },
  { zh: "瑞士", src: flagCH },
  { zh: "美国", src: flagUS },
  { zh: "澳大利亚", src: flagAU },
  { zh: "挪威", src: flagNO },
  { zh: "瑞典", src: flagSE },
  { zh: "爱沙尼亚", src: flagEE },
  { zh: "芬兰", src: flagFI },
  { zh: "丹麦", src: flagDK },
  { zh: "英国", src: flagGB },
  { zh: "秘鲁", src: flagPE },
  { zh: "智利", src: flagCL },
  { zh: "巴西", src: flagBR },
  { zh: "阿根廷", src: flagAR },
  { zh: "乌拉圭", src: flagUY },
  { zh: "埃及", src: flagEG },
  { zh: "埃塞俄比亚", src: flagET },
  { zh: "香港", src: flagHK },
  { zh: "澳门", src: flagMO },
  { zh: "梵蒂冈", src: flagVA },
];

type Tile = {
  key: string;
  front: string;
  back: string;
  style: CSSProperties;
};

const GAP = 4;
const TILE_W = 170;

function buildTiles(count: number): Tile[] {
  const tiles: Tile[] = [];
  for (let i = 0; i < count; i += 1) {
    const front = countries[i % countries.length];
    const others = countries.filter((c) => c !== front);
    const back = others[Math.floor(Math.random() * others.length)];
    const dur = 12 + Math.random() * 8;
    tiles.push({
      key: `${i}-${front.zh}`,
      front: front.src,
      back: back.src,
      style: {
        "--dur": `${dur.toFixed(1)}s`,
        "--delay": `${(-Math.random() * dur).toFixed(1)}s`,
      } as CSSProperties,
    });
  }
  return tiles.sort(() => Math.random() - 0.5);
}

export function FlagWall() {
  const ref = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState({ cols: 8, rows: 6 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const cols = Math.min(12, Math.max(3, Math.round(w / TILE_W)));
      const rows = Math.min(10, Math.max(2, Math.round(h / (TILE_W * (2 / 3)))));
      setCells((prev) => (prev.cols === cols && prev.rows === rows ? prev : { cols, rows }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tiles = useMemo(() => buildTiles(cells.cols * cells.rows), [cells]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 grid opacity-60"
      style={{
        gridTemplateColumns: `repeat(${cells.cols}, 1fr)`,
        gridTemplateRows: `repeat(${cells.rows}, 1fr)`,
        gap: GAP,
        padding: GAP,
      }}
      aria-hidden="true"
    >
      {tiles.map((tile) => (
        <span key={tile.key} className="flag-tile overflow-hidden rounded-[4px]" style={tile.style}>
          <span className="flag-tile__inner">
            <span className="flag-tile__face">
              <img src={tile.front} alt="" className="size-full object-cover" />
            </span>
            <span className="flag-tile__face flag-tile__back">
              <img src={tile.back} alt="" className="size-full object-cover" />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
