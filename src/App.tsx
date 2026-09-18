import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppHeader } from "./components/AppHeader";
import type { Route } from "./types";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { PointerExperience } from "./components/PointerExperience";
import { SiteFooter } from "./components/SiteFooter";
import { AmbientColorField } from "./components/AmbientColorField";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const FootprintsPage = lazy(() =>
  import("./pages/FootprintsPage").then((module) => ({ default: module.FootprintsPage })),
);
const PhotographyPage = lazy(() =>
  import("./pages/PhotographyPage").then((module) => ({ default: module.PhotographyPage })),
);
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const ResearchPage = lazy(() =>
  import("./pages/ResearchPage").then((module) => ({ default: module.ResearchPage })),
);
const ArtworksPage = lazy(() =>
  import("./pages/ArtworksPage").then((module) => ({ default: module.ArtworksPage })),
);
const VisualPage = lazy(() =>
  import("./pages/VisualPage").then((module) => ({ default: module.VisualPage })),
);
const AdminPage = lazy(() =>
  import("./pages/AdminPage").then((module) => ({ default: module.AdminPage })),
);

const validRoutes: Route[] = [
  "home",
  "footprints",
  "photography",
  "projects",
  "research",
  "artworks",
  "visual",
  "admin",
];
const readRoute = (): Route => {
  const value = window.location.hash.slice(1) as Route;
  return validRoutes.includes(value) ? value : "home";
};

export default function App() {
  useSmoothScroll();
  const [route, setRoute] = useState<Route>(readRoute);
  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (next: Route) => {
    window.location.hash = next;
  };
  return (
    <div className="min-h-dvh bg-[#faf7f2] text-stone-800">
      <AmbientColorField />
      <PointerExperience />
      {route !== "admin" && <AppHeader route={route} navigate={navigate} />}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={route}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Suspense
            fallback={
              <div
                className="grid min-h-[72dvh] place-items-center text-sm tracking-[.22em] text-stone-400"
                role="status"
              >
                正在整理这一章…
              </div>
            }
          >
            {route === "home" && <HomePage navigate={navigate} />}
            {route === "footprints" && <FootprintsPage navigate={navigate} />}
            {route === "photography" && <PhotographyPage navigate={navigate} />}
            {route === "projects" && <ProjectsPage navigate={navigate} />}
            {route === "research" && <ResearchPage navigate={navigate} />}
            {route === "artworks" && <ArtworksPage navigate={navigate} />}
            {route === "visual" && <VisualPage navigate={navigate} />}
            {route === "admin" && <AdminPage />}
          </Suspense>
        </motion.div>
      </AnimatePresence>
      {route !== "admin" && <SiteFooter navigate={navigate} />}
    </div>
  );
}
