import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { categories } from "../data/categories";

const languages = [
  {
    label: "English",
    country: "United Kingdom",
    flagUrl: "https://flagcdn.com/w40/gb.png",
  },
  {
    label: "United States",
    country: "United States",
    flagUrl: "https://flagcdn.com/w40/us.png",
  },
  {
    label: "Français",
    country: "France",
    flagUrl: "https://flagcdn.com/w40/fr.png",
  },
  {
    label: "Deutsch",
    country: "Germany",
    flagUrl: "https://flagcdn.com/w40/de.png",
  },
  {
    label: "Bangla",
    country: "Bangladesh",
    flagUrl: "https://flagcdn.com/w40/bd.png",
  },
];

const currencies = ["GBP £", "USD $", "EUR €"];

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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [shopMegaOpen, setShopMegaOpen] = useState(false);
  const [searchCategoryOpen, setSearchCategoryOpen] = useState(false);

  const languageRef = useRef(null);
  const currencyRef = useRef(null);
  const searchCategoryRef = useRef(null);
  const mainCategoryRef = useRef(null);
  const shopMegaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setLanguageOpen(false);
      }

      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target)
      ) {
        setCurrencyOpen(false);
      }

      if (
        searchCategoryRef.current &&
        !searchCategoryRef.current.contains(event.target)
      ) {
        setSearchCategoryOpen(false);
      }

      if (
        mainCategoryRef.current &&
        !mainCategoryRef.current.contains(event.target)
      ) {
        setCategoryOpen(false);
      }

      if (
        shopMegaRef.current &&
        !shopMegaRef.current.contains(event.target)
      ) {
        setShopMegaOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const navItems = [
    { label: "Homepage", view: "home" },
    { label: "Shop", view: "shop" },
    { label: "About" },
    { label: "Blog" },
    { label: "Contact" },
  ];

  const shopMegaColumns = [
  {
    heading: "Shop List",
    links: [
      "Shop Sidebar",
      "Shop Full Width",
      "New Arrivals",
      "Best Sellers",
      "Deals of the Week",
    ],
  },
  {
    heading: "Product Layouts",
    links: [
      "Product Details",
      "Product Gallery",
      "Compare Products",
      "Recently Viewed",
      "Featured Products",
    ],
  },
  {
    heading: "Popular Category",
    links: [
      "Phones & Tablets",
      "Gaming & Accessories",
      "Laptops",
      "Smart Watches",
      "Audio Devices",
    ],
  },
];

  const dropdownAnimation = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.98 },
    transition: { duration: 0.18, ease: "easeOut" },
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      {/* Top bar */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm font-semibold text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-5">
            <button type="button" className="top-nav-link">
              Help Center
            </button>

            <button type="button" className="top-nav-link">
              Track Order
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Language dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                onClick={() => {
                  setLanguageOpen((current) => !current);
                  setCurrencyOpen(false);
                }}
                className="top-dropdown-trigger flex items-center gap-2 rounded-full px-2 py-1 font-bold"
              >
                <img
                  src={selectedLanguage.flagUrl}
                  alt={`${selectedLanguage.country} flag`}
                  className="h-5 w-5 rounded-full object-cover"
                />
                <span>{selectedLanguage.label}</span>
                <ChevronDown
                  size={15}
                  className={`transition ${languageOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    {...dropdownAnimation}
                    className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.label}
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(language);
                          setLanguageOpen(false);
                        }}
                        className={`dropdown-option flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold ${
                          selectedLanguage.label === language.label
                            ? "bg-brand-50 text-brand-700"
                            : "text-slate-700"
                        }`}
                      >
                        <img
                          src={language.flagUrl}
                          alt={`${language.country} flag`}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <span>{language.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency dropdown */}
            <div className="relative" ref={currencyRef}>
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen((current) => !current);
                  setLanguageOpen(false);
                }}
                className="top-dropdown-trigger flex items-center gap-2 rounded-full px-2 py-1 font-bold"
              >
                {selectedCurrency}
                <ChevronDown
                  size={15}
                  className={`transition ${currencyOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    {...dropdownAnimation}
                    className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
                  >
                    {currencies.map((currency) => (
                      <button
                        key={currency}
                        type="button"
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setCurrencyOpen(false);
                        }}
                        className={`dropdown-option w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                          selectedCurrency === currency
                            ? "bg-brand-50 text-brand-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {currency}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[320px_1fr_auto] lg:items-center">
          <div className="flex items-center justify-between">
            <motion.button
              type="button"
              onClick={() => setView("home")}
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              className="text-left !text-4xl font-black leading-none tracking-[-0.08em] text-slate-950 sm:text-6xl"
            >
              TECH<span className="text-brand-600">VERSE</span>
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <motion.form
            onSubmit={submitSearch}
            whileFocus={{ scale: 1.01 }}
            className="relative flex rounded-full border border-slate-200 bg-white shadow-sm transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-100"
          >
            <div className="flex flex-1 items-center gap-3 px-5">
              <Search size={21} className="text-slate-400" />
              <input
                value={localSearch}
                onChange={(event) => setLocalSearch(event.target.value)}
                placeholder="Search product..."
                className="h-14 w-full bg-transparent text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <div
              ref={searchCategoryRef}
              className="relative hidden border-l border-slate-200 md:block"
            >
              <button
                type="button"
                onClick={() => {
                  setSearchCategoryOpen((current) => !current);
                  setLanguageOpen(false);
                  setCurrencyOpen(false);
                  setCategoryOpen(false);
                }}
                className="search-category-trigger flex h-14 min-w-48 items-center justify-between gap-3 px-5 text-sm font-bold text-slate-600"
              >
                <span>{categoryFilter === "All" ? "All Categories" : categoryFilter}</span>
                <ChevronDown
                  size={16}
                  className={`transition ${searchCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {searchCategoryOpen && (
                  <motion.div
                    {...dropdownAnimation}
                    className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryFilter("All");
                        setSearchCategoryOpen(false);
                      }}
                      className={`dropdown-option flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold ${
                        categoryFilter === "All"
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-700"
                      }`}
                    >
                      <span>All Categories</span>
                      <ChevronRight size={16} />
                    </button>

                    {categories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <button
                          key={category.name}
                          type="button"
                          onClick={() => {
                            setCategoryFilter(category.name);
                            setSearchCategoryOpen(false);
                          }}
                          className={`dropdown-option flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold ${
                            categoryFilter === category.name
                              ? "bg-brand-50 text-brand-700"
                              : "text-slate-700"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={17} />
                            {category.name}
                          </span>
                          <ChevronRight size={16} />
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              className="search-submit-button rounded-r-full px-7 text-base font-black"
            >
              Search
            </motion.button>
          </motion.form>

          <div className="hidden items-center gap-3 lg:flex">
            <HeaderIconButton label="Favourites" count={favouriteCount}>
              <Heart size={24} />
            </HeaderIconButton>

            <HeaderIconButton
              label="Cart"
              count={cartCount}
              onClick={() => setView("cart")}
            >
              <ShoppingCart size={24} />
            </HeaderIconButton>

            <HeaderIconButton label="Account" onClick={onAccountClick}>
              <UserRound size={24} />
            </HeaderIconButton>
          </div>
        </div>

        {/* Mobile buttons */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="mt-5 grid gap-3 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl lg:hidden"
            >
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-slate-800"
              >
                <Heart size={18} />
                Favourites
              </button>

              <button
                type="button"
                onClick={() => {
                  setView("cart");
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-slate-800"
              >
                <ShoppingCart size={18} />
                Cart
                {cartCount > 0 && (
                  <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onAccountClick?.();
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white"
              >
                <UserRound size={18} />
                Login / Register
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Purple filter/navigation bar */}
      <div
        className="relative bg-brand-600"
        ref={shopMegaRef}
        onMouseLeave={() => setShopMegaOpen(false)}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative" ref={mainCategoryRef}>
              <motion.button
                type="button"
                onClick={() => {
                  setCategoryOpen((current) => !current);
                  setShopMegaOpen(false);
                }}
                whileTap={{ scale: 0.98 }}
                className="category-trigger-button flex w-full items-center justify-between gap-4 rounded-tr-xl rounded-tl-xl px-6 py-4 mt-3 text-base font-black shadow-sm lg:min-w-80"
              >
                <span className="flex items-center gap-3">
                  <Menu size={21} />
                  All Categories
                </span>
                <ChevronDown
                  size={20}
                  className={`transition ${categoryOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    {...dropdownAnimation}
                    className="absolute left-0 top-full z-50 w-full min-w-80 overflow-hidden rounded-bl-2xl rounded-br-2xl border border-slate-200 bg-white p-2 shadow-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => selectCategory("All")}
                      className={`dropdown-option flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black transition ${
                        categoryFilter === "All"
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-700"
                      }`}
                    >
                      <span>All Products</span>
                      <ChevronRight size={17} />
                    </button>

                    {categories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <button
                          type="button"
                          key={category.name}
                          onClick={() => selectCategory(category.name)}
                          className={`dropdown-option flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black transition ${
                            categoryFilter === category.name
                              ? "bg-brand-50 text-brand-700"
                              : "text-slate-700"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={18} />
                            {category.name}
                          </span>

                          <ChevronRight size={17} />
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <nav className="flex flex-wrap items-center gap-2 lg:gap-6">
              {navItems.map((item, index) => {
                const isShop = item.label === "Shop";

                if (isShop) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setShopMegaOpen(true)}
                    >
                      <motion.button
                        type="button"
                        onClick={() => {
                          setShopMegaOpen((current) => !current);
                          setView("shop");
                          setCategoryOpen(false);
                          setLanguageOpen(false);
                          setCurrencyOpen(false);
                          setSearchCategoryOpen(false);
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + index * 0.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="purple-nav-link flex items-center gap-2 rounded-full px-3 py-2 text-sm font-black lg:text-base"
                      >
                        Shop
                        <ChevronDown
                          size={16}
                          className={`transition ${shopMegaOpen ? "rotate-180" : ""}`}
                        />
                      </motion.button>
                    </div>
                  );
                }

                return (
                  <motion.button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      item.view && setView(item.view);
                      setShopMegaOpen(false);
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="purple-nav-link rounded-full px-3 py-2 text-sm font-black lg:text-base"
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>
          </div>

          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-black text-white"
          >
            <Truck size={18} />
            Free international shipping
          </motion.div>
        </div>
        <AnimatePresence>
          {shopMegaOpen && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-1/2 top-full z-40 hidden w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 overflow-hidden rounded-b-3xl border border-slate-200 bg-white shadow-2xl lg:block"
            >
              <div className="grid gap-8 p-10 lg:grid-cols-[1fr_1fr_1fr_360px]">
                {shopMegaColumns.map((column) => (
                  <div key={column.heading}>
                    <h3 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-950">
                      {column.heading}
                    </h3>

                    <ul className="grid gap-4">
                      {column.links.map((link) => (
                        <li key={link}>
                          <button
                            type="button"
                            onClick={() => {
                              setView("shop");
                              setShopMegaOpen(false);
                            }}
                            className="mega-menu-link flex w-full items-center justify-between text-left text-base font-semibold text-slate-500"
                          >
                            <span>{link}</span>
                            <ChevronRight size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="relative min-h-[250px] overflow-hidden rounded-none bg-[#efe0cf] p-6">
                  {/* background circles */}
                  <div className="absolute -right-10 -top-8 h-48 w-48 rounded-full bg-white/18" />
                  <div className="absolute right-12 top-16 h-56 w-56 rounded-full bg-white/12" />
                  <div className="absolute right-0 top-0 h-full w-[1px] bg-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="max-w-[220px]">
                      <p className="text-sm font-black uppercase tracking-wide text-slate-700">
                        Gaming Console
                      </p>

                      <h3 className="mt-6 text-[2.45rem] font-black leading-[1.05] tracking-[-0.04em] text-slate-950">
                        Play
                        <br />
                        Station
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setView("shop");
                        setShopMegaOpen(false);
                      }}
                      className="mt-8 inline-flex w-fit items-center gap-2 text-lg font-black text-slate-800 transition-colors duration-200 hover:text-brand-600"
                    >
                      Shop Now
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* product image */}
                  <img
                    src="/images/menu-ad-product.png"
                    alt="Featured product"
                    className="pointer-events-none absolute bottom-0 right-0 z-10 h-[225px] w-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function HeaderIconButton({ label, count = 0, onClick, children }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className="header-action-button relative grid h-14 w-14 place-items-center rounded-full border"
      aria-label={label}
      title={label}
    >
      {children}

      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-black text-white ring-2 ring-white"
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}