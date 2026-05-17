import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { money } from "../utils/money";

export default function ShopProductCard({ product, addToCart, index = 0 }) {
  const hasComparePrice =
    product.compare_at_price &&
    Number(product.compare_at_price) > Number(product.price);

  const inStock = Number(product.stock || 0) > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.06 }}
      className="group relative overflow-hidden bg-white p-8 shadow-sm transition duration-300 hover:shadow-xl"
    >
      {index === 2 && (
        <span className="absolute right-8 top-7 rounded-full bg-emerald-500 px-4 py-2 text-xs font-black uppercase text-white">
          Popular
        </span>
      )}

      <button
        type="button"
        className="absolute right-6 top-6 z-20 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 opacity-0 shadow-md transition duration-200 hover:border-brand-600 hover:bg-brand-600 hover:text-white group-hover:opacity-100"
        aria-label="Add to favourites"
      >
        <Heart size={19} />
      </button>

      <div className="flex h-64 items-center justify-center">
        <img
          src={product.image_url || "https://placehold.co/600x600?text=Tech"}
          alt={product.name}
          className="max-h-56 w-full object-contain"
        />
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center gap-1 text-brand-600">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={18} fill="currentColor" />
          ))}
        </div>

        <h3 className="line-clamp-2 min-h-14 text-lg font-black leading-7 text-slate-950">
          {product.name}
        </h3>

        <div className="relative mt-5 h-14 overflow-hidden">
          <div className="flex h-full items-center gap-3 transition duration-300 group-hover:opacity-0">
            {hasComparePrice && (
              <span className="text-lg font-black text-slate-400 line-through">
                {money(product.compare_at_price)}
              </span>
            )}

            <span className="text-xl font-black text-red-500">
              {money(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={!inStock}
            className="absolute inset-x-0 bottom-0 flex h-14 translate-y-full items-center justify-center gap-2 bg-slate-950 px-5 text-sm font-black text-white transition duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300 group-hover:translate-y-0"
          >
            <ShoppingCart size={18} />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}