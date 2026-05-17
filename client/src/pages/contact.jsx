import { Mail, MapPin, Phone, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setModalOpen(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] mt-4">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-8 shadow-sm lg:p-10"
        >
          <p className="text-sm font-black uppercase tracking-widest text-brand-600">
            Contact Us
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-[-0.06em] text-slate-950">
            Get in touch
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
            This is a demo contact page for the TECHVERSE portfolio store. The
            form does not send messages, but it demonstrates how a real contact
            experience would look.
          </p>

          <div className="mt-10 grid gap-5">
            <ContactInfoCard
              icon={Mail}
              title="Email"
              text="contact@b-waters.com"
            />

            <ContactInfoCard
              icon={Phone}
              title="Phone"
              text="+44 0000 000000"
            />

            <ContactInfoCard
              icon={MapPin}
              title="Location"
              text="United Kingdom"
            />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-sm lg:p-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">
                Your Name
              </span>
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Enter your name"
                className="mt-2 w-full border border-slate-200 px-4 py-4 text-sm font-semibold outline-none transition focus:border-brand-600"
              />
            </label>

            <label className="block">
              <span className="text-sm font-black text-slate-700">
                Email Address
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="Enter your email"
                className="mt-2 w-full border border-slate-200 px-4 py-4 text-sm font-semibold outline-none transition focus:border-brand-600"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-black text-slate-700">Subject</span>
            <input
              required
              value={form.subject}
              onChange={(event) =>
                setForm({ ...form, subject: event.target.value })
              }
              placeholder="Enter a subject"
              className="mt-2 w-full border border-slate-200 px-4 py-4 text-sm font-semibold outline-none transition focus:border-brand-600"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-black text-slate-700">Message</span>
            <textarea
              required
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              placeholder="Write your message..."
              className="mt-2 min-h-44 w-full resize-none border border-slate-200 px-4 py-4 text-sm font-semibold outline-none transition focus:border-brand-600"
            />
          </label>

          <button
            type="submit"
            className="mt-6 flex items-center justify-center gap-2 bg-brand-600 px-8 py-4 text-sm font-black text-white transition-colors duration-200 hover:bg-brand-500"
          >
            <Send size={18} />
            Send Message
          </button>
        </motion.form>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-white p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Mail size={26} />
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
                This is a demo page
              </h2>

              <p className="mt-4 leading-7 text-slate-500">
                This contact form does not actually send emails. If you would
                like to get in contact, please email:
              </p>

              <a
                href="mailto:contact@b-waters.com"
                className="mt-4 block text-lg font-black text-brand-600 transition hover:text-brand-700"
              >
                contact@b-waters.com
              </a>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="mt-7 w-full bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-brand-600"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ContactInfoCard({ icon: Icon, title, text }) {
  return (
    <div className="flex items-center gap-4 border border-slate-200 p-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Icon size={22} />
      </div>

      <div>
        <h3 className="font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-500">{text}</p>
      </div>
    </div>
  );
}