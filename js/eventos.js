/* Videos de eventos: se carga el archivo solo al tocar la tarjeta (preload = ninguno). */
(function () {
  const cards = [...document.querySelectorAll(".vid")];
  cards.forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".vid-card video").forEach(v => { v.pause(); });
    const v = document.createElement("video");
    v.src = b.dataset.src; v.controls = true; v.autoplay = true; v.playsInline = true; v.preload = "auto";
    v.setAttribute("playsinline", ""); v.poster = b.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, "");
    v.setAttribute("aria-label", b.getAttribute("aria-label") || "");
    b.replaceWith(v);
  }));
})();
