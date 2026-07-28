/* ============================================================
   TAQUA SILKS — Interactions & Animations
   ============================================================ */
(function () {
  "use strict";

  /* -------- Use the real logo image if present (images/logo.png) -------- */
  // On success, <html> gets `.logo-ready`, which swaps the text logo for the image
  // in the navbar, loading screen, and footer. If the file is missing, the elegant
  // looping bilingual text logo stays.
  (function () {
    const probe = new Image();
    probe.onload = () => document.documentElement.classList.add("logo-ready");
    probe.src = "images/logo.png";
  })();

  /* -------- Elegant silk-swatch fallback for any failed image -------- */
  /* Light theme: champagne / sand swatches so a missing photo still
     reads as raw silk on an ivory page rather than a dark hole. */
  const PALETTE = [
    ["#F2E6D2", "#DCC49C"],
    ["#F6ECD9", "#E3CFAE"],
    ["#EADCC0", "#D3B98F"],
    ["#F0E3CC", "#D8BE93"],
  ];
  function silkSVG(label, seed) {
    const [a, b] = PALETTE[seed % PALETTE.length];
    const text = (label || "Taqua Silks").replace(/&/g, "&amp;");
    // woven texture + zari border + paisley motif + label
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='700' height='875' viewBox='0 0 700 875'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/>
        </linearGradient>
        <pattern id='weave' width='8' height='8' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'>
          <rect width='8' height='8' fill='transparent'/>
          <rect width='8' height='2' fill='rgba(255,255,255,0.45)'/>
          <rect y='4' width='8' height='2' fill='rgba(120,92,45,0.10)'/>
        </pattern>
        <radialGradient id='glow' cx='0.3' cy='0.25' r='0.9'>
          <stop offset='0' stop-color='rgba(212,175,55,0.28)'/><stop offset='1' stop-color='transparent'/>
        </radialGradient>
      </defs>
      <rect width='700' height='875' fill='url(#g)'/>
      <rect width='700' height='875' fill='url(#weave)'/>
      <rect width='700' height='875' fill='url(#glow)'/>
      <rect x='22' y='22' width='656' height='831' fill='none' stroke='#A07C22' stroke-opacity='0.55' stroke-width='1.5' rx='14'/>
      <g fill='none' stroke='#A07C22' stroke-opacity='0.6' stroke-width='2'>
        <path d='M350 300 c-70 -60 -150 10 -80 80 c40 40 80 40 80 90 c0 -50 40 -50 80 -90 c70 -70 -10 -140 -80 -80z'/>
        <circle cx='350' cy='360' r='16'/>
      </g>
      <g fill='#A07C22' fill-opacity='0.55'>
        ${Array.from({length:11},(_,i)=>`<circle cx='${70+i*56}' cy='620' r='3'/>`).join("")}
        ${Array.from({length:11},(_,i)=>`<rect x='${63+i*56}' y='632' width='14' height='14' rx='2' fill-opacity='0.3'/>`).join("")}
      </g>
      <text x='350' y='730' text-anchor='middle' fill='#6b5215' font-family='Georgia, serif' font-size='38' font-style='italic'>${text}</text>
      <text x='350' y='770' text-anchor='middle' fill='#8a6a20' font-family='Poppins, sans-serif' font-size='15' letter-spacing='6'>TAQUA SILKS</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  let imgSeed = 0;
  // Any of these extensions works — drop drape-04.png or drape-04.webp and it is
  // found automatically, whatever the markup happens to say.
  const EXTS = ["jpg", "png", "webp", "jpeg", "avif"];

  // Fallback chain: primary src → same name with each other extension →
  // optional data-fallback → woven-silk SVG swatch. So a not-yet-added
  // drape-XX file quietly shows the branded silk placeholder instead of breaking.
  function attachFallback(img) {
    // Product/gallery images are passed here at creation and again by the
    // page-wide sweep below; two handlers would consume the queue twice.
    if (img.dataset.fbAttached) return;
    img.dataset.fbAttached = "1";

    const seed = imgSeed++;
    const src = img.getAttribute("src") || "";
    const m = src.match(/^(.*)\.([a-z0-9]+)$/i);

    // Queue of alternative sources to try, in order.
    const queue = [];
    if (m && EXTS.includes(m[2].toLowerCase())) {
      EXTS.forEach((e) => { if (e !== m[2].toLowerCase()) queue.push(`${m[1]}.${e}`); });
    }
    const fb = img.getAttribute("data-fallback");
    if (fb) queue.push(fb);

    function handle() {
      if (queue.length) { img.src = queue.shift(); return; }
      img.removeEventListener("error", handle);
      img.src = silkSVG(img.getAttribute("data-label") || img.alt, seed);
    }
    img.addEventListener("error", handle);
    // if already failed before listener attached
    if (img.complete && img.naturalWidth === 0) handle();
  }

  /* -------- Product data (Lehenga · Grand Wedding · Draping Sarees) -------- */
  // `img` is the drape-XX slot each card pulls from — see images/photos/_ADD-YOUR-MANNEQUIN-IMAGES.md
  const arrivals = [
    { name: "Wedding Collection", cat: "Wedding Silk", price: "₹64,000", was: "₹78,000", rating: 5, badge: "New", tag: "new", label: "Wedding Collection", img: 7 },
    { name: "Festive Collection", cat: "Festive Silk", price: "₹38,500", was: "", rating: 5, badge: "New", tag: "new", label: "Festive Collection", img: 8 },
    { name: "Everyday Collection", cat: "Everyday Silk", price: "₹12,900", was: "₹16,000", rating: 5, badge: "-19%", tag: "off", label: "Everyday Collection", img: 9 },
    { name: "Traditional Collection", cat: "South Indian", price: "₹42,500", was: "₹52,000", rating: 5, badge: "-18%", tag: "off", label: "Traditional Collection", img: 10 },
  ];
  const bestsellers = [
    { name: "Pure Silk", cat: "Signature Pick", price: "₹48,000", was: "₹58,000", rating: 5, badge: "Iconic", tag: "off", label: "Pure Silk", img: 11 },
    { name: "Handloom", cat: "Signature Pick", price: "₹36,900", was: "₹43,000", rating: 5, badge: "Iconic", tag: "off", label: "Handloom", img: 12 },
    { name: "Premium Collection", cat: "Signature Pick", price: "₹79,000", was: "₹92,000", rating: 5, badge: "Iconic", tag: "off", label: "Premium Collection", img: 13 },
    { name: "New Arrivals", cat: "Signature Pick", price: "₹41,500", was: "₹49,000", rating: 5, badge: "Iconic", tag: "off", label: "New Arrivals", img: 14 },
  ];

  /* ============================================================
     PLUG-AND-PLAY MANNEQUIN IMAGES
     Drop your studio mannequin-drape photos into images/photos/ named
     drape-01.png … drape-12.png. Each appears automatically. Until a file
     exists, the matched premium stock photo (2nd column) shows instead —
     so nothing ever looks broken while you gather images.
     ============================================================ */
  const drapePath = (n) => `images/photos/drape-${String(n).padStart(2, "0")}.png`;

  // Gallery pool — the adult saree slots (drape-01 … drape-14). Until a file
  // exists, the woven-silk placeholder shows automatically via attachFallback().
  const POOL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const poolAt = (i) => POOL[i % POOL.length];

  function productCard(p) {
    const el = document.createElement("article");
    el.className = "product-card reveal";
    el.innerHTML = `
      <div class="product-media">
        <img src="${drapePath(p.img)}" alt="${p.name}" data-label="${p.label}" loading="lazy" />
      </div>
      <div class="product-body">
        <span class="cat">${p.cat}</span>
        <h4>${p.name}</h4>
        <a href="#contact" class="link">View Design <i class="fa-solid fa-arrow-right"></i></a>
      </div>`;
    el.querySelectorAll("img").forEach(attachFallback);
    return el;
  }

  /* -------- Render products -------- */
  /* The Signature Picks section was folded into Latest Collection, so both
     sets render into the one grid. Data arrays stay separate for editing. */
  const arrivalsGrid = document.getElementById("arrivalsGrid");
  if (arrivalsGrid) {
    /* Sticky-stack: the cards are dealt into layers that pin one after another
       and pile up as you scroll. --i is the layer's depth, which CSS turns into
       its resting offset so each pinned layer's top edge stays visible under
       the ones that follow. Change PER_LAYER to re-deal the stack. */
    const PER_LAYER = 4;
    const all = arrivals.concat(bestsellers);
    for (let i = 0; i < all.length; i += PER_LAYER) {
      const layer = document.createElement("div");
      layer.className = "stack-layer";
      layer.style.setProperty("--i", i / PER_LAYER);
      const inner = document.createElement("div");
      inner.className = "stack-inner";
      all.slice(i, i + PER_LAYER).forEach((p) => inner.appendChild(productCard(p)));
      layer.appendChild(inner);
      arrivalsGrid.appendChild(layer);
    }
  }

  /* -------- Gallery masonry (section removed from the page; kept guarded) -------- */
  const galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid) {
    const gLabels = ["Draped in Gold", "Bridal Radiance", "Temple Weave", "Zari Detail", "Royal Violet", "Handloom Art", "The Muhurtham", "Silk Folds"];
    for (let i = 0; i < 8; i++) {
      const d = document.createElement("a");
      d.href = "#gallery";
      d.className = "g-item reveal";
      const img = document.createElement("img");
      img.src = drapePath(poolAt(i + 1));
      img.alt = gLabels[i];
      img.setAttribute("data-label", gLabels[i]);
      img.loading = "lazy";
      attachFallback(img);
      d.appendChild(img);
      galleryGrid.appendChild(d);
    }
  }

  /* -------- Testimonials marquee --------
     Duplicate the cards so translateX(-50%) lands on an identical frame and
     the loop has no visible seam. Clones are aria-hidden so screen readers
     and the tab order still see each testimonial exactly once. Only after
     cloning do we switch the wrapper into looping mode — if this never runs,
     the CSS leaves it as a plain swipeable row. */
  const reviewsTrack = document.querySelector(".reviews-track");
  const reviewsMarquee = reviewsTrack && reviewsTrack.closest(".reviews-marquee");
  if (reviewsTrack && reviewsMarquee) {
    reviewsTrack.querySelectorAll(".review-card").forEach(function (card) {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a, button").forEach(function (el) { el.tabIndex = -1; });
      reviewsTrack.appendChild(clone);
    });
    reviewsMarquee.classList.add("is-looping");
  }

  /* -------- Hero rotator --------
     PLACEHOLDER COPY AND IMAGES — swap the strings and paths below for the
     real ones. Every slide drives the headline block, the photo and BOTH
     floating tags, so all three change together on the same beat. */
  const HERO_SLIDES = [
    {
      eyebrow: "Luxury Silk Collection",
      title: 'Timeless Elegance<br /><em>Woven</em> Into Every Saree',
      sub: "Discover handcrafted silk sarees that celebrate tradition, beauty, and sophistication — draped in the quiet glow of ivory and zari gold.",
      cta: "Explore Collection", href: "#collections",
      img: "images/photos/hero.png",
      alt: "Model draped in an orange checked silk saree with zari border",
      top: { icon: "fa-gem", title: "Zari Woven", sub: "24k Gold Thread" },
      bottom: { icon: "fa-award", title: "Pure Silk Mark", sub: "Certified Handloom" },
    },
    {
      eyebrow: "The Gentlemen's Edit",
      title: 'Tailored Comfort<br /><em>Refined</em> For Every Day',
      sub: "Crisp formal shirts, easy trousers and traditional dhotis — cut clean, finished well, and made to be worn again and again.",
      cta: "Explore Men's Collection", href: "men.html",
      img: "images/products/men-01.png",
      alt: "Men's classic oxford shirt from the Taqua menswear range",
      top: { icon: "fa-scissors", title: "Tailored Fit", sub: "Clean Finish" },
      bottom: { icon: "fa-shirt", title: "Pure Cotton", sub: "Breathable Weave" },
    },
    {
      eyebrow: "The Grace Edit",
      title: 'Everyday Grace<br /><em>Draped</em> In Fine Silk',
      sub: "Sarees, salwars, kurtis and lehengas — colour, fall and finish chosen with the same care we give a bridal drape.",
      cta: "Explore Women's Collection", href: "women.html",
      img: "images/products/women-01.png",
      alt: "Cotton printed salwar set from the Taqua women's range",
      top: { icon: "fa-gem", title: "Handpicked", sub: "Synthetic To Silk" },
      bottom: { icon: "fa-person-dress", title: "Festive Ready", sub: "Rich Zari Borders" },
    },
    {
      eyebrow: "Taqua Little Royals",
      title: 'Little Traditions<br /><em>Big</em> Celebrations',
      sub: "Festive and everyday wear for boys and girls — soft on young skin, easy to move in, and made for photographs.",
      cta: "Explore Kids Collection", href: "kids.html",
      img: "images/products/kids-04.png",
      alt: "Boys silk shirt and dhoti set from the Taqua kids range",
      top: { icon: "fa-star", title: "Skin-Friendly", sub: "Soft Cotton Blends" },
      bottom: { icon: "fa-award", title: "Festive Fits", sub: "Sized For Little Ones" },
    },
    {
      eyebrow: "Aadi Offer Season",
      title: 'Aadi <em>Thallupadi</em><br />Is Here',
      sub: "Season-special pricing across silk, cotton and daily-wear drapes — for the month of Aadi only, while stocks last.",
      cta: "See Aadi Offers", href: "#collections",
      img: "images/products/women-17.png",
      alt: "Stonework saree featured in the Aadi season offer",
      top: { icon: "fa-tag", title: "Aadi Special", sub: "Season Pricing" },
      bottom: { icon: "fa-gift", title: "This Month Only", sub: "While Stocks Last" },
    },
  ];

  const hero = document.getElementById("home");
  if (hero && HERO_SLIDES.length > 1) {
    // Local copy: the shared prefersReduced is declared further down the file,
    // and schedule() runs immediately — reading it here would hit the temporal
    // dead zone of its const and throw before the page finished wiring up.
    const heroStill = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (sel) => hero.querySelector(sel);
    const el = {
      eyebrow: q("[data-hero-eyebrow]"), title: q("[data-hero-title]"), sub: q("[data-hero-sub]"),
      cta: q("[data-hero-cta]"), img: q("[data-hero-img]"), dots: q("[data-hero-dots]"),
      tIcon: q("[data-hero-badge-t] [data-hero-icon]"), tTitle: q("[data-hero-t-title]"), tSub: q("[data-hero-t-sub]"),
      bIcon: q("[data-hero-badge-b] [data-hero-icon]"), bTitle: q("[data-hero-b-title]"), bSub: q("[data-hero-b-sub]"),
    };

    // Warm the cache so a slide never fades in to a half-loaded photo.
    HERO_SLIDES.forEach((s) => { const i = new Image(); i.src = s.img; });

    let at = 0, timer = null, held = false;

    function paint(i) {
      const s = HERO_SLIDES[i];
      el.eyebrow.textContent = s.eyebrow;
      el.title.innerHTML = s.title;
      el.sub.textContent = s.sub;
      el.cta.innerHTML = s.cta + ' <i class="fa-solid fa-arrow-right"></i>';
      el.cta.setAttribute("href", s.href);
      el.img.setAttribute("src", s.img);
      el.img.setAttribute("alt", s.alt);
      el.tIcon.className = "fa-solid " + s.top.icon;
      el.tIcon.setAttribute("data-hero-icon", "");
      el.tTitle.textContent = s.top.title;
      el.tSub.textContent = s.top.sub;
      el.bIcon.className = "fa-solid " + s.bottom.icon;
      el.bIcon.setAttribute("data-hero-icon", "");
      el.bTitle.textContent = s.bottom.title;
      el.bSub.textContent = s.bottom.sub;
      Array.prototype.forEach.call(el.dots.children, function (d, n) {
        d.setAttribute("aria-selected", n === i ? "true" : "false");
      });
      at = i;
    }

    const DWELL = 5000; // every slide is held this long, once it has landed
    const FADE = 450;   // must match the opacity transition in style.css

    /* Chained timeout rather than setInterval. On a fixed interval the clock
       runs during the crossfade, so slide one is seen for the full 5s while
       every later slide loses the fade to it. Starting the count only after
       the new slide has landed gives all five an identical 5s on screen. */
    function schedule() {
      clearTimeout(timer);
      if (heroStill) return; // no unattended motion
      timer = setTimeout(function () {
        if (held) { schedule(); return; }
        go((at + 1) % HERO_SLIDES.length);
      }, DWELL);
    }

    function go(i, instant) {
      clearTimeout(timer);
      if (i === at) { schedule(); return; }
      if (instant || heroStill) { paint(i); schedule(); return; }
      hero.classList.add("is-swapping");
      setTimeout(function () {
        paint(i);
        hero.classList.remove("is-swapping");
        schedule();
      }, FADE);
    }

    HERO_SLIDES.forEach(function (s, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", s.eyebrow);
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.addEventListener("click", function () { go(i); });
      el.dots.appendChild(dot);
    });
    // Hold while it is being read or the dots are being used.
    ["pointerenter", "focusin"].forEach(function (ev) {
      hero.addEventListener(ev, function () { held = true; }, { passive: true });
    });
    ["pointerleave", "focusout"].forEach(function (ev) {
      hero.addEventListener(ev, function () { held = false; }, { passive: true });
    });
    // A background tab still fires timers; without this you return to a hero
    // that has silently cycled several times.
    document.addEventListener("visibilitychange", function () {
      held = document.hidden;
    });
    schedule();
  }

  /* -------- Horizontal rails --------
     Scroll by one card plus its gap, measured from the live layout so it
     stays correct across the clamp() card widths and breakpoints. */
  const stillMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-rail]").forEach(function (rail) {
    const scope = rail.parentElement || document;
    const prev = scope.querySelector("[data-rail-prev]");
    const next = scope.querySelector("[data-rail-next]");
    const auto = rail.hasAttribute("data-rail-auto") && !stillMotion;

    // width of one full set of cards, measured live so it survives the
    // clamp() card sizing and the mobile breakpoint
    function setWidth(count) {
      const card = rail.firstElementChild;
      if (!card) return 0;
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      return count * (card.getBoundingClientRect().width + gap);
    }
    // How many cards make one original set — filled in once the auto rail has
    // cloned itself. setSpan() is the distance that rewinds to an identical frame.
    let setCount = 0;
    function setSpan() { return setCount ? setWidth(setCount) : 0; }
    /* On an auto rail the drift writes scrollLeft every frame, which cancels
       the browser's smooth scroll mid-flight — the arrows would twitch and
       snap back. Yield the rail to the click for the length of that animation,
       then let the drift pick up from wherever it landed. */
    let yieldUntil = 0;
    function step(dir) {
      const one = setSpan();
      // At the head of the rail there is nothing to the left to scroll into.
      // Hop forward one identical set first (instant — .is-auto sets
      // scroll-behavior:auto) so "previous" has somewhere to go and the loop
      // stays endless in both directions.
      if (auto && dir < 0 && one && rail.scrollLeft < setWidth(1)) rail.scrollLeft += one;
      if (auto) yieldUntil = performance.now() + 700;
      rail.scrollBy({ left: dir * setWidth(1), behavior: "smooth" });
    }
    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });

    if (!auto) {
      // finite rail: grey out the arrow that has nowhere left to go
      function sync() {
        const max = rail.scrollWidth - rail.clientWidth - 1;
        if (prev) prev.disabled = rail.scrollLeft <= 0;
        if (next) next.disabled = rail.scrollLeft >= max;
      }
      rail.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      sync();
      return;
    }

    /* Auto-scroller. Duplicate the cards so that rewinding by exactly one
       set lands on an identical frame — the loop has no seam and no snap
       back to the start. Clones are hidden from assistive tech and taken
       out of the tab order so each weave is still announced once. */
    setCount = rail.children.length;
    Array.prototype.slice.call(rail.children).forEach(function (card) {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a, button").forEach(function (el) { el.tabIndex = -1; });
      rail.appendChild(clone);
    });
    rail.classList.add("is-auto");

    // Hovering, focusing or touching holds it still — these cards are links,
    // and nobody should have to chase a moving target to click one.
    let held = 0;
    // The arrows sit outside the rail, so listening on the rail alone left the
    // drift running while they were being clicked.
    const holdZones = [rail];
    const navBox = scope.querySelector(".rail-nav");
    if (navBox) holdZones.push(navBox);
    holdZones.forEach(function (zone) {
      ["pointerenter", "focusin", "touchstart"].forEach(function (ev) {
        zone.addEventListener(ev, function () { held = 1; }, { passive: true });
      });
      ["pointerleave", "focusout", "touchend", "touchcancel"].forEach(function (ev) {
        zone.addEventListener(ev, function () { held = 0; }, { passive: true });
      });
    });

    const PX_PER_SEC = 32;
    let last = 0;
    function drift(now) {
      if (last && !held && now >= yieldUntil) {
        rail.scrollLeft += ((now - last) / 1000) * PX_PER_SEC;
      }
      // Wrap in both directions so a manual step never runs off either end.
      const one = setSpan();
      if (one) {
        if (rail.scrollLeft >= one * 2) rail.scrollLeft -= one;
        else if (rail.scrollLeft >= one && now >= yieldUntil && !held) rail.scrollLeft -= one;
      }
      last = now;
      requestAnimationFrame(drift);
    }
    requestAnimationFrame(drift);
  });

  // attach fallback to all static page images too
  document.querySelectorAll("img").forEach(attachFallback);

  /* -------- Preloader -------- */
  window.addEventListener("load", () => {
    setTimeout(() => document.getElementById("preloader").classList.add("done"), 600);
  });
  // safety: never trap the user behind the preloader
  setTimeout(() => document.getElementById("preloader").classList.add("done"), 3500);

  /* -------- Navbar scroll -------- */
  const navbar = document.getElementById("navbar");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 60);
    toTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* -------- Atelier ribbon (dismissible) -------- */
  const announce = document.getElementById("announce");
  if (announce) {
    if (sessionStorage.getItem("ribbonDismissed") === "1") {
      announce.style.display = "none";
    } else {
      document.body.classList.add("has-announce");
    }
    document.getElementById("announceClose").addEventListener("click", () => {
      announce.style.display = "none";
      document.body.classList.remove("has-announce");
      sessionStorage.setItem("ribbonDismissed", "1");
    });
  }

  /* -------- Mobile menu -------- */
  const mobileMenu = document.getElementById("mobileMenu");
  document.getElementById("hamburger").addEventListener("click", () => mobileMenu.classList.add("open"));
  document.getElementById("menuClose").addEventListener("click", () => mobileMenu.classList.remove("open"));
  // Category titles (Men/Women/Kids) act as accordion toggles — tap to reveal the
  // dropdown of sub-categories instead of navigating away or closing the menu.
  mobileMenu.querySelectorAll(".mm-title").forEach((t) =>
    t.addEventListener("click", (e) => {
      e.preventDefault();
      const group = t.closest(".mm-group");
      const wasOpen = group.classList.contains("open");
      // Close any other open group so only one dropdown shows at a time.
      mobileMenu.querySelectorAll(".mm-group.open").forEach((g) => g.classList.remove("open"));
      group.classList.toggle("open", !wasOpen);
    })
  );
  // Any other link (including the sub-category links) closes the menu on navigation.
  mobileMenu.querySelectorAll("a:not(.mm-title)").forEach((a) => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

  /* -------- Newsletter -------- */
  // The toast popup was removed from the layout, so the form just clears
  // itself on submit — nothing is announced back to the visitor.
  document.getElementById("newsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
  });

  /* -------- Ripple on buttons -------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const r = document.createElement("span");
      r.className = "ripple";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + "px";
      r.style.left = e.clientX - rect.left - size / 2 + "px";
      r.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  /* -------- Best sellers slider nav (section removed; kept guarded) -------- */
  const slider = document.getElementById("bestSlider");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  if (slider && nextBtn && prevBtn) {
    const step = 324;
    nextBtn.addEventListener("click", () => slider.scrollBy({ left: step, behavior: "smooth" }));
    prevBtn.addEventListener("click", () => slider.scrollBy({ left: -step, behavior: "smooth" }));
  }

  /* -------- Tilt effect (subtle, pointer only) -------- */
  if (window.matchMedia("(hover:hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* -------- Scroll reveal -------- */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* -------- GSAP parallax (progressive enhancement) -------- */
  if (window.gsap && window.ScrollTrigger && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".hero-frame img", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    // The bridal banner is deliberately left out: its frame is locked to the
    // photo's own 1616:973 ratio so the whole shot fits, which leaves no
    // overflow for a parallax to slide through. Drifting it ±8% just exposed
    // the frame background as a bar along the top or bottom edge.
    gsap.utils.toArray(".about-media .main img").forEach((img) => {
      gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.to(".section-title .accent", { backgroundPosition: "200%", repeat: -1, duration: 5, ease: "none" });
  }

  /* -------- Kids section: floating petals + sparkles -------- */
  const petalBox = document.getElementById("petals");
  if (petalBox && !prefersReduced) {
    const N = 20;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      const spark = i % 4 === 0;
      p.className = "petal" + (spark ? " spark" : "");
      p.style.left = Math.random() * 100 + "%";
      const dur = (spark ? 5 : 8) + Math.random() * 6;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = -(Math.random() * dur) + "s";
      if (!spark) {
        const s = 10 + Math.random() * 12;
        p.style.width = s + "px";
        p.style.height = s + "px";
      }
      petalBox.appendChild(p);
    }
  }

  /* -------- Floating gold particles -------- */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor(W / 24));
    particles = Array.from({ length: count }, () => newParticle(true));
  }
  function newParticle(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      r: Math.random() * 2.2 + 0.5,
      sp: Math.random() * 0.5 + 0.15,
      dx: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.6 + 0.15,
      tw: Math.random() * 0.02 + 0.005,
      t: Math.random() * Math.PI * 2,
    };
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.y -= p.sp;
      p.x += p.dx;
      p.t += p.tw;
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.t));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      /* Light theme: a deeper zari gold — #D4AF37 all but vanishes on ivory */
      ctx.fillStyle = `rgba(160,122,45,${alpha})`;
      ctx.shadowColor = "rgba(160,122,45,0.55)";
      ctx.shadowBlur = 6;
      ctx.fill();
      if (p.y < -10 || p.x < -10 || p.x > W + 10) Object.assign(p, newParticle(false));
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  if (!prefersReduced) {
    resize();
    window.addEventListener("resize", resize);
    draw();
  }
})();
