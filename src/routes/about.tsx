import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, MaskImage } from "@/components/site/Reveal";
import { images } from "@/content/projects";
import { services, journey } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Papillon Interiors" },
      { name: "description", content: "The philosophy, values and design approach behind Papillon Interiors." },
      { property: "og:title", content: "About Papillon Interiors" },
      { property: "og:description", content: "The philosophy, values and design approach behind Papillon Interiors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    ["Listening first", "Briefs are written together. We ask more than we tell."],
    ["Honest materials", "Natural, durable finishes that look better with every year."],
    ["Craft over trend", "We work with makers whose skill outlasts any season."],
    ["Calm process", "Clear stages, clear decisions, no surprises."],
  ];
  return (
    <>
      <PageHero eyebrow="About the studio" title="Rooms with a quiet point of view." intro="Papillon Interiors designs interiors around the people who inhabit them — composed, warm and made to last." />

      <section className="container-lux grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <MaskImage src={images.furniture} alt="Fluted walnut sideboard styled with ceramics" className="aspect-[4/5] md:col-span-5" width={896} height={1200} />
        <div className="md:col-span-6 md:col-start-7 md:self-center">
          <Reveal><p className="eyebrow text-bottle">Philosophy</p></Reveal>
          <Reveal delay={0.1}><h2 className="mt-6 text-4xl leading-tight md:text-6xl">Design is the art of <em>editing</em> a life into a room.</h2></Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
              <p>We approach every space as a composition of light, proportion and material. The aim is never a showroom — it is a home, or a place of work, that feels inevitable once complete.</p>
              <p>Founder and team details will be added here once supplied by Papillon Interiors.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bottle py-24 text-ivory md:py-32">
        <div className="container-lux">
          <Reveal><p className="eyebrow text-gold">Values</p></Reveal>
          <div className="mt-12 grid gap-px bg-gold/30 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08} className="bg-bottle p-8">
                <h3 className="text-3xl">{t}</h3>
                <p className="mt-4 text-sm text-ivory/70">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-lux grid gap-16 py-24 md:grid-cols-2 md:py-36">
        <div>
          <Reveal><p className="eyebrow text-bottle">Services</p><h2 className="mt-5 text-5xl">What we do</h2></Reveal>
          <ul className="mt-10">
            {services.map((s) => (
              <li key={s.title} className="border-t border-border py-5 last:border-b">
                <p className="font-display text-2xl">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Service list pending confirmation.</p>
        </div>
        <div>
          <Reveal><p className="eyebrow text-bottle">Process</p><h2 className="mt-5 text-5xl">How we work</h2></Reveal>
          <ol className="mt-10 space-y-10">
            {journey.map((j) => (
              <li key={j.n} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4">
                <span className="font-display text-4xl text-gold">{j.n}</span>
                <div><p className="font-display text-2xl">{j.title}</p><p className="mt-2 text-sm text-muted-foreground">{j.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone py-20 text-center">
        <Reveal className="container-lux">
          <h2 className="text-4xl md:text-6xl">Let's talk about your space.</h2>
          <Link to="/contact" className="btn-lux btn-green mt-10">Start Your Project</Link>
        </Reveal>
      </section>
    </>
  );
}
