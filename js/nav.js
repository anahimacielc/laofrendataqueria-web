/* Menú móvil: añade el botón hamburguesa y abre/cierra la navegación. */
(function () {
  const wrap = document.querySelector(".top .wrap"), nav = document.querySelector(".top nav");
  if (!wrap || !nav) return;
  const b = document.createElement("button");
  b.className = "nav-toggle"; b.type = "button"; b.setAttribute("aria-label", "Menú"); b.setAttribute("aria-expanded", "false");
  b.innerHTML = "<span></span>"; wrap.append(b);
  const set = o => { nav.classList.toggle("open", o); b.setAttribute("aria-expanded", o); };
  b.addEventListener("click", () => set(!nav.classList.contains("open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", e => e.key === "Escape" && set(false));
  matchMedia("(min-width: 821px)").addEventListener("change", () => set(false));
})();
