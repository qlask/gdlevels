import { icons } from "./icons.js";

/* ---------------------------------------------------------------------
   TOAST
   --------------------------------------------------------------------- */
const toastEl = document.getElementById("toast");
let toastTimer;

export function showToast(msg) {
  toastEl.innerHTML = `${icons.check()} <span>${msg}</span>`;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* ---------------------------------------------------------------------
   COPY LEVEL ID
   --------------------------------------------------------------------- */
function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) { /* no-op */ }
  document.body.removeChild(ta);
}

function copyIdToClipboard(btn, id) {
  const restore = () => {
    btn.innerHTML = icons.clipboard();
    btn.classList.remove("copied");
  };
  const markCopied = () => {
    btn.innerHTML = icons.check();
    btn.classList.add("copied");
    clearTimeout(btn._copyTimer);
    btn._copyTimer = setTimeout(restore, 1400);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(id).then(markCopied).catch(() => {
      fallbackCopy(id);
      markCopied();
    });
  } else {
    fallbackCopy(id);
    markCopied();
  }
}

/* Delegated once, globally — works for copy buttons on both the grid
   and the detail page. */
export function initCopyIdHandler() {
  document.addEventListener("click", e => {
    const copyBtn = e.target.closest(".copy-id-btn");
    if (!copyBtn) return;
    e.stopPropagation();
    copyIdToClipboard(copyBtn, copyBtn.dataset.copyId);
  });
}
