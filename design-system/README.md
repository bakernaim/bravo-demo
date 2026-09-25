Bravo Shoes is a women's shoe boutique. The storefront should feel like the logo: ivory paper, one warm gold, a Didone serif, and a lot of quiet space around the product. Gold is jewellery, not paint — use it for the mark, rules, outlines and one call to action per view.

## Voice

- Short, warm, confident. Speak to the customer as "you"; the shop is "we" only in service copy ("We deliver in 2–4 days").
- Headlines in sentence case in the display serif: "Step into Bravo.", "New arrivals", "Complete the look". No exclamation marks except the brand's own name moments.
- Labels, nav, buttons and tags are ALWAYS uppercase with wide tracking (`label`), echoing the "BRAVO SHOES" pill in the logo: "ADD TO BAG", "NEW", "SIZE GUIDE".
- Product names in the italic serif (`title`): "Stiletto Pump", "Ankle Boot Noor". Describe material and heel height, not adjectives: "soft nappa leather with a slender 9 cm heel".
- No emoji in the UI.

## Colour

- Page ground is `surface` (ivory), cards `surface-raised`. Body copy `ink`; secondary `ink-muted`.
- `gold` is the logo's own gold (#A8945A). It is 2.8:1 on ivory, so it never carries small text on light grounds — use it for the logo, 1px rules, outline-button borders, icons on dark, and focus rings. Readable gold text and the primary button fill use `gold-deep`, with `on-gold` on top.
- `espresso` is the one dark band: promo strip, hero, footer. On it, copy is `on-espresso` and gold accents are `gold` (5.7:1).
- `gold-soft` fills photo placeholders and quiet highlights.
- `sale` is reserved for sale prices and the Sale tag, always paired with the word or a struck-through old price.
- Focus ring: a solid 2px `gold` outline with 2–3px offset on every control.

## Type

- Display: **Bodoni Moda** (Google Fonts), a Didone whose hairline/heavy contrast matches the BS monogram. `display-xl` once per page for the hero, `display` for the product name, `heading` for section titles, `title` (italic) for product names on cards.
- Text: **Jost** (Google Fonts), a geometric sans close to the logo's label. `body` for descriptions, `body-sm` for captions and footers, `price` for prices, `label` for everything uppercase.
- Pair an eyebrow (`label` in `gold-deep`) above each section `heading`.

## Space, shape, depth

- 8px rhythm: `space-4` inside cards, `space-6` grid gutters, `space-8` page gutter on desktop, `space-16` between sections.
- Corners are near-square — `radius-sm` for buttons, inputs and size options, `radius-md` for cards and photos. `radius-pill` belongs to tags only, the logo's rounded frame.
- Separate with `hairline` rules, not shadows. `shadow-lift` appears only when a product card is hovered.

## Imagery

- Product photography on a plain `gold-soft`, white or `espresso` ground, the shoe in side profile, 4:5 crop for cards and 3:4 for category tiles. Until real photos exist, `ProductImage` draws a gold line placeholder — swap in the shop's Instagram photos via `src`.
- The monogram is the hero's only artwork; never recolour, outline or stretch it.

## Logo

- `assets/Logos/bravo-logo.png` — the full lockup (monogram + "BRAVO SHOES" pill) for the footer and splash.
- `assets/Logos/bravo-mark.png` — the BS monogram alone for the header and hero.
- Both are transparent PNGs in the logo gold, so they sit on `surface` and `espresso` alike. Minimum height 40px; clear space equal to the height of a star.

## Iconography

- Thin 1.4px-stroke line icons on a 24px grid, round caps (`Icon`: search, bag, heart, user, arrow, truck, swap, star, ruler). They were drawn for this system to match the gold hairlines; icons inherit the text colour.
