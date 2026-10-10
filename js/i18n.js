/* Idiomas del sitio: ES (base) · EN · DE · FR · NL · PT
   Los textos del HTML están en español. Las traducciones viven en data/i18n.js (window.I18N.str),
   indexadas por el texto en español: si cambias un texto en español y no existe su traducción,
   se muestra la versión en inglés (si hay) o el español. Selector: menú en la cabecera o ?lang=de */
(function () {
  const LANGS = [["es", "ES", "Español"], ["en", "EN", "English"], ["de", "DE", "Deutsch"], ["fr", "FR", "Français"], ["nl", "NL", "Nederlands"], ["pt", "PT", "Português"]];
  const CODES = LANGS.map(l => l[0]);
  const LOCALES = { es: "es-ES", en: "en-GB", de: "de-DE", fr: "fr-FR", nl: "nl-NL", pt: "pt-PT" };
  const store = { get() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }, set(v) { try { localStorage.setItem("lang", v); } catch (e) {} } };
  const norm = s => (s || "").replace(/\s+/g, " ").trim();
  const STR = () => window.I18N_L || {};
  // Los archivos de idioma (data/i18n-xx.js) se cargan solo cuando hacen falta
  const BASE = (document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/js\/i18n\.js.*$/, "") : "";
  const loaded = {};
  function loadLang(l) {
    if (l === "es" || (window.I18N_L && window.I18N_L[l])) return Promise.resolve();
    return loaded[l] || (loaded[l] = new Promise(res => { const s = document.createElement("script"); s.src = BASE + "data/i18n-" + l + ".js"; s.onload = s.onerror = () => res(); document.head.append(s); }));
  }

  function initial() {
    const q = new URLSearchParams(location.search).get("lang");
    if (CODES.includes(q)) { store.set(q); return q; }
    const s = store.get(); if (CODES.includes(s)) return s;
    for (const l of (navigator.languages || [navigator.language || "es"])) { const c = (l || "").slice(0, 2).toLowerCase(); if (CODES.includes(c)) return c; }
    return "es";
  }
  let lang = initial();

  // Beauty (fuente demo) no tiene acentos: los títulos en script van sin ellos
  const sa = s => (s || "").replace(/ß/g, "ss").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[¿¡]/g, "");

  /** Traduce un texto en español. Devuelve null si no hay traducción. */
  function tr(es, l = lang) {
    if (l === "es" || !es) return es;
    const d = STR()[l];
    return d && d[norm(es)] !== undefined ? d[norm(es)] : null;
  }
  /** Texto de un objeto {es,en,...} (datos de la carta). Fallback: idioma → traducción por texto ES → en → es. */
  function L(o, l = lang) {
    if (Array.isArray(o)) return o;
    if (o == null || typeof o !== "object") return o ?? "";
    if (l === "es") return o.es ?? "";
    if (o[l]) return o[l];
    return tr(o.es, l) ?? o.en ?? o.es ?? "";
  }
  const T = (es, l = lang) => tr(es, l) ?? es;
  /** Para listas de textos (columnas de precios). */
  const LA = (o, l = lang) => { const base = o.es || []; if (l === "es") return base; if (o[l]) return o[l]; return base.map((x, i) => tr(x, l) ?? (o.en && o.en[i]) ?? x); };

  // ---------- escaneo del HTML estático ----------
  const SKIP = "script,style,noscript,svg,.lang-select,dialog.dlg,.barra-pedido,[data-no-i18n],.resena,address,.logos,#post,#lista,#secciones,.blog-grid,.tabs,#filtros,.agave-res";
  const INLINE = new Set(["B", "STRONG", "EM", "I", "U", "SMALL", "SUP", "BR", "TIME"]);
  const TAGS = "h1,h2,h3,h4,p,li,summary,td,th,label,figcaption,a,button,span,small,div,option,legend";
  const letters = /[A-Za-zÀ-ÿ]/;
  const isLeaf = el => [...el.children].every(c => INLINE.has(c.tagName) || (c.tagName === "SPAN" && !c.id && !c.className && !c.children.length)) && letters.test(el.textContent) && !el.closest(SKIP);
  function nodes() {
    const all = [...document.querySelectorAll(TAGS)].filter(isLeaf), set = new Set(all);
    return all.filter(el => { for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false; return true; });
  }
  const script = el => el.matches("h1,h2") && !el.closest(".articulo");

  function apply() {
    document.documentElement.lang = lang;
    nodes().forEach(el => {
      if (el._es === undefined) { el._o = el.innerHTML; el._es = norm(el.innerHTML); }
      const t = lang === "es" ? null : tr(el._es);
      el.innerHTML = t ?? el._o;
      if (script(el)) el.textContent = sa(el.textContent);
    });
    document.querySelectorAll("[placeholder]").forEach(el => { if (el._ph === undefined) el._ph = el.getAttribute("placeholder"); el.setAttribute("placeholder", tr(el._ph) ?? el._ph); });
    document.querySelectorAll("img[alt]").forEach(el => { if (el._alt === undefined) el._alt = el.getAttribute("alt"); if (el._alt) el.setAttribute("alt", tr(el._alt) ?? el._alt); });
    // mensajes precargados de WhatsApp (wa.me/...?text=...)
    document.querySelectorAll('a[href*="wa.me"][href*="text="]').forEach(a => {
      if (a._wa === undefined) a._wa = a.getAttribute("href");
      const [base, q] = a._wa.split("?text="); let es = q; try { es = decodeURIComponent(q); } catch (e) {}
      a.setAttribute("href", lang === "es" ? a._wa : base + "?text=" + encodeURIComponent(tr(es) ?? es));
    });
    if (window.__title === undefined) window.__title = document.title;
    document.title = tr(window.__title) ?? window.__title;
    const md = document.querySelector('meta[name="description"]');
    if (md) { if (md._d === undefined) md._d = md.content; md.content = tr(md._d) ?? md._d; }
    const sel = document.querySelector(".lang-select"); if (sel) sel.value = lang;
  }

  function set(l) {
    if (!CODES.includes(l) || l === lang) return;
    lang = l; store.set(l);
    const u = new URL(location.href); if (u.searchParams.has("lang")) { u.searchParams.set("lang", l); history.replaceState(null, "", u); }
    loadLang(l).then(() => { apply(); document.dispatchEvent(new CustomEvent("langchange", { detail: l })); });
  }

  function selector() {
    const wrap = document.querySelector(".top .wrap"), nav = document.querySelector(".top nav");
    if (!wrap) return;
    const s = document.createElement("select"); s.className = "lang-select"; s.setAttribute("aria-label", "Idioma / Language"); s.title = "Idioma / Language";
    LANGS.forEach(([c, short, name]) => { const o = document.createElement("option"); o.value = c; o.textContent = short; o.title = name; s.append(o); });
    s.value = lang; s.addEventListener("change", () => set(s.value));
    nav ? nav.after(s) : wrap.append(s);
  }

  /** Utilidad de mantenimiento: lista de textos en español detectados en esta página. */
  function collect() { return [...new Set(nodes().map(el => norm(el._o !== undefined ? el._o : el.innerHTML)))]; }

  window.OFRENDA_LANG = { get: () => lang, set, tr, T, L, LA, sa, collect, LANGS, locale: () => LOCALES[lang] };
  selector(); apply();
  // Si el idioma no es español: cargar su archivo y volver a pintar (las páginas escuchan "langchange")
  if (lang !== "es") loadLang(lang).then(() => { apply(); document.dispatchEvent(new CustomEvent("langchange", { detail: lang })); });
})();
