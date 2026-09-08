import { getCategories } from "./types.js";

/* ---------------------------------------------------------------------
   ROUTER
   Routes are generated from the CATEGORIES table in types.js — add a
   row there and it becomes a clickable tab + a route automatically.
     #<category.route>   -> matches a page defined in CATEGORIES
     #/<slug>             -> level detail page (matches a LEVELS[].slug)
   --------------------------------------------------------------------- */
export function currentRoute() {
  const hash = window.location.hash || "#" + getCategories()[0].route;
  if (hash.startsWith("#/")) {
    return { name: "detail", slug: decodeURIComponent(hash.slice(2)) };
  }
  const routeName = hash.slice(1);
  const match = getCategories().find(c => c.route === routeName);
  if (match) return { name: match.route };
  return { name: getCategories()[0].route };
}

export function goTo(hash, onSameRoute) {
  if (window.location.hash === hash) {
    onSameRoute();
  } else {
    window.location.hash = hash;
  }
}

export function initRouter(onRouteChange) {
  window.addEventListener("hashchange", onRouteChange);
  document.querySelectorAll("[data-route]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      goTo("#" + el.dataset.route, onRouteChange);
    });
  });
}
