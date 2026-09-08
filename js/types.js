/* =====================================================================
   TYPES — the only file you need to touch to add a new tab at the top
   of the site, or a new kind of field on a level (like ID, Song,
   Verifier, etc). Nothing else in the codebase needs to change.
   ===================================================================== */

/* -----------------------------------------------------------------------
   TABLE 1 — CATEGORIES
   These are the tabs in the top navigation bar. Clicking one switches
   the page purely by tapping it — no page reload, no dropdown.

   To add a new tab: add a row below. `route` becomes the URL hash
   (e.g. route:"about" -> "#about"). `page` must match the id of a
   <div id="page-...."> section in index.html (page:"about" ->
   #page-about). `render` is the name of the render function to call
   (must exist as an export somewhere and be wired in app.js — see
   the comment above CATEGORIES for how to plug one in).

   Columns:
   - route     hash fragment used in the URL, no "#", no spaces
   - page      matches the id suffix of the page container in index.html
   - label     text shown on the tab button
   - order     lower numbers appear first (left to right)
   ----------------------------------------------------------------------- */
export const CATEGORIES = [
  { route: "browse",    page: "browse",    label: "Level Archive", order: 2 },
  { route: "changelog", page: "changelog", label: "Changelog",     order: 3 },
  { route: "about",     page: "about",     label: "About",         order: 4 },
   { route: "shitty-levels", page: "shitty-levels", label: "Shitty Levels", order: 1}
];

/* -----------------------------------------------------------------------
   TABLE 2 — FIELD TYPES
   Defines every field a level entry in config.js (LEVELS) can carry —
   its label, icon, and where it's allowed to show up. Adding a row
   here does NOT automatically add data to a level (you still set the
   value per-level in config.js), but it's what controls the label/
   icon/section used when that field is rendered.

   Columns:
   - key         must match the property name used in LEVELS entries
                 (config.js), e.g. "verifier" -> lv.verifier
   - label       display name, e.g. "Verifier", "Song"
   - icon        name of an icon exported from icons.js (used as
                 icons[icon]())
   - showOn      array of where this field is allowed to appear:
                 "card"   -> the grid card on the Level Archive page
                 "detail" -> the level detail page
   - kind        "text" | "person" | "music" | "id" | "tags" | "stat"
                 controls small formatting differences (e.g. "id" gets
                 a copy button, "tags" renders as pills)
   ----------------------------------------------------------------------- */
export const FIELD_TYPES = [
  { key: "id",         label: "Level ID",  icon: "hash",     showOn: ["card", "detail"], kind: "id" },
  { key: "creator",    label: "Creator",   icon: "user",     showOn: ["card", "detail"], kind: "person" },
  { key: "verifier",   label: "Verifier",  icon: "check",    showOn: ["detail"],         kind: "person" },
  { key: "song",       label: "Song",      icon: "music",    showOn: ["card", "detail"], kind: "music" },
  { key: "songAuthor", label: "Artist",    icon: "music",    showOn: ["detail"],         kind: "text" },
  { key: "diff",       label: "Difficulty",icon: "star",     showOn: ["card", "detail"], kind: "text" },
  { key: "rating",     label: "Rating",    icon: "star",     showOn: ["card", "detail"], kind: "text" },
  { key: "stars",      label: "Stars",     icon: "star",     showOn: ["card", "detail"], kind: "stat" },
  { key: "length",     label: "Length",    icon: "ruler",    showOn: ["detail"],         kind: "stat" },
  { key: "size",       label: "File Size", icon: "file",     showOn: ["card", "detail"], kind: "stat" },
  { key: "objects",    label: "Objects",   icon: "cube",     showOn: ["card", "detail"], kind: "stat" },
  { key: "type",       label: "Format",    icon: "file",     showOn: ["card", "detail"], kind: "text" },
  { key: "tags",       label: "Tags",      icon: "tag",      showOn: ["card", "detail"], kind: "tags" },
  { key: "video",      label: "Video",     icon: "play",     showOn: ["detail"],         kind: "text" }
];

/* Lookup helpers — used by render modules, no need to edit below this line */
export function getCategories() {
  return CATEGORIES.slice().sort((a, b) => a.order - b.order);
}

export function getFieldType(key) {
  return FIELD_TYPES.find(f => f.key === key);
}

export function fieldsFor(section) {
  return FIELD_TYPES.filter(f => f.showOn.includes(section));
}
