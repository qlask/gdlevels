import { LEVELS, BADGE_CLASS, RATING_CLASS, DIFF_CLASS } from "./config.js";
import { icons } from "./icons.js";
import { countFor } from "./storage.js";
import { goTo } from "./router.js";

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function youtubeEmbedUrl(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

function notFoundTemplate(slug) {
  return `
    <div class="detail-not-found">
      <div class="block-mark" style="margin:0 auto 18px;"></div>
      <h1>Level not found</h1>
      <p>There's no archive entry with the technical name "${slug}".</p>
      <button class="btn btn-primary" id="detail-back-notfound">${icons.back()} Back to archive</button>
    </div>`;
}

function detailTemplate(lv) {
  const diffClass = DIFF_CLASS[lv.diff] || "diff-normal";
  const rateClass = RATING_CLASS[lv.rating] || "rate-unrated";
  const embed = youtubeEmbedUrl(lv.video);
  const tags = lv.tags || [];

  return `
    <button class="detail-back" id="detail-back-btn">${icons.back()} Back to archive</button>
    <div class="detail-hero">
      <div class="detail-preview">
        <img src="${lv.gif}" alt="Preview of ${lv.name}">
        <span class="badge-type ${BADGE_CLASS[lv.type]}">.${lv.type}</span>
      </div>
      <div class="detail-info">
        <div class="detail-badge-row">
          <span class="detail-diff-badge ${diffClass}">${lv.diff}</span>
          ${lv.rating && lv.rating !== "Unrated" ? `<span class="badge-rating ${rateClass}">${icons.star()} ${lv.rating}</span>` : ""}
          ${lv.stars ? `<span class="detail-stars">${icons.star()} ${lv.stars}★</span>` : ""}
        </div>
        <h1>${lv.name}</h1>
        <div class="detail-people-row">
          <span>${icons.user()} Creator: <b>${lv.creator}</b></span>
          ${lv.verifier ? `<span>${icons.check()} Verifier: <b>${lv.verifier}</b></span>` : ""}
        </div>
        ${lv.song ? `<div class="detail-song-row">${icons.music()} <b>${lv.song}</b>${lv.songAuthor ? ` <span class="detail-song-author">by ${lv.songAuthor}</span>` : ""}</div>` : ""}
        <div class="detail-id-row">
          <span class="id-label">Level ID: <span class="id-value" style="color:var(--ink);">${lv.id}</span></span>
          <button class="copy-id-btn" data-copy-id="${lv.id}" type="button" aria-label="Copy level ID ${lv.id}" title="Copy ID">
            ${icons.clipboard()}
          </button>
        </div>
        <div class="detail-stat-row">
          <div><b>${lv.size}</b><span>FILE SIZE</span></div>
          <div><b>${lv.objects}</b><span>OBJECTS</span></div>
          <div><b class="level-download-count-b" data-level="${lv.slug}">${countFor(lv.slug).toLocaleString()}</b><span>DOWNLOADS</span></div>
          <div><b>.${lv.type.toUpperCase()}</b><span>FORMAT</span></div>
          ${lv.length ? `<div><b>${lv.length}</b><span>LENGTH</span></div>` : ""}
        </div>
        <a class="dl-btn" style="width:auto;padding:13px 24px;" href="${lv.file}" data-slug="${lv.slug}" data-name="${lv.name}" download target="_blank" rel="noopener">
          ${icons.download()} Download .${lv.type}
        </a>
      </div>
    </div>

    ${tags.length ? `
    <div class="detail-section">
      <h2>Tags</h2>
      <div class="card-tags detail-tags">${tags.map(t => `<span class="tag-pill">${icons.tag()} ${t}</span>`).join("")}</div>
    </div>` : ""}

    ${lv.description ? `
    <div class="detail-section">
      <h2>About this level</h2>
      <p>${lv.description}</p>
    </div>` : ""}

    ${embed ? `
    <div class="detail-section">
      <h2>Showcase video</h2>
      <div class="video-embed-wrap">
        <iframe src="${embed}" title="Showcase video for ${lv.name}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>` : ""}

    <div class="detail-section">
      <h2>Technical name</h2>
      <p class="mono">${lv.slug}</p>
      ${lv.uploadDate ? `<p class="detail-upload-date">Uploaded ${formatDate(lv.uploadDate)}</p>` : ""}
    </div>
  `;
}

export function renderDetail(slug) {
  const container = document.getElementById("detail-content");
  const lv = LEVELS.find(l => l.slug === slug);

  if (!lv) {
    container.innerHTML = notFoundTemplate(slug);
    document.getElementById("detail-back-notfound").addEventListener("click", () => goTo("#browse", () => {}));
    return;
  }

  container.innerHTML = detailTemplate(lv);
  document.getElementById("detail-back-btn").addEventListener("click", () => goTo("#browse", () => {}));
}
