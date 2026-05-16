import { useEffect, useState } from "react";
import { LogOut, Trash2 } from "lucide-react";
import api from "../api/api";
import { categories, emptyProduct } from "../data/categories";
import { money } from "../utils/money";

export default function Admin({ token, setToken, products, loadProducts }) {
  const [login, setLogin] = useState({
    email: "admin@techstore.com",
    password: "admin123",
  });

  const [productForm, setProductForm] = useState(emptyProduct);
  const [orders, setOrders] = useState([]);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadOrders = async () => {
    const { data } = await api.get("/orders", authHeaders);
    setOrders(data);
  };

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.post("/auth/login", login);
      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
    } catch {
      alert("Invalid admin login");
    }
  };

  const createProduct = async (event) => {
    event.preventDefault();

    try {
      await api.post(
        "/products",
        {
          ...productForm,
          price: Number(productForm.price),
          compare_at_price: productForm.compare_at_price
            ? Number(productForm.compare_at_price)
            : null,
          stock: Number(productForm.stock),
          featured: Boolean(productForm.featured),
        },
        authHeaders
      );

      setProductForm(emptyProduct);
      await loadProducts();
      alert("Product added");
    } catch (error) {
      alert(error.response?.data?.message || "Could not add product");
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = confirm("Delete this product?");
    if (!confirmed) return;

    await api.delete(`/products/${id}`, authHeaders);
    await loadProducts();
  };

  const updateOrderStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status }, authHeaders);
    await loadOrders();
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  if (!token) {
    return (
      <section className="mx-auto grid min-h-[65vh] max-w-md place-items-center">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            Admin
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            Admin login
          </h1>

          <label className="mt-6 block">
            <span className="font-black text-slate-700">Email</span>
            <input
              value={login.email}
              onChange={(event) =>
                setLogin({ ...login, email: event.target.value })
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-black text-slate-700">Password</span>
            <input
              type="password"
              value={login.password}
              onChange={(event) =>
                setLogin({ ...login, password: event.target.value })
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </label>

          <button className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-700">
            Login
          </button>
        </form>
      </section>
    );
  }

  return (
    <>
      <section className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            Admin
          </p>
          <h1 className="text-5xl font-black tracking-[-0.06em] text-slate-950">
            Store management
          </h1>
        </div>

        <button
          onClick={logout}
          className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-black text-slate-950"
        >
          <LogOut size={18} />
          Logout
        </button>
      </section>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <form
          onSubmit={createProduct}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Add product
          </h2>

          <div className="mt-5 grid gap-4">
            <input
              placeholder="Product name"
              value={productForm.name}
              onChange={(event) =>
                setProductForm({ ...productForm, name: event.target.value })
              }
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            />

            <input
              placeholder="Brand"
              value={productForm.brand}
              onChange={(event) =>
                setProductForm({ ...productForm, brand: event.target.value })
              }
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            />

            <select
              value={productForm.category}
              onChange={(event) =>
                setProductForm({ ...productForm, category: event.target.value })
              }
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            >
              {categories.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={productForm.price}
                onChange={(event) =>
                  setProductForm({ ...productForm, price: event.target.value })
                }
                required
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Compare price"
                value={productForm.compare_at_price}
                onChange={(event) =>
                  setProductForm({
                    ...productForm,
                    compare_at_price: event.target.value,
                  })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>

            <input
              type="number"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(event) =>
                setProductForm({ ...productForm, stock: event.target.value })
              }
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            />

            <input
              placeholder="Image URL"
              value={productForm.image_url}
              onChange={(event) =>
                setProductForm({
                  ...productForm,
                  image_url: event.target.value,
                })
              }
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            />

            <textarea
              placeholder="Description"
              value={productForm.description}
              onChange={(event) =>
                setProductForm({
                  ...productForm,
                  description: event.target.value,
                })
              }
              className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            />

            <button className="rounded-full bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-700">
              Add product
            </button>
          </div>
        </form>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Products
          </h2>

          <div className="mt-5 grid gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 p-4 md:flex-row md:items-center"
              >
                <div>
                  <strong className="text-slate-950">{product.name}</strong>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {money(product.price)} · Stock: {product.stock}
                  </p>
                </div>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex w-fit items-center gap-2 rounded-full bg-red-50 px-4 py-2 font-black text-red-700"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Orders
        </h2>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                <th className="py-3">ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Email</th>
                <th className="py-3">Total</th>
                <th className="py-3">Items</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100">
                  <td className="py-4 font-black">#{order.id}</td>
                  <td className="py-4 font-bold">{order.customer_name}</td>
                  <td className="py-4 text-slate-500">
                    {order.customer_email}
                  </td>
                  <td className="py-4 font-black">{money(order.total)}</td>
                  <td className="py-4">{order.item_count}</td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(order.id, event.target.value)
                      }
                      className="rounded-full border border-slate-200 px-4 py-2 font-bold outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="py-6 text-slate-500">No orders yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
