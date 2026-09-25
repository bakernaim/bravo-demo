/* Store settings and catalogue. Edit this file to change collections, shoes, colours, sizes and prices.

   Structure:  COLLECTIONS -> shoes -> colors -> sizes
   - A collection groups shoes. It appears in the menu and has its own page.
   - Each shoe has one price and a list of colours.
   - Each colour has its own photos and its own sizes. The number after a size is how many pairs
     are in stock: 0 shows the size as sold out, 1 or 2 shows "Only N left".
   - images: photos of THAT colour, e.g. ["assets/products/stiletto-pump-black-1.jpg"].
     Until a colour has photos, the site draws a gold line placeholder from the shoe's shape
     (heel, flat, boot, sneaker or sandal). */
window.STORE = {
  name: "Bravo Shoes",
  instagram: "https://www.instagram.com/bravo.shoes_/",
  instagramHandle: "@bravo.shoes_",
  currency: "",            // shown before every price, e.g. "JD " or "$"
  freeDeliveryOver: 300,   // order subtotal that unlocks free delivery
  deliveryFee: 15,
  exchangeDays: 14
};

window.COLLECTIONS = [
  {
    id: "heels", name: "Heels", shape: "heel",
    description: "Stilettos, slingbacks and block heels for every occasion.",
    shoes: [
      {
        slug: "stiletto-pump",
        name: "Stiletto Pump",
        price: 189,
        isNew: true,
        bestseller: true,
        shape: "heel",
        upper: "Nappa leather",
        heel: "9 cm stiletto",
        description: "A pointed-toe pump in soft nappa leather with a slender 9 cm heel. Cushioned insole for evenings that run late.",
        colors: [
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 2, 37: 3, 38: 0, 39: 1, 40: 2, 41: 0 } },
          { name: "Nude", hex: "#c9a27e", images: [], sizes: { 36: 0, 37: 1, 38: 3, 39: 2, 40: 1, 41: 4 } },
          { name: "Red", hex: "#a3352b", images: [], sizes: { 36: 3, 37: 0, 38: 2, 39: 1, 40: 4, 41: 0 } }
        ]
      },
      {
        slug: "slingback-aria",
        name: "Slingback Aria",
        price: 175,
        shape: "heel",
        upper: "Metallic leather",
        heel: "7 cm kitten",
        description: "A metallic slingback on a comfortable 7 cm heel, with an adjustable buckle strap at the back.",
        colors: [
          { name: "Gold", hex: "#a8945a", images: [], sizes: { 36: 3, 37: 2, 38: 1, 39: 0, 40: 1 } },
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 1, 37: 0, 38: 2, 39: 1, 40: 1 } }
        ]
      },
      {
        slug: "block-heel-mule",
        name: "Block Heel Mule",
        price: 165,
        shape: "heel",
        upper: "Suede",
        heel: "6 cm block",
        description: "An easy slip-on mule in soft suede. The 6 cm block heel keeps you steady from morning to night.",
        colors: [
          { name: "Cream", hex: "#e8dcc6", images: [], sizes: { 37: 0, 38: 3, 39: 4, 40: 1, 41: 1 } },
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 37: 1, 38: 2, 39: 1, 40: 3, 41: 1 } }
        ]
      },
      {
        slug: "satin-evening-pump",
        name: "Satin Evening Pump",
        price: 210,
        salePrice: 159,
        shape: "heel",
        upper: "Satin",
        heel: "10 cm stiletto",
        description: "Satin pumps made for weddings and evenings out, finished with a crystal buckle on the toe.",
        colors: [
          { name: "Champagne", hex: "#d9c7a0", images: [], sizes: { 36: 0, 37: 4, 38: 2, 39: 2, 40: 0 } },
          { name: "Emerald", hex: "#2f5b48", images: [], sizes: { 36: 1, 37: 1, 38: 1, 39: 2, 40: 1 } }
        ]
      }
    ]
  },
  {
    id: "flats", name: "Flats", shape: "flat",
    description: "Ballet flats and loafers for everyday comfort.",
    shoes: [
      {
        slug: "ballet-flat-lune",
        name: "Ballet Flat Lune",
        price: 129,
        salePrice: 95,
        shape: "flat",
        upper: "Lambskin",
        heel: "1 cm",
        description: "A classic ballet flat in supple lambskin with a thin bow at the toe. Folds flat in your bag.",
        colors: [
          { name: "Cream", hex: "#e8dcc6", images: [], sizes: { 36: 3, 37: 2, 38: 4, 39: 3, 40: 0, 41: 1 } },
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 2, 37: 0, 38: 0, 39: 2, 40: 4, 41: 3 } }
        ]
      },
      {
        slug: "loafer-sienna",
        name: "Loafer Sienna",
        price: 159,
        shape: "flat",
        upper: "Polished leather",
        heel: "2 cm",
        description: "A polished leather loafer with a gold bar detail — smart enough for work, easy enough for weekends.",
        colors: [
          { name: "Cognac", hex: "#6b4a33", images: [], sizes: { 36: 1, 37: 1, 38: 2, 39: 0, 40: 2, 41: 1 } },
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 2, 37: 2, 38: 1, 39: 1, 40: 4, 41: 0 } }
        ]
      },
      {
        slug: "pointed-flat-noa",
        name: "Pointed Flat Noa",
        price: 119,
        isNew: true,
        shape: "flat",
        upper: "Calf hair",
        heel: "1 cm",
        description: "A pointed flat in printed calf hair. Pairs with jeans and dresses alike.",
        colors: [
          { name: "Leopard", hex: "#b08850", images: [], sizes: { 36: 1, 37: 4, 38: 1, 39: 1, 40: 1 } },
          { name: "Nude", hex: "#c9a27e", images: [], sizes: { 36: 1, 37: 4, 38: 3, 39: 3, 40: 0 } }
        ]
      }
    ]
  },
  {
    id: "boots", name: "Boots", shape: "boot",
    description: "Ankle, Chelsea and knee-high boots for the cold months.",
    shoes: [
      {
        slug: "ankle-boot-noor",
        name: "Ankle Boot Noor",
        price: 245,
        isNew: true,
        shape: "boot",
        upper: "Leather",
        heel: "5 cm block",
        description: "A sleek leather ankle boot with an inside zip and a steady 5 cm block heel.",
        colors: [
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 1, 37: 2, 38: 1, 39: 2, 40: 4, 41: 4 } },
          { name: "Chocolate", hex: "#6b4a33", images: [], sizes: { 36: 1, 37: 1, 38: 0, 39: 2, 40: 3, 41: 2 } }
        ]
      },
      {
        slug: "chelsea-boot",
        name: "Chelsea Boot",
        price: 229,
        salePrice: 179,
        shape: "boot",
        upper: "Waxed leather",
        heel: "3 cm",
        description: "Elastic side panels, a pull tab and a grippy sole. The boot you reach for all winter.",
        colors: [
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 37: 0, 38: 1, 39: 2, 40: 1, 41: 0 } }
        ]
      },
      {
        slug: "knee-boot-layla",
        name: "Knee Boot Layla",
        price: 289,
        shape: "boot",
        upper: "Stretch suede",
        heel: "8 cm block",
        description: "A knee-high boot in stretch suede that hugs the leg, on an 8 cm block heel.",
        colors: [
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 2, 37: 0, 38: 4, 39: 1, 40: 1 } },
          { name: "Taupe", hex: "#8a7a66", images: [], sizes: { 36: 0, 37: 0, 38: 4, 39: 4, 40: 3 } }
        ]
      }
    ]
  },
  {
    id: "sneakers", name: "Sneakers", shape: "sneaker",
    description: "Clean leather sneakers and platforms.",
    shoes: [
      {
        slug: "court-sneaker",
        name: "Court Sneaker",
        price: 149,
        isNew: true,
        shape: "sneaker",
        upper: "Leather",
        heel: "3 cm platform",
        description: "A clean white leather sneaker with a gold heel tab and a light 3 cm platform.",
        colors: [
          { name: "White", hex: "#ffffff", images: [], sizes: { 36: 1, 37: 1, 38: 4, 39: 1, 40: 0, 41: 0 } },
          { name: "White / Gold", hex: "#a8945a", images: [], sizes: { 36: 0, 37: 3, 38: 4, 39: 1, 40: 0, 41: 2 } }
        ]
      },
      {
        slug: "platform-sneaker-mia",
        name: "Platform Sneaker Mia",
        price: 169,
        shape: "sneaker",
        upper: "Suede and leather",
        heel: "5 cm platform",
        description: "A chunky platform sneaker in mixed suede and leather. Extra height, all-day comfort.",
        colors: [
          { name: "Cream", hex: "#e8dcc6", images: [], sizes: { 36: 0, 37: 1, 38: 0, 39: 0, 40: 2 } },
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 1, 37: 1, 38: 4, 39: 0, 40: 0 } }
        ]
      }
    ]
  },
  {
    id: "sandals", name: "Sandals", shape: "sandal",
    description: "Strappy heels and flat sandals for warm days.",
    shoes: [
      {
        slug: "strappy-sandal-yasmin",
        name: "Strappy Sandal Yasmin",
        price: 139,
        shape: "sandal",
        upper: "Metallic leather",
        heel: "8 cm stiletto",
        description: "Thin metallic straps and an ankle buckle on an 8 cm stiletto — the party sandal.",
        colors: [
          { name: "Gold", hex: "#a8945a", images: [], sizes: { 36: 0, 37: 3, 38: 0, 39: 2, 40: 0, 41: 2 } },
          { name: "Silver", hex: "#b9b9b9", images: [], sizes: { 36: 2, 37: 0, 38: 4, 39: 2, 40: 4, 41: 2 } }
        ]
      },
      {
        slug: "flat-sandal-selin",
        name: "Flat Sandal Selin",
        price: 99,
        salePrice: 75,
        shape: "sandal",
        upper: "Leather",
        heel: "1 cm",
        description: "A flat leather sandal with a padded footbed and crossover straps.",
        colors: [
          { name: "Tan", hex: "#b08850", images: [], sizes: { 36: 0, 37: 4, 38: 3, 39: 1, 40: 2, 41: 0 } },
          { name: "Black", hex: "#1f1b16", images: [], sizes: { 36: 1, 37: 0, 38: 0, 39: 1, 40: 1, 41: 0 } }
        ]
      }
    ]
  }
];
