import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { testimonials } from "@/content/site";
import { images } from "@/content/projects";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Papillon Interiors" },
      { name: "description", content: "Words from Papillon Interiors clients about their homes and spaces." },
      { property: "og:title", content: "Papillon Interiors Testimonials" },
      { property: "og:description", content: "Words from Papillon Interiors clients about their homes and spaces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Testimonials,
});

function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="In their words." intro="Only genuine feedback, shared with permission." />
      {testimonials.length > 0 ? (
        <section className="container-lux space-y-24 py-24 md:py-36">
          {testimonials.map((t, i) => (
            <Reveal key={i} className={`max-w-3xl ${i % 2 ? "md:ml-auto md:text-right" : ""}`}>
              <span className={`gold-rule ${i % 2 ? "md:ml-auto" : ""}`} />
              <blockquote className="mt-8 font-display text-3xl leading-snug md:text-5xl">“{t.quote}”</blockquote>
              <p className="eyebrow mt-6 text-muted-foreground">{t.name}{t.project && ` — ${t.project}`}</p>
            </Reveal>
          ))}
        </section>
      ) : (
        <section className="container-lux grid gap-12 py-24 md:grid-cols-12 md:py-36">
          <div className="aspect-[4/5] overflow-hidden md:col-span-5">
            <img src={images.dining} alt="Quiet dining room in soft daylight" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7 md:self-center">
            <p className="eyebrow text-bottle">Coming soon</p>
            <h2 className="mt-6 text-4xl leading-tight md:text-6xl">Stories from our clients are <em>being gathered.</em></h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">We'd rather show nothing than show something untrue. Approved client words will appear here soon.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/gallery" className="btn-lux btn-green">View the Gallery</Link>
              <Link to="/contact" className="btn-lux btn-outline-dark">Start Your Project</Link>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
