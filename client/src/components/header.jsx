import { useEffect, useState } from "react";
import {
  ChevronDown,
  Globe2,
  Heart,
  HelpCircle,
  Menu,
  Search,
  ShoppingCart,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { categories } from "../data/categories";

export default function Header({
  setView,
  cartCount,
  searchQuery = "",
  setSearchQuery,
  categoryFilter = "All",
  setCategoryFilter,
  onAccountClick,
  favouriteCount = 0,
}) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const submitSearch = (event) => {
    event.preventDefault();
    setSearchQuery(localSearch.trim());
    setView("shop");
    setMobileOpen(false);
  };

  const selectCategory = (category) => {
    setCategoryFilter(category);
    setView("shop");
    setCategoryOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-semibold text-slate-300">
            Demo e-commerce website — portfolio project
          </p>

          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <button className="flex items-center gap-1 transition hover:text-white">
              <HelpCircle size={14} />
              Help Center
            </button>

            <label className="flex items-center gap-1">
              <Globe2 size={14} />
              <select className="bg-transparent text-xs font-bold outline-none">
                <option className="text-slate-950">English</option>
                <option className="text-slate-950">German</option>
                <option className="text-slate-950">French</option>
              </select>
            </label>

            <select className="bg-transparent text-xs font-bold outline-none">
              <option className="text-slate-950">GBP £</option>
              <option className="text-slate-950">EUR €</option>
              <option className="text-slate-950">USD $</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[210px_1fr_auto] lg:items-center">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setView("home")}
              className="text-2xl font-black tracking-[-0.04em] text-slate-950"
            >
              TECH<span className="text-brand-600">VERSE</span>
            </button>

            <button
              onClick={() => setMobileOpen((current) => !current)}
              className="rounded-full border border-slate-200 p-2 text-slate-700 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <form
            onSubmit={submitSearch}
            className="flex overflow-hidden rounded-full border border-slate-200 bg-slate-50 transition focus-within:border-brand-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-100"
          >
            <div className="flex flex-1 items-center gap-3 px-5">
              <Search size={19} className="text-slate-400" />
              <input
                value={localSearch}
                onChange={(event) => setLocalSearch(event.target.value)}
                placeholder="Search for phones, laptops, headphones..."
                className="h-12 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="hidden bg-brand-600 px-7 text-sm font-black text-white transition hover:bg-brand-700 sm:block"
            >
              Search
            </button>
          </form>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={onAccountClick}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
              <UserRound size={18} />
              Login / Register
            </button>

            <button className="relative rounded-full border border-slate-200 bg-white p-3 text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700">
              <Heart size={20} />

              {favouriteCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-black text-white">
                  {favouriteCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setView("cart")}
              className="relative flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-brand-700"
            >
              <ShoppingCart size={18} />
              Cart

              {cartCount > 0 && (
                <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mt-4 grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl lg:hidden">
            <button
              onClick={onAccountClick}
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-slate-800"
            >
              <UserRound size={18} />
              Login / Register
            </button>

            <button className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-slate-800">
              <Heart size={18} />
              Favourites
            </button>

            <button
              onClick={() => {
                setView("cart");
                setMobileOpen(false);
              }}
              className="flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white"
            >
              <ShoppingCart size={18} />
              Cart
              {cartCount > 0 && (
                <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="relative">
            <button
              onClick={() => setCategoryOpen((current) => !current)}
              className="flex w-full items-center justify-between gap-3 rounded-full bg-brand-600 px-5 py-3 text-sm font-black text-white transition hover:bg-brand-700 md:w-auto"
            >
              <span>
                Shop by Categories
                {categoryFilter !== "All" && (
                  <span className="ml-2 text-brand-100">/ {categoryFilter}</span>
                )}
              </span>
              <ChevronDown
                size={18}
                className={`transition ${categoryOpen ? "rotate-180" : ""}`}
              />
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-72 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl md:w-80">
                <button
                  onClick={() => selectCategory("All")}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    categoryFilter === "All"
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  All Products
                </button>

                {categories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <button
                      key={category.name}
                      onClick={() => selectCategory(category.name)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                        categoryFilter === category.name
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={18} />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-black text-brand-700">
            <Truck size={18} />
            Free international shipping
          </div>
        </div>
      </div>
    </header>
  );
}