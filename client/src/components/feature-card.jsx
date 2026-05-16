import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="card-hover rounded-3xl border border-slate-200 bg-white p-6"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon size={22} />
      </div>

      <h3 className="mt-4 font-black text-slate-950">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </motion.div>
  );
}