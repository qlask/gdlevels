import { CHANGELOG, TAG_CLASS } from "./config.js";

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function renderChangelog() {
  const list = document.getElementById("changelog-list");
  list.innerHTML = CHANGELOG.map(
    entry => `
    <article class="changelog-entry">
      <div class="changelog-date mono">${formatDate(entry.date)}</div>
      <span class="changelog-tag ${TAG_CLASS[entry.tag] || "tag-changed"}">${entry.tag}</span>
      <h3>${entry.title}</h3>
      <p>${entry.body}</p>
    </article>
  `
  ).join("");
}
