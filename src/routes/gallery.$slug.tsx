import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { MaskImage, Reveal, ease } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";

export const Route = createFileRoute("/gallery/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Papillon Interiors` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: `${loaderData.project.title} — Papillon Interiors` },
          { property: "og:description", content: loaderData.project.summary },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Project not found — Papillon Interiors" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="container-lux py-48 text-center">
      <h1 className="text-5xl">Project not found</h1>
      <Link to="/gallery" className="btn-lux btn-green mt-8">Back to gallery</Link>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const [a, b, c] = project.gallery;
  return (
    <article>
      <section className="relative h-[85svh] min-h-[520px] overflow-hidden bg-forest">
        <motion.img src={project.cover.src} alt={project.cover.alt} initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-lux relative flex h-full flex-col justify-end pb-14 text-ivory">
          <Link to="/gallery" className="tap eyebrow mb-6 self-start text-champagne"><span className="link-lux">← All projects</span></Link>
          <p className="eyebrow text-gold">{project.category}{project.location && ` · ${project.location}`}</p>
          <h1 className="mt-4 text-6xl leading-none md:text-9xl">{project.title}</h1>
          {project.demo && <p className="mt-6 text-xs text-ivory/70">Illustrative demonstration project — not a completed Papillon Interiors commission.</p>}
        </div>
      </section>

      <section className="container-lux grid gap-10 py-20 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-4"><p className="font-display text-3xl leading-snug md:text-4xl">{project.summary}</p></Reveal>
        <Reveal delay={0.1} className="space-y-5 leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
          {project.description.map((d, i) => <p key={i}>{d}</p>)}
        </Reveal>
      </section>

      <section className="container-lux grid gap-6 pb-24 md:grid-cols-12 md:gap-8">
        {a && <MaskImage src={a.src} alt={a.alt} className="aspect-[16/10] md:col-span-12" />}
        {b && <MaskImage src={b.src} alt={b.alt} className="aspect-[3/4] md:col-span-5" />}
        {c && <MaskImage src={c.src} alt={c.alt} className="aspect-[3/4] md:col-span-6 md:col-start-7 md:mt-32" />}
      </section>

      <section className="bg-bottle py-20 text-center text-ivory">
        <Reveal className="container-lux">
          <h2 className="text-4xl md:text-6xl">Imagine this, <em>for your home.</em></h2>
          <Link to="/contact" className="btn-lux btn-gold mt-10">Start Your Project</Link>
        </Reveal>
      </section>

      <section className="container-lux py-24">
        <p className="eyebrow text-bottle">More projects</p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <ProjectCard key={p.slug} project={p} shape="portrait" />)}
        </div>
      </section>
    </article>
  );
}
