/* Wraps localStorage so the rest of the app never touches it directly. */
const KEY = "gd_levels_archive_downloads";

function readCounts() {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    return {};
  }
}

function writeCounts(counts) {
  try {
    localStorage.setItem(KEY, JSON.stringify(counts));
  } catch (e) {
    /* storage might be full or unavailable — fail silently */
  }
}

export const downloadCounts = readCounts();

export function countFor(slug) {
  return downloadCounts[slug] || 0;
}

export function totalDownloads() {
  return Object.values(downloadCounts).reduce((sum, count) => sum + count, 0);
}

export function trackDownload(slug) {
  downloadCounts[slug] = countFor(slug) + 1;
  writeCounts(downloadCounts);
  return downloadCounts[slug];
}
