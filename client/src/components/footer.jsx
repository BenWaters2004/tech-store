import {
  Mail,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer({ setView }) {
  const footerColumns = [
    {
      heading: "Feature",
      links: ["About Us", "Terms Condition", "Best Products"],
    },
    {
      heading: "General Links",
      links: ["Blog", "Tracking Order", "Become Seller"],
    },
    {
      heading: "Helpful",
      links: ["Flash Sale", "FAQ", "Support"],
    },
  ];

  return (
    <footer className="mt-16 bg-white">
      {/* Newsletter banner */}
      <motion.section
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden px-4 py-14 sm:px-6 lg:py-18"
        style={{
            backgroundImage: "url('/images/discount-banner-1.webp')",
            backgroundSize: "cover",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
        }}
        >
        <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                Get <span className="text-brand-600">20%</span> Off Discount Coupon
            </h2>

            <p className="mt-3 text-lg font-medium text-slate-800">
                by subscribing to our newsletter
            </p>

            <form
                onSubmit={(event) => event.preventDefault()}
                className="mx-auto mt-8 flex max-w-lg flex-col bg-white shadow-sm sm:flex-row"
            >
                <label className="flex flex-1 items-center gap-3 px-4 py-3">
                <Mail size={18} className="text-slate-500" />
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-transparent text-2xs font-bold tracking-wide text-slate-800 outline-none placeholder:text-slate-500"
                />
                </label>

                <button
                type="submit"
                className="bg-brand-600 px-4 py-3 text-2xs font-black text-white transition-colors duration-200 hover:bg-brand-500"
                >
                Get the Coupon
                </button>
            </form>
            </div>
        </div>
      </motion.section>

      {/* Main footer */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setView?.("home")}
            className="!text-3xl font-black leading-none tracking-[-0.08em] text-slate-950"
          >
            TECH<span className="text-brand-600">VERSE</span>
          </button>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">About Us</h3>

              <p className="mt-6 max-w-sm text-base leading-8 text-slate-500">
                TECHVERSE is a demo e-commerce store built to showcase a modern
                shopping experience. Built by Ben Waters.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-lg font-semibold text-slate-950">
                  {column.heading}
                </h3>

                <ul className="mt-6 grid gap-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        className="group flex items-center gap-2 text-base font-medium text-slate-500 transition-colors duration-200 hover:text-brand-600"
                      >
                        {link}
                        <ChevronRight
                          size={15}
                          className="opacity-0 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-slate-200 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-5 text-slate-500">

            <p className="text-base">
              ©2026{" "}
              <a href="https://b-waters.com" className="text-slate-800">Ben Waters</a> All
              rights reserved
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["VISA", "Mastercard", "PayPal", "Skrill", "Maestro"].map(
              (payment) => (
                <div
                  key={payment}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-600"
                >
                  {payment}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </footer>
  );
}