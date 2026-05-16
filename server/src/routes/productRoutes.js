import express from "express";
import pool from "../db.js";
import { auth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

router.get("/", async (req, res) => {
  const { search, category, featured } = req.query;

  let sql = `
    SELECT id, name, slug, brand, category, description, price,
           compare_at_price, stock, image_url, featured
    FROM products
    WHERE active = 1
  `;

  const params = [];

  if (search) {
    sql += " AND (name LIKE ? OR brand LIKE ? OR category LIKE ?)";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (featured === "1") {
    sql += " AND featured = 1";
  }

  sql += " ORDER BY created_at DESC";

  const [products] = await pool.query(sql, params);
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const [rows] = await pool.query(
    `
    SELECT id, name, slug, brand, category, description, price,
           compare_at_price, stock, image_url, featured
    FROM products
    WHERE id = ? AND active = 1
    `,
    [req.params.id]
  );

  if (!rows[0]) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(rows[0]);
});

router.post("/", auth, requireAdmin, async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    compare_at_price,
    stock,
    image_url,
    featured
  } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ message: "Name, category and price are required" });
  }

  const slug = `${slugify(name)}-${Date.now()}`;

  const [result] = await pool.query(
    `
    INSERT INTO products
    (name, slug, brand, category, description, price, compare_at_price, stock, image_url, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      slug,
      brand || null,
      category,
      description || null,
      price,
      compare_at_price || null,
      stock || 0,
      image_url || null,
      featured ? 1 : 0
    ]
  );

  res.status(201).json({
    message: "Product created",
    id: result.insertId
  });
});

router.put("/:id", auth, requireAdmin, async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    compare_at_price,
    stock,
    image_url,
    featured,
    active
  } = req.body;

  await pool.query(
    `
    UPDATE products
    SET name = ?, brand = ?, category = ?, description = ?, price = ?,
        compare_at_price = ?, stock = ?, image_url = ?, featured = ?, active = ?
    WHERE id = ?
    `,
    [
      name,
      brand || null,
      category,
      description || null,
      price,
      compare_at_price || null,
      stock || 0,
      image_url || null,
      featured ? 1 : 0,
      active === false ? 0 : 1,
      req.params.id
    ]
  );

  res.json({ message: "Product updated" });
});

router.delete("/:id", auth, requireAdmin, async (req, res) => {
  await pool.query("UPDATE products SET active = 0 WHERE id = ?", [req.params.id]);
  res.json({ message: "Product deleted" });
});

export default router;