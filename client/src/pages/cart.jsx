import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../api/api";
import { money } from "../utils/money";

export default function Cart({ cart, setCart }) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    shipping_address: "",
  });

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart]
  );

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((current) =>
      current.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCart((current) =>
      current.filter((item) => item.product_id !== productId)
    );
  };

  const submitOrder = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const payload = {
        ...form,
        items: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const { data } = await api.post("/orders", payload);

      alert(`Order placed successfully. Order ID: ${data.order_id}`);

      setCart([]);
      setForm({
        customer_name: "",
        customer_email: "",
        shipping_address: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Could not place order");
    }
  };

  return (
    <>
      <section className="mb-8">
        <p className="text-sm font-black uppercase tracking-widest text-blue-600">
          Cart
        </p>
        <h1 className="text-5xl font-black tracking-[-0.06em] text-slate-950">
          Your basket
        </h1>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          {cart.length === 0 && (
            <p className="text-slate-500">Your cart is empty.</p>
          )}

          <div className="grid gap-4">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="grid gap-4 rounded-3xl border border-slate-200 p-4 md:grid-cols-[90px_1fr_100px_auto] md:items-center"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div>
                  <h3 className="font-black text-slate-950">{item.name}</h3>
                  <p className="mt-1 font-bold text-slate-500">
                    {money(item.price)}
                  </p>
                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.product_id, Number(event.target.value))
                  }
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                />

                <button
                  onClick={() => removeItem(item.product_id)}
                  className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-3 font-black text-red-700"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={submitOrder}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Checkout
          </h2>

          <label className="mt-5 block">
            <span className="font-black text-slate-700">Full name</span>
            <input
              value={form.customer_name}
              onChange={(event) =>
                setForm({ ...form, customer_name: event.target.value })
              }
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-black text-slate-700">Email</span>
            <input
              type="email"
              value={form.customer_email}
              onChange={(event) =>
                setForm({ ...form, customer_email: event.target.value })
              }
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-black text-slate-700">Delivery address</span>
            <textarea
              value={form.shipping_address}
              onChange={(event) =>
                setForm({ ...form, shipping_address: event.target.value })
              }
              required
              className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </label>

          <div className="my-6 flex justify-between border-t border-slate-200 pt-5">
            <span className="font-black text-slate-600">Total</span>
            <strong className="text-2xl font-black text-slate-950">
              {money(total)}
            </strong>
          </div>

          <button className="w-full rounded-full bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-700">
            Place order
          </button>
        </form>
      </div>
    </>
  );
}
