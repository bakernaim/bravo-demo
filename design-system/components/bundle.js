/* @ds-bundle: {"format":4,"namespace":"Bravo","components":[{"name":"Button"},{"name":"Tag"},{"name":"Icon"},{"name":"ProductImage"},{"name":"ProductCard"},{"name":"SizePicker"},{"name":"Header"},{"name":"CategoryTile"},{"name":"Storefront"},{"name":"ProductPage"}]} */
(function () {
  var React = window.React, h = React.createElement, useState = React.useState;
  var LOGO = "/_blob/3a6212663db76e66dc869e6abea51715";
  var MARK = "/_blob/37e91e8ae70df3f3e2a8d7eb0234697b";
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function money(n, cur) { return (cur || "") + Number(n).toFixed(2); }

  var PATHS = {
    search: ["M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z", "M16 16l5 5"],
    bag: ["M5 8h14l-1 13H6L5 8z", "M9 8V6a3 3 0 0 1 6 0v2"],
    heart: ["M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"],
    user: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"],
    arrow: ["M4 12h16", "M14 6l6 6-6 6"],
    truck: ["M2 6h12v10H2z", "M14 10h4l3 3v3h-7", "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
    swap: ["M4 8h14l-3-3", "M20 16H6l3 3"],
    star: ["M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3z"],
    ruler: ["M3 15L15 3l6 6L9 21z", "M7 11l2 2M10 8l2 2M13 5l2 2"]
  };
  function Icon(p) {
    var d = PATHS[p.name] || [];
    return h("svg", { className: cx("bv-icon", p.className), viewBox: "0 0 24 24", "aria-hidden": p.label ? null : "true", role: p.label ? "img" : null, "aria-label": p.label || null },
      d.map(function (x, i) { return h("path", { key: i, d: x }); }));
  }

  function Button(p) {
    var v = p.variant || "primary";
    var rest = Object.assign({}, p); delete rest.variant; delete rest.size; delete rest.block; delete rest.icon;
    return h("button", Object.assign({ type: "button" }, rest, {
      className: cx("bv-btn bv-label", "bv-btn-" + v, p.size === "sm" && "bv-btn-sm", p.block && "bv-btn-block", p.className)
    }), p.children, p.icon ? h(Icon, { name: p.icon }) : null);
  }

  function Tag(p) {
    return h("span", { className: cx("bv-tag bv-label", p.tone && "bv-tag-" + p.tone, p.className) }, p.children);
  }

  var SHOES = {
    heel: "M22 30 C 24 42 24 50 22 58 L 28 100 L 32 100 L 34 64 C 60 66 90 76 118 80 L 150 80 C 158 80 158 72 150 70 C 130 64 112 56 96 50 C 84 47 72 52 60 50 C 46 48 34 40 22 30 Z",
    flat: "M10 70 C 12 58 26 50 44 50 L 96 48 C 116 48 140 54 152 62 C 158 66 156 72 148 72 L 18 72 C 12 72 10 71 10 70 Z M 44 50 C 52 58 70 60 90 54",
    boot: "M40 10 L 80 10 L 82 58 C 100 60 130 64 148 70 C 156 73 156 82 148 82 L 36 82 L 36 70 Z M 36 82 L 36 94 L 50 94 L 50 82",
    sneaker: "M10 74 L 12 52 C 30 50 44 40 56 30 L 76 38 C 90 46 118 52 140 58 C 152 62 156 70 152 78 L 14 78 Z M 12 70 L 152 70 M 60 40 L 70 50 M 68 36 L 78 46"
  };
  function ProductImage(p) {
    var tone = p.tone || "soft";
    return h("div", { className: cx("bv-photo", tone !== "soft" && "bv-photo-" + tone, p.className), style: p.style },
      p.src ? h("img", { src: p.src, alt: p.alt || "" }) :
      h("svg", { className: "bv-shoe", viewBox: "0 0 164 110", role: "img", "aria-label": p.alt || "Product photo placeholder" },
        h("path", { d: SHOES[p.shape || "heel"] })),
      p.children);
  }

  function ProductCard(p) {
    var st = useState(!!p.favorite), fav = st[0], setFav = st[1];
    var onSale = p.salePrice != null;
    return h("div", { className: cx("bv-card", p.className) },
      h(ProductImage, { src: p.image, alt: p.name, tone: p.tone, shape: p.shape },
        h("div", { className: "bv-card-tags" },
          p.isNew ? h(Tag, null, "New") : null,
          onSale ? h(Tag, { tone: "sale" }, "Sale") : null),
        h("button", { className: "bv-iconbtn bv-card-fav", "aria-pressed": fav ? "true" : "false", "aria-label": fav ? "Remove from wishlist" : "Add to wishlist", onClick: function () { setFav(!fav); } },
          h(Icon, { name: "heart" }))),
      h("div", null,
        p.category ? h("div", { className: "bv-label bv-muted", style: { marginBottom: 4 } }, p.category) : null,
        h("h3", { className: "bv-card-name" }, p.name)),
      h("div", { className: "bv-card-meta" },
        h("div", null,
          h("span", { className: cx("bv-price", onSale && "bv-price-sale") }, money(onSale ? p.salePrice : p.price, p.currency)),
          onSale ? h("span", { className: "bv-price-was" }, money(p.price, p.currency)) : null),
        p.colors ? h("div", { className: "bv-swatches", "aria-label": p.colors.length + " colours" },
          p.colors.map(function (c, i) { return h("span", { key: i, className: "bv-swatch", style: { background: c } }); })) : null));
  }

  function SizePicker(p) {
    var sizes = p.sizes || [36, 37, 38, 39, 40, 41];
    var soldOut = p.soldOut || [];
    var st = useState(p.value != null ? p.value : null), val = st[0], setVal = st[1];
    return h("div", { className: p.className },
      h("div", { className: "bv-sizes-head" },
        h("span", { className: "bv-label" }, "Size (EU)", val != null ? h("span", { className: "bv-muted" }, " — " + val) : null),
        h("a", { href: "#", className: "bv-label bv-eyebrow", style: { textDecoration: "none", display: "inline-flex", gap: 6, alignItems: "center" } }, h(Icon, { name: "ruler" }), "Size guide")),
      h("div", { className: "bv-sizes", role: "radiogroup", "aria-label": "Size" },
        sizes.map(function (s) {
          var out = soldOut.indexOf(s) > -1;
          return h("button", { key: s, className: "bv-size", role: "radio", "aria-checked": val === s ? "true" : "false", disabled: out, title: out ? "Sold out" : null,
            onClick: function () { setVal(s); p.onChange && p.onChange(s); } }, s);
        })));
  }

  function Header(p) {
    var links = p.links || ["Heels", "Flats", "Boots", "Sneakers", "Bags", "Sale"];
    return h("div", null,
      p.promo !== false ? h("div", { className: "bv-promo bv-label" }, p.promo || "Free delivery on orders over 300 · Easy exchanges within 14 days") : null,
      h("header", { className: "bv-header" },
        h("nav", { className: "bv-nav bv-label", "aria-label": "Main" },
          links.map(function (l) { return h("a", { key: l, href: "#", "aria-current": l === p.current ? "page" : null, style: l === "Sale" ? { color: "var(--sale)" } : null }, l); })),
        h("a", { href: "#", "aria-label": "Bravo Shoes home" }, h("img", { className: "bv-logo", src: p.logo || MARK, alt: "Bravo Shoes" })),
        h("div", { className: "bv-actions" },
          h("button", { className: "bv-iconbtn", "aria-label": "Search" }, h(Icon, { name: "search" })),
          h("button", { className: "bv-iconbtn", "aria-label": "Account" }, h(Icon, { name: "user" })),
          h("button", { className: "bv-iconbtn", "aria-label": "Wishlist" }, h(Icon, { name: "heart" })),
          h("button", { className: "bv-iconbtn", "aria-label": "Bag, " + (p.bagCount || 0) + " items" }, h(Icon, { name: "bag" }),
            p.bagCount ? h("span", { className: "bv-count" }, p.bagCount) : null))));
  }

  function CategoryTile(p) {
    return h("a", { href: p.href || "#", className: cx("bv-cat", p.className) },
      h(ProductImage, { src: p.image, alt: p.name, tone: p.tone || "soft", shape: p.shape }),
      h("div", { className: "bv-cat-cap" },
        h("span", { className: "bv-cat-name" }, p.name),
        h("span", { className: "bv-label", style: { display: "inline-flex", gap: 8, alignItems: "center", color: "var(--gold)" } }, p.count != null ? p.count + " styles" : "Shop", h(Icon, { name: "arrow" }))));
  }

  var PRODUCTS = [
    { name: "Stiletto Pump", category: "Heels", price: 189, isNew: true, shape: "heel", colors: ["#1f1b16", "#c9a27e", "#a3352b"] },
    { name: "Ballet Flat Lune", category: "Flats", price: 129, salePrice: 95, shape: "flat", tone: "raised", colors: ["#e8dcc6", "#1f1b16"] },
    { name: "Ankle Boot Noor", category: "Boots", price: 245, shape: "boot", tone: "espresso", colors: ["#1f1b16", "#6b4a33"] },
    { name: "Court Sneaker", category: "Sneakers", price: 149, isNew: true, shape: "sneaker", colors: ["#ffffff", "#a8945a"] },
    { name: "Slingback Aria", category: "Heels", price: 175, shape: "heel", tone: "raised", colors: ["#a8945a", "#1f1b16"] },
    { name: "Loafer Sienna", category: "Flats", price: 159, shape: "flat", colors: ["#6b4a33"] },
    { name: "Chelsea Boot", category: "Boots", price: 229, salePrice: 179, shape: "boot", colors: ["#1f1b16"] },
    { name: "Block Heel Mule", category: "Heels", price: 165, shape: "heel", tone: "espresso", colors: ["#e8dcc6", "#1f1b16"] }
  ];

  function Footer() {
    function col(t, items) { return h("div", null, h("div", { className: "bv-label" }, t), items.map(function (i) { return h("a", { key: i, href: "#", className: "body-sm" }, i); })); }
    return h("footer", { className: "bv-footer" },
      h("div", null, h("img", { src: LOGO, alt: "Bravo Shoes", style: { height: 96 } }),
        h("p", { className: "bv-muted", style: { color: "var(--on-espresso)", opacity: .75, maxWidth: 260, fontSize: 14 } }, "Shoes for every step — heels, flats and boots chosen for comfort and shine.")),
      col("Shop", ["New in", "Heels", "Flats", "Boots", "Sale"]),
      col("Help", ["Delivery", "Exchanges", "Size guide", "Contact us"]),
      h("div", null, h("div", { className: "bv-label" }, "Join the list"),
        h("p", { style: { fontSize: 14, opacity: .8 } }, "New arrivals and private sales, first."),
        h("div", { style: { display: "flex", gap: 8 } }, h("input", { className: "bv-input", placeholder: "Email address", "aria-label": "Email address" }), h(Button, { variant: "onDark", size: "sm" }, "Join")),
        h("a", { href: "https://www.instagram.com/bravo.shoes_/", className: "bv-label", style: { marginTop: 24, color: "var(--gold)" } }, "@bravo.shoes_ on Instagram")));
  }

  function Storefront(p) {
    var cur = p.currency || "";
    return h("div", { className: "bv-root" },
      h(Header, { bagCount: 2 }),
      h("section", { className: "bv-hero" },
        h("div", { className: "bv-hero-copy" },
          h("span", { className: "bv-label", style: { color: "var(--gold)" } }, "New season · Autumn 2026"),
          h("h1", null, "Step into ", h("em", null, "Bravo.")),
          h("p", { style: { fontSize: 17, lineHeight: "26px", maxWidth: 420, opacity: .85, margin: 0 } }, "Heels that carry you through the evening, flats for every day, and boots made for the cold months ahead."),
          h("div", { style: { display: "flex", gap: 16, marginTop: 8 } },
            h(Button, { variant: "primary", icon: "arrow" }, "Shop new in"),
            h(Button, { variant: "onDark" }, "View lookbook"))),
        h("div", { className: "bv-hero-art" }, h("img", { src: MARK, alt: "" }))),
      h("div", { className: "bv-wrap" },
        h("section", { className: "bv-section" },
          h("div", { className: "bv-section-head" },
            h("div", null, h("div", { className: "bv-label bv-eyebrow", style: { marginBottom: 8 } }, "Collections"), h("h2", { className: "heading bv-display", style: { margin: 0 } }, "Shop by category")),
            h(Button, { variant: "link" }, "All shoes")),
          h("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 } },
            h(CategoryTile, { name: "Heels", count: 48, shape: "heel" }),
            h(CategoryTile, { name: "Flats", count: 32, shape: "flat", tone: "raised" }),
            h(CategoryTile, { name: "Boots", count: 21, shape: "boot" }),
            h(CategoryTile, { name: "Sneakers", count: 17, shape: "sneaker", tone: "raised" }))),
        h("section", { className: "bv-section" },
          h("div", { className: "bv-section-head" },
            h("div", null, h("div", { className: "bv-label bv-eyebrow", style: { marginBottom: 8 } }, "Just landed"), h("h2", { className: "heading bv-display", style: { margin: 0 } }, "New arrivals")),
            h(Button, { variant: "link" }, "See all 64")),
          h("div", { className: "bv-grid" }, PRODUCTS.map(function (x, i) { return h(ProductCard, Object.assign({ key: i, currency: cur }, x)); }))),
        h("div", { className: "bv-values" },
          [["truck", "Free delivery", "On every order over 300."], ["swap", "Easy exchanges", "Wrong size? Swap within 14 days."], ["star", "Hand-picked", "Every pair chosen by the Bravo team."]].map(function (v) {
            return h("div", { key: v[0] }, h(Icon, { name: v[0] }), h("div", null, h("div", { className: "bv-label", style: { marginBottom: 4 } }, v[1]), h("div", { className: "body-sm bv-muted" }, v[2])));
          }))),
      h(Footer));
  }

  function ProductPage(p) {
    var cur = p.currency || "";
    return h("div", { className: "bv-root" },
      h(Header, { bagCount: 2, current: "Heels", promo: false }),
      h("div", { className: "bv-pdp" },
        h("div", { className: "bv-gallery" },
          h(ProductImage, { shape: "heel" }), h(ProductImage, { shape: "heel", tone: "raised" }), h(ProductImage, { shape: "heel", tone: "espresso" })),
        h("div", { className: "bv-pdp-info" },
          h("div", { className: "bv-label bv-crumbs" }, "Home / Heels / Stiletto Pump"),
          h("div", { style: { display: "flex", gap: 8 } }, h(Tag, null, "New"), h(Tag, { tone: "solid" }, "Bestseller")),
          h("h1", null, "Stiletto Pump"),
          h("div", { className: "bv-price", style: { fontSize: 22 } }, money(189, cur)),
          h("p", { className: "body bv-muted", style: { margin: 0 } }, "A pointed-toe pump in soft nappa leather with a slender 9 cm heel. Cushioned insole for evenings that run late."),
          h("div", null, h("div", { className: "bv-label", style: { marginBottom: 12 } }, "Colour — Black"),
            h("div", { style: { display: "flex", gap: 10 } }, ["#1f1b16", "#c9a27e", "#a3352b"].map(function (c, i) {
              return h("span", { key: c, style: { width: 28, height: 28, borderRadius: 999, background: c, boxShadow: i === 0 ? "0 0 0 2px var(--surface), 0 0 0 3px var(--ink)" : "inset 0 0 0 1px var(--hairline)" } });
            }))),
          h(SizePicker, { value: 38, soldOut: [36, 41] }),
          h("div", { style: { display: "flex", gap: 12 } },
            h(Button, { variant: "primary", block: true, icon: "bag" }, "Add to bag"),
            h("button", { className: "bv-iconbtn", "aria-label": "Add to wishlist", style: { width: 48, height: 48, border: "1px solid var(--gold)" } }, h(Icon, { name: "heart" }))),
          h("hr", { className: "bv-rule" }),
          h("div", { className: "bv-details body-sm" },
            [["Upper", "Nappa leather"], ["Heel", "9 cm stiletto"], ["Delivery", "2–4 working days"], ["Exchanges", "Free within 14 days"]].map(function (r) {
              return h("div", { key: r[0] }, h("span", { className: "bv-muted" }, r[0]), h("span", null, r[1]));
            })))),
      h("div", { className: "bv-wrap" }, h("section", { className: "bv-section" },
        h("div", { className: "bv-section-head" }, h("h2", { className: "heading bv-display", style: { margin: 0 } }, "Complete the look")),
        h("div", { className: "bv-grid" }, PRODUCTS.slice(4, 8).map(function (x, i) { return h(ProductCard, Object.assign({ key: i, currency: cur }, x)); })))),
      h(Footer));
  }

  window.Bravo = Object.assign(window.Bravo || {}, {
    Button: Button, Tag: Tag, Icon: Icon, ProductImage: ProductImage, ProductCard: ProductCard, SizePicker: SizePicker,
    Header: Header, CategoryTile: CategoryTile, Storefront: Storefront, ProductPage: ProductPage,
    assets: { logo: LOGO, mark: MARK }
  });
})();
