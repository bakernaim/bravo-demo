# Bravo Shoes website

A static storefront — plain HTML, CSS and JavaScript, no build step. Open `index.html` in a browser, or upload the folder to any static host (GitHub Pages, Netlify, Vercel, cPanel).

## Editing the shop

Everything the shop sells lives in **`store.js`**:

```
COLLECTIONS → shoes → colors → sizes
```

- **Collections** appear in the menu and each has its own page (`#collection-heels`).
- **Shoes** have a name, price, optional `salePrice`, `isNew` / `bestseller` flags, material, heel and description.
- **Colours** each have their own photos (`images`) and their own sizes.
- **Sizes** map an EU size to pairs in stock: `0` is sold out, `1`–`2` shows "Only N left".

Shop settings (currency, free-delivery threshold, delivery fee, exchange days, Instagram link) are at the top of the same file.

Product photos go in `assets/products/` and are listed per colour, for example
`images: ["assets/products/stiletto-pump-black-1.jpg", "assets/products/stiletto-pump-black-2.jpg"]`.

## Pages

Home · collection pages · New in · Sale · product page (colour + size picker with per-colour stock) · wishlist · bag drawer · checkout (delivery or pick-up, cash or card on delivery) · size guide · delivery & exchanges · about · contact · search.

The bag and wishlist are kept in the visitor's browser. Checkout, contact and newsletter forms are front-end only: connecting them to real orders (e.g. WhatsApp, email or a store backend such as Shopify) is the next step.
