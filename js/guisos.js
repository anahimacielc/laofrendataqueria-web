/* Guisos para llevar: tarjetas de textura → detalle con fotos → pedido por WhatsApp.
   Datos: data.guisos en data/carta-data.js (se editan en admin.html). */
(function () {
  let C = window.CARTA;
  try { if (/[?&]borrador/.test(location.search)) { const d = localStorage.getItem("ofrenda-borrador"); if (d) C = JSON.parse(d); } } catch (e) {}
  const OL = window.OFRENDA_LANG, G = C.guisos, KEY = "ofrenda-pedido";
  const T = s => OL.T(s), L = o => OL.L(o);
  const $ = s => document.querySelector(s);
  const money = (n, loc) => new Intl.NumberFormat(loc || OL.locale(), { style: "currency", currency: C.meta.moneda || "EUR" }).format(n);

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

  // ---------- pedido ----------
  const items = () => G.grupos.flatMap(g => g.items).filter(i => i.visible !== false);
  const byId = id => items().find(i => i.id === id);
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const lines = () => Object.entries(cart).map(([id, q]) => ({ it: byId(id), q })).filter(x => x.it && x.q > 0);
  const total = () => lines().reduce((s, x) => s + x.q * x.it.precio, 0);
  const count = () => lines().reduce((s, x) => s + x.q, 0);
  function setQty(id, q) { q = Math.max(0, Math.min(99, q)); q ? cart[id] = q : delete cart[id]; save(); refrescar(); }

  function stepper(id, small) {
    return h("div", { class: "stepper" + (small ? " sm" : "") },
      h("button", { type: "button", "aria-label": T("Quitar"), onclick: e => { e.stopPropagation(); setQty(id, (cart[id] || 0) - 1); } }, "−"),
      h("span", { text: String(cart[id] || 0), "aria-label": T("Cantidad") }),
      h("button", { type: "button", "aria-label": T("Añadir al pedido"), onclick: e => { e.stopPropagation(); setQty(id, (cart[id] || 0) + 1); } }, "+"));
  }

  // ---------- lista ----------
  function tarjeta(it) {
    return h("button", { type: "button", class: "g-card", onclick: () => abrirGuiso(it.id) },
      h("img", { src: it.foto, alt: L(it.nombre), loading: "lazy" }),
      h("span", { class: "g-info" }, h("span", { class: "g-nombre", text: L(it.nombre) }), h("span", { class: "g-precio", text: money(it.precio) })),
      cart[it.id] ? h("span", { class: "g-cant", text: "× " + cart[it.id] }) : null);
  }
  const CHILE = () => { const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "chile"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = '<path d="M14.2 4.1c.1-1 .8-1.9 1.9-2.1M12.6 5.6c-2.9-.9-5.3 1-6.2 4-.8 2.6-.4 6 1.9 9.1 1.4 1.9 3.4 3 5.3 3.1 2.7.1 4.3-1.8 3.5-4.4-.7-2.3-.4-3.8-.9-6-.4-2-1.5-4.8-3.6-5.8z" fill="currentColor"/><path d="M12.6 5.6c.6-1.1 1.7-1.7 2.9-1.3" fill="none" stroke="#7ba04b" stroke-width="1.6" stroke-linecap="round"/>'; return s; };
  function filaComp(it) {
    const picor = it.picor ? h("span", { class: "picor", "aria-label": it.picor + "/5" }, [1, 2, 3, 4, 5].map(i => h("span", { class: i <= it.picor ? "" : "off", text: "●" }))) : null;
    return h("div", { class: "g-fila" }, h("div", {}, h("div", { class: "g-nombre" }, it.picor ? CHILE() : null, L(it.nombre)), picor), h("div", { class: "g-fila-der" }, h("span", { class: "g-precio", text: money(it.precio) }), stepper(it.id, true)));
  }
  function pintar() {
    const box = $("#lista"); box.replaceChildren();
    G.grupos.forEach(g => {
      const its = g.items.filter(i => i.visible !== false); if (!its.length) return;
      const conFoto = its.every(i => i.foto);
      box.append(h("section", { class: "seccion" }, h("div", { class: "grupo" }, h("h3", { text: L(g.nombre) }),
        conFoto ? h("div", { class: "g-grid" }, its.map(tarjeta)) : [g.galeria ? h("div", { class: "g-comp-fotos" }, g.galeria.map(s => h("img", { src: s, alt: L(g.nombre), loading: "lazy" }))) : null, its.map((it, i) => [it.picor && !its[i - 1]?.picor ? h("h4", { class: "g-sub-salsas" }, CHILE(), T("Salsas")) : null, filaComp(it)])])));
    });
    barra();
  }

  // Cantidad elegida en el detalle (no toca el pedido hasta pulsar «Añadir al pedido»)
  let cantidadNueva = 1;
  function localStepper() {
    const n = h("span", { text: String(cantidadNueva), "aria-label": T("Cantidad") });
    const cambia = d => { cantidadNueva = Math.max(1, Math.min(99, cantidadNueva + d)); n.textContent = String(cantidadNueva); };
    return h("div", { class: "stepper" }, h("button", { type: "button", "aria-label": T("Quitar"), onclick: () => cambia(-1) }, "−"), n, h("button", { type: "button", "aria-label": T("Añadir al pedido"), onclick: () => cambia(1) }, "+"));
  }
  let avisoT;
  function aviso(txt) {
    let el = $("#aviso"); if (!el) { el = h("div", { id: "aviso", class: "aviso", role: "status" }); document.body.append(el); }
    el.textContent = T("Añadido") + " · " + txt; el.classList.add("on"); clearTimeout(avisoT); avisoT = setTimeout(() => el.classList.remove("on"), 2400);
  }

  // ---------- detalle ----------
  let abierto = null;
  function abrirGuiso(id) { abierto = id; cantidadNueva = 1; pintarGuiso(); const d = $("#dlg-guiso"); if (!d.open) d.showModal(); }
  function pintarGuiso() {
    const it = byId(abierto), d = $("#dlg-guiso"); if (!it) return;
    let actual = 0; const fotos = it.fotos || [it.foto];
    const principal = h("img", { class: "g-principal", src: fotos[0], alt: L(it.nombre) });
    const mini = fotos.map((f, i) => h("button", { type: "button", class: "g-mini" + (i === 0 ? " on" : ""), "aria-label": T("Fotos del guiso") + " " + (i + 1), onclick: e => {
      principal.src = f; d.querySelectorAll(".g-mini").forEach(b => b.classList.remove("on")); e.currentTarget.classList.add("on"); } }, h("img", { src: f, alt: "", loading: "lazy" })));
    d.replaceChildren(
      h("button", { type: "button", class: "dlg-cerrar", "aria-label": T("Cerrar"), onclick: () => d.close() }, "×"),
      h("div", { class: "g-detalle" },
        h("div", { class: "g-galeria" }, principal, h("div", { class: "g-minis" }, mini)),
        h("div", { class: "g-texto" },
          h("p", { class: "eyebrow", text: T("Guisos artesanales para llevar") }),
          h("h2", { text: OL.sa(L(it.nombre)) }),
          h("p", { class: "g-precio-grande", text: money(it.precio) + " · 500 gr" }),
          it.desc ? h("p", { text: L(it.desc) }) : null,
          h("p", { class: "nota", text: T("Presentación de 500 gr, envasado al alto vacío. Rinde unos 20-25 tacos.") }),
          h("div", { class: "g-accion" }, localStepper(), h("button", { type: "button", class: "btn btn-lima", onclick: () => { const q = cantidadNueva; cantidadNueva = 1; d.close(); setQty(it.id, (cart[it.id] || 0) + q); aviso(q + " × " + L(it.nombre)); } }, T("Añadir al pedido"))),
          h("p", { class: "nota", text: T("Añade tortillas y salsas para completar tu taquiza.") }))));
  }

  // ---------- recogida: solo días y horas dentro del horario del local ----------
  const aMin = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const hhmm = n => String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0");
  function huecos() {
    const H = C.meta.horario || {}, paso = C.meta.recogidaCadaMin || 30, mAbrir = C.meta.recogidaMargenAbrir ?? 30, mCerrar = C.meta.recogidaMargenCerrar ?? 30;
    const ahora = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
    const minAhora = ahora.getHours() * 60 + ahora.getMinutes(), out = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + i);
      const slots = [];
      (H[String(d.getDay())] || []).forEach(r => { const [a, b] = r.split("-").map(aMin); for (let m = a + mAbrir; m <= b - mCerrar; m += paso) if (i > 0 || m > minAhora) slots.push(hhmm(m)); });
      if (slots.length) out.push({ fecha: d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"), d, i, slots });
    }
    return out;
  }
  const etiquetaDia = (x, loc) => (x.i === 0 && !loc ? T("Hoy") + " · " : x.i === 1 && !loc ? T("Mañana") + " · " : "") + x.d.toLocaleDateString(loc || OL.locale(), { weekday: "long", day: "numeric", month: "long" });

  // ---------- barra + panel de pedido ----------
  function barra() {
    const n = count(), b = $("#barra-pedido");
    b.hidden = n === 0;
    $("#abrir-pedido").textContent = T("Ver pedido") + " · " + n + " · " + money(total());
  }
  function abrirPedido() { pintarPedido(); const d = $("#dlg-pedido"); if (!d.open) d.showModal(); }
  const campos = { nombre: "", dia: "", hora: "", notas: "" };
  try { Object.assign(campos, JSON.parse(localStorage.getItem(KEY + "-datos") || "{}")); } catch (e) {}
  const guardaCampos = () => { try { localStorage.setItem(KEY + "-datos", JSON.stringify(campos)); } catch (e) {} };

  function recogidaTexto() {
    const x = huecos().find(h => h.fecha === campos.dia); if (!x || !x.slots.includes(campos.hora)) return "";
    return etiquetaDia(x, "es-ES") + " a las " + campos.hora;
  }
  const listo = () => !!recogidaTexto();

  function mensaje() {
    // El mensaje va siempre en español: lo lee el equipo del restaurante.
    const es = new Intl.NumberFormat("es-ES", { style: "currency", currency: C.meta.moneda || "EUR" });
    const ls = lines().map(({ it, q }) => "• " + q + " × " + it.nombre.es + " — " + es.format(q * it.precio));
    return ["¡Hola! Quiero hacer un pedido de guisos y productos envasados para recoger:", "", ...ls, "", "Total: " + es.format(total()),
      campos.nombre ? "Nombre: " + campos.nombre : "", recogidaTexto() ? "Recoger: " + recogidaTexto() : "", campos.notas ? "Notas: " + campos.notas : "",
      "", "(Pedido desde la web · idioma del cliente: " + OL.get().toUpperCase() + ")"].filter((x, i, a) => !(x === "" && (a[i - 1] === "" || i === a.length - 1))).join("\n");
  }
  function pintarPedido() {
    const d = $("#dlg-pedido"), ls = lines();
    const cerrar = h("button", { type: "button", class: "dlg-cerrar", "aria-label": T("Cerrar"), onclick: () => d.close() }, "×");
    if (!ls.length) { d.replaceChildren(cerrar, h("div", { class: "g-pedido" }, h("h2", { text: OL.sa(T("Tu pedido")) }), h("p", { text: T("Tu pedido está vacío.") }))); return; }
    const campo = (k, ph, area) => { const e = h(area ? "textarea" : "input", { placeholder: T(ph), rows: area ? 2 : null, type: area ? null : "text", "aria-label": T(ph) }); e.value = campos[k]; e.addEventListener("input", () => { campos[k] = e.value; guardaCampos(); estadoWa(); }); return e; };
    const wa = h("a", { class: "btn btn-lima", target: "_blank", rel: "noopener", text: T("Enviar pedido de guisos por WhatsApp") });
    const estadoWa = () => { const ok = listo(); wa.href = ok ? "https://wa.me/" + C.meta.whatsapp + "?text=" + encodeURIComponent(mensaje()) : "#"; wa.setAttribute("aria-disabled", ok ? "false" : "true"); wa.classList.toggle("off", !ok); const f = d.querySelector(".g-falta"); if (f) f.hidden = ok; };
    wa.addEventListener("click", e => { if (!listo()) e.preventDefault(); });
    const recogida = () => {
      const dias = huecos();
      if (!dias.find(x => x.fecha === campos.dia)) { campos.dia = ""; campos.hora = ""; }
      const selDia = h("select", { "aria-label": T("Día de recogida") }, h("option", { value: "", text: T("Día de recogida") }), dias.map(x => h("option", { value: x.fecha, text: etiquetaDia(x) })));
      const selHora = h("select", { "aria-label": T("Hora") });
      const llena = () => { const x = dias.find(y => y.fecha === campos.dia); selHora.replaceChildren(h("option", { value: "", text: T("Hora") }), ...(x ? x.slots.map(s => h("option", { value: s, text: s })) : [])); selHora.disabled = !x; if (x && !x.slots.includes(campos.hora)) campos.hora = ""; selHora.value = campos.hora; };
      selDia.value = campos.dia; llena();
      selDia.addEventListener("change", () => { campos.dia = selDia.value; campos.hora = ""; guardaCampos(); llena(); estadoWa(); });
      selHora.addEventListener("change", () => { campos.hora = selHora.value; guardaCampos(); estadoWa(); });
      return h("div", { class: "g-recogida" }, selDia, selHora);
    };
    d.replaceChildren(cerrar, h("div", { class: "g-pedido" },
      h("h2", { text: OL.sa(T("Tu pedido")) }),
      h("div", { class: "g-lineas" }, ls.map(({ it, q }) => h("div", { class: "g-linea" },
        h("div", {}, h("div", { class: "g-nombre", text: L(it.nombre) }), h("div", { class: "nota", text: money(it.precio) })),
        stepper(it.id, true), h("div", { class: "g-precio", text: money(it.precio * q) })))),
      h("div", { class: "g-total" }, h("span", { text: T("Total") }), h("strong", { text: money(total()) })),
      campo("nombre", "Tu nombre"), recogida(), campo("notas", "Notas (opcional)", true),
      h("p", { class: "nota g-falta", hidden: listo() ? true : null, text: T("Elige día y hora de recogida") }),
      wa,
      h("button", { type: "button", class: "btn btn-borde", onclick: () => d.close() }, T("Seguir añadiendo")),
      h("button", { type: "button", class: "reset", onclick: () => { cart = {}; save(); refrescar(); d.close(); }, text: T("Vaciar pedido") }),
      h("p", { class: "nota", text: T("El pedido de guisos se envía por WhatsApp y se recoge en el local.") })));
    estadoWa();
  }

  function refrescar() {
    pintar();
    if ($("#dlg-guiso").open) pintarGuiso();
    if ($("#dlg-pedido").open) pintarPedido();
  }

  $("#abrir-pedido").addEventListener("click", abrirPedido);
  document.querySelectorAll("dialog.dlg").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));
  document.addEventListener("langchange", refrescar);
  pintar();
})();
