import express from "express";
import pool from "../db.js";
import { auth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { customer_name, customer_email, shipping_address, items } = req.body;

  if (!customer_name || !customer_email || !shipping_address) {
    return res.status(400).json({ message: "Customer details are required" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order items are required" });
  }

  const itemMap = new Map();

  for (const item of items) {
    const productId = Number(item.product_id);
    const quantity = Number(item.quantity);

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid item in cart" });
    }

    itemMap.set(productId, (itemMap.get(productId) || 0) + quantity);
  }

  const productIds = [...itemMap.keys()];
  const placeholders = productIds.map(() => "?").join(",");

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [products] = await connection.query(
      `
      SELECT id, name, price, stock
      FROM products
      WHERE active = 1 AND id IN (${placeholders})
      FOR UPDATE
      `,
      productIds
    );

    if (products.length !== productIds.length) {
      throw new Error("One or more products are unavailable");
    }

    let total = 0;

    for (const product of products) {
      const quantity = itemMap.get(product.id);

      if (product.stock < quantity) {
        throw new Error(`${product.name} does not have enough stock`);
      }

      total += Number(product.price) * quantity;
    }

    const [orderResult] = await connection.query(
      `
      INSERT INTO orders (customer_name, customer_email, shipping_address, total, status)
      VALUES (?, ?, ?, ?, 'pending')
      `,
      [customer_name, customer_email, shipping_address, total]
    );

    const orderId = orderResult.insertId;

    for (const product of products) {
      const quantity = itemMap.get(product.id);

      await connection.query(
        `
        INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price)
        VALUES (?, ?, ?, ?, ?)
        `,
        [orderId, product.id, product.name, quantity, product.price]
      );

      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [quantity, product.id]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order created",
      order_id: orderId,
      total
    });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ message: error.message || "Could not create order" });
  } finally {
    connection.release();
  }
});

router.get("/", auth, requireAdmin, async (req, res) => {
  const [orders] = await pool.query(
    `
    SELECT 
      o.id,
      o.customer_name,
      o.customer_email,
      o.shipping_address,
      o.total,
      o.status,
      o.created_at,
      COALESCE(SUM(oi.quantity), 0) AS item_count
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC
    `
  );

  res.json(orders);
});

router.get("/:id", auth, requireAdmin, async (req, res) => {
  const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [req.params.id]);

  if (!orders[0]) {
    return res.status(404).json({ message: "Order not found" });
  }

  const [items] = await pool.query(
    "SELECT * FROM order_items WHERE order_id = ?",
    [req.params.id]
  );

  res.json({
    ...orders[0],
    items
  });
});

router.patch("/:id/status", auth, requireAdmin, async (req, res) => {
  const validStatuses = ["pending", "paid", "processing", "shipped", "cancelled"];
  const { status } = req.body;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id]);

  res.json({ message: "Order status updated" });
});

export default router;