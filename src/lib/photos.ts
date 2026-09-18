// 摄影档案（photo-archive）的共享访问层：lightbox 与后台选片器共用。

const photoModules = import.meta.glob("../assets/photo-archive/**/*.jpg", {
  eager: false,
  import: "default",
}) as Record<string, () => Promise<string>>;

let filesCache: Map<string, string[]> | null = null;

export function locationFiles(): Map<string, string[]> {
  if (!filesCache) {
    const map = new Map<string, string[]>();
    for (const key of Object.keys(photoModules)) {
      const match = key.match(/\/photo-archive\/(.+)\/([^/]+)$/);
      if (!match) continue;
      const [, locId, file] = match;
      const list = map.get(locId);
      if (list) list.push(file);
      else map.set(locId, [file]);
    }
    for (const list of map.values()) list.sort((a, b) => a.localeCompare(b, "zh", { numeric: true }));
    filesCache = map;
  }
  return filesCache;
}

export function filesOfLocation(locId: string): string[] {
  return locationFiles().get(locId) ?? [];
}

const coverModules = import.meta.glob("../assets/photo-covers/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const coverOf = (id: string) => coverModules[`../assets/photo-covers/${id}.jpg`] ?? "";

const urlPromises = new Map<string, Promise<string>>();

export function loadPhotoUrl(locId: string, file: string): Promise<string> {
  const key = `../assets/photo-archive/${locId}/${file}`;
  let promise = urlPromises.get(key);
  if (!promise) {
    const loader = photoModules[key];
    promise = loader ? loader() : Promise.reject(new Error(`照片不存在：${key}`));
    urlPromises.set(key, promise);
  }
  return promise;
}
