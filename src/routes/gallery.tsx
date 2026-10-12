import { createFileRoute, Outlet, useMatch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects, categories } from "@/content/projects";
import { ease } from "@/components/site/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Papillons Interior Portfolio" },
      { name: "description", content: "Browse Papillons interiors: living rooms, bedrooms, kitchens, bespoke furniture and commercial spaces." },
      { property: "og:title", content: "Papillons Gallery" },
      { property: "og:description", content: "An editorial portfolio of considered interiors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryLayout,
});

function GalleryLayout() {
  const child = useMatch({ from: "/gallery/$slug", shouldThrow: false });
  return child ? <Outlet /> : <Gallery />;
}

function Gallery() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <>
      <PageHero eyebrow="Portfolio" title="The Gallery" intro="An evolving collection of rooms. Current imagery is illustrative and will be replaced with completed Papillons projects." />
      <section className="container-lux py-16 md:py-24">
        <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`eyebrow shrink-0 border px-4 py-3 transition-colors duration-500 ${cat === c ? "border-bottle bg-bottle text-ivory" : "border-border hover:border-bottle"}`}>
              {c} <span className="ml-1 text-gold">{c === "All" ? projects.length : projects.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease }} className="mb-12 break-inside-avoid">
                <ProjectCard project={p} />
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
