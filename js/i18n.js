/* ============================================================
   TAQUA SILKS — Language switching (English · Tamil · Hindi)
   ============================================================
   English is the source of truth and lives in the markup itself, so the
   page still reads correctly with JS disabled and crawlers see real copy.
   ta.js / hi.js only carry overrides, keyed by the data-i18n attributes.

   Three ways a string is marked up:
     data-i18n="key"          replace the element's OWN text nodes, leaving
                              child elements (icons, rotator hooks) untouched
     data-i18n-html="key"     replace innerHTML — used only where inline
                              markup sits inside the sentence (<em>, <span>)
     data-i18n-attr="a:k|b:k" replace attributes (alt, aria-label, content…)

   Load order matters: ta.js and hi.js define the dictionaries, this file
   applies them, and main.js then calls T() for anything it renders itself.
   ============================================================ */
(function () {
  "use strict";

  var LANGS = ["en", "ta", "hi"];
  var LABELS = { en: "EN", ta: "தமிழ்", hi: "हिन्दी" };
  var NAMES = { en: "English", ta: "Tamil", hi: "Hindi" };
  var STORE = "taqua.lang";

  var DICTS = window.TAQUA_I18N || {};
  var current = "en";

  /* -------- Preference -------- */
  // Default is English for everyone; a manual switch is remembered from then on.
  function readPref() {
    try {
      var v = localStorage.getItem(STORE);
      return LANGS.indexOf(v) > -1 ? v : "en";
    } catch (e) {
      return "en"; // private mode / storage blocked
    }
  }
  function writePref(lang) {
    try { localStorage.setItem(STORE, lang); } catch (e) { /* non-fatal */ }
  }

  /* -------- Lookup -------- */
  // Exposed for main.js, which renders product cards and hero slides itself.
  function T(key, fallback) {
    var d = DICTS[current];
    return (d && d[key]) || fallback;
  }

  /* -------- Capture the English original, once, from the live DOM -------- */
  /* Read from the DOM rather than a bundled en.js so the two can never drift:
     whatever the markup says IS English. */
  function ownText(el) {
    var out = [];
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && n.nodeValue.trim()) out.push(n);
    }
    return out;
  }

  function capture(el) {
    if (el.__i18n) return el.__i18n;
    var box = {};
    if (el.hasAttribute("data-i18n")) {
      var nodes = ownText(el);
      box.text = nodes.length ? nodes[0].nodeValue.trim() : "";
    }
    if (el.hasAttribute("data-i18n-html")) box.html = el.innerHTML;
    if (el.hasAttribute("data-i18n-attr")) {
      box.attr = {};
      el.getAttribute("data-i18n-attr").split("|").forEach(function (pair) {
        var name = pair.split(":")[0];
        box.attr[name] = el.getAttribute(name);
      });
    }
    el.__i18n = box;
    return box;
  }

  /* -------- Apply -------- */
  function applyTo(el) {
    var orig = capture(el);

    if (el.hasAttribute("data-i18n")) {
      var val = T(el.getAttribute("data-i18n"), orig.text);
      var nodes = ownText(el);
      if (nodes.length) {
        // Keep the original node's surrounding whitespace so a trailing
        // icon (<i class="fa-arrow-right">) doesn't end up glued to the word.
        var raw = nodes[0].nodeValue;
        var lead = raw.match(/^\s*/)[0];
        var tail = raw.match(/\s*$/)[0];
        nodes[0].nodeValue = lead + val + tail;
        // A second text node would re-print the English half of the string.
        for (var i = 1; i < nodes.length; i++) nodes[i].nodeValue = "";
      } else {
        el.textContent = val;
      }
    }

    if (el.hasAttribute("data-i18n-html")) {
      el.innerHTML = T(el.getAttribute("data-i18n-html"), orig.html);
    }

    if (el.hasAttribute("data-i18n-attr")) {
      el.getAttribute("data-i18n-attr").split("|").forEach(function (pair) {
        var bits = pair.split(":");
        var name = bits[0], key = bits[1];
        if (!name || !key) return;
        var v = T(key, orig.attr ? orig.attr[name] : null);
        if (v != null) el.setAttribute(name, v);
      });
    }
  }

  // `root` lets main.js translate a subtree it has just rendered.
  function translate(root) {
    var scope = root || document;
    var sel = "[data-i18n],[data-i18n-html],[data-i18n-attr]";
    if (scope.nodeType === 1 && scope.matches && scope.matches(sel)) applyTo(scope);
    var list = scope.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) applyTo(list[i]);
  }

  function setLang(lang, announce) {
    if (LANGS.indexOf(lang) < 0) lang = "en";
    current = lang;

    var root = document.documentElement;
    root.setAttribute("lang", lang);
    // Drives the Tamil / Devanagari font stacks in style.css.
    LANGS.forEach(function (l) { root.classList.toggle("lang-" + l, l === lang); });

    translate(document);
    syncSwitch();

    if (announce) {
      writePref(lang);
      // main.js re-renders the product cards and repaints the hero from T().
      document.dispatchEvent(new CustomEvent("taqua:lang", { detail: { lang: lang } }));
    }
  }

  /* -------- Switcher UI -------- */
  /* Built here rather than pasted into five HTML files, so the control can
     never drift between pages. */
  function buildSwitch(host, extraClass) {
    var box = document.createElement("div");
    box.className = "lang-switch" + (extraClass ? " " + extraClass : "");
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Choose language");
    LANGS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lang-opt";
      b.setAttribute("data-lang", l);
      b.setAttribute("aria-label", NAMES[l]);
      b.setAttribute("title", NAMES[l]);
      if (l !== "en") b.setAttribute("lang", l);
      b.textContent = LABELS[l];
      b.addEventListener("click", function () { setLang(l, true); });
      box.appendChild(b);
    });
    host.appendChild(box);
  }

  function syncSwitch() {
    var opts = document.querySelectorAll(".lang-opt");
    for (var i = 0; i < opts.length; i++) {
      var on = opts[i].getAttribute("data-lang") === current;
      opts[i].classList.toggle("is-on", on);
      opts[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  var navHost = document.querySelector(".nav-actions");
  // Prepend so the switcher sits left of the hamburger on mobile.
  if (navHost) {
    var holder = document.createElement("span");
    navHost.insertBefore(holder, navHost.firstChild);
    buildSwitch(holder);
  }
  var menuHost = document.getElementById("mobileMenu");
  if (menuHost) buildSwitch(menuHost, "in-menu");

  /* -------- Public surface -------- */
  window.TaquaI18n = {
    t: T,
    translate: translate,
    set: setLang,
    get: function () { return current; },
    langs: LANGS,
  };
  window.T = T;

  setLang(readPref(), false);
})();
