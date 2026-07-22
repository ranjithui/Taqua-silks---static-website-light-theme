# Taqua Silks — Ultra-Premium Luxury Silk Saree Website

A cinematic, fully responsive luxury storefront for **Taqua Silks**, a fictional Indian silk saree house. Built as a self-contained static website with an *ivory & zari* light identity, gold accents, and immersive motion.

## ✦ Highlights

- **Ivory & zari light theme** — warm champagne paper, animated woven-jacquard sheen in gold thread, bronzed jaali/mandala brocade behind everything, and floating gold particles (canvas). No flat backgrounds.
- **Sections** — Preloader · Transparent→glass Navbar · Split Hero · Featured Collections · Why Choose · New Arrivals grid · Best Sellers slider · Bridal banner · About · Reviews · Instagram masonry · Newsletter · Footer.
- **Luxury UI** — glassmorphism cards, gold borders, silk dividers, temple-border ornament, ripple buttons, gold-shine text.
- **Motion** — GSAP + ScrollTrigger parallax, scroll-reveal, image zoom, tilt, floating elements (all respect `prefers-reduced-motion`).
- **Interactive** — working wishlist & cart counters, quick-add, toasts, slider nav, mobile menu, newsletter.
- **Local imagery** — all photos are downloaded to `images/photos/` (silk sarees, models, brides, children in ethnic wear) so the site loads reliably offline, with a hand-drawn **SVG silk-swatch fallback** on every `<img>` as a safety net.
- **Aadi festival promo** — a scrolling announcement ribbon + a festive "Aadi Thiruvizha" offers section with a live countdown and a click-to-copy coupon.
- **Kids Collection** — dedicated premium section with 8 category cards, festive banner, floating petals & sparkles.
- **Performance / SEO / a11y** — semantic HTML, meta + Open Graph tags, lazy loading, keyboard-reachable controls, reduced-motion support.

## ✦ Run it

Just open `index.html` in any modern browser. No build step. For best results (fonts/GSAP CDN), stay online — but it degrades gracefully offline via the SVG fallbacks.

Optional local server:

```bash
npx serve .
# or
python -m http.server 8000
```

## ✦ Structure

```
index.html      Markup for all sections
css/style.css   Design system: palette, silk textures, glass, animations, responsive
js/main.js      Particles, scroll reveal, GSAP parallax, products, cart/wishlist, fallbacks
```

## ✦ Palette

| Token | Hex | Use |
|---|---|---|
| Paper | `#FBF6EC` | page ground |
| Paper (raised) | `#FFFFFF` | cards, glass |
| Ink | `#2B211A` | headings |
| Ink (body) | `#4A3B2E` | paragraphs |
| Zari Gold | `#D4AF37` | ornament, fills |
| Gold Ink | `#8A6A20` | gold *text* (legible on paper) |
| Brand Maroon | `#B23A47` | primary CTAs |

Gold text never uses `#D4AF37` on a pale surface — it only clears ~2:1 there. Use `--gold-ink` instead.

The light layer lives in one block at the bottom of `css/style.css` (`LIGHT THEME — "Ivory & Zari"`); delete it to fall back to the dark espresso theme underneath.

**Type:** Cormorant Garamond (headings) · Poppins (body).

## ✦ Image credits

Photos in `images/photos/` are sourced from **Wikimedia Commons** (silk sarees, weaving, children's attire — freely licensed) and **Unsplash** (hero model, bridal, portrait avatars — Unsplash License). They are illustrative placeholders for this demo; replace them with your own licensed product photography for a real launch. Keep the same filenames (e.g. `hero-model.jpg`, `kanchi-1.jpg`, `kids-1.jpg`) and the site picks them up automatically.

> Product names, prices, offers, and imagery are illustrative placeholders for demonstration.
