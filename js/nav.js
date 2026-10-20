/* Menú móvil: añade el botón hamburguesa y abre/cierra la navegación. */
/* Al entrar en una página (o recargarla) se empieza arriba; el logotipo lleva siempre al inicio.
   Solo se respeta la posición si el enlace trae ancla (#contacto, #para-llevar…). */
(function () {
  try { history.scrollRestoration = "manual"; } catch (e) {}
  const arriba = () => { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
  arriba();
  window.addEventListener("load", arriba);
  window.addEventListener("pageshow", e => { if (e.persisted) arriba(); });
  document.addEventListener("click", e => {
    const a = e.target.closest("a.logo"); if (!a) return;
    const aqui = location.pathname.replace(/\/+$/, "").split("/").pop() || "index.html";
    if (aqui === "index.html" || aqui === "") { e.preventDefault(); history.replaceState(null, "", location.pathname + location.search); window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }
  });
})();

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
  matchMedia("(min-width: 961px)").addEventListener("change", () => set(false));
})();
