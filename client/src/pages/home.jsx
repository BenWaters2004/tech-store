import { ArrowRight, Package, ShieldCheck, Truck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "../components/feature-card";
import ProductCard from "../components/product-card";
import { categories } from "../data/categories";

export default function Home({ products, addToCart, setView }) {
  const featured = products.filter((product) => product.featured).slice(0, 8);

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="hero-grid-bg relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-slate-100 p-8 md:p-12"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-200/60 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[1fr_420px] md:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-brand-700 shadow-sm">
                <Zap size={16} />
                Tech deals live now
              </div>

              <h1 className="max-w-2xl text-5xl font-black leading-none tracking-[-0.07em] text-slate-950 md:text-7xl">
                Upgrade your world with next-gen tech
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                Discover premium laptops, phones, audio gear and smart devices
                in a clean, professional e-commerce experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setView("shop")}
                  className="group flex items-center gap-2 rounded-full bg-brand-600 px-7 py-4 font-black text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700"
                >
                  Shop now
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setView("admin")}
                  className="rounded-full border border-slate-200 bg-white px-7 py-4 font-black text-slate-950 transition hover:bg-slate-50"
                >
                  Admin demo
                </button>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-[2rem] bg-white p-4 shadow-2xl shadow-brand-200/60"
            >
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200"
                alt="Premium laptop"
                className="h-72 w-full rounded-3xl object-cover"
              />

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500">Featured deal</p>
                  <h3 className="font-black text-slate-950">AeroBook Pro Laptop</h3>
                </div>

                <div className="text-right">
                  <p className="text-xs font-black uppercase text-brand-600">From</p>
                  <strong className="text-2xl font-black text-slate-950">£1199</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-600/40 blur-2xl" />

            <p className="text-sm font-black uppercase tracking-widest text-brand-200">
              Audio Sale
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-tight">
              Wireless sound, lower prices
            </h3>
            <p className="mt-3 text-slate-300">Save up to 30% on selected headphones.</p>

            <button
              onClick={() => setView("shop")}
              className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950"
            >
              Browse audio
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8"
          >
            <p className="text-sm font-black uppercase tracking-widest text-brand-600">
              New Arrivals
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Smart watches are here
            </h3>
            <p className="mt-3 text-slate-500">Track fitness, calls and notifications.</p>

            <button
              onClick={() => setView("shop")}
              className="mt-6 rounded-full bg-brand-50 px-5 py-3 text-sm font-black text-brand-700"
            >
              View wearables
            </button>
          </motion.div>
        </div>
      </section>

      <section className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category, index) => {
          const Icon = category.icon;

          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              viewport={{ once: true }}
              onClick={() => setView("shop")}
              className="card-hover rounded-3xl border border-slate-200 bg-white p-6 text-left"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon size={22} />
              </div>
              <h3 className="mt-4 font-black text-slate-950">{category.name}</h3>
              <p className="mt-1 text-sm text-slate-500">Shop latest products</p>
            </motion.button>
          );
        })}
      </section>

      <section className="my-8 grid gap-4 md:grid-cols-3">
        <FeatureCard icon={Truck} title="Free shipping" text="International delivery available" />
        <FeatureCard icon={ShieldCheck} title="Secure checkout" text="Orders stored safely in MySQL" />
        <FeatureCard icon={Package} title="Stock tracking" text="Inventory updates after checkout" />
      </section>

      <section className="my-10 rounded-[2rem] bg-gradient-to-r from-slate-950 via-brand-800 to-brand-600 p-8 text-white md:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-brand-100">
              Limited time
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Build your perfect tech setup
            </h2>
            <p className="mt-3 max-w-2xl text-brand-100">
              Laptops, audio and wearable products ready to add to your demo store.
            </p>
          </div>

          <button
            onClick={() => setView("shop")}
            className="w-fit rounded-full bg-white px-7 py-4 font-black text-slate-950 transition hover:bg-brand-50"
          >
            Shop collection
          </button>
        </div>
      </section>

      <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-brand-600">
            Featured products
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-950">
            Popular tech picks
          </h2>
        </div>

        <button
          onClick={() => setView("shop")}
          className="w-fit rounded-full border border-slate-200 bg-white px-5 py-3 font-black text-slate-950 transition hover:bg-slate-50"
        >
          View all products
        </button>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </section>

      <section className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 text-center md:p-10">
        <p className="text-sm font-black uppercase tracking-widest text-brand-600">
          Newsletter
        </p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
          Get the latest tech deals
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-500">
          This is a demo form for your portfolio store. You can connect it later
          to your backend or email service.
        </p>

        <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 rounded-full border border-slate-200 bg-slate-50 p-2 sm:flex-row">
          <input
            placeholder="Enter your email"
            className="flex-1 bg-transparent px-4 py-3 outline-none"
          />
          <button className="rounded-full bg-brand-600 px-7 py-3 font-black text-white transition hover:bg-brand-700">
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
}