(function () {
  "use strict";
  var S = window.STORE, C = window.COLLECTIONS, P = [];
  C.forEach(function (c) { c.shoes.forEach(function (sh) { sh.collection = c.id; P.push(sh); }); });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var main = $("#main");

  /* ---------- storage (optional: the site works without it) ---------- */
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var bag = load("bravo-bag", []);
  var favs = load("bravo-favs", []);

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(n) { return S.currency + Number(n).toFixed(2); }
  function priceOf(p) { return p.salePrice != null ? p.salePrice : p.price; }
  function bySlug(s) { return P.filter(function (p) { return p.slug === s; })[0]; }
  function coll(id) { return C.filter(function (c) { return c.id === id; })[0]; }
  function catName(id) { var c = coll(id); return c ? c.name : id; }
  function stock(p, ci, size) { return p.colors[ci].sizes[size] || 0; }
  function allSizes(p) { var o = {}; p.colors.forEach(function (c) { Object.keys(c.sizes).forEach(function (k) { o[k] = 1; }); }); return Object.keys(o).map(Number).sort(function (a, b) { return a - b; }); }
  function inStockAnyColour(p, size) { return p.colors.some(function (c, ci) { return stock(p, ci, size) > 0; }); }
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove("show"); }, 2400); }

  var ICONS = {
    arrow: '<path d="M4 12h16"/><path d="M14 6l6 6-6 6"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    truck: '<path d="M2 6h12v10H2z"/><path d="M14 10h4l3 3v3h-7"/><path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
    swap: '<path d="M4 8h14l-3-3"/><path d="M20 16H6l3 3"/>',
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3z"/>',
    ruler: '<path d="M3 15L15 3l6 6L9 21z"/><path d="M7 11l2 2M10 8l2 2M13 5l2 2"/>',
    insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'
  };
  function icon(n) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n] + "</svg>"; }

  var SHOES = {
    heel: "M22 30 C 24 42 24 50 22 58 L 28 100 L 32 100 L 34 64 C 60 66 90 76 118 80 L 150 80 C 158 80 158 72 150 70 C 130 64 112 56 96 50 C 84 47 72 52 60 50 C 46 48 34 40 22 30 Z",
    flat: "M10 70 C 12 58 26 50 44 50 L 96 48 C 116 48 140 54 152 62 C 158 66 156 72 148 72 L 18 72 C 12 72 10 71 10 70 Z M 44 50 C 52 58 70 60 90 54",
    boot: "M40 10 L 80 10 L 82 58 C 100 60 130 64 148 70 C 156 73 156 82 148 82 L 36 82 L 36 70 Z M 36 82 L 36 94 L 50 94 L 50 82",
    sneaker: "M10 74 L 12 52 C 30 50 44 40 56 30 L 76 38 C 90 46 118 52 140 58 C 152 62 156 70 152 78 L 14 78 Z M 12 70 L 152 70 M 60 40 L 70 50 M 68 36 L 78 46",
    sandal: "M24 60 L 30 100 L 34 100 L 36 70 C 70 74 110 82 150 84 C 158 84 158 78 150 76 L 36 62 Z M 24 60 C 26 50 40 46 46 56 M 70 70 C 76 58 90 56 96 74 M 110 78 C 114 68 126 68 130 80"
  };
  var TONES = ["soft", "raised", "espresso"];
  function photo(p, i, extra, ci) {
    var tone = TONES[(P.indexOf(p) + (i || 0)) % 3];
    var img = p.colors[ci || 0].images[i || 0];
    return '<div class="photo t-' + tone + '">' + (extra || "") +
      (img ? '<img src="' + esc(img) + '" alt="' + esc(p.name) + '" loading="lazy">'
           : '<svg class="shoe" viewBox="0 0 164 110" role="img" aria-label="' + esc(p.name) + ' (photo coming soon)"><path d="' + SHOES[p.shape] + '"/></svg>') + "</div>";
  }

  function priceHTML(p) {
    return p.salePrice != null
      ? '<span class="price price-sale">' + money(p.salePrice) + '</span><span class="price-was">' + money(p.price) + "</span>"
      : '<span class="price">' + money(p.price) + "</span>";
  }
  function favBtn(p, cls) {
    var on = favs.indexOf(p.slug) > -1;
    return '<button class="iconbtn fav ' + (cls || "") + '" data-fav="' + p.slug + '" aria-pressed="' + on + '" aria-label="' + (on ? "Remove from" : "Add to") + ' wishlist">' + icon("heart") + "</button>";
  }
  function card(p) {
    var tags = (p.isNew ? '<span class="tag">New</span>' : "") + (p.salePrice != null ? '<span class="tag tag-sale">Sale</span>' : "");
    return '<article class="card"><div class="card-photo">' + favBtn(p) +
      '<a href="#p-' + p.slug + '" aria-label="' + esc(p.name) + '">' + photo(p, 0, '<div class="card-tags">' + tags + "</div>") + "</a></div>" +
      '<a href="#p-' + p.slug + '"><div><div class="label muted" style="margin-bottom:4px">' + catName(p.collection) + '</div><h3 class="card-name">' + esc(p.name) + "</h3></div></a>" +
      '<div class="card-meta"><div>' + priceHTML(p) + '</div><div class="swatches">' +
      p.colors.map(function (c) { return '<span class="swatch" title="' + esc(c.name) + '" style="background:' + c.hex + '"></span>'; }).join("") + "</div></div></article>";
  }
  function grid(list) { return '<div class="grid">' + list.map(card).join("") + "</div>"; }

  /* ---------- navigation ---------- */
  var NAV = [["#new", "New in"]].concat(C.map(function (c) { return ["#collection-" + c.id, c.name]; })).concat([["#sale", "Sale"]]);
  function renderNav(route) {
    var html = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === "#" + route ? ' aria-current="page"' : "") + (n[1] === "Sale" ? ' class="is-sale"' : "") + ">" + n[1] + "</a>";
    }).join("");
    $("#nav").innerHTML = html;
    $("#mobile-nav").innerHTML = '<a href="#home">Home</a>' + html + '<a href="#wishlist">Wishlist</a><a href="#contact">Contact</a>';
  }

  /* ---------- views ---------- */
  function viewHome() {
    var fresh = P.filter(function (p) { return p.isNew; }).concat(P.filter(function (p) { return !p.isNew; })).slice(0, 8);
    return '<section class="hero"><div class="hero-copy">' +
      '<span class="label" style="color:var(--gold)">New season · Autumn 2026</span>' +
      '<h1>Step into <em>Bravo.</em></h1>' +
      "<p>Heels that carry you through the evening, flats for every day, and boots made for the cold months ahead.</p>" +
      '<div class="hero-cta"><a class="btn btn-primary" href="#new">Shop new in ' + icon("arrow") + '</a><a class="btn btn-ondark" href="#sale">Shop the sale</a></div>' +
      '</div><div class="hero-art"><img src="assets/bravo-mark.png" alt=""></div></section>' +
      '<div class="wrap">' +
      '<section class="section"><div class="section-head"><div><div class="label eyebrow">Collections</div><h2>Shop by collection</h2></div><a class="btn btn-link" href="#shop">All shoes</a></div>' +
      '<div class="cats">' + C.map(function (c) {
        var n = c.shoes.length;
        return '<a class="cat" href="#collection-' + c.id + '"><div class="photo t-soft"><svg class="shoe" viewBox="0 0 164 110" aria-hidden="true"><path d="' + SHOES[c.shape] + '"/></svg></div>' +
          '<div class="cat-cap"><span class="cat-name">' + c.name + '</span><span class="label">' + n + " " + icon("arrow") + "</span></div></a>";
      }).join("") + "</div></section>" +
      '<section class="section"><div class="section-head"><div><div class="label eyebrow">Just landed</div><h2>New arrivals</h2></div><a class="btn btn-link" href="#new">See all</a></div>' + grid(fresh) + "</section>" +
      '<div class="values">' + [["truck", "Free delivery", "On every order over " + money(S.freeDeliveryOver) + "."], ["swap", "Easy exchanges", "Wrong size? Swap it within " + S.exchangeDays + " days."], ["star", "Hand-picked", "Every pair chosen by the Bravo team."]].map(function (v) {
        return "<div>" + icon(v[0]) + '<div><div class="label" style="margin-bottom:4px">' + v[1] + '</div><div class="muted" style="font-size:14px">' + v[2] + "</div></div></div>";
      }).join("") + "</div>" +
      '<section class="insta"><div><div class="label eyebrow">' + esc(S.instagramHandle) + '</div><h2>See every new pair first on Instagram</h2></div>' +
      '<a class="btn btn-outline" href="' + S.instagram + '" target="_blank" rel="noopener">' + icon("insta") + " Follow us</a></section>" +
      "</div>";
  }

  var shopState = { sort: "featured", sizes: [] };
  function viewShop(kind, cat) {
    var list = P.slice(), title = "All shoes", intro = "Every style in the shop, from party heels to everyday flats.";
    if (kind === "cat") { var co = coll(cat); if (!co) return viewNotFound(); list = co.shoes.slice(); title = co.name; intro = co.description || ""; }
    if (kind === "new") { list = list.filter(function (p) { return p.isNew; }); title = "New in"; intro = "The latest arrivals, straight from the unboxing."; }
    if (kind === "sale") { list = list.filter(function (p) { return p.salePrice != null; }); title = "Sale"; intro = "Limited sizes at reduced prices — when they're gone, they're gone."; }
    if (shopState.sizes.length) list = list.filter(function (p) { return shopState.sizes.some(function (s) { return inStockAnyColour(p, s); }); });
    var s = shopState.sort;
    if (s === "low") list.sort(function (a, b) { return priceOf(a) - priceOf(b); });
    if (s === "high") list.sort(function (a, b) { return priceOf(b) - priceOf(a); });
    if (s === "new") list.sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); });
    var chips = '<a class="chip" href="#shop"' + (kind === "all" ? ' aria-current="page"' : "") + ">All</a>" +
      C.map(function (c) { return '<a class="chip" href="#collection-' + c.id + '"' + (cat === c.id ? ' aria-current="page"' : "") + ">" + c.name + "</a>"; }).join("") +
      '<a class="chip" href="#sale"' + (kind === "sale" ? ' aria-current="page"' : "") + ' style="color:' + (kind === "sale" ? "" : "var(--sale)") + '">Sale</a>';
    var allS = {}; P.forEach(function (p) { allSizes(p).forEach(function (z) { allS[z] = 1; }); });
    var sizes = Object.keys(allS).map(Number).sort(function (a, b) { return a - b; }).map(function (n) { return '<button class="chip" data-size-filter="' + n + '" aria-pressed="' + (shopState.sizes.indexOf(n) > -1) + '">' + n + "</button>"; }).join("");
    return '<div class="wrap"><div class="page-head"><div class="label crumbs"><a href="#home">Home</a> / ' + title + "</div><h1>" + title + '</h1><p class="muted">' + intro + "</p></div>" +
      '<div class="toolbar"><div class="chips">' + chips + '</div><div class="sort"><label for="sort" class="label muted">Sort</label><select id="sort">' +
      [["featured", "Featured"], ["new", "Newest"], ["low", "Price: low to high"], ["high", "Price: high to low"]].map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === s ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") +
      '</select></div></div><div class="filters-sizes" style="margin-bottom:24px"><span class="label muted" style="margin-right:8px">Size in stock</span>' + sizes +
      '<span class="muted" style="margin-left:auto;font-size:14px">' + list.length + (list.length === 1 ? " style" : " styles") + "</span></div>" +
      (list.length ? grid(list) : '<div class="empty"><h2>No styles in that size yet</h2><p class="muted">Try another size, or message us on Instagram and we\'ll let you know when it lands.</p><button class="btn btn-outline" data-clear-sizes>Clear sizes</button></div>') + "</div>";
  }

  var pdp = {};
  function viewProduct(slug) {
    var p = bySlug(slug);
    if (!p) return viewNotFound();
    if (pdp.slug !== slug) pdp = { slug: slug, color: 0, size: null };
    var related = P.filter(function (x) { return x.collection === p.collection && x.slug !== p.slug; }).concat(P.filter(function (x) { return x.collection !== p.collection; })).slice(0, 4);
    return '<div class="wrap"><div class="pdp"><div class="gallery">' + photo(p, 0, "", pdp.color) + photo(p, 1, "", pdp.color) + photo(p, 2, "", pdp.color) + "</div>" +
      '<div class="info"><div class="label crumbs"><a href="#home">Home</a> / <a href="#collection-' + p.collection + '">' + catName(p.collection) + "</a> / " + esc(p.name) + "</div>" +
      ((p.isNew || p.bestseller || p.salePrice != null) ? '<div style="display:flex;gap:8px">' + (p.isNew ? '<span class="tag">New</span>' : "") + (p.bestseller ? '<span class="tag tag-solid">Bestseller</span>' : "") + (p.salePrice != null ? '<span class="tag tag-sale">Sale</span>' : "") + "</div>" : "") +
      "<div><h1>" + esc(p.name) + '</h1><div style="margin-top:8px">' + priceHTML(p) + "</div></div>" +
      '<p class="muted">' + esc(p.description) + "</p>" +
      '<div><div class="field-head"><span class="label">Colour — ' + esc(p.colors[pdp.color].name) + '</span></div><div class="colors" role="radiogroup" aria-label="Colour">' +
      p.colors.map(function (c, i) { return '<button class="color" role="radio" data-color="' + i + '" aria-checked="' + (i === pdp.color) + '" aria-label="' + esc(c.name) + '" title="' + esc(c.name) + '" style="background:' + c.hex + '"></button>'; }).join("") + "</div></div>" +
      '<div><div class="field-head"><span class="label">Size (EU)' + (pdp.size ? '<span class="muted"> — ' + pdp.size + "</span>" : "") + '</span><a class="label eyebrow" href="#size-guide" style="text-decoration:none;display:inline-flex;gap:6px;align-items:center">' + icon("ruler") + " Size guide</a></div>" +
      '<div class="sizes" role="radiogroup" aria-label="Size">' + allSizes(p).map(function (n) {
        var out = stock(p, pdp.color, n) < 1;
        return '<button class="size" role="radio" data-pick-size="' + n + '" aria-checked="' + (pdp.size === n) + '"' + (out ? ' disabled title="Sold out"' : "") + ">" + n + "</button>";
      }).join("") + '</div>' + (pdp.size && stock(p, pdp.color, pdp.size) <= 2 ? '<div class="error" style="color:var(--gold-deep)">Only ' + stock(p, pdp.color, pdp.size) + ' left in EU ' + pdp.size + '</div>' : "") + '<div class="error" id="size-error" hidden>Choose your size to add this to your bag.</div></div>' +
      '<div class="buy"><button class="btn btn-primary" data-add="' + p.slug + '">Add to bag ' + icon("bag") + "</button>" + favBtn(p, "fav-lg") + "</div>" +
      "<div><details open><summary class=\"label\">Details</summary><div>" +
      [["Upper", p.upper], ["Heel", p.heel], ["Colours", p.colors.map(function (c) { return c.name; }).join(", ")], ["Sizes", "EU " + allSizes(p)[0] + "–" + allSizes(p).slice(-1)[0]], ["Fit", "True to size"]].map(function (r) { return '<div class="spec"><span>' + r[0] + "</span><span>" + r[1] + "</span></div>"; }).join("") +
      '</div></details><details><summary class="label">Delivery &amp; exchanges</summary><div><p>Free delivery on orders over ' + money(S.freeDeliveryOver) + ", otherwise " + money(S.deliveryFee) + ". Exchange unworn shoes within " + S.exchangeDays + ' days — <a href="#delivery">read more</a>.</p></div></details></div>' +
      "</div></div>" +
      '<section class="section"><div class="section-head"><div><div class="label eyebrow">You may also like</div><h2>Complete the look</h2></div></div>' + grid(related) + "</section></div>";
  }

  function viewWishlist() {
    var list = P.filter(function (p) { return favs.indexOf(p.slug) > -1; });
    return '<div class="wrap"><div class="page-head"><div class="label crumbs"><a href="#home">Home</a> / Wishlist</div><h1>Wishlist</h1></div><div style="height:32px"></div>' +
      (list.length ? grid(list) : '<div class="empty"><h2>Nothing saved yet</h2><p class="muted">Tap the heart on any pair to keep it here.</p><a class="btn btn-primary" href="#new">Browse new in</a></div>') + "</div>";
  }

  function totals() {
    var sub = bag.reduce(function (t, l) { var p = bySlug(l.slug); return t + (p ? priceOf(p) * l.qty : 0); }, 0);
    var ship = sub === 0 || sub >= S.freeDeliveryOver ? 0 : S.deliveryFee;
    return { sub: sub, ship: ship, total: sub + ship, items: bag.reduce(function (t, l) { return t + l.qty; }, 0) };
  }

  function viewCheckout() {
    if (!bag.length) return '<div class="wrap"><div class="empty" style="padding-top:96px"><h2>Your bag is empty</h2><p class="muted">Add a pair before checking out.</p><a class="btn btn-primary" href="#shop">Shop all shoes</a></div></div>';
    var t = totals();
    return '<div class="wrap"><div class="page-head"><div class="label crumbs"><a href="#home">Home</a> / Checkout</div><h1>Checkout</h1></div>' +
      '<div class="checkout"><form class="form" id="checkout-form" novalidate>' +
      '<div class="label eyebrow">1 · Your details</div>' +
      '<div class="form-row"><div class="field"><label for="co-name">Full name</label><input class="input" id="co-name" autocomplete="name" required></div>' +
      '<div class="field"><label for="co-phone">Phone</label><input class="input" id="co-phone" type="tel" autocomplete="tel" required></div></div>' +
      '<div class="label eyebrow" style="margin-top:16px">2 · Delivery</div>' +
      '<label class="radio-card"><input type="radio" name="co-ship" id="co-ship-home" value="home" checked><div><div class="label">Home delivery</div><div class="muted" style="font-size:14px">2–4 working days · ' + (t.ship ? money(S.deliveryFee) : "Free") + "</div></div></label>" +
      '<label class="radio-card"><input type="radio" name="co-ship" id="co-ship-store" value="store"><div><div class="label">Pick up in store</div><div class="muted" style="font-size:14px">Ready the next working day · Free</div></div></label>' +
      '<div class="form-row"><div class="field"><label for="co-city">City</label><input class="input" id="co-city" autocomplete="address-level2" required></div>' +
      '<div class="field"><label for="co-address">Street and building</label><input class="input" id="co-address" autocomplete="street-address" required></div></div>' +
      '<div class="field"><label for="co-notes">Notes (optional)</label><textarea id="co-notes" rows="3" placeholder="Landmark, preferred delivery time…"></textarea></div>' +
      '<div class="label eyebrow" style="margin-top:16px">3 · Payment</div>' +
      '<label class="radio-card"><input type="radio" name="co-pay" id="co-pay-cash" value="cash" checked><div><div class="label">Cash on delivery</div><div class="muted" style="font-size:14px">Pay when your shoes arrive.</div></div></label>' +
      '<label class="radio-card"><input type="radio" name="co-pay" id="co-pay-card" value="card"><div><div class="label">Card on delivery</div><div class="muted" style="font-size:14px">The courier brings a card machine.</div></div></label>' +
      '<div class="error" id="co-error" hidden>Fill in the highlighted fields to place your order.</div>' +
      '<button class="btn btn-primary btn-block" type="submit">Place order · ' + money(t.total) + "</button></form>" +
      '<aside class="summary"><div class="label">Order summary · ' + t.items + (t.items === 1 ? " item" : " items") + "</div>" +
      bag.map(function (l) { var p = bySlug(l.slug); return p ? '<div class="spec" style="font-size:14px"><span>' + esc(p.name) + ' <span class="muted">· EU ' + l.size + " · " + l.color + " × " + l.qty + "</span></span><span>" + money(priceOf(p) * l.qty) + "</span></div>" : ""; }).join("") +
      '<div class="totals" id="co-totals">' + totalsHTML(t) + "</div></aside></div></div>";
  }
  function totalsHTML(t) {
    return "<div><span>Subtotal</span><span>" + money(t.sub) + "</span></div><div><span>Delivery</span><span>" + (t.ship ? money(t.ship) : "Free") + '</span></div><div class="grand"><span>Total</span><span>' + money(t.total) + "</span></div>";
  }

  var lastOrder = null;
  function viewDone() {
    return '<div class="wrap"><div class="confirm"><img src="assets/bravo-logo.png" alt=""><div class="label eyebrow">Order ' + (lastOrder ? lastOrder.id : "") + '</div><h1 style="font-size:40px;line-height:1.1">Thank you' + (lastOrder ? ", " + esc(lastOrder.name.split(" ")[0]) : "") + "</h1>" +
      '<p class="muted">We\'ll call you on ' + (lastOrder ? esc(lastOrder.phone) : "your number") + " to confirm your size and delivery time.</p>" +
      '<p class="muted" style="font-size:13px">This is a preview of the Bravo Shoes website — no real order was sent.</p><a class="btn btn-outline" href="#home">Back to the shop</a></div></div>';
  }

  function viewSizeGuide() {
    var rows = [[35, "22.5", "2.5", "4"], [36, "23", "3.5", "5"], [37, "23.5", "4", "6"], [38, "24.5", "5", "7"], [39, "25", "6", "8"], [40, "25.5", "6.5", "9"], [41, "26.5", "7.5", "10"]];
    return '<div class="wrap"><div class="page-head"><div class="label crumbs"><a href="#home">Home</a> / Size guide</div><h1>Size guide</h1></div>' +
      '<div class="two-col"><div class="prose"><p>Stand on a sheet of paper with your heel against a wall and mark the tip of your longest toe. Measure from the wall to the mark in centimetres, then find the closest foot length below.</p>' +
      "<p>Between two sizes? Pick the larger one for boots and closed pumps, and the smaller one for sandals and mules.</p>" +
      '<p>Still unsure? <a href="#contact">Message us</a> with your usual size and the style you like — we\'ll measure the pair for you.</p></div>' +
      '<div class="table-wrap"><table><thead><tr><th>EU</th><th>Foot length (cm)</th><th>UK</th><th>US</th></tr></thead><tbody>' +
      rows.map(function (r) { return "<tr><td><strong>" + r[0] + "</strong></td><td>" + r[1] + "</td><td>" + r[2] + "</td><td>" + r[3] + "</td></tr>"; }).join("") + "</tbody></table></div></div></div>";
  }
  function viewDelivery() {
    return '<div class="wrap"><div class="page-head"><div class="label crumbs"><a href="#home">Home</a> / Delivery &amp; exchanges</div><h1>Delivery &amp; exchanges</h1></div><div class="prose" style="padding-top:24px">' +
      "<h2>Delivery</h2><p>Orders arrive in 2–4 working days. Delivery is free on orders over " + money(S.freeDeliveryOver) + " and " + money(S.deliveryFee) + " below that. You can also pick up your order from the shop for free.</p>" +
      "<h2>Exchanges</h2><p>Shoes that don't fit can be exchanged for another size or style within " + S.exchangeDays + " days, as long as they are unworn and in their original box.</p>" +
      '<h2>Sale items</h2><p>Sale pairs can be exchanged for a different size while stock lasts.</p></div></div>';
  }
  function viewAbout() {
    return '<div class="wrap"><div class="two-col"><div class="prose"><div class="label eyebrow">About</div><h1 style="font-size:clamp(36px,5vw,52px);line-height:1.05">Shoes for every step</h1>' +
      "<p>Bravo Shoes is a women's shoe boutique. We choose every pair ourselves — heels for the evenings that matter, flats you can walk in all day, and boots made for winter.</p>" +
      "<p>New styles arrive every week. Follow us on Instagram to see them first, or visit the shop and try them on.</p>" +
      '<div><a class="btn btn-primary" href="' + S.instagram + '" target="_blank" rel="noopener">' + icon("insta") + " " + esc(S.instagramHandle) + '</a></div></div>' +
      '<div class="photo t-espresso" style="aspect-ratio:4/5"><img src="assets/bravo-logo.png" alt="" style="width:50%;height:auto;object-fit:contain"></div></div></div>';
  }
  function viewContact() {
    return '<div class="wrap"><div class="page-head"><div class="label crumbs"><a href="#home">Home</a> / Contact</div><h1>Contact us</h1></div><div class="two-col">' +
      '<div class="prose"><p>The fastest way to reach us is a direct message on Instagram. We answer questions about sizes, stock and orders every day.</p>' +
      '<p><a class="btn btn-outline" href="' + S.instagram + '" target="_blank" rel="noopener">' + icon("insta") + " Message " + esc(S.instagramHandle) + "</a></p></div>" +
      '<form class="form" id="contact-form" novalidate><div class="field"><label for="ct-name">Name</label><input class="input" id="ct-name" required></div>' +
      '<div class="field"><label for="ct-phone">Phone or email</label><input class="input" id="ct-phone" required></div>' +
      '<div class="field"><label for="ct-msg">Message</label><textarea id="ct-msg" rows="5" required placeholder="Is the Stiletto Pump available in 39?"></textarea></div>' +
      '<button class="btn btn-primary" type="submit">Send message</button></form></div></div>';
  }
  function viewNotFound() {
    return '<div class="wrap"><div class="empty" style="padding-top:96px"><h2>We couldn\'t find that page</h2><a class="btn btn-primary" href="#home">Go to the shop</a></div></div>';
  }

  /* ---------- router ---------- */
  function route() {
    var r = (location.hash || "#home").slice(1) || "home", html;
    if (r === "home") html = viewHome();
    else if (r === "shop") html = viewShop("all");
    else if (r.indexOf("collection-") === 0) html = viewShop("cat", r.slice(11));
    else if (r === "new") html = viewShop("new");
    else if (r === "sale") html = viewShop("sale");
    else if (r.indexOf("p-") === 0) html = viewProduct(r.slice(2));
    else if (r === "wishlist") html = viewWishlist();
    else if (r === "checkout") html = viewCheckout();
    else if (r === "order-done") html = viewDone();
    else if (r === "size-guide") html = viewSizeGuide();
    else if (r === "delivery") html = viewDelivery();
    else if (r === "about") html = viewAbout();
    else if (r === "contact") html = viewContact();
    else html = viewNotFound();
    main.innerHTML = html;
    renderNav(r);
    closeAll();
    var title = { home: "", shop: "All shoes", new: "New in", sale: "Sale", wishlist: "Wishlist", checkout: "Checkout", "size-guide": "Size guide", about: "About", contact: "Contact" }[r];
    var p = r.indexOf("p-") === 0 && bySlug(r.slice(2));
    document.title = (p ? p.name : r.indexOf("collection-") === 0 ? catName(r.slice(11)) : title) ? (p ? p.name : title || catName(r.slice(11))) + " · Bravo Shoes" : "Bravo Shoes";
  }
  function rerender() { var y = window.scrollY; route(); window.scrollTo(0, y); }
  window.addEventListener("hashchange", function () { route(); window.scrollTo(0, 0); });

  /* ---------- bag ---------- */
  function renderBag() {
    var t = totals();
    $("#bag-count").textContent = t.items; $("#bag-count").dataset.n = t.items;
    $("#fav-count").textContent = favs.length; $("#fav-count").dataset.n = favs.length;
    $("#bag-title").textContent = "Your bag" + (t.items ? " (" + t.items + ")" : "");
    if (!bag.length) {
      $("#bag-body").innerHTML = '<div class="empty"><h3 style="font-size:24px">Your bag is empty</h3><p class="muted">Find your next favourite pair.</p><a class="btn btn-primary" href="#new">Shop new in</a></div>';
      $("#bag-foot").hidden = true; return;
    }
    var left = S.freeDeliveryOver - t.sub;
    $("#bag-body").innerHTML = '<div class="free-bar">' + (left > 0 ? "<span>Add <strong>" + money(left) + "</strong> for free delivery</span>" : "<span>You get <strong>free delivery</strong></span>") +
      '<div class="meter"><span style="width:' + Math.min(100, t.sub / S.freeDeliveryOver * 100) + '%"></span></div></div>' +
      bag.map(function (l, i) {
        var p = bySlug(l.slug); if (!p) return "";
        return '<div class="line"><a href="#p-' + p.slug + '">' + photo(p, 0, "", l.ci || 0) + '</a><div><h3>' + esc(p.name) + '</h3><div class="line-meta">EU ' + l.size + " · " + l.color + '</div><div style="margin-top:4px">' + priceHTML(p) + "</div>" +
          '<div class="line-row"><div class="qty"><button data-qty="' + i + '" data-d="-1" aria-label="One less">−</button><span>' + l.qty + '</span><button data-qty="' + i + '" data-d="1" aria-label="One more">+</button></div><button class="remove" data-remove="' + i + '">Remove</button></div></div></div>';
      }).join("");
    $("#bag-foot").hidden = false;
    $("#bag-foot").innerHTML = '<div class="totals">' + totalsHTML(t) + '</div><a class="btn btn-primary btn-block" href="#checkout">Checkout</a>';
  }
  function persist() { save("bravo-bag", bag); save("bravo-favs", favs); renderBag(); }

  /* ---------- overlays ---------- */
  var openEl = null;
  function open(id) { closeAll(); openEl = $("#" + id); openEl.classList.add("open"); openEl.setAttribute("aria-hidden", "false"); $("#scrim").classList.add("open"); document.body.style.overflow = "hidden"; var f = openEl.querySelector("input, [data-close]"); if (f) setTimeout(function () { f.focus(); }, 50); }
  function closeAll() { document.querySelectorAll(".drawer.open, .search.open").forEach(function (el) { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); }); $("#scrim").classList.remove("open"); document.body.style.overflow = ""; openEl = null; }
  $("#bag-open").onclick = function () { open("bag"); };
  $("#menu-open").onclick = function () { open("menu"); };
  $("#search-open").onclick = function () { open("search"); renderSearch(""); };
  $("#scrim").onclick = closeAll;
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });

  function renderSearch(q) {
    q = q.trim().toLowerCase();
    var list = q ? P.filter(function (p) { return (p.name + " " + catName(p.collection) + " " + p.upper + " " + p.colors.map(function (c) { return c.name; }).join(" ")).toLowerCase().indexOf(q) > -1; }) : P.filter(function (p) { return p.isNew; });
    $("#search-results").innerHTML = (q ? "" : '<div class="label muted" style="padding-top:8px">New in</div>') +
      (list.length ? list.map(function (p) { return '<a href="#p-' + p.slug + '"><span><span style="font-family:var(--font-display);font-style:italic;font-size:18px">' + esc(p.name) + '</span> <span class="muted" style="font-size:13px">· ' + catName(p.collection) + "</span></span><span>" + priceHTML(p) + "</span></a>"; }).join("")
        : '<p class="muted" style="padding-block:12px">No shoes match “' + esc(q) + "”. Try heels, boots or a colour.</p>");
  }
  $("#search-input").addEventListener("input", function (e) { renderSearch(e.target.value); });

  /* ---------- clicks ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) return;
    if (t.hasAttribute("data-close")) return closeAll();
    if (t.dataset.fav) {
      var s = t.dataset.fav, i = favs.indexOf(s);
      if (i > -1) favs.splice(i, 1); else favs.push(s);
      persist(); toast(i > -1 ? "Removed from your wishlist" : "Saved to your wishlist");
      if (location.hash === "#wishlist") rerender(); else document.querySelectorAll('[data-fav="' + s + '"]').forEach(function (b) { b.setAttribute("aria-pressed", i < 0); b.setAttribute("aria-label", (i < 0 ? "Remove from" : "Add to") + " wishlist"); });
      return;
    }
    if (t.dataset.sizeFilter) { var n = +t.dataset.sizeFilter, k = shopState.sizes.indexOf(n); if (k > -1) shopState.sizes.splice(k, 1); else shopState.sizes.push(n); return rerender(); }
    if (t.hasAttribute("data-clear-sizes")) { shopState.sizes = []; return rerender(); }
    if (t.dataset.color) { pdp.color = +t.dataset.color; var cp = bySlug(pdp.slug); if (pdp.size && stock(cp, pdp.color, pdp.size) < 1) pdp.size = null; return rerender(); }
    if (t.dataset.pickSize) { pdp.size = +t.dataset.pickSize; return rerender(); }
    if (t.dataset.add) {
      var p = bySlug(t.dataset.add);
      if (!pdp.size) { $("#size-error").hidden = false; return; }
      var color = p.colors[pdp.color].name, max = stock(p, pdp.color, pdp.size);
      var ex = bag.filter(function (l) { return l.slug === p.slug && l.size === pdp.size && l.color === color; })[0];
      if (ex) { if (ex.qty >= max) { toast("That's every pair we have in EU " + pdp.size); return; } ex.qty++; }
      else bag.push({ slug: p.slug, size: pdp.size, color: color, ci: pdp.color, qty: 1 });
      persist(); open("bag"); return;
    }
    if (t.dataset.qty) { var l = bag[+t.dataset.qty], lp = bySlug(l.slug), cap = lp ? stock(lp, l.ci || 0, l.size) : 1; l.qty = Math.max(1, Math.min(cap, l.qty + +t.dataset.d)); persist(); if (location.hash === "#checkout") rerender(); return; }
    if (t.dataset.remove) { bag.splice(+t.dataset.remove, 1); persist(); if (location.hash === "#checkout") rerender(); return; }
    if (t.tagName === "A" && t.getAttribute("href") === location.hash) closeAll();
  });
  document.addEventListener("change", function (e) {
    if (e.target.id === "sort") { shopState.sort = e.target.value; rerender(); }
    if (e.target.name === "co-ship") { var t = totals(); if (e.target.value === "store") t.total = t.sub, t.ship = 0; $("#co-totals").innerHTML = totalsHTML(t); }
  });

  /* ---------- forms ---------- */
  document.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    if (f.id === "news-form") { f.reset(); toast("You're on the list. Welcome to Bravo."); return; }
    var bad = Array.prototype.filter.call(f.querySelectorAll("[required]"), function (el) { var ok = el.value.trim() !== ""; el.setAttribute("aria-invalid", !ok); return !ok; });
    if (f.id === "checkout-form") {
      var store = $("#co-ship-store").checked;
      if (store) bad = bad.filter(function (el) { el.setAttribute("aria-invalid", "false"); return el.id !== "co-city" && el.id !== "co-address"; });
      $("#co-error").hidden = !bad.length;
      if (bad.length) { bad[0].focus(); return; }
      lastOrder = { id: "BR-" + String(Date.now()).slice(-5), name: $("#co-name").value.trim(), phone: $("#co-phone").value.trim() };
      bag = []; persist(); location.hash = "#order-done"; return;
    }
    if (f.id === "contact-form") { if (bad.length) { bad[0].focus(); return; } f.reset(); toast("Message sent. We'll reply within a day."); }
  });

  /* ---------- boot ---------- */
  $("#promo").textContent = "Free delivery over " + money(S.freeDeliveryOver) + " · Exchanges within " + S.exchangeDays + " days";
  $("#footer-shop").innerHTML = NAV.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + "</a>"; }).join("");
  $("#footer-insta").href = S.instagram; $("#footer-insta").textContent = S.instagramHandle + " on Instagram";
  $("#year").textContent = new Date().getFullYear();
  renderBag(); route();
})();
