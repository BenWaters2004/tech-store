import { Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import ShopProductCard from "../components/shop-product-card";
import { categories } from "../data/categories";

export default function Shop({
  products,
  addToCart,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
}) {
  const [sortBy, setSortBy] = useState("default");
  const PRICE_MIN = 0;
  const PRICE_MAX = 2000;
  const PRICE_STEP = 50;

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 2000,
  });

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const searchableText =
        `${product.name} ${product.brand} ${product.category}`.toLowerCase();

      const matchesSearch = searchableText.includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      const price = Number(product.price);
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price) - Number(b.price);
      if (sortBy === "price-high") return Number(b.price) - Number(a.price);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, searchQuery, categoryFilter, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setPriceRange({
      min: PRICE_MIN,
      max: PRICE_MAX,
    });
    setSortBy("default");
  };

  const showingText =
    filteredProducts.length === 0
      ? "Showing 0 results"
      : `Showing 1-${filteredProducts.length} of ${products.length} results`;

  return (
    <div className="grid gap-8 lg:grid-cols-[310px_1fr]">
      {/* Sidebar */}
      <aside className="h-fit bg-white p-8 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            Product categories
          </h2>

          <div className="mt-8 grid gap-5">
            <CategoryOption
              label="All Products"
              active={categoryFilter === "All"}
              onClick={() => setCategoryFilter("All")}
            />

            {categories.map((category) => (
              <CategoryOption
                key={category.name}
                label={category.name}
                active={categoryFilter === category.name}
                onClick={() => setCategoryFilter(category.name)}
              />
            ))}
          </div>
        </div>

        <div className="my-8 border-t border-slate-200" />

        <div>
          <h2 className="text-xl font-black text-slate-950">Price Range</h2>

          <div className="mt-8">
            <div className="price-slider relative h-8">
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />

              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-600"
                style={{
                  left: `${(priceRange.min / PRICE_MAX) * 100}%`,
                  right: `${100 - (priceRange.max / PRICE_MAX) * 100}%`,
                }}
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={priceRange.min}
                onChange={(event) => {
                  const value = Math.min(
                    Number(event.target.value),
                    priceRange.max - PRICE_STEP
                  );

                  setPriceRange((current) => ({
                    ...current,
                    min: value,
                  }));
                }}
                className="price-range-input"
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={priceRange.max}
                onChange={(event) => {
                  const value = Math.max(
                    Number(event.target.value),
                    priceRange.min + PRICE_STEP
                  );

                  setPriceRange((current) => ({
                    ...current,
                    max: value,
                  }));
                }}
                className="price-range-input"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-base font-semibold text-slate-600">
              <span>£{priceRange.min}</span>
              <span>£{priceRange.max}</span>
            </div>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Price: £{priceRange.min} - £{priceRange.max}
            </p>
          </div>
        </div>

        <div className="my-8 border-t border-slate-200" />

        <div>
          <h2 className="text-xl font-black text-slate-950">Search</h2>

          <div className="mt-5 flex items-center gap-3 border border-slate-200 px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm font-semibold outline-none"
            />
          </div>
        </div>

        {(searchQuery || categoryFilter !== "All" || priceRange.min !== PRICE_MIN || priceRange.max !== PRICE_MAX) && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-8 flex w-full items-center justify-center gap-2 bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-brand-600"
          >
            <X size={17} />
            Clear filters
          </button>
        )}
      </aside>

      {/* Products area */}
      <section>
        <div className="mb-8 flex flex-col gap-4 bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-medium text-slate-600">
            {showingText}
          </p>

          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-slate-400" />
            <span className="font-black text-slate-950">Sort by:</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="border-b border-slate-300 bg-transparent px-2 py-1 font-semibold text-slate-500 outline-none transition focus:border-brand-600"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">
              No products found
            </h2>
            <p className="mt-2 text-slate-500">
              Try changing the category, search term, or price range.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 bg-brand-600 px-6 py-3 font-black text-white transition hover:bg-brand-500"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ShopProductCard
                key={product.id}
                product={product}
                index={index}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CategoryOption({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-4 text-left"
    >
      <span className="flex items-center gap-4">
        <span
          className={`grid h-4 w-4 place-items-center border transition ${
            active
              ? "border-brand-600 bg-brand-600"
              : "border-slate-300 bg-white group-hover:border-brand-600"
          }`}
        >
          {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
        </span>

        <span
          className={`text-sm font-semibold transition ${
            active
              ? "text-brand-600"
              : "text-slate-800 group-hover:text-brand-600"
          }`}
        >
          {label}
        </span>
      </span>

      <Plus
        size={18}
        className={`transition ${
          active ? "text-brand-600 rotate-45" : "text-slate-400"
        }`}
      />
    </button>
  );
}