import { useRef } from "react";
import { MapPin, CalendarDays, Compass, Footprints as FootprintsIcon, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Route } from "../types";
import { SectionHero } from "../components/SectionHero";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { FlagWall, countries } from "../components/FlagWall";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cities = [
  { zh: "吉萨", en: "GIZA", year: "2025 · 寒假", note: "金字塔前的晨光与沙漠的风，狮身人面像在云层下沉默。这里的照片成为我旅行日记的封面素材。", tag: "金字塔日出", grad: ["#fde68a", "#f59e0b"] },
  { zh: "塔林", en: "TALLINN", year: "2024 · 暑假", note: "红屋顶的老城与教堂尖塔，北欧的冷空气让色彩更清晰。一张横幅风光原片直出。", tag: "红顶老城", grad: ["#a5f3fc", "#22d3ee"] },
  { zh: "剑桥", en: "CAMBRIDGE", year: "2025 · 暑假", note: "徐特立学院暑期科技研学：在剑桥的课堂与实验室之间穿行，获评院级优秀实践团队。", tag: "暑期研学", grad: ["#93c5fd", "#3b82f6"] },
  { zh: "深圳", en: "SHENZHEN", year: "2025 · 暑假", note: "李泽湘双创班暑期实习：在硬科技创业的现场，第一次近距离看产品从图纸到产线。", tag: "双创实习", grad: ["#67e8f9", "#0891b2"] },
  { zh: "广西", en: "GUANGXI", year: "2026 · 暑假", note: "「国门之南·澜湄共声」青年实践团：在中越边境做跨境交流调研，把足迹留在国境线上。", tag: "跨境实践", grad: ["#bae6fd", "#0ea5e9"] },
  { zh: "斯里兰卡", en: "SRI LANKA", year: "2015 · 暑假", note: "小学三年级的印度洋之旅：海上火车与高山茶园，9 岁那年最远的一次出走。", tag: "小学远行", grad: ["#7dd3fc", "#2563eb"] },
  { zh: "越南", en: "VIETNAM", year: "2016 · 寒假", note: "10 岁寒假的邻国初体验：摩托车流、法棍与米粉，东南亚的温度让人难忘。", tag: "邻国初体验", grad: ["#c7d2fe", "#4f46e5"] },
  { zh: "斯德哥尔摩", en: "STOCKHOLM", year: "2024 · 暑假", note: "北欧之行的第一站：市政厅、地铁艺术长廊与瓦萨沉船博物馆，水城的黄昏让人忘了时差。", tag: "北欧首站", grad: ["#7dd3fc", "#0284c7"] },
  { zh: "卑尔根", en: "BERGEN", year: "2024 · 暑假", note: "松恩峡湾的终点站：布吕根的彩色木屋、鱼市与雨——挪威把最深的峡湾留给了这里。", tag: "峡湾之门", grad: ["#5eead4", "#0d9488"] },
  { zh: "科洛尼亚", en: "COLONIA", year: "2026 · 寒假", note: "乌拉圭的殖民小镇：石板路、灯塔与老城墙，拉普拉塔河对岸的慢时光。", tag: "世界遗产小镇", grad: ["#fcd34d", "#b45309"] },
  { zh: "乌斯怀亚", en: "USHUAIA", year: "2026 · 寒假", note: "火地岛与比格尔海峡：世界尽头的灯塔、企鹅与冰川，巴塔哥尼亚的风从南极吹来。", tag: "世界尽头", grad: ["#93c5fd", "#1e40af"] },
  { zh: "马丘比丘", en: "MACHU PICCHU", year: "2026 · 寒假", note: "库斯科与印加古道之上的天空之城：云雾散去的一刻，梯田与石墙把五百年的沉默讲了出来。", tag: "天空之城", grad: ["#86efac", "#16a34a"] },
  { zh: "复活节岛", en: "RAPA NUI", year: "2026 · 寒假", note: "太平洋中央的摩艾石像群：在世界的肚脐上，看石像面朝大海，等一场无人知晓的日出。", tag: "摩艾与海", grad: ["#fdba74", "#ea580c"] },
  { zh: "里约热内卢", en: "RIO", year: "2026 · 寒假", note: "面包山、耶稣山与塞勒隆阶梯：山海、桑巴与落日，把里约染成金色。", tag: "山海之间", grad: ["#f9a8d4", "#db2777"] },
  { zh: "纽约", en: "NEW YORK", year: "2026 · 暑假", note: "东岸之行的第二站：自由女神、曼哈顿天际线与时代广场的夜，第一次站在世界的十字路口。", tag: "东岸都会", grad: ["#c4b5fd", "#7c3aed"] },
  { zh: "开罗", en: "CAIRO", year: "2025 · 寒假", note: "埃及之行的起点：萨拉丁城堡的穹顶、埃及博物馆的黄金面具，尼罗河穿城而过。", tag: "千年老城", grad: ["#fcd34d", "#ca8a04"] },
  { zh: "卢克索", en: "LUXOR", year: "2025 · 寒假", note: "尼罗河畔的露天博物馆：清晨的热气球掠过帝王谷，神庙的柱厅在光里醒来。", tag: "热气球之城", grad: ["#fdba74", "#c2410c"] },
  { zh: "赫尔辛基", en: "HELSINKI", year: "2024 · 暑假", note: "波罗的海的女儿：芬兰堡的海风、岩石教堂与红白双教堂，白夜里的码头集市。", tag: "波罗的海明珠", grad: ["#a5f3fc", "#0e7490"] },
  { zh: "伦敦", en: "LONDON", year: "2025 · 暑假", note: "研学的尾声：塔桥、大英博物馆与国家美术馆，泰晤士河把古典与现代分成两岸。", tag: "博物馆之城", grad: ["#cbd5e1", "#334155"] },
  { zh: "旧金山", en: "SAN FRANCISCO", year: "2026 · 暑假", note: "横跨美国的终点：金门大桥的晨雾、九曲花街与双子峰，落日沉进太平洋。", tag: "西岸终点", grad: ["#fda4af", "#be123c"] },
  { zh: "悉尼", en: "SYDNEY", year: "2019 · 寒假", note: "南半球的盛夏：和北半球反着来的季节与星空，第一次意识到地球的另一半也在过夏天。", tag: "南半球盛夏", grad: ["#d9f99d", "#4d7c0f"] },
  { zh: "北京", en: "BEIJING", year: "2024 · 至今", note: "北理工特立书院的校园日常：拍活动、做海报、赶比赛。这里是所有旅程的出发点。", tag: "校园日常", grad: ["#a5b4fc", "#6366f1"] },
  { zh: "上海", en: "SHANGHAI", year: "2024 · 国庆", note: "国庆假期的四天 Citywalk：第一次认真逛这座远东第一大城，把屏幕里的地标走成眼前的日常。", tag: "城市漫步", grad: ["#67e8f9", "#0e7490"] },
  { zh: "广州", en: "GUANGZHOU", year: "2025 · 暑假", note: "珠江边的夏日：广州塔的夜色与琶醍的江风，湿热空气里全是烟火气。", tag: "珠江夜色", grad: ["#6ee7b7", "#0f766e"] },
  { zh: "大理", en: "DALI", year: "2025 · 暑假", note: "环洱海的一整天：苍山的云影落在水面上，白族村落的炊烟从黄昏升起。", tag: "苍山洱海", grad: ["#7dd3fc", "#0369a1"] },
  { zh: "丽江", en: "LIJIANG", year: "2025 · 暑假", note: "玉龙雪山的日照金山与流星夜：古城的石板路走到头，是抬头就能看见雪的日子。", tag: "日照金山", grad: ["#e0e7ff", "#4338ca"] },
  { zh: "香格里拉", en: "SHANGRI-LA", year: "2023 · 寒假", note: "普达措的松林与松赞林寺的金顶：在雪山与经幡之间，找到名字里的那个地方。", tag: "雪山与经幡", grad: ["#fef08a", "#a16207"] },
  { zh: "泰山", en: "TAISHAN", year: "2021 · 暑假", note: "齐鲁之行：从泰山到孔府孔庙，把课本里的地名一个个走成脚下的石阶。", tag: "五岳之尊", grad: ["#a7f3d0", "#065f46"] },
  { zh: "合肥", en: "HEFEI", year: "2024 · 暑假", note: "合柴1972与安徽省美术馆：老监狱改成的文创园，藏着这座城市的新一半。", tag: "合柴1972", grad: ["#fbcfe8", "#9d174d"] },
  { zh: "宏村", en: "HONGCUN", year: "2024 · 暑假", note: "水墨徽州：西递与宏村的白墙黛瓦倒映在南湖里，新安江把山水装进画卷。", tag: "水墨徽州", grad: ["#d6d3d1", "#57534e"] },
  { zh: "大连", en: "DALIAN", year: "2024 · 暑假", note: "跨海大桥的夜与蟹子湾的潮：山海之间的北方港城，海风里全是开阔。", tag: "山海之城", grad: ["#93c5fd", "#1e3a8a"] },
  { zh: "大同", en: "DATONG", year: "2025 · 春", note: "云冈石窟的大佛与应县木塔：一千五百年的石头与木头，在晋北的风里站着。", tag: "千年石窟", grad: ["#fecaca", "#b91c1c"] },
  { zh: "阿那亚", en: "ARANYA", year: "2023 · 暑假", note: "渤海边的几天：碧螺塔的日出、老龙头与山海关，夏天的海风把一切吹得很慢。", tag: "海边日出", grad: ["#67e8f9", "#155e75"] },
  { zh: "乌兰布统", en: "ULAN BUTONG", year: "2025–2026 · 常去", note: "草原与银河：英仙座流星雨准时落在草甸上方，这里是每年固定要回去的追星地。", tag: "追星草原", grad: ["#c7d2fe", "#312e81"] },
  { zh: "武功山", en: "WUGONGSHAN", year: "2026 · 春", note: "云上草甸：一千多米之上的绿浪与云海日出，爬升的每一步都换来更开阔的视野。", tag: "云上草甸", grad: ["#86efac", "#166534"] },
  { zh: "长白山", en: "CHANGBAISHAN", year: "2025 · 秋", note: "天池、枫叶谷与图们口岸：东北的秋色在边境线上铺开。", tag: "天池之巅", grad: ["#fdba74", "#9a3412"] },
];

const milestones: { year: string; age?: string; title: string; desc: string }[] = [
  { year: "2012", age: "6 岁", title: "走进小学校门，第一次出境", desc: "背上书包的同一夏天，第一次拿着港澳通行证去香港与澳门——地图上的第一个坐标，比课本更早教会我什么是「远方」。" },
  { year: "2014", age: "8 岁", title: "欧洲五国，第一串护照印章", desc: "小学二年级暑假，11 天走过德国、法国、瑞士、意大利与梵蒂冈：教堂、雪山与博物馆，第一次知道世界有多大。" },
  { year: "2015", age: "9 岁", title: "斯里兰卡：印度洋的夏天", desc: "小学三年级的暑假第一次飞向南亚：海上火车、高山茶园与慢悠悠的节奏，成了此后所有旅行的底色。" },
  { year: "2016", age: "10 岁", title: "越南与美国的双城记", desc: "寒假在越南看摩托车流与米粉摊，暑假飞到美国西海岸——洛杉矶进、旧金山出，12 天把地理课本走成了脚下的路。" },
  { year: "2018", age: "12 岁", title: "初中三年", desc: "从儿童长成少年。开始明白努力与结果的关系，也慢慢养成了把日子记下来的习惯。" },
  { year: "2019", age: "13 岁", title: "跨过赤道：印尼与澳大利亚", desc: "初一寒假用 16 天走过两个半球：巴厘岛的海浪与澳洲的盛夏，东南亚与南半球在同一次旅程里相遇。" },
  { year: "2021", age: "15 岁", title: "高中，为一场大考奔跑", desc: "三年高中在课本与试卷之间度过；去往哪座城市、成为什么样的人，答案在这一段逐渐清晰。" },
  { year: "2024", age: "18 岁", title: "入学北理工，北欧看峡湾", desc: "高考后的暑假先飞斯德哥尔摩，13 天走完瑞典、丹麦、挪威、芬兰与爱沙尼亚；9 月入学特立书院，开始系统性的记录：照片、手记、作品。" },
  { year: "2025", age: "19 岁", title: "埃及、剑桥与领奖台", desc: "寒假在吉萨金字塔前过冬，暑假赴英国剑桥参加科技研学，深圳双创班实习；国内赛场上量子计算三赛连捷。" },
  { year: "2026", age: "20 岁", title: "南美之行与 RoboCon 季军", desc: "「沙排之王」战队站上全国领奖台；寒假经亚的斯亚贝巴用 30 天走过埃塞俄比亚与南美五国，地图又亮起一片新的颜色。" },
  { year: "2026", age: "20 岁", title: "澜湄实践与横跨美国", desc: "暑假赴广西做「国门之南·澜湄共声」跨境实践，又用 20 天从华盛顿横跨美国到旧金山。" },
  { year: "下一站", title: "地图继续生长", desc: "25 个国家和地区不是终点——清单上还有更多没走过的路，和没看过的日出。" },
];

export function FootprintsPage({ navigate }: { navigate: (route: Route) => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".fp-header h2",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ".fp-header", start: "top 78%", end: "top 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        ".city-card",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".city-grid", start: "top 78%" },
        },
      );
      gsap.from(".milestone", {
        x: -32,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".timeline", start: "top 75%" },
      });
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <SectionHero
        eyebrow="PLACES I HAVE BEEN"
        titleEn="FOOTPRINTS"
        titleZh="我的足迹"
        desc="25 个国家和地区，6 个大洲。从斯里兰卡的海滩到挪威的峡湾，从秘鲁的山谷到埃及的沙漠——旅行对我来说不是打卡，而是用脚步校准自己与世界的距离。"
        theme="footprints"
        stats={[["25", "个国家和地区"], ["6", "个大洲"], ["6", "段社会实践"]]}
      />

      <section className="relative flex min-h-svh items-center overflow-hidden border-y border-black/10 py-24" aria-label="国旗墙">
        <FlagWall />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#faf7f2]/60 via-transparent to-[#faf7f2]/60" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-5xl px-5 lg:px-8">
          <div className="rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl shadow-stone-900/5 backdrop-blur-md md:p-12">
            <p className="display-en text-sm text-cyan-600">TWENTY-FIVE · SIX CONTINENTS</p>
            <h2 className="display-en mt-4 text-balance text-5xl leading-[.95] text-stone-900 md:text-7xl">
              FLAGS ON MY MAP<span className="accent-dot">.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
              整屏铺满了我去过的 25 面国旗与区旗，它们在随机翻面旋转——
              每翻过来一面，就是另一段旅程。亚洲、欧洲、北美、南美、非洲与大洋洲，
              地图上亮起的颜色，是一张张机票与一个个清晨拼出来的。
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {countries.map((country) => (
                <li key={country.zh} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-stone-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md">
                  <img src={country.src} alt="" aria-hidden="true" className="h-5 w-7 shrink-0 rounded-[3px] object-cover shadow-sm" />
                  {country.zh}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="fp-header relative px-5 py-24 lg:px-8" aria-label="足迹理念">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="display-en text-sm text-stone-400">WALK · OBSERVE · REMEMBER</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.15] text-stone-900 md:text-6xl">
            走过的路，
            <br className="hidden sm:block" />
            都会变成看世界的角度。
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-stone-500">
            从 2012 年第一次拿着港澳通行证出境，到 2024 年入学北理工、站上 RoboCon 的领奖台——
            我习惯把每座城市写进手记、拍进底片。下面的卡片是其中一部分，
            每一张背后都是一段具体的日子：研学、实习、实践与旅行。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-stone-500">
            {["城市漫步", "胶片摄影", "青旅与民宿", "手写旅行笔记", "日出收集者"].map((tag) => (
              <span key={tag} className="rounded-full border border-cyan-200 bg-cyan-50/80 px-4 py-2 text-cyan-700">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="city-grid relative px-5 pb-24 lg:px-8" aria-label="城市卡片">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <article
              key={city.en}
              data-cursor="CITY"
              className="city-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-sm shadow-stone-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-900/10"
            >
              <div
                className="relative flex h-32 items-end overflow-hidden p-4"
                style={{ background: `linear-gradient(135deg, ${city.grad[0]}, ${city.grad[1]})` }}
                aria-hidden="true"
              >
                <span className={`display-en font-bold tracking-[.08em] text-white/90 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${city.en.length > 9 ? "text-3xl" : "text-4xl"}`}>
                  {city.en}
                </span>
                <MapPin className="absolute right-4 top-4 size-5 text-white/70" aria-hidden="true" />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-stone-900">{city.zh}</h3>
                  <span className="flex items-center gap-1 text-xs text-stone-400"><CalendarDays className="size-3.5" aria-hidden="true" />{city.year}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-500">{city.note}</p>
                <p className="mt-4 inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">{city.tag}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline relative border-t border-black/10 bg-white/40 px-5 py-24 lg:px-8" aria-label="人生时间轴">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14">
            <div className="flex items-center gap-4">
              <FootprintsIcon className="size-6 text-cyan-600" aria-hidden="true" />
              <h2 className="display-en text-4xl text-stone-900 md:text-5xl">THE JOURNEY<span className="accent-dot">.</span></h2>
            </div>
            <p className="mt-4 pl-10 text-sm text-stone-400">2005 年出生 · 2012 年走进小学校门 · 每个节点标注当时的年纪</p>
          </div>
          <ol className="relative space-y-10 border-l-2 border-cyan-100 pl-8">
            {milestones.map((item) => (
              <li key={item.title} className="milestone relative">
                <span className="absolute -left-[41px] top-1 size-4 rounded-full border-4 border-white bg-cyan-500 shadow" aria-hidden="true" />
                <p className="display-en flex items-center gap-2 text-sm font-bold tracking-[.12em] text-cyan-600">
                  {item.year}
                  {item.age ? (
                    <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold tracking-normal text-cyan-700">{item.age}</span>
                  ) : null}
                </p>
                <h3 className="mt-1 text-xl font-bold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-500">{item.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 flex flex-wrap items-center gap-5 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-7">
            <Compass className="size-8 shrink-0 text-cyan-600" aria-hidden="true" />
            <p className="flex-1 text-sm leading-7 text-stone-600">
              25 个国家和地区不是终点，地图还在生长。如果你也有想推荐的地方，欢迎告诉我。
            </p>
            <LiquidGlassButton arrow onClick={() => navigate("photography")} className="min-h-11 px-5 text-sm font-semibold">
              看看我拍的照片
            </LiquidGlassButton>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="text-sm text-stone-400">第一章 · 我的足迹</p>
          <button onClick={() => navigate("photography")} className="group flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600">
            下一章 · 摄影作品
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}
