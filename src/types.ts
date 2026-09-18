export type Route =
  | "home"
  | "footprints"
  | "photography"
  | "projects"
  | "research"
  | "artworks"
  | "visual"
  | "admin";

export type ThemeColor = {
  name: string;
  text: string;
  softBg: string;
  border: string;
  gradFrom: string;
  gradTo: string;
};
