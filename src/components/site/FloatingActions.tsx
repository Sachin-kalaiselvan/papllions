import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "./Reveal";
import { site } from "@/content/site";

const GREETING = "Tell us about your space — the rooms you want reworked, roughly when you'd like to start, and what's not working today. We'll come back with how we'd approach it.";

const waHref = site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      `Hi, I visited the ${site.name} site. I'd like to talk about a design project.`,
    )}`
  : null;

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Show the scroll-to-top control only once there's somewhere to scroll back to.
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the panel and returns focus to the launcher.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !launcherRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>

      <AnimatePresence>
        {open && (
          <motion.div ref={panelRef} id="assistant-panel" role="dialog" aria-label={`${site.name} assistant`}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.45, ease }}
            className="pointer-events-auto mb-1 w-[min(21rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl bg-forest text-ivory shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-ivory/10">

            <div className="flex items-center gap-3 border-b border-ivory/10 px-4 py-3.5">
              <img src="/papillon-mark-light.svg" alt="" width={40} height={64} className="h-8 w-auto" />
              <div className="min-w-0">
                <p className="font-display text-lg leading-tight">{site.name}</p>
                <p className="text-xs text-champagne/80">Usually replies within a day</p>
              </div>
              <button type="button" onClick={() => { setOpen(false); launcherRef.current?.focus(); }}
                aria-label="Close assistant"
                className="ml-auto grid h-11 w-11 shrink-0 place-items-center text-ivory/70 transition-colors hover:text-ivory">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="px-4 py-5">
              <p className="font-display text-2xl">Hello there.</p>
              <p className="mt-2.5 text-sm leading-relaxed text-ivory/80">{GREETING}</p>

              {waHref ? (
                <>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-lux btn-gold mt-5 w-full">
                    Continue on WhatsApp
                  </a>
                  <p className="mt-3 text-center text-xs text-ivory/50">You'll speak to the studio, not a bot.</p>
                </>
              ) : (
                <>
                  <Link to="/contact" onClick={() => setOpen(false)} className="btn-lux btn-gold mt-5 w-full">
                    Start your project
                  </Link>
                  <p className="mt-3 text-center text-xs text-ivory/50">
                    Add a WhatsApp number in <code className="text-champagne/70">site.ts</code> to enable chat here.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button type="button" onClick={toTop} aria-label="Back to top"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease }}
            className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-ivory/95 text-forest shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)] ring-1 ring-forest/10 transition-colors hover:bg-ivory">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <button ref={launcherRef} type="button" onClick={() => setOpen((o) => !o)}
        aria-expanded={open} aria-controls="assistant-panel"
        aria-label={open ? "Close assistant" : `Chat with ${site.name}`}
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-forest shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] ring-1 ring-gold/40 transition-transform duration-500 hover:scale-105">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg key="x" viewBox="0 0 24 24" className="h-5 w-5 text-ivory" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"
              initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25, ease }}>
              <path d="M6 6l12 12M18 6L6 18" />
            </motion.svg>
          ) : (
            <motion.img key="mark" src="/papillon-mark-light.svg" alt="" width={40} height={64} className="h-7 w-auto"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, ease }} />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
