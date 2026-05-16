import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { money } from "../utils/money";

export default function ProductCard({ product, addToCart }) {
  const hasDiscount = product.compare_at_price && Number(product.compare_at_price) > Number(product.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white card-hover"
    >
      <div className="relative overflow-hidden bg-slate-100">
        {hasDiscount && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white">
            SALE
          </span>
        )}

        <button className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-brand-600 hover:text-white">
          <Heart size={18} />
        </button>

        <img
          src={product.image_url || "https://placehold.co/900x700?text=Tech+Product"}
          alt={product.name}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock < 1}
          className="absolute bottom-4 left-4 right-4 translate-y-16 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white opacity-0 transition duration-300 hover:bg-brand-700 disabled:bg-slate-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingBag size={17} />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </span>
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-wide text-brand-600">
            {product.category}
          </p>

          <div className="flex items-center gap-1 text-sm font-black text-amber-500">
            <Star size={15} fill="currentColor" />
            4.8
          </div>
        </div>

        <h3 className="mt-2 line-clamp-2 min-h-14 text-lg font-black leading-7 tracking-tight text-slate-950">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <strong className="text-xl font-black text-slate-950">
              {money(product.price)}
            </strong>

            {hasDiscount && (
              <span className="text-sm font-bold text-slate-400 line-through">
                {money(product.compare_at_price)}
              </span>
            )}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              product.stock > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {product.stock > 0 ? `${product.stock} left` : "Sold out"}
          </span>
        </div>
      </div>
    </motion.article>
  );
}