import {
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Trophy,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../components/product-card";
import { categories } from "../data/categories";

function PromoCard({
  size = "small",
  badge,
  title,
  highlight,
  image,
  imageAlt,
  bg = "bg-[#f7e6df]",
  imageClassName = "",
  from = "right",
  delay = 0,
  setView,
}) {
  const isLarge = size === "large";

  return (
    <motion.article
      initial={{ opacity: 0, x: from === "left" ? -90 : 90 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden ${bg} ${
        isLarge ? "min-h-[520px] p-8 md:p-12" : "min-h-[245px] p-7"
      }`}
    >
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/25" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rotate-45 bg-white/15" />

      <div className="relative z-10 flex h-full flex-col justify-center">
        {badge && (
          <span className="mb-6 w-fit rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-700 shadow-sm">
            {badge}
          </span>
        )}

        <h2
          className={`max-w-[420px] font-medium tracking-[-0.04em] text-slate-950 ${
            isLarge
              ? "text-4xl leading-tight md:text-5xl"
              : "text-3xl leading-tight"
          }`}
        >
          {title}
          {highlight && (
            <>
              <br />
              <span
                className={`font-black ${
                  isLarge ? "text-6xl md:text-7xl" : "text-4xl"
                }`}
              >
                {highlight}
              </span>
            </>
          )}
        </h2>

        <button
          type="button"
          onClick={() => setView("shop")}
          className="mt-8 flex w-fit items-center gap-2 border-b-2 border-brand-500 pb-2 text-base font-black text-slate-800 transition-colors duration-200 hover:text-brand-600"
        >
          Shop Now
          <ChevronRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      <motion.img
        src={image}
        alt={imageAlt}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`pointer-events-none absolute z-10 object-contain ${imageClassName}`}
      />
    </motion.article>
  );
}

function ServiceBenefitsBar() {
  const benefits = [
    {
      icon: ShoppingCart,
      title: "Free Shipping",
      text: "When ordering over £100",
    },
    {
      icon: RotateCcw,
      title: "Free Return",
      text: "Get return within 30 days",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      text: "100% secure online payment",
    },
    {
      icon: Trophy,
      title: "Best Quality",
      text: "Original product guaranteed",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="my-8 bg-white px-6 py-8 shadow-sm md:px-10"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-5"
            >
              <div className="shrink-0 text-brand-600">
                <Icon size={38} strokeWidth={1.4} />
              </div>

              <div>
                <h3 className="text-md font-black text-slate-950">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {benefit.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default function Home({ products, addToCart, setView }) {
  const featured = products.filter((product) => product.featured).slice(0, 8);

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <PromoCard
          size="large"
          from="left"
          delay={0.05}
          badge="New Released"
          title="Apple Wireless"
          highlight="Samsung S22"
          image="/images/samsung-galaxy-pink.png"
          imageAlt="Samsung phone"
          bg="bg-[#f8e6e0]"
          imageClassName="bottom-10 right-2 h-[290px] md:right-8 md:h-[390px] lg:h-[420px]"
          setView={setView}
        />

        <div className="grid gap-6">
          <PromoCard
            from="right"
            delay={0.18}
            badge="Wearables"
            title="Apple"
            highlight="Smart Watch"
            image="/images/apple-watch-blue.png"
            imageAlt="Smart watch"
            bg="bg-[#d8f1ff]"
            imageClassName="-right-5 bottom-1 h-[175px] md:h-[210px]"
            setView={setView}
          />

          <PromoCard
            from="right"
            delay={0.28}
            badge="Gaming"
            title="Xbox"
            highlight="Series X"
            image="/images/xbox.png"
            imageAlt="Games console"
            bg="bg-white"
            imageClassName="-right-6 bottom-0 h-[180px] md:h-[220px]"
            setView={setView}
          />
        </div>
      </section>

      <ServiceBenefitsBar />

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