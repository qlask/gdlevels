/* =====================================================================
   LEVEL ARCHIVE — edit this array to add, remove, or update levels.
   This is the ONLY place levels come from. There is no upload form,
   no database, and no public submission path on this site — the
   maintainer adds every entry here directly in the source.

   `slug` is the "technical name" used in the level's detail URL:
   https://qlask.github.io/gdlevelsarchive/#/<slug>
   Keep it lowercase, no spaces (use hyphens). It must be unique.

   FIELD GUIDE (most are optional — leave "" or [] if unknown):
   - id           In-game Level ID (numeric string). Shown with a
                  one-click copy button everywhere the level appears.
   - name / creator / verifier
   - song         Song name, used in the detail page's audio row.
   - songAuthor   Artist / musician credited for the song.
   - diff         "Easy" | "Normal" | "Hard" | "Harder" | "Insane" |
                  "Easy Demon" | "Medium Demon" | "Hard Demon" |
                  "Insane Demon" | "Extreme Demon"
   - rating       "Unrated" | "Rated" | "Featured" | "Epic" | "Legendary"
                  | "Mythic" — drives the little rating pill's color.
   - stars        Star reward as a number, e.g. 10.
   - type         "gdr" | "gdr2" | "gmd" — the archived file format.
   - size         Human file size, e.g. "358 B".
   - objects      Object count, e.g. "25,062".
   - length       In-game length label, e.g. "Long" or "XL".
   - gif          Preview image/GIF URL.
   - video        Optional YouTube/showcase video URL for the detail page.
   - file         Direct download link for the archived file.
   - description  Long-form write-up shown on the detail page.
   - tags         Array of short strings, e.g. ["Wave","Memory","Turtle"].
   - uploadDate   "YYYY-MM-DD" — shown on the detail page.

   Adding/editing/removing entries here is the only thing needed —
   the grid, search, filters, and detail pages update automatically.
   ===================================================================== */
export const LEVELS = [
  {
    slug: "error",
    name: "Error",
    creator: "iLsane, arcania",
    verifier: "iLsane",
    song: "Error",
    songAuthor: "Waterflame",
    type: "gdr2",
    size: "358 B",
    objects: "25,062",
    length: "Long",
    diff: "Easy Demon",
    rating: "Featured",
    stars: 10,
    gif: "https://i.imgur.com/rQlZE5s.png",
    video: "",
    file: "https://drive.google.com/file/d/1k-vDNXN7Ucn-genQrRKJJdpqvKYHu3t6/view?usp=sharing",
    description: "A showcase of an Easy Demon collab from iLsane and arcania. Clean wave sections stitched into a fast, ship-heavy back half.",
    tags: ["Wave", "Ship", "Collab"],
    id: "56455318",
    uploadDate: "2026-07-24"
  },
  {
    slug: "machina-deluxe",
    name: "Machina Deluxe",
    creator: "siNK",
    verifier: "siNK",
    song: "Machina",
    songAuthor: "Camellia",
    type: "gdr2",
    size: "299 B",
    objects: "19,273",
    length: "Long",
    diff: "Easy Demon",
    rating: "Rated",
    stars: 10,
    gif: "https://i.imgur.com/PjV3Zhw.png",
    video: "",
    file: "https://drive.google.com/file/d/1f4c2cKLhPKoa-4yT_CFegqWATEh4ckxp/view?usp=sharing",
    description: "bro i used this song",
    tags: ["Cube", "Timing"],
    id: "126502545",
    uploadDate: "2026-07-25"
  },
  {
    slug: "blackpill",
    name: "Blackpill",
    creator: "yyene",
    verifier: "yyene",
    song: "Blackpill",
    songAuthor: "F-777",
    type: "gdr2",
    size: "410 B",
    objects: "14,422",
    length: "Long",
    diff: "Easy Demon",
    rating: "Rated",
    stars: 10,
    gif: "https://i.imgur.com/fbpJsGV.png",
    video: "",
    file: "https://drive.google.com/file/d/1OYA1mvqoA9gw4Z5IQtWDuR1f0z7R2HtY/view?usp=drive_link",
    description: "An Easy Demon by yyene.",
    tags: ["Ship", "Dark"],
    id: "145216304",
    uploadDate: "2026-07-26"
  },
  {
    slug: "red-alert",
    name: "Red Alert",
    creator: "RatLiffiGD",
    verifier: "RatLiffiGD",
    song: "Red Alert",
    songAuthor: "Dimrain47",
    type: "gdr2",
    size: "586 B",
    objects: "15,034",
    length: "Long",
    diff: "Easy Demon",
    rating: "Featured",
    stars: 10,
    gif: "https://i.imgur.com/ZXnzK2c.png",
    video: "",
    file: "https://drive.google.com/file/d/1P4CaqfkvLOe1WOgVXm7StihTrlBMxe2i/view?usp=sharing",
    description: "A well known free demon, a common first-demon pick for a reason.",
    tags: ["Classic", "Beginner Demon"],
    id: "128665322",
    uploadDate: "2026-07-27"
  }
];

/* =====================================================================
   CHANGELOG — edit this array to add a new changelog entry. Newest
   entries should go at the top of the array; they render in that order.
   `tag` controls the pill color: "added" | "fixed" | "changed"
   ===================================================================== */
export const CHANGELOG = [
  {
    date: "2026-09-07",
    tag: "changed",
    title: "Rebranded to GD Levels Archive",
    body: "New name, new visual identity, and a lot more per-level detail: song credits, verifier, rating, star count, tags, and an optional video embed on every detail page."
  },
  {
    date: "2026-07-26",
    tag: "added",
    title: "Level detail pages + Changelog tab",
    body: "Every card now opens its own detail page at a dedicated URL based on the level's technical name (slug). Added this Changelog tab so future updates are tracked in one place."
  },
  {
    date: "2026-07-26",
    tag: "added",
    title: "Blackpill added to the archive",
    body: "Added yyene's Blackpill to the archive, including auto-generated preview and object count."
  },
  {
    date: "2026-07-24",
    tag: "changed",
    title: "Archive launched",
    body: "Initial release with Error and Machina Deluxe."
  }
];

/* Badge / tag / rating / difficulty class lookups, shared across render modules */
export const BADGE_CLASS = { gdr: "badge-gdr", gdr2: "badge-gdr2", gmd: "badge-gmd" };
export const TAG_CLASS = { added: "tag-added", fixed: "tag-fixed", changed: "tag-changed" };
export const RATING_CLASS = {
  Unrated: "rate-unrated",
  Rated: "rate-rated",
  Featured: "rate-feature",
  Epic: "rate-epic",
  Legendary: "rate-legendary",
  Mythic: "rate-mythic"
};
export const DIFF_CLASS = {
  "Easy": "diff-easy",
  "Normal": "diff-normal",
  "Hard": "diff-hard",
  "Harder": "diff-harder",
  "Insane": "diff-insane",
  "Easy Demon": "diff-demon",
  "Medium Demon": "diff-demon",
  "Hard Demon": "diff-demon",
  "Insane Demon": "diff-demon",
  "Extreme Demon": "diff-demon"
};

/* The single way anyone outside the source can propose a level */
export const MAILTO =
  "mailto:urujoshuaofficial@gmail.com?subject=" +
  encodeURIComponent("Level Archive Submission") +
  "&body=" +
  encodeURIComponent(
    "Level name:\nLevel ID:\nCreator:\nFile type (.gdr / .gdr2 / .gmd):\nYouTube/video link (if any):\n\nWhy this level deserves to be archived:\n"
  );
