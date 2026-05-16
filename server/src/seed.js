import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const products = [
  {
    name: "Nova X1 Smartphone",
    brand: "NovaTech",
    category: "Smartphones",
    description: "A powerful 5G smartphone with OLED display and fast charging.",
    price: 699.99,
    compare_at_price: 799.99,
    stock: 25,
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900",
    featured: 1
  },
  {
    name: "SoundPulse Wireless Headphones",
    brand: "SoundPulse",
    category: "Audio",
    description: "Noise-cancelling wireless headphones with 40-hour battery life.",
    price: 149.99,
    compare_at_price: 189.99,
    stock: 40,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    featured: 1
  },
  {
    name: "Orbit Smart Watch",
    brand: "Orbit",
    category: "Wearables",
    description: "Fitness tracking, notifications, heart rate monitoring and GPS.",
    price: 199.99,
    compare_at_price: 249.99,
    stock: 35,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    featured: 1
  },
  {
    name: "AeroBook Pro Laptop",
    brand: "AeroBook",
    category: "Laptops",
    description: "Lightweight laptop with a high resolution display and fast SSD storage.",
    price: 1199.99,
    compare_at_price: 1399.99,
    stock: 12,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900",
    featured: 1
  }
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@techstore.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = process.env.ADMIN_NAME || "Admin User";

  const [existingAdmin] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [adminEmail]
  );

  if (!existingAdmin[0]) {
    const hash = await bcrypt.hash(adminPassword, 10);

    await pool.query(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'admin')
      `,
      [adminName, adminEmail, hash]
    );

    console.log(`Admin created: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("Admin already exists");
  }

  for (const product of products) {
    const slug = slugify(product.name);

    await pool.query(
      `
      INSERT IGNORE INTO products
      (name, slug, brand, category, description, price, compare_at_price, stock, image_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        product.name,
        slug,
        product.brand,
        product.category,
        product.description,
        product.price,
        product.compare_at_price,
        product.stock,
        product.image_url,
        product.featured
      ]
    );
  }

  console.log("Seed completed");
  process.exit();
}

seed();