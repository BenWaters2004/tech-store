import { useEffect, useState } from "react";
import api from "./api/api";

import Header from "./components/header";
import Admin from "./pages/admin";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Footer from "./components/footer";

export default function App() {
  const [view, setView] = useState("home");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const loadProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product_id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          product_id: product.id,
          name: product.name,
          price: Number(product.price),
          image_url: product.image_url,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-950">
      <Header
        setView={setView}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onAccountClick={() => setView("admin")}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {view === "home" && (
          <Home products={products} addToCart={addToCart} setView={setView} />
        )}

        {view === "shop" && (
          <Shop
            products={products}
            addToCart={addToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        )}

        {view === "cart" && <Cart cart={cart} setCart={setCart} />}

        {view === "contact" && <Contact />}

        {view === "admin" && (
          <Admin
            token={token}
            setToken={setToken}
            products={products}
            loadProducts={loadProducts}
          />
        )}
      </main>
      <Footer setView={setView} />
    </div>
  );
}