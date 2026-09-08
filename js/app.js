import { MAILTO } from "./config.js";
import { getCategories, getLevelCategories } from "./types.js";
import { initRouter, currentRoute, goTo } from "./router.js";
import { renderStats, initBrowsePage, initDownloadTracking, setActiveCategory } from "./render-browse.js";
import { renderDetail } from "./render-detail.js";
import { renderChangelog } from "./render-changelog.js";
import { initCopyIdHandler } from "./ui.js";

/* ---------------------------------------------------------------------
   TABS — built from the CATEGORIES table in types.js. Add a row there
   and it shows up here automatically, no HTML edits needed. Every
   category with showsLevels:true reuses the same level-grid page,
   just filtered to that category (see levelMatchesCategory in types.js
   and the per-level `categories` field in config.js).
   --------------------------------------------------------------------- */
function buildNavTabs() {
  const nav = document.getElementById("nav-links");
  nav.innerHTML = getCategories()
    .map(
      cat => `<button class="nav-tab" id="tab-${cat.route}" data-route="${cat.route}">${cat.label}</button>`
    )
    .join("");
}

function setActiveTab(routeName) {
  document.querySelectorAll(".nav-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.route === routeName);
  });
}

/* Every level-showing category (route) maps to the same physical
   #page-browse element — only the grid contents change. Non-level
   categories (changelog, about, ...) each get their own page. */
function pageIdFor(routeName) {
  const levelCat = getLevelCategories().find(c => c.route === routeName);
  if (levelCat) return "page-browse";
  const cat = getCategories().find(c => c.route === routeName);
  return cat ? "page-" + cat.page : "page-browse";
}

function showPage(routeName) {
  const targetId = routeName === "detail" ? "page-detail" : pageIdFor(routeName);
  const staticIds = getCategories()
    .filter(c => !getLevelCategories().some(lc => lc.route === c.route))
    .map(c => "page-" + c.page);
  const allPageIds = new Set(["page-browse", "page-detail", ...staticIds]);
  allPageIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = id !== targetId;
  });
}

function renderRoute() {
  const route = currentRoute();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (route.name === "detail") {
    showPage("detail");
    setActiveTab(getLevelCategories()[0]?.route || "browse"); // detail pages are conceptually part of the archive
    renderDetail(route.slug);
    return;
  }

  showPage(route.name);
  setActiveTab(route.name);

  const levelCat = getLevelCategories().find(c => c.route === route.name);
  if (levelCat) setActiveCategory(route.name);
}

function initMailtoButtons() {
  ["request-showcase-nav-btn", "request-showcase-hero-btn", "request-showcase-section-btn", "request-showcase-about-btn", "mailto-footer"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = MAILTO;
    });
  });
}

function initBrandHome() {
  const homeRoute = getLevelCategories()[0]?.route || getCategories()[0].route;
  document.getElementById("brand-home-btn").addEventListener("click", () => goTo("#" + homeRoute, renderRoute));
  document.getElementById("hero-browse-link").addEventListener("click", e => {
    e.preventDefault();
    goTo("#" + homeRoute, renderRoute);
  });
}

/* ---------------------------------------------------------------------
   INIT
   --------------------------------------------------------------------- */
buildNavTabs();
renderStats();
initBrowsePage();
renderChangelog();
initDownloadTracking();
initCopyIdHandler();
initMailtoButtons();
initBrandHome();
initRouter(renderRoute);
renderRoute();
