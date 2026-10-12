import { Link } from "@tanstack/react-router";
import type { Project } from "@/content/projects";

const ratio = { landscape: "aspect-[4/3]", portrait: "aspect-[3/4]", square: "aspect-square" };

export function ProjectCard({ project, className = "", shape }: { project: Project; className?: string; shape?: keyof typeof ratio }) {
  const s = shape ?? project.cover.shape;
  return (
    <Link to="/gallery/$slug" params={{ slug: project.slug }} className={`group block ${className}`}>
      <div className={`relative overflow-hidden bg-stone ${ratio[s]}`}>
        <img src={project.cover.src} alt={project.cover.alt} loading="lazy" decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]" />
        <div className="card-scrim pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-ivory transition-all duration-700 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
          <p className="eyebrow text-champagne">View project</p>
        </div>
        {project.demo && <span className="eyebrow absolute left-3 top-3 bg-ivory/90 px-2 py-1 text-[0.55rem] text-charcoal">Illustrative</span>}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="min-w-0 truncate font-display text-2xl">{project.title}</h3>
        <p className="eyebrow shrink-0 text-muted-foreground">{project.category}</p>
      </div>
    </Link>
  );
}
