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
     drape-01.jpg … drape-12.jpg. Each appears automatically. Until a file
     exists, the matched premium stock photo (2nd column) shows instead —
     so nothing ever looks broken while you gather images.
     ============================================================ */
  const drapePath = (n) => `images/photos/drape-${String(n).padStart(2, "0")}.jpg`;

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
  const arrivalsGrid = document.getElementById("arrivalsGrid");
  arrivals.forEach((p) => arrivalsGrid.appendChild(productCard(p)));
  const bestSlider = document.getElementById("bestSlider");
  bestsellers.forEach((p) => bestSlider.appendChild(productCard(p)));

  /* -------- Gallery masonry -------- */
  const galleryGrid = document.getElementById("galleryGrid");
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
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

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

  /* -------- Best sellers slider nav -------- */
  const slider = document.getElementById("bestSlider");
  const step = 324;
  document.getElementById("nextBtn").addEventListener("click", () => slider.scrollBy({ left: step, behavior: "smooth" }));
  document.getElementById("prevBtn").addEventListener("click", () => slider.scrollBy({ left: -step, behavior: "smooth" }));

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
