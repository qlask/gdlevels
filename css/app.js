import { MAILTO } from "./config.js";
import { getCategories } from "./types.js";
import { initRouter, currentRoute, goTo } from "./router.js";
import { renderStats, initBrowsePage, initDownloadTracking } from "./render-browse.js";
import { renderDetail } from "./render-detail.js";
import { renderChangelog } from "./render-changelog.js";
import { initCopyIdHandler } from "./ui.js";

/* ---------------------------------------------------------------------
   TABS — built from the CATEGORIES table in types.js. Add a row there
   and it shows up here automatically, no HTML edits needed.
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

function showPage(routeName) {
  getCategories().forEach(cat => {
    const el = document.getElementById("page-" + cat.page);
    if (el) el.hidden = routeName !== cat.route;
  });
  const detailEl = document.getElementById("page-detail");
  if (detailEl) detailEl.hidden = routeName !== "detail";
}

function renderRoute() {
  const route = currentRoute();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (route.name === "detail") {
    showPage("detail");
    setActiveTab(getCategories()[0].route); // detail pages are conceptually part of the archive
    renderDetail(route.slug);
    return;
  }

  showPage(route.name);
  setActiveTab(route.name);
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
  const homeRoute = getCategories()[0].route;
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
