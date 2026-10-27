/* La Ofrenda · motor de la carta interactiva
   Lee window.CARTA (data/carta-data.js) y pinta la carta. Sin dependencias. */
(function () {
  let C = window.CARTA;
  // ?borrador → previsualiza los cambios guardados en admin.html sin publicarlos
  try { if (/[?&]borrador/.test(location.search)) { const d = localStorage.getItem("ofrenda-borrador"); if (d) C = JSON.parse(d); } } catch (e) {}
  const $ = (s, r = document) => r.querySelector(s);

  const UI = {
    es: { nav_inicio: "Inicio", nav_carta: "Carta", nav_llevar: "Para llevar", nav_contacto: "Contacto",
      eyebrow: "Saborea, siente y vive", titulo: "Nuestra carta",
      sub: "Cocina mexicana con ingredientes de aquí y sazón de allá. Pide en caja y te avisamos cuando esté lista.",
      buscar: "Buscar en la carta", ph: "Buscar: pastor, margarita, mezcal…", wa: "Pedir por WhatsApp",
      veg: "Vegetariano", sinlac: "Sin lácteos", singlu: "Sin gluten", pop: "Favorito", nuevo: "Nuevo",
      vacio: "No encontramos nada con esa búsqueda. Prueba con otra palabra.", pairs: "Acompáñalo con",
      agave: "Tequila y mezcal", guiaT: "Una pequeña guía para descubrir el agave", agaveH: "Tequila y Mezcal",
      lema1: "El tequila se disfruta. El mezcal se descubre.", resp: "Disfruta con responsabilidad.",
      p1: "¿Tequila o mezcal?", p2: "¿Blanco, reposado o cristalino?", p3: "¿Clásico, top o premium?",
      todos: "Todos", tequila: "Tequila", mezcal: "Mezcal",
      tequilaD: "Se elabora con agave azul. Puede ser fresco y herbal, o desarrollar notas dulces y de barrica según su estilo.",
      mezcalD: "Puede elaborarse con distintas variedades de agave. Sus sabores pueden ser herbales, minerales, frutales, terrosos o ahumados. No todos son ahumados.",
      blanco: "Blanco", blancoK: "Fresco", blancoD: "Poco o nada de contacto con madera. El agave es el protagonista: notas frescas, herbales y cítricas.",
      reposado: "Reposado", reposadoK: "Redondo", reposadoD: "Descansa al menos dos meses en barrica y puede sumar notas de madera, vainilla o especias.",
      cristalino: "Cristalino", cristalinoK: "Elegante", cristalinoD: "Es un tequila añejado que se filtra para eliminar gran parte del color. Mantiene parte de sus aromas y notas de barrica, con una apariencia cristalina.",
      clasico: "Clásico", clasicoD: "Los de siempre: directos, equilibrados y fáciles de disfrutar.",
      top: "Top", topD: "Un paso más en personalidad, equilibrio y complejidad.",
      premium: "Premium", premiumD: "Gama alta para disfrutar con calma y apreciar sus matices.",
      sugerencias: "Tu selección", sinRes: "Aún no tenemos esa combinación. Cambia algún filtro y vemos.",
      ayuda: "¿No sabes cuál elegir? Dinos qué sabores te gustan y te ayudamos a encontrar tu tequila o mezcal.",
      ayudaBtn: "Pregúntanos en caja", limpiar: "Empezar de nuevo", mezcalStyle: "Los mezcales se descubren por agave y origen: pregúntanos cuál tenemos hoy.",
      extras: "Para completar la experiencia", lema2: "Si la vida te da limones, pide sal y tequila", unidad: "Precios por chupito de 2 oz (≈ 59 ml)",
      waMsg: "¡Hola! Quiero hacer un pedido para recoger.", actualizado: "Actualizado", acompT: "Tequila: acompañado de sangrita, lima y limón", acompM: "Mezcal: acompañado de rodajas de naranja y sal de chile", cerrar: "Cerrar", ampliar: "Ampliar foto", oz: "Chupito 2 oz", sabores: "Sabores", ayudaAgave: "Elige una opción y mira abajo los chupitos que encajan.", opcion: "opción", opciones: "opciones", ver: "Ver" },
    en: { nav_inicio: "Home", nav_carta: "Menu", nav_llevar: "Takeaway", nav_contacto: "Contact",
      eyebrow: "Taste, feel and live", titulo: "Our menu",
      sub: "Mexican cooking with local ingredients and flavour from home. Order at the counter and we'll let you know when it's ready.",
      buscar: "Search the menu", ph: "Search: pastor, margarita, mezcal…", wa: "Order on WhatsApp",
      veg: "Vegetarian", sinlac: "Dairy-free", singlu: "Gluten-free", pop: "Favourite", nuevo: "New",
      vacio: "Nothing found. Try another word.", pairs: "Pair it with",
      agave: "Tequila & mezcal", guiaT: "A little guide to discovering agave", agaveH: "Tequila & Mezcal",
      lema1: "Tequila is to be enjoyed. Mezcal is to be discovered.", resp: "Please drink responsibly.",
      p1: "Tequila or mezcal?", p2: "Blanco, reposado or cristalino?", p3: "Classic, top or premium?",
      todos: "All", tequila: "Tequila", mezcal: "Mezcal",
      tequilaD: "Made from blue agave. It can be fresh and herbal, or develop sweet, barrel-aged notes depending on its style.",
      mezcalD: "Can be made from many agave varieties. Flavours can be herbal, mineral, fruity, earthy or smoky. Not all of them are smoky.",
      blanco: "Blanco", blancoK: "Fresh", blancoD: "Little or no time in wood. The agave is the star: fresh, herbal, citrusy notes.",
      reposado: "Reposado", reposadoK: "Smooth", reposadoD: "Rested at least two months in oak; may add notes of wood, vanilla or spice.",
      cristalino: "Cristalino", cristalinoK: "Elegant", cristalinoD: "An aged tequila filtered to remove most of its colour. Keeps part of its aromas and barrel notes, with a crystal-clear look.",
      clasico: "Classic", clasicoD: "The staples: straightforward, balanced and easy to enjoy.",
      top: "Top", topD: "A step up in personality, balance and complexity.",
      premium: "Premium", premiumD: "High-end, to sip slowly and appreciate its nuances.",
      sugerencias: "Your picks", sinRes: "We don't have that combination yet. Change a filter and let's see.",
      ayuda: "Not sure what to choose? Tell us what flavours you like and we'll help you find your tequila or mezcal.",
      ayudaBtn: "Ask us at the counter", limpiar: "Start over", mezcalStyle: "Mezcals are discovered by agave and origin: ask us which one we're pouring today.",
      extras: "To complete the experience", lema2: "If life gives you lemons, ask for salt and tequila", unidad: "Prices per 2 oz shot (≈ 59 ml)",
      waMsg: "Hi! I'd like to place an order for pickup.", actualizado: "Updated", acompT: "Tequila: served with sangrita, lime and lemon", acompM: "Mezcal: served with orange slices and chilli salt", cerrar: "Close", ampliar: "Enlarge photo", oz: "2 oz shot", sabores: "Flavours", ayudaAgave: "Pick an option and see the shots that match below.", opcion: "option", opciones: "options", ver: "View" }
  };

  const OL = window.OFRENDA_LANG;
  let lang = OL.get();
  // UI: es es la base; en viene de aquí; el resto sale de la tabla de traducciones (data/i18n.js) por el texto en español
  const t = k => { const base = UI.es[k]; if (lang === "es") return base; if (lang === "en") return UI.en[k] ?? base; return OL.tr(base) ?? UI.en[k] ?? base; };
  const L = o => OL.L(o);
  const money = n => new Intl.NumberFormat(OL.locale(), { style: "currency", currency: C.meta.moneda || "EUR" }).format(n);

  const state = { q: "", veg: false, sinlac: false, singlu: false, tipo: null, estilo: null, nivel: null, resalta: null };

  // ---------- utilidades ----------
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") e.className = v; else if (k === "text") e.textContent = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v === true ? "" : v);
    }
    kids.flat(Infinity).forEach(c => c != null && e.append(c.nodeType ? c : document.createTextNode(c)));
    return e;
  }
  const sa = OL.sa;
  const norm = s => (s || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const tier = it => it.precio < C.meta.tiers.clasico ? "clasico" : it.precio < C.meta.tiers.top ? "top" : "premium";
  const agaveName = it => [it.marca, it.nombre].filter(Boolean).join(" ");
  const visible = it => it.visible !== false;
  const agaveById = id => C.agave.items.find(i => i.id === id);

  function matches(it) {
    if (state.veg && !(it.tags || []).includes("vegetariano")) return false;
    if (state.sinlac && (it.alergenos || []).includes("lacteos")) return false;
    if (state.singlu && (it.alergenos || []).includes("gluten")) return false;
    if (state.q) {
      const hay = norm([L(it.nombre), L(it.desc), it.nombre?.es, it.nombre?.en].join(" "));
      if (!state.q.split(/\s+/).every(w => hay.includes(w))) return false;
    }
    return true;
  }

  // ---------- foto ampliada (sin cargar nada extra: usa la misma imagen, ya descargada) ----------
  function ampliar(src, alt) {
    let d = document.getElementById("visor");
    if (!d) {
      d = h("dialog", { id: "visor", class: "visor" });
      d.addEventListener("click", e => { if (e.target.tagName !== "BUTTON") d.close(); });
      document.body.append(d);
    }
    d.setAttribute("aria-label", t("ampliar"));
    d.replaceChildren(h("button", { type: "button", class: "visor-x", "aria-label": t("cerrar"), onclick: () => d.close() }, "×"), h("img", { src, alt }));
    d.showModal();
  }

  // ---------- platos ----------
  function priceCols(it, colLabels) {
    const lista = it.precios || [{ precio: it.precio }];
    return h("div", { class: "precios" }, lista.map((p, i) => {
      if (p.precio == null) return null;
      const lab = p.etiqueta ? L(C.etiquetasPrecio[p.etiqueta]) : "";
      return h("div", { class: "precio" }, money(p.precio), (lista.length > 1 || it.precio == null) && lab ? h("small", { text: lab }) : null);
    }));
  }
  function badges(it) {
    const b = [];
    if (it.popular) b.push(h("span", { class: "badge pop", text: t("pop") }));
    if (it.propuesta) b.push(h("span", { class: "badge nuevo", text: t("nuevo") }));
    (it.tags || []).includes("vegetariano") && b.push(h("span", { class: "badge veg", text: t("veg") }));
    (it.alergenos || []).forEach(a => b.push(h("span", { class: "badge " + (a === "gluten" ? "glu" : a === "soja" ? "soja" : a === "huevo" ? "huevo" : ""), text: L(C.alergenos[a]) })));
    return b.length ? h("div", { class: "badges" }, b) : null;
  }
  function plato(it) {
    const mar = (it.maridaje || []).map(agaveById).filter(Boolean);
    return h("article", { class: "plato" + (it.foto ? " con-foto" : "") },
      it.foto ? h("img", { class: "foto", src: it.foto, alt: L(it.nombre), loading: "lazy", tabindex: "0", role: "button", "aria-label": t("ampliar") + ": " + L(it.nombre), onclick: e => ampliar(it.foto, L(it.nombre)), onkeydown: e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ampliar(it.foto, L(it.nombre)); } } }) : null,
      h("div", {},
        h("h4", { text: L(it.nombre) }),
        it.desc ? h("p", { text: L(it.desc) }) : null,
        badges(it),
        mar.length ? h("div", { class: "maridaje" }, t("pairs") + ": ",
          mar.map((m, i) => [i ? " · " : "", h("button", { type: "button", onclick: () => irAgave(m.id) }, agaveName(m) + " " + money(m.precio))])) : null),
      priceCols(it));
  }

  function seccionCategoria(cat) {
    const grupos = cat.grupos.map(g => ({ ...g, items: g.items.filter(visible).filter(matches) })).filter(g => g.items.length);
    if (!grupos.length) return null;
    return h("section", { class: "seccion", id: cat.id, "data-cat": cat.id },
      h("div", { class: "wrap" },
        h("header", {}, h("h2", { text: sa(L(cat.nombre)) }), h("div", { class: "cenefa" })),
        cat.nota ? h("p", { class: "nota", text: L(cat.nota) }) : null,
        grupos.map(g => h("div", { class: "grupo" },
          g.nombre ? h("h3", { text: L(g.nombre) }) : null,
          (g.columnas || cat.columnas) && !state.q ? h("div", { class: "cols" }, OL.LA(g.columnas || cat.columnas).map(c => h("span", { text: c }))) : null,
          g.items.map(plato)))));
  }

  // ---------- guía del agave ----------
  const ESTILOS = ["blanco", "reposado", "cristalino"];
  const NIVELES = ["clasico", "top", "premium"];

  function opcion(key, sub, active, on, kicker) {
    return h("button", { type: "button", class: "opcion", "aria-pressed": active ? "true" : "false", onclick: on },
      h("strong", { text: t(key) }), kicker ? h("em", { text: kicker }) : null, h("span", { text: t(sub) }));
  }
  function filaAgave(it) {
    return h("div", { class: "fila-agave" + (state.resalta === it.id ? " resalta" : ""), id: "ag-" + it.id },
      h("h4", {}, agaveName(it), h("small", { text: [t(it.tipo), it.tipo === "tequila" ? t(it.estilo) : "", t(tier(it))].filter(Boolean).join(" · ") })),
      h("div", { class: "precio" }, money(it.precio), h("small", { class: "oz", text: t("oz") })),
      it.nota ? h("p", { text: L(it.nota) }) : null);
  }
  function avisoOz() {
    const txt = L(C.agave.unidad), i = txt.indexOf("(");
    const parte = s => { const j = s.indexOf(": "); return j > 0 ? [h("b", { text: s.slice(0, j) }), ": " + s.slice(j + 2)] : [s]; };
    return h("div", { class: "oz-aviso" },
      h("div", { class: "oz-linea" }, h("strong", { text: (i > 0 ? txt.slice(0, i) : txt).trim() }), i > 0 ? h("span", { text: txt.slice(i) }) : null),
      h("p", { class: "acomp" }, h("span", {}, parte(t("acompT"))), h("span", {}, parte(t("acompM")))));
  }
  function seccionAgave() {
    const set = (k, v) => { state[k] = state[k] === v ? null : v; if (k === "tipo" && state.tipo === "mezcal") state.estilo = null; state.resalta = null; pintar(true); };
    let lista = C.agave.items.filter(visible);
    if (state.tipo) lista = lista.filter(i => i.tipo === state.tipo);
    if (state.estilo) lista = lista.filter(i => i.estilo === state.estilo);
    if (state.nivel) lista = lista.filter(i => tier(i) === state.nivel);
    if (state.q) { const q = norm(state.q); lista = lista.filter(i => q.split(/\s+/).every(w => norm(agaveName(i) + " " + i.tipo + " " + i.estilo).includes(w))); }
    const hayFiltro = state.tipo || state.estilo || state.nivel;
    const extras = C.agave.extras.filter(visible);

    return h("section", { class: "seccion guia", id: "agave", "data-cat": "agave" },
      // Banner (el texto del banner está en español): en otros idiomas se muestra además el título traducido
      h("img", { class: "guia-banner", src: "assets/img/banner-tequila.jpg", alt: sa(t("agaveH")) + " · " + t("guiaT") }),
      h("div", { class: "wrap" },
        lang === "es" ? h("h2", { class: "sr", text: sa(t("agaveH")) }) :
        h("div", { class: "guia-intro" },
          h("h2", { text: sa(t("agaveH")) }),
          h("p", { text: t("guiaT") })),

        h("p", { class: "guia-ayuda", text: t("ayudaAgave") }),
        h("div", { class: "paso" }, h("h3", {}, h("b", { text: "1" }), t("p1")),
          h("div", { class: "opciones" },
            opcion("tequila", "tequilaD", state.tipo === "tequila", () => set("tipo", "tequila")),
            opcion("mezcal", "mezcalD", state.tipo === "mezcal", () => set("tipo", "mezcal")))),

        state.tipo !== "mezcal" ? h("div", { class: "paso" }, h("h3", {}, h("b", { text: "2" }), t("p2")),
          h("div", { class: "opciones" }, ESTILOS.map(e => opcion(e, e + "D", state.estilo === e, () => set("estilo", e), t(e + "K"))))) :
          h("div", { class: "paso" }, h("p", { class: "nota", text: t("mezcalStyle") })),

        h("div", { class: "paso" }, h("h3", {}, h("b", { text: "3" }), t("p3")),
          h("div", { class: "opciones" }, NIVELES.map(n => opcion(n, n + "D", state.nivel === n, () => set("nivel", n))))),

        hayFiltro ? h("button", { type: "button", class: "ver-resultado", onclick: () => { const r = document.querySelector("#agave .resultado"); r && r.scrollIntoView({ behavior: "smooth", block: "start" }); } },
          h("span", { text: [state.tipo && t(state.tipo), state.estilo && t(state.estilo), state.nivel && t(state.nivel)].filter(Boolean).join(" · ") + " — " + lista.length + " " + (lista.length === 1 ? t("opcion") : t("opciones")) }),
          h("span", { class: "flecha", "aria-hidden": "true", text: "↓" })) : null,
        h("div", { class: "resultado" },
          h("h3", { text: hayFiltro ? t("sugerencias") : t("agave") }),
          avisoOz(),
          lista.length ? lista.map(filaAgave) : h("p", { class: "vacio", text: t("sinRes") }),
          state.tipo === "mezcal" || (!state.tipo && lista.some(i => i.tipo === "mezcal")) ? h("p", { class: "nota", text: L(C.agave.mezcalNota) }) : null,
          hayFiltro ? h("button", { class: "reset", type: "button", onclick: () => { state.tipo = state.estilo = state.nivel = null; pintar(true); }, text: t("limpiar") }) : null),

        extras.length ? h("div", { class: "extras" }, h("h3", { class: "eyebrow", text: t("extras") }),
          extras.map(e => h("div", { class: "fila-agave" },
            h("h4", {}, L(e.nombre), e.propuesta ? h("small", { text: t("nuevo") }) : null),
            e.precio != null ? h("div", { class: "precio", text: money(e.precio) }) : h("span"),
            e.desc || e.nota ? h("p", { text: [L(e.desc), L(e.nota)].filter(Boolean).join(" ") }) : null,
            e.sabores ? h("div", { class: "sabores" }, h("span", { class: "sabores-t", text: t("sabores") }), e.sabores.map(s => h("span", { class: "sabor", text: L(s) }))) : null))) : null,

        h("p", { class: "lema", text: sa(t("lema2")) }),
        h("p", { class: "nota", style: "text-align:center;margin-top:18px", text: t("resp") })));
  }

  function irAgave(id) {
    state.q = ""; $("#q").value = ""; state.tipo = state.estilo = state.nivel = null; state.resalta = id;
    pintar(true);
    const e = document.getElementById("ag-" + id); if (e) e.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // ---------- pintado general ----------

  function pintar(mantener) {
    const y = window.scrollY;
    const cont = $("#secciones"); cont.replaceChildren();
    let n = 0;
    const soloFiltrosComida = state.veg || state.sinlac || state.singlu;
    // Tequila y mezcal van primero dentro de las bebidas: la guía se pinta justo antes de "Bebidas"
    C.categorias.forEach(cat => {
      if (cat.id === "bebidas" && !soloFiltrosComida) cont.append(seccionAgave());
      const s = seccionCategoria(cat); if (s) { cont.append(s); n++; }
    });
    if (!n && soloFiltrosComida) cont.append(h("p", { class: "vacio", text: t("vacio") }));
    if (!n && !soloFiltrosComida && state.q && !cont.querySelector(".fila-agave")) cont.append(h("p", { class: "vacio", text: t("vacio") }));
    pintarTabs();
    $("#legal").textContent = L(C.meta.impuestos) + "  ·  " + (t("actualizado") + " ") + C.meta.actualizado;
    if (mantener) window.scrollTo(0, y);
    observar();
  }

  function pintarTabs() {
    const tabs = $("#tabs"); tabs.replaceChildren();
    const secs = [...document.querySelectorAll("[data-cat]")];
    secs.forEach(s => {
      const cat = C.categorias.find(c => c.id === s.dataset.cat);
      const nombre = cat ? L(cat.nombre) : t("agave");
      tabs.append(h("a", { class: "tab" + (s.dataset.cat === "agave" ? " agave" : ""), href: "#" + s.id, "data-for": s.id, text: nombre }));
    });
  }

  let io;
  function observar() {
    io && io.disconnect();
    io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) {
        document.querySelectorAll(".tab").forEach(a => a.classList.toggle("on", a.dataset.for === e.target.id));
        const on = document.querySelector(".tab.on"), bar = $("#tabs");
        on && bar.scrollTo({ left: on.offsetLeft - bar.clientWidth / 2 + on.offsetWidth / 2, behavior: "smooth" });
      }});
    }, { rootMargin: "-140px 0px -65% 0px" });
    document.querySelectorAll("[data-cat]").forEach(s => io.observe(s));
  }

  function textosFijos() {
    $("#q").placeholder = t("ph");
    const f = $("#filtros"); f.replaceChildren();
    [["veg", t("veg")], ["sinlac", t("sinlac")], ["singlu", t("singlu")]].forEach(([k, txt]) =>
      f.append(h("button", { type: "button", class: "chip", "aria-pressed": state[k], onclick: e => { state[k] = !state[k]; e.currentTarget.setAttribute("aria-pressed", state[k]); pintar(true); } }, txt)));
  }

  document.addEventListener("langchange", () => { lang = OL.get(); textosFijos(); pintar(true); });
  let tm; $("#q").addEventListener("input", e => { clearTimeout(tm); tm = setTimeout(() => { state.q = norm(e.target.value).trim(); pintar(true); }, 120); });

  textosFijos(); pintar();
  if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 50);
})();
