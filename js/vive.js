/* Vive México: lista de entradas (data/blog.js) y vista de artículo en la misma página (#post=id). */
(function () {
  const B = window.BLOG, $ = s => document.querySelector(s);
  const OL = window.OFRENDA_LANG;
  const fecha = f => new Date(f + "T12:00:00").toLocaleDateString(OL.locale(), { month: "long", year: "numeric" });
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function lista() { $("#lista").innerHTML = B.map(p => `
    <a class="tarjeta-post" href="#post=${p.id}">
      <img src="${p.portada}" alt="" loading="lazy">
      <time datetime="${p.fecha}">${fecha(p.fecha)}</time>
      <h3>${esc(p.titulo)}</h3>
      <p>${esc(p.resumen.slice(0, 110))}</p>
    </a>`).join(""); }
  lista();

  function ruta() {
    const m = location.hash.match(/^#post=(.+)$/), i = m ? B.findIndex(p => p.id === m[1]) : -1;
    $("#vista-inicio").hidden = i >= 0; $("#vista-post").hidden = i < 0;
    if (i < 0) return;
    const p = B[i], sig = B[i - 1], ant = B[i + 1];
    document.title = p.titulo + " · La Ofrenda Taquería";
    $("#post").innerHTML = `
      <a class="btn btn-borde" href="#blog" style="padding:9px 16px;font-size:.72rem">← ${OL.T("Vive México")}</a>
      ${OL.get() !== "es" ? `<p class="cap" style="margin-top:18px">${OL.T("Este artículo está disponible solo en español.")}</p>` : ""}
      <p style="margin:26px 0 0"><time datetime="${p.fecha}">${fecha(p.fecha)}</time></p>
      <h1>${esc(p.titulo)}</h1>
      ${p.cuerpo}
      <div class="pager">
        ${ant ? `<a class="btn btn-borde" href="#post=${ant.id}">← ${esc(ant.titulo.slice(0, 28))}</a>` : "<span></span>"}
        ${sig ? `<a class="btn btn-borde" href="#post=${sig.id}">${esc(sig.titulo.slice(0, 28))} →</a>` : ""}
      </div>`;
    if (!ruta.idioma) window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", () => { const antes = location.hash; ruta(); if (antes === "#blog" || antes === "#filosofia") document.getElementById(antes.slice(1))?.scrollIntoView(); });
  ruta();
  document.addEventListener("langchange", () => { lista(); ruta.idioma = true; ruta(); ruta.idioma = false; });
})();
