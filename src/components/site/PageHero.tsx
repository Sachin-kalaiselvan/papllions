import { motion } from "framer-motion";
import { ease } from "./Reveal";

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-forest pb-16 pt-36 text-ivory md:pb-24 md:pt-48">
      <div className="container-lux grid gap-8 md:grid-cols-12">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease }}
          className="eyebrow text-gold md:col-span-12">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease, delay: 0.1 }}
          className="text-5xl leading-[0.95] sm:text-6xl md:col-span-8 md:text-8xl">{title}</motion.h1>
        {intro && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="max-w-md self-end text-base leading-relaxed text-ivory/75 md:col-span-4">{intro}</motion.p>
        )}
      </div>
    </section>
  );
}
