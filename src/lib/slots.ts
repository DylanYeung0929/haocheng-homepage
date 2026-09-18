// 其他页面配图槽位注册表：公开页与后台管理共用（后台据此列出可替换的配图）。

export type SlotDef = { id: string; label: string };
export type SlotGroup = { title: string; slots: SlotDef[] };

const colorModules = import.meta.glob("../assets/works/quad/color-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const colorwayFiles: { name: string; url: string }[] = Object.entries(colorModules)
  .map(([path, url]) => ({ name: path.match(/color-(.+)\.jpg$/)?.[1] ?? "", url }))
  .sort((a, b) => a.name.localeCompare(b.name, "zh"));

const artworksWorks: [string, number][] = [
  ["四足机器人战队 T 恤设计", 3],
  ["排球机器人战队 T 恤设计", 3],
  ["复活节岛旅行海报系列", 3],
  ["手机相册封面系列", 5],
  ["旅行日记封面", 1],
  ["旅行日记素材原片", 6],
  ["RoboCon 战队标志", 1],
  ["JiaYue × Dylan 联名标志", 1],
  ["字母标志实验「Z」", 1],
  ["水印系统设计", 1],
  ["照片色谱长卷", 2],
  ["全景图 404 · 像素重构", 1],
  ["入党仪式纪念海报", 1],
];

const visualCases = [
  "四足机器人战队 T 恤设计",
  "排球机器人战队 T 恤设计",
  "复活节岛旅行海报",
  "手机相册封面系列",
  "旅行日记封面",
  "RoboCon 战队标志设计",
  "个人主页设计系统",
];

const orbitItems = [
  "主体插画",
  "机器人实拍",
  "库犸科技",
  "eSUN 易生",
  "BIT ROBOCON",
  "配色变体",
];

const honorCerts: [string, number][] = [
  ["RoboCon 全国大学生机器人大赛", 2],
  ["CIC「悟空杯」量子计算大赛", 1],
  ["第十九届「挑战杯」人工智能+专项赛", 1],
  ["第四届 CCF 量子计算编程挑战赛", 1],
];

const recognitions = ["校级优秀团员（证书）", "班级优秀团员", "院级「五四」评优"];

export const slotGroups: SlotGroup[] = [
  {
    title: "艺术作品页 · 作品集",
    slots: artworksWorks.flatMap(([title, count], i) => [
      { id: `artworks.works.${i}.cover`, label: `${title} · 主图` },
      ...Array.from({ length: Math.max(0, count - 1) }, (_, j) => ({
        id: `artworks.works.${i}.img.${j}`,
        label: `${title} · 图 ${j + 2}`,
      })),
    ]),
  },
  {
    title: "视觉方案页 · 案例配图",
    slots: visualCases.map((title, i) => ({ id: `visual.cases.${i}`, label: title })),
  },
  {
    title: "视觉方案页 · 配色墙",
    slots: colorwayFiles.map((file, i) => ({
      id: `visual.colorways.${i}`,
      label: `配色方案 · ${file.name}`,
    })),
  },
  {
    title: "视觉方案页 · 素材轨道",
    slots: [
      ...orbitItems.map((label, i) => ({ id: `visual.orbit.item.${i}`, label })),
      { id: "visual.orbit.product", label: "轨道中心成品图" },
    ],
  },
  {
    title: "项目页 · 荣誉证书",
    slots: honorCerts.flatMap(([title, count], i) =>
      Array.from({ length: count }, (_, j) => ({
        id: `projects.honors.${i}.img.${j}`,
        label: `${title} · 证书 ${j + 1}`,
      })),
    ),
  },
  {
    title: "科研页 · 荣誉证书",
    slots: recognitions.map((label, i) => ({ id: `research.recognitions.${i}`, label })),
  },
];
