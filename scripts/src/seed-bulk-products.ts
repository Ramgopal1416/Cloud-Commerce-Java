import { db, categoriesTable, productsTable, inventoryTable } from "@workspace/db";

const bulkProducts: Array<{
  catName: string;
  name: string;
  description: string;
  price: string;
  comparePrice: string | null;
  brand: string;
  imageUrl: string;
  isFeatured: boolean;
  stock: number;
}> = [
  // Electronics
  {
    catName: "Electronics",
    name: "Portable Bluetooth Speaker",
    description: "360° surround sound with 20-hour battery life. IPX7 waterproof, perfect for outdoor adventures. Deep bass and crystal clear highs.",
    price: "79.99", comparePrice: "99.00", brand: "SoundCore",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
    isFeatured: false, stock: 55,
  },
  {
    catName: "Electronics",
    name: "USB-C Hub 7-in-1",
    description: "Expand your laptop with HDMI 4K, 3× USB-A, SD card reader, and 100W PD charging. Plug-and-play, no drivers needed.",
    price: "49.99", comparePrice: null, brand: "TechLink",
    imageUrl: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?q=80&w=2069&auto=format&fit=crop",
    isFeatured: false, stock: 80,
  },
  {
    catName: "Electronics",
    name: "Mechanical Gaming Keyboard",
    description: "Full-size RGB mechanical keyboard with Cherry MX switches. N-key rollover, aluminum frame, detachable USB-C cable.",
    price: "139.99", comparePrice: "179.00", brand: "KeyCraft",
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true, stock: 30,
  },
  {
    catName: "Electronics",
    name: "Wireless Charging Pad",
    description: "15W fast wireless charger compatible with all Qi devices. LED indicator, anti-slip base, slim 5mm profile.",
    price: "29.99", comparePrice: null, brand: "TechLink",
    imageUrl: "https://images.unsplash.com/photo-1588394862637-1e8ed68e0e00?q=80&w=2012&auto=format&fit=crop",
    isFeatured: false, stock: 100,
  },
  {
    catName: "Electronics",
    name: "Action Camera 4K",
    description: "Compact 4K/60fps action camera with built-in stabilization, waterproof to 10m. Includes mounting kit and extra battery.",
    price: "179.99", comparePrice: "229.00", brand: "GoPix",
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true, stock: 22,
  },
  {
    catName: "Electronics",
    name: "Smart Home Hub",
    description: "Central hub compatible with Zigbee, Z-Wave, and Wi-Fi devices. Control all your smart home gadgets from one app.",
    price: "89.99", comparePrice: null, brand: "SmartNest",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1886&auto=format&fit=crop",
    isFeatured: false, stock: 35,
  },

  // Clothing
  {
    catName: "Clothing",
    name: "Merino Wool Sweater",
    description: "Lightweight merino wool crew-neck sweater in deep navy. Temperature-regulating, anti-odor, and machine washable.",
    price: "99.99", comparePrice: "130.00", brand: "WoolCraft",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop",
    isFeatured: true, stock: 40,
  },
  {
    catName: "Clothing",
    name: "High-Waist Trousers",
    description: "Tailored wide-leg trousers in Italian crepe fabric. Hidden side zip, front pleats, falls perfectly at ankle.",
    price: "89.99", comparePrice: null, brand: "Maison Élégance",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780&auto=format&fit=crop",
    isFeatured: false, stock: 30,
  },
  {
    catName: "Clothing",
    name: "Quilted Puffer Jacket",
    description: "Water-resistant quilted jacket with recycled down insulation. Packable into its own pocket. Ideal for travel.",
    price: "149.99", comparePrice: "190.00", brand: "AlpineGear",
    imageUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true, stock: 25,
  },
  {
    catName: "Clothing",
    name: "Cotton Polo Shirt",
    description: "Classic slim-fit polo in piqué cotton. Three-button placket, ribbed collar and cuffs. Available in 8 colors.",
    price: "49.99", comparePrice: null, brand: "CoastalThreads",
    imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1887&auto=format&fit=crop",
    isFeatured: false, stock: 60,
  },
  {
    catName: "Clothing",
    name: "Pleated Midi Skirt",
    description: "Elegant satin pleated midi skirt with elasticated waistband. Floats with movement, perfect for evening or day.",
    price: "74.99", comparePrice: "95.00", brand: "Maison Élégance",
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1886&auto=format&fit=crop",
    isFeatured: true, stock: 35,
  },

  // Home & Garden
  {
    catName: "Home & Garden",
    name: "Linen Duvet Cover Set",
    description: "100% stonewashed linen duvet cover and two pillowcases. Pre-washed for softness. Fits queen and king beds.",
    price: "129.99", comparePrice: "160.00", brand: "LinenHome",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
    isFeatured: true, stock: 20,
  },
  {
    catName: "Home & Garden",
    name: "Ceramic Vase Set (3pc)",
    description: "Minimalist handcrafted ceramic vases in matte finish. Three complementary sizes for asymmetric arrangements.",
    price: "49.99", comparePrice: null, brand: "ArtisanHome",
    imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1887&auto=format&fit=crop",
    isFeatured: false, stock: 40,
  },
  {
    catName: "Home & Garden",
    name: "Scented Soy Candle",
    description: "Hand-poured soy wax candle with cedarwood and amber fragrance. 60-hour burn time, reusable glass vessel.",
    price: "28.99", comparePrice: null, brand: "LuminaScent",
    imageUrl: "https://images.unsplash.com/photo-1603905670163-83e89af17e96?q=80&w=2067&auto=format&fit=crop",
    isFeatured: false, stock: 90,
  },
  {
    catName: "Home & Garden",
    name: "Cast Iron Skillet 10-inch",
    description: "Pre-seasoned cast iron skillet for stovetop and oven use. Superior heat retention, naturally non-stick surface.",
    price: "44.99", comparePrice: null, brand: "IronChef",
    imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false, stock: 60,
  },
  {
    catName: "Home & Garden",
    name: "Monstera Deliciosa Plant",
    description: "Live monstera plant in decorative ceramic pot. Lush tropical statement piece, easy to care for and long-lived.",
    price: "39.99", comparePrice: null, brand: "GreenThumb",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1964&auto=format&fit=crop",
    isFeatured: true, stock: 30,
  },
  {
    catName: "Home & Garden",
    name: "Handwoven Wall Tapestry",
    description: "Bohemian woven cotton tapestry 100×80cm. Adds warmth and texture to any room. Wooden dowel included.",
    price: "54.99", comparePrice: "70.00", brand: "ArtisanHome",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
    isFeatured: false, stock: 25,
  },

  // Sports & Fitness
  {
    catName: "Sports & Fitness",
    name: "Adjustable Dumbbells Set",
    description: "Space-saving adjustable dumbbells from 2.5kg to 25kg per hand. Quick-change dial system, ergonomic handles.",
    price: "249.99", comparePrice: "320.00", brand: "IronFit",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true, stock: 15,
  },
  {
    catName: "Sports & Fitness",
    name: "Foam Roller",
    description: "High-density foam roller for muscle recovery and myofascial release. 33cm length, handles up to 135kg.",
    price: "24.99", comparePrice: null, brand: "ZenFlow",
    imageUrl: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false, stock: 80,
  },
  {
    catName: "Sports & Fitness",
    name: "Swimming Goggles Pro",
    description: "Anti-fog UV400 swim goggles with wide panoramic lens. Hydrodynamic design, adjustable strap, leak-free seal.",
    price: "34.99", comparePrice: "45.00", brand: "AquaSpeed",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false, stock: 55,
  },
  {
    catName: "Sports & Fitness",
    name: "Jump Rope Speed Cable",
    description: "Competition-grade speed rope with ball-bearing handles and adjustable steel cable. Ideal for CrossFit and boxing.",
    price: "19.99", comparePrice: null, brand: "IronFit",
    imageUrl: "https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?q=80&w=1888&auto=format&fit=crop",
    isFeatured: false, stock: 100,
  },
  {
    catName: "Sports & Fitness",
    name: "Trail Running Vest",
    description: "Lightweight 5L hydration vest with front pockets and adjustable straps. Compatible with 2L bladder (not included).",
    price: "89.99", comparePrice: "110.00", brand: "AlpineGear",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true, stock: 28,
  },

  // Books
  {
    catName: "Books",
    name: "Atomic Habits",
    description: "James Clear's #1 bestseller on building good habits and breaking bad ones. Practical strategies for lasting change.",
    price: "18.99", comparePrice: null, brand: "Penguin Random House",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
    isFeatured: true, stock: 150,
  },
  {
    catName: "Books",
    name: "Sapiens: A Brief History of Humankind",
    description: "Yuval Noah Harari's landmark exploration of how Homo sapiens came to dominate the Earth. Riveting and insightful.",
    price: "16.99", comparePrice: null, brand: "Harper Collins",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2012&auto=format&fit=crop",
    isFeatured: false, stock: 120,
  },
  {
    catName: "Books",
    name: "The Design of Everyday Things",
    description: "Don Norman's classic guide to good design. Essential reading for designers, engineers and anyone who uses products.",
    price: "21.99", comparePrice: null, brand: "Basic Books",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1998&auto=format&fit=crop",
    isFeatured: false, stock: 80,
  },
  {
    catName: "Books",
    name: "Deep Work",
    description: "Cal Newport's guide to focused success in a distracted world. Rules for achieving peak productivity and meaning.",
    price: "17.99", comparePrice: null, brand: "Grand Central",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop",
    isFeatured: true, stock: 90,
  },

  // Bags & Accessories
  {
    catName: "Bags & Accessories",
    name: "Weekender Duffel Bag",
    description: "Spacious 40L waxed canvas weekender with full-length zip, shoe compartment and leather handles. Carry-on compliant.",
    price: "149.00", comparePrice: "190.00", brand: "TrailMaster",
    imageUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false, stock: 20,
  },
  {
    catName: "Bags & Accessories",
    name: "Silk Scarf",
    description: "Hand-painted 90×90cm silk twill scarf. Vibrant botanical print, finished with hand-rolled hem. Gift-boxed.",
    price: "85.00", comparePrice: null, brand: "Zoé Paris",
    imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true, stock: 30,
  },
  {
    catName: "Bags & Accessories",
    name: "Leather Belt",
    description: "Full-grain leather belt with solid brass buckle. 3.5cm width, available in black and tan. Made in Italy.",
    price: "55.00", comparePrice: null, brand: "Artisan Craft",
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false, stock: 50,
  },

  // Personal Care
  {
    catName: "Personal Care",
    name: "Electric Toothbrush",
    description: "Sonic electric toothbrush with 5 cleaning modes, 2-minute timer and pressure sensor. Battery lasts 4 weeks.",
    price: "49.99", comparePrice: "65.00", brand: "DentaPure",
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=2080&auto=format&fit=crop",
    isFeatured: false, stock: 70,
  },
  {
    catName: "Personal Care",
    name: "Gua Sha Facial Tool",
    description: "Rose quartz gua sha stone for facial massage and lymphatic drainage. Reduces puffiness and promotes circulation.",
    price: "22.99", comparePrice: null, brand: "GlowLab",
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1935&auto=format&fit=crop",
    isFeatured: true, stock: 60,
  },
  {
    catName: "Personal Care",
    name: "Perfume — Sandalwood & Oud",
    description: "Sophisticated eau de parfum with top notes of cardamom, heart of oud wood and base of white musk. 50ml.",
    price: "95.00", comparePrice: "120.00", brand: "MaisonParfum",
    imageUrl: "https://images.unsplash.com/photo-1592945403407-9caf930b5f5f?q=80&w=2001&auto=format&fit=crop",
    isFeatured: true, stock: 25,
  },

  // Footwear
  {
    catName: "Footwear",
    name: "Ankle Boots",
    description: "Chelsea-style ankle boots in full-grain leather with elastic side panels and Cuban heel. Goodyear welt construction.",
    price: "189.00", comparePrice: "240.00", brand: "Cobbler & Co.",
    imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop",
    isFeatured: true, stock: 18,
  },
  {
    catName: "Footwear",
    name: "Canvas Espadrilles",
    description: "Classic jute-sole espadrilles in natural canvas. Lightweight, breathable and perfect for summer. Sizes 36–46.",
    price: "45.00", comparePrice: null, brand: "SolarLux",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1998&auto=format&fit=crop",
    isFeatured: false, stock: 45,
  },

  // Groceries & Kitchen
  {
    catName: "Groceries & Kitchen",
    name: "Himalayan Pink Salt Mill",
    description: "Adjustable ceramic grinder pre-filled with coarse Himalayan pink salt. Refillable, dishwasher-safe glass body.",
    price: "16.99", comparePrice: null, brand: "Terra Oliva",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1944&auto=format&fit=crop",
    isFeatured: false, stock: 80,
  },
  {
    catName: "Groceries & Kitchen",
    name: "Matcha Ceremonial Grade 100g",
    description: "First-flush ceremonial matcha from Uji, Japan. Vibrant green, umami-rich taste. Sourced directly from family farms.",
    price: "34.99", comparePrice: "45.00", brand: "PureLeaf",
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true, stock: 60,
  },
  {
    catName: "Groceries & Kitchen",
    name: "Bamboo Cutting Board Set",
    description: "Set of 3 sustainably sourced bamboo cutting boards in small, medium and large. Juice groove, anti-slip feet.",
    price: "38.99", comparePrice: null, brand: "EcoRoots",
    imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=1887&auto=format&fit=crop",
    isFeatured: false, stock: 55,
  },
];

async function main() {
  console.log(`Seeding ${bulkProducts.length} products...`);

  const existingCats = await db.select().from(categoriesTable);
  const catMap: Record<string, number> = {};
  for (const c of existingCats) catMap[c.name] = c.id;

  let inserted = 0;
  for (const p of bulkProducts) {
    const categoryId = catMap[p.catName];
    if (!categoryId) {
      console.warn(`  Skipping ${p.name}: category "${p.catName}" not found`);
      continue;
    }
    const [product] = await db.insert(productsTable).values({
      name: p.name,
      description: p.description,
      price: p.price,
      comparePrice: p.comparePrice,
      categoryId,
      brand: p.brand,
      imageUrl: p.imageUrl,
      isActive: true,
      isFeatured: p.isFeatured,
    }).returning();
    await db.insert(inventoryTable).values({ productId: product.id, quantity: p.stock });
    console.log(`  ✓ ${product.name} — $${product.price}`);
    inserted++;
  }

  console.log(`\nDone! Added ${inserted} products.`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
