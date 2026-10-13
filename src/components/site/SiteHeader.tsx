import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "./Reveal";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === "/";
  const solid = scrolled || !overHero || open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${solid ? "bg-forest" : "bg-transparent"}`}>
      <div className="container-lux grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 md:h-20">
        <Link to="/" className="tap min-w-0 text-ivory" aria-label="Papillon Interiors — home">
          <img src="/papillon-lockup-compact-light.svg" alt="Papillon Interiors"
            width={491} height={100} className="h-7 w-auto sm:hidden" />
          <img src="/papillon-lockup-light.svg" alt="Papillon Interiors — The Design You Desire"
            width={491} height={100} className="hidden h-8 w-auto sm:block md:h-10" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="link-lux eyebrow text-ivory/85 hover:text-ivory data-[status=active]:text-champagne">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-lux btn-gold">Start Your Project</Link>
        </nav>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"} className="relative h-11 w-11 shrink-0 text-ivory lg:hidden">
          <span className={`absolute left-2 right-2 top-[18px] h-px bg-current transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
          <span className={`absolute left-2 right-2 top-[26px] h-px bg-current transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }} className="fixed inset-x-0 bottom-0 top-18 bg-forest md:top-20 lg:hidden">
            <nav aria-label="Mobile" className="container-lux flex h-full flex-col justify-between pb-10 pt-8">
              <ul className="space-y-2">
                {nav.map((n, i) => (
                  <motion.li key={n.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.06 * i }}>
                    <Link to={n.to} activeOptions={{ exact: n.to === "/" }}
                      className="flex items-baseline gap-4 border-b border-ivory/10 py-4 font-display text-4xl text-ivory data-[status=active]:text-champagne">
                      <span className="eyebrow text-gold">0{i + 1}</span>{n.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link to="/contact" className="btn-lux btn-gold w-full">Start Your Project</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
