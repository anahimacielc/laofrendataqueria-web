/* Editor de la carta: trabaja sobre window.CARTA, guarda borrador en localStorage
   y descarga un data/carta-data.js nuevo. */
(function () {
  const KEY = "ofrenda-borrador";
  const $ = s => document.querySelector(s);
  let data, actual = "entrantes", sucio = false;

  try { const d = localStorage.getItem(KEY); data = d ? JSON.parse(d) : null; sucio = !!d; } catch (e) {}
  if (!data) data = JSON.parse(JSON.stringify(window.CARTA));

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
  function guardar() {
    sucio = true;
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    const s = $("#estado"); s.textContent = "Borrador guardado · sin publicar"; s.className = "estado sucio";
  }
  function campo(label, valor, onchange, cls, tipo, extra) {
    const inp = h("input", { type: tipo || "text", value: valor ?? "", ...(extra || {}) });
    inp.addEventListener("input", () => { onchange(inp.value); guardar(); });
    return h("label", { class: cls || "f1" }, label, inp);
  }
  function area(label, valor, onchange, cls) {
    const t = h("textarea", {}); t.value = valor || "";
    t.addEventListener("input", () => { onchange(t.value); guardar(); });
    return h("label", { class: cls || "f2" }, label, t);
  }
  const num = v => { const n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? null : Math.round(n * 100) / 100; };

  // ---------- platillos ----------
  function cajaPlato(it, lista, refrescar) {
    const oculto = it.visible === false;
    return h("div", { class: "caja" + (oculto ? " oculto" : "") + (it.propuesta ? " propuesta" : "") },
      h("div", { class: "fila", style: "margin-top:0" },
        h("label", { class: "chk" }, h("input", { type: "checkbox", ...(oculto ? {} : { checked: true }), onchange: e => { if (e.target.checked) delete it.visible; else it.visible = false; guardar(); refrescar(); } }), oculto ? "Oculto en la carta" : "Visible en la carta"),
        it.propuesta ? h("span", { class: "badge nuevo", text: "Propuesta de Creatino" }) : null,
        h("button", { class: "btn btn-borde peligro", type: "button", style: "margin-left:auto", onclick: () => { if (confirm("¿Eliminar «" + (it.nombre.es || "este platillo") + "»? (Mejor ocúltalo si solo lo quitas por un tiempo)")) { lista.splice(lista.indexOf(it), 1); guardar(); refrescar(); } } }, "Eliminar")),
      h("div", { class: "fila" },
        campo("Nombre (ES)", it.nombre.es, v => it.nombre.es = v, "f1"),
        campo("Name (EN)", it.nombre.en, v => it.nombre.en = v, "f1"),
        it.picor ? campo("Picor (1-5)", it.picor, v => it.picor = Math.min(5, Math.max(1, parseInt(v) || 1)), "fp", "number", { min: "1", max: "5" }) : null),
      h("div", { class: "fila" },
        area("Descripción (ES)", it.desc?.es, v => (it.desc ||= {}).es = v),
        area("Description (EN)", it.desc?.en, v => (it.desc ||= {}).en = v)),
      h("div", { class: "fila" },
        ...(it.precios ? it.precios.map(p => campo("Precio · " + (data.etiquetasPrecio[p.etiqueta]?.es || p.etiqueta), p.precio, v => p.precio = num(v), "fp", "number", { step: "0.10", min: "0" }))
                       : [campo("Precio (€)", it.precio, v => it.precio = num(v), "fp", "number", { step: "0.10", min: "0" })]),
        h("div", { class: "f2" }, h("label", {}, "Alérgenos"), h("div", { class: "fila", style: "margin-top:6px" },
          Object.keys(data.alergenos).map(a => h("label", { class: "chk" }, h("input", { type: "checkbox", ...((it.alergenos || []).includes(a) ? { checked: true } : {}), onchange: e => {
            const s = new Set(it.alergenos || []); e.target.checked ? s.add(a) : s.delete(a); it.alergenos = [...s]; if (!it.alergenos.length) delete it.alergenos; guardar(); } }), data.alergenos[a].es)),
          h("label", { class: "chk" }, h("input", { type: "checkbox", ...((it.tags || []).includes("vegetariano") ? { checked: true } : {}), onchange: e => {
            const s = new Set(it.tags || []); e.target.checked ? s.add("vegetariano") : s.delete("vegetariano"); it.tags = [...s]; if (!it.tags.length) delete it.tags; guardar(); } }), "Vegetariano"),
          h("label", { class: "chk" }, h("input", { type: "checkbox", ...(it.popular ? { checked: true } : {}), onchange: e => { e.target.checked ? it.popular = true : delete it.popular; guardar(); } }), "Favorito")))));
  }

  function panelCategoria(cat) {
    const p = h("div", {});
    const refrescar = () => { p.replaceWith(panelCategoria(cat)); };
    p.append(h("div", { class: "caja" }, h("div", { class: "fila", style: "margin-top:0" },
      h("label", { class: "fp" }, "Subir / bajar %", h("input", { type: "number", id: "pct", value: "5", step: "1" })),
      h("button", { class: "btn btn-borde", type: "button", onclick: () => {
        const pct = parseFloat($("#pct").value); if (isNaN(pct)) return;
        const f = x => x == null ? x : Math.round(x * (1 + pct / 100) * 10) / 10;
        cat.grupos.forEach(g => g.items.forEach(it => { if (it.precio != null) it.precio = f(it.precio); (it.precios || []).forEach(q => q.precio = f(q.precio)); }));
        guardar(); refrescar(); } }, "Aplicar a toda la categoría"),
      h("span", { class: "ayuda-adm", text: "Redondea a 0,10 €. Revisa antes de descargar." }))));
    cat.grupos.forEach(g => {
      p.append(h("h2", { class: "t", text: g.nombre ? g.nombre.es : cat.nombre.es }));
      g.items.forEach(it => p.append(cajaPlato(it, g.items, refrescar)));
      p.append(h("button", { class: "btn btn-lima", type: "button", onclick: () => {
        const nuevo = { id: "nuevo-" + Date.now(), nombre: { es: "Nuevo platillo", en: "" }, desc: { es: "", en: "" }, precio: 0 };
        const molde = g.items.find(i => i.precios);
        if (molde) { delete nuevo.precio; nuevo.precios = molde.precios.map(q => ({ etiqueta: q.etiqueta, precio: 0 })); }
        g.items.push(nuevo); guardar(); refrescar(); } }, "+ Añadir a " + (g.nombre ? g.nombre.es : cat.nombre.es)));
    });
    return p;
  }

  // ---------- tequila y mezcal ----------
  function panelAgave() {
    const p = h("div", {}); const refrescar = () => p.replaceWith(panelAgave());
    const A = data.agave, T = data.meta.tiers;
    const tier = it => it.precio < T.economico ? "Económico" : it.precio < T.top ? "Top" : "Premium";
    p.append(h("div", { class: "caja" },
      h("p", { class: "ayuda-adm", text: "El precio es el del chupito de 2 oz. El rango (Económico / Top / Premium) se calcula solo con estos límites y se actualiza al cambiar un precio." }),
      h("div", { class: "fila" },
        campo("Económico por debajo de (€)", T.economico, v => T.economico = num(v), "fp", "number", { step: "0.10" }),
        campo("Top por debajo de (€)", T.top, v => T.top = num(v), "fp", "number", { step: "0.10" }))));
    A.items.forEach(it => p.append(h("div", { class: "caja" + (it.visible === false ? " oculto" : "") },
      h("div", { class: "fila", style: "margin-top:0" },
        h("label", { class: "chk" }, h("input", { type: "checkbox", ...(it.visible === false ? {} : { checked: true }), onchange: e => { e.target.checked ? delete it.visible : it.visible = false; guardar(); refrescar(); } }), "Visible"),
        h("button", { class: "btn btn-borde peligro", type: "button", style: "margin-left:auto", onclick: () => { if (confirm("¿Eliminar " + it.marca + " " + it.nombre + "?")) { A.items.splice(A.items.indexOf(it), 1); guardar(); refrescar(); } } }, "Eliminar")),
      h("div", { class: "fila" },
        campo("Marca", it.marca, v => it.marca = v, "f1"),
        campo("Nombre / versión", it.nombre, v => it.nombre = v, "f1"),
        h("label", { class: "fp" }, "Tipo", (() => { const s = h("select", {}, ["tequila", "mezcal"].map(o => h("option", { value: o, ...(o === it.tipo ? { selected: true } : {}) }, o))); s.addEventListener("change", () => { it.tipo = s.value; if (s.value === "mezcal") it.estilo = "joven"; guardar(); refrescar(); }); return s; })()),
        h("label", { class: "fp" }, "Estilo", (() => { const ops = it.tipo === "mezcal" ? ["joven"] : ["blanco", "reposado", "cristalino"]; const s = h("select", {}, ops.map(o => h("option", { value: o, ...(o === it.estilo ? { selected: true } : {}) }, o))); s.addEventListener("change", () => { it.estilo = s.value; guardar(); }); return s; })()),
        campo("Chupito 2 oz (€)", it.precio, v => { it.precio = num(v); }, "fp", "number", { step: "0.10", min: "0" }),
        h("div", { class: "tier", text: "Rango: " + tier(it) })))));
    p.append(h("button", { class: "btn btn-lima", type: "button", onclick: () => { A.items.push({ id: "nuevo-" + Date.now(), marca: "Marca", nombre: "", tipo: "tequila", estilo: "blanco", precio: 0 }); guardar(); refrescar(); } }, "+ Añadir tequila o mezcal"));
    p.append(h("h2", { class: "t", text: "Extras (banderita, cremas, vuelo)" }));
    A.extras.forEach(e => p.append(h("div", { class: "caja" + (e.visible === false ? " oculto" : "") + (e.propuesta ? " propuesta" : "") },
      h("div", { class: "fila", style: "margin-top:0" },
        h("label", { class: "chk" }, h("input", { type: "checkbox", ...(e.visible === false ? {} : { checked: true }), onchange: ev => { ev.target.checked ? delete e.visible : e.visible = false; guardar(); refrescar(); } }), "Visible"),
        e.propuesta ? h("span", { class: "badge nuevo", text: "Propuesta de Creatino" }) : null),
      h("div", { class: "fila" },
        campo("Nombre (ES)", e.nombre.es, v => e.nombre.es = v), campo("Name (EN)", e.nombre.en, v => e.nombre.en = v),
        campo("Precio (€)", e.precio, v => e.precio = num(v), "fp", "number", { step: "0.10" })),
      e.desc ? h("div", { class: "fila" }, area("Descripción (ES)", e.desc.es, v => e.desc.es = v), area("Description (EN)", e.desc.en, v => e.desc.en = v)) : null)));
    return p;
  }

  // ---------- pestañas ----------
  function pintar() {
    const tabs = $("#adm-tabs"); tabs.replaceChildren();
    [...data.categorias.map(c => [c.id, c.nombre.es]), ["guisos", "Guisos para llevar"], ["agave", "Tequila y mezcal"]].forEach(([id, n]) =>
      tabs.append(h("button", { class: "tab" + (id === actual ? " on" : ""), type: "button", onclick: () => { actual = id; pintar(); } }, n)));
    const panel = $("#panel"); panel.replaceChildren(actual === "agave" ? panelAgave() : panelCategoria(actual === "guisos" ? data.guisos : data.categorias.find(c => c.id === actual)));
    const s = $("#estado"); if (sucio) { s.textContent = "Borrador guardado · sin publicar"; s.className = "estado sucio"; }
  }

  $("#descargar").addEventListener("click", () => {
    data.meta.actualizado = new Date().toISOString().slice(0, 10);
    const cab = "/* La Ofrenda Taquería · datos de la carta · generado con admin.html el " + data.meta.actualizado + " */\n";
    const blob = new Blob([cab + "window.CARTA = " + JSON.stringify(data, null, 2) + ";\n"], { type: "text/javascript" });
    const a = h("a", { href: URL.createObjectURL(blob), download: "carta-data.js" }); document.body.append(a); a.click(); a.remove();
    $("#pasos").showModal();
  });
  $("#descartar").addEventListener("click", () => {
    if (!confirm("Se perderán los cambios del borrador. ¿Continuar?")) return;
    try { localStorage.removeItem(KEY); } catch (e) {} location.reload();
  });
  pintar();
})();
