import { db, categoriesTable, productsTable, inventoryTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const newCategories = [
  { name: "Bags & Accessories", description: "Handbags, backpacks, wallets and accessories" },
  { name: "Personal Care", description: "Skincare, haircare and daily grooming essentials" },
  { name: "Footwear", description: "Shoes, sneakers, sandals and boots" },
  { name: "Groceries & Kitchen", description: "Daily essentials, pantry staples and kitchen goods" },
];

const newProducts = [
  // Bags & Accessories
  {
    catName: "Bags & Accessories",
    name: "Leather Tote Bag",
    description: "Spacious genuine leather tote in classic tan. Perfect for work or weekend outings. Features interior pockets and magnetic closure.",
    price: "189.99",
    comparePrice: "249.00",
    brand: "Artisan Craft",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
    isFeatured: true,
    stock: 25,
  },
  {
    catName: "Bags & Accessories",
    name: "Canvas Backpack",
    description: "Durable waxed canvas backpack with laptop sleeve and multiple compartments. Ideal for travel and daily commute.",
    price: "89.99",
    comparePrice: null,
    brand: "TrailMaster",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
    isFeatured: false,
    stock: 40,
  },
  {
    catName: "Bags & Accessories",
    name: "Crossbody Mini Bag",
    description: "Compact crossbody bag in vegan leather. Adjustable strap, card slots and zip closure. Available in black.",
    price: "59.99",
    comparePrice: null,
    brand: "Zoé Paris",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop",
    isFeatured: true,
    stock: 35,
  },
  {
    catName: "Bags & Accessories",
    name: "Leather Wallet",
    description: "Slim bifold wallet in full-grain leather. Holds up to 8 cards and cash. RFID blocking technology.",
    price: "45.00",
    comparePrice: null,
    brand: "Artisan Craft",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop",
    isFeatured: false,
    stock: 60,
  },
  {
    catName: "Bags & Accessories",
    name: "Luxury Sunglasses",
    description: "UV400 polarized sunglasses with acetate frame. Timeless aviator silhouette with gold-tone detailing.",
    price: "129.00",
    comparePrice: "160.00",
    brand: "SolarLux",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
    isFeatured: true,
    stock: 20,
  },

  // Personal Care
  {
    catName: "Personal Care",
    name: "Vitamin C Face Serum",
    description: "Brightening serum with 15% vitamin C, hyaluronic acid and niacinamide. Reduces dark spots and boosts radiance in 4 weeks.",
    price: "34.99",
    comparePrice: "49.00",
    brand: "GlowLab",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
    isFeatured: true,
    stock: 80,
  },
  {
    catName: "Personal Care",
    name: "Natural Shampoo Bar",
    description: "Sulfate-free solid shampoo with argan oil and peppermint. Lasts up to 80 washes. Zero plastic packaging.",
    price: "12.99",
    comparePrice: null,
    brand: "EcoRoots",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2012&auto=format&fit=crop",
    isFeatured: false,
    stock: 120,
  },
  {
    catName: "Personal Care",
    name: "Men's Grooming Kit",
    description: "Complete grooming set including safety razor, shaving brush, stand and shaving cream. The perfect gift for him.",
    price: "79.99",
    comparePrice: "99.00",
    brand: "ArtOfShave",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop",
    isFeatured: true,
    stock: 30,
  },
  {
    catName: "Personal Care",
    name: "Moisturizing Body Lotion",
    description: "Deep-hydrating body lotion with shea butter and vitamin E. Absorbs quickly with no greasy feel. 500ml pump bottle.",
    price: "18.99",
    comparePrice: null,
    brand: "GlowLab",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false,
    stock: 100,
  },

  // Footwear
  {
    catName: "Footwear",
    name: "Leather Oxford Shoes",
    description: "Classic full-brogue Oxford in genuine calf leather. Leather sole with rubber heel. Available in dark brown.",
    price: "219.99",
    comparePrice: "280.00",
    brand: "Cobbler & Co.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true,
    stock: 18,
  },
  {
    catName: "Footwear",
    name: "Running Sneakers",
    description: "Lightweight running shoe with responsive foam midsole and breathable mesh upper. Great for daily training.",
    price: "119.99",
    comparePrice: "140.00",
    brand: "SpeedRun",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false,
    stock: 45,
  },
  {
    catName: "Footwear",
    name: "Casual Slip-On Loafers",
    description: "Suede loafers with cushioned insole and flexible rubber sole. Goes from desk to dinner effortlessly.",
    price: "89.00",
    comparePrice: null,
    brand: "Cobbler & Co.",
    imageUrl: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=2069&auto=format&fit=crop",
    isFeatured: true,
    stock: 28,
  },

  // Groceries & Kitchen
  {
    catName: "Groceries & Kitchen",
    name: "Organic Green Tea (100 bags)",
    description: "Premium loose-leaf style organic green tea bags. Light, refreshing and rich in antioxidants. Sourced from Darjeeling.",
    price: "14.99",
    comparePrice: null,
    brand: "PureLeaf",
    imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false,
    stock: 200,
  },
  {
    catName: "Groceries & Kitchen",
    name: "Cold-Press Olive Oil 500ml",
    description: "Extra virgin cold-pressed olive oil from small-batch Sicilian groves. Rich flavor, perfect for cooking and dressings.",
    price: "22.99",
    comparePrice: null,
    brand: "Terra Oliva",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1944&auto=format&fit=crop",
    isFeatured: false,
    stock: 90,
  },
  {
    catName: "Groceries & Kitchen",
    name: "Stainless Steel Water Bottle",
    description: "Double-wall vacuum insulated 1L bottle. Keeps drinks cold 24h or hot 12h. BPA-free with leakproof lid.",
    price: "29.99",
    comparePrice: "39.00",
    brand: "HydraVault",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop",
    isFeatured: true,
    stock: 75,
  },
  {
    catName: "Groceries & Kitchen",
    name: "Artisan Coffee Beans 250g",
    description: "Single-origin medium roast Arabica beans from Ethiopian highlands. Notes of blueberry, jasmine and dark chocolate.",
    price: "19.99",
    comparePrice: null,
    brand: "BeanOrigin",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1887&auto=format&fit=crop",
    isFeatured: true,
    stock: 110,
  },

  // More Fashion
  {
    catName: "Clothing",
    name: "Silk Wrap Dress",
    description: "Elegant wrap dress in 100% silk with floral print. Adjustable tie waist, perfect for formal and semi-formal occasions.",
    price: "159.99",
    comparePrice: "200.00",
    brand: "Maison Élégance",
    imageUrl: "https://images.unsplash.com/photo-1496217590455-aa63a8550c23?q=80&w=1887&auto=format&fit=crop",
    isFeatured: true,
    stock: 22,
  },
  {
    catName: "Clothing",
    name: "Linen Shirt",
    description: "Relaxed-fit linen shirt in natural white. Breathable, lightweight and perfect for warm weather. Button-down collar.",
    price: "64.99",
    comparePrice: null,
    brand: "CoastalThreads",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop",
    isFeatured: false,
    stock: 50,
  },
  {
    catName: "Clothing",
    name: "Wool Overcoat",
    description: "Tailored double-breasted overcoat in premium Italian wool blend. Notched lapels, fully lined. A winter wardrobe essential.",
    price: "299.00",
    comparePrice: "380.00",
    brand: "Maison Élégance",
    imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1887&auto=format&fit=crop",
    isFeatured: true,
    stock: 15,
  },
];

async function main() {
  console.log("Seeding new categories and products...");

  // Get existing categories
  const existingCats = await db.select().from(categoriesTable);
  const catMap: Record<string, number> = {};
  for (const c of existingCats) catMap[c.name] = c.id;

  // Insert new categories if they don't exist
  for (const cat of newCategories) {
    if (!catMap[cat.name]) {
      const [inserted] = await db.insert(categoriesTable).values(cat).returning();
      catMap[inserted.name] = inserted.id;
      console.log(`  Created category: ${inserted.name}`);
    } else {
      console.log(`  Category already exists: ${cat.name}`);
    }
  }

  // Insert new products
  let inserted = 0;
  for (const p of newProducts) {
    const categoryId = catMap[p.catName];
    if (!categoryId) {
      console.warn(`  Skipping ${p.name}: category ${p.catName} not found`);
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
    console.log(`  Added: ${product.name} ($${product.price})`);
    inserted++;
  }

  console.log(`\nDone! Added ${inserted} products.`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
