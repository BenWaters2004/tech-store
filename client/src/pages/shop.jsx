import { Grid3X3, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/product-card";
import { categories } from "../data/categories";

export default function Shop({
  products,
  addToCart,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
}) {
  const filteredProducts = products.filter((product) => {
    const searchValue =
      `${product.name} ${product.brand} ${product.category}`.toLowerCase();

    const matchesSearch = searchValue.includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
  };

  return (
    <>
      <section className="hero-grid-bg overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-brand-800 to-brand-600 p-8 text-white md:p-10">
        <p className="text-sm font-black uppercase tracking-widest text-brand-100">
          Shop
        </p>

        <h1 className="mt-2 text-5xl font-black tracking-[-0.06em] md:text-6xl">
          Tech products
        </h1>

        <p className="mt-4 max-w-2xl text-brand-100">
          Browse premium technology products from your MySQL database.
        </p>
      </section>

      <section className="my-8 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-100">
          <Search size={18} className="text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent font-semibold outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 font-black outline-none shadow-sm"
        >
          <option>All</option>
          {categories.map((item) => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>

        {(searchQuery || categoryFilter !== "All") && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <X size={17} />
            Clear
          </button>
        )}
      </section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => setCategoryFilter(item.name)}
              className={`card-hover rounded-3xl border p-5 text-left ${
                categoryFilter === item.name
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-950"
              }`}
            >
              <Icon />
              <span className="mt-3 block font-black">{item.name}</span>
            </button>
          );
        })}
      </section>

      <div className="mb-5 flex flex-col justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <Grid3X3 size={20} />
          </div>

          <div>
            <p className="font-black text-slate-950">
              Showing {filteredProducts.length} product
              {filteredProducts.length === 1 ? "" : "s"}
            </p>
            <p className="text-sm text-slate-500">
              {categoryFilter === "All" ? "All categories" : categoryFilter}
              {searchQuery ? ` · Search: ${searchQuery}` : ""}
            </p>
          </div>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
          <SlidersHorizontal size={17} />
          Sort: Featured
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">
            No products found
          </h2>
          <p className="mt-2 text-slate-500">
            Try changing the category or clearing your search.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full bg-brand-600 px-6 py-3 font-black text-white transition hover:bg-brand-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </section>
      )}
    </>
  );
}