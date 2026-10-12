import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { images, projects, categories } from "@/content/projects";
import { services, journey, testimonials } from "@/content/site";
import { Reveal, MaskImage, ease } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papillons — Spaces That Feel Like You" },
      { name: "description", content: "Thoughtfully designed interiors, shaped around the way you live. Explore the Papillons portfolio and start your project." },
      { property: "og:title", content: "Papillons — Spaces That Feel Like You" },
      { property: "og:description", content: "Thoughtfully designed interiors, shaped around the way you live." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Featured />
      <Philosophy />
      <Journey />
      <TestimonialPreview />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-forest">
      <motion.img src={images.hero} alt="Light-filled living room with a bottle-green velvet sofa" width={1920} height={1088}
        fetchPriority="high" initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease }} className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
      <div className="hero-scrim absolute inset-0" />
      <div className="container-lux relative flex h-full flex-col justify-end pb-14 text-ivory md:pb-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease }}
          className="eyebrow flex items-center gap-4 text-champagne"><span className="gold-rule" />Interior Design Studio</motion.p>
        <h1 className="mt-6 max-w-5xl text-[3.4rem] leading-[0.92] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {["Spaces That", "Feel Like You."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.3, ease, delay: 0.8 + i * 0.15 }}>
                {i === 1 ? <em className="italic">{line}</em> : line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4, ease }}
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-ivory/85 md:text-lg">Thoughtfully designed interiors, shaped around the way you live.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/gallery" className="btn-lux btn-gold">Explore Our Work</Link>
            <Link to="/contact" className="btn-lux btn-outline-light">Start Your Project</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="container-lux grid gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-40">
      <div className="md:col-span-5 md:pt-16">
        <Reveal><p className="eyebrow text-bottle">The Studio</p></Reveal>
        <Reveal delay={0.1}><h2 className="mt-6 text-5xl leading-[1] md:text-7xl">Beyond Beautiful. <em>Thoughtfully Yours.</em></h2></Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>A room should work before it impresses. We begin with how you move through a day — where light falls in the morning, where you gather, where you rest.</p>
            <p>From there, materials are chosen for how they age, craftsmanship for how it feels under the hand, and every detail for the person who will live with it.</p>
          </div>
        </Reveal>
        <Reveal delay={0.3}><Link to="/about" className="link-lux eyebrow mt-10 inline-block text-bottle">About the studio</Link></Reveal>
      </div>
      <div className="relative md:col-span-6 md:col-start-7">
        <MaskImage src={images.bedroom} alt="Oak-panelled bedroom with linen bedding" className="aspect-[3/4] w-[82%]" width={896} height={1200} />
        <MaskImage src={images.materials} alt="Material samples of travertine, oak, brass and bouclé"
          className="absolute -bottom-10 right-0 aspect-square w-[44%] border-8 border-background" width={1024} height={1024} />
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const pics = [images.hero, images.dining, images.bedroom, images.kitchen, images.furniture, images.commercial];
  return (
    <section className="bg-stone py-24 md:py-36">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><p className="eyebrow text-bottle">What we design</p><h2 className="mt-5 text-5xl md:text-7xl">Services</h2></Reveal>
          <Reveal delay={0.1}><p className="max-w-sm text-sm text-muted-foreground">An outline of the studio's focus. Final service list to be confirmed.</p></Reveal>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <ol className="md:col-span-6">
            {services.map((s, i) => (
              <li key={s.title} className="border-t border-charcoal/15 last:border-b">
                <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  aria-pressed={active === i} className="group grid w-full grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-2 py-6 text-left">
                  <span className={`eyebrow transition-colors ${active === i ? "text-gold" : "text-muted-foreground"}`}>0{i + 1}</span>
                  <span>
                    <span className={`block font-display text-3xl transition-all duration-500 md:text-4xl ${active === i ? "translate-x-2 text-bottle" : ""}`}>{s.title}</span>
                    <span className={`block overflow-hidden text-sm text-muted-foreground transition-all duration-700 ${active === i ? "mt-3 max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>{s.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="relative hidden aspect-[4/5] overflow-hidden md:col-span-5 md:col-start-8 md:block">
            {pics.map((p, i) => (
              <img key={i} src={p} alt="" aria-hidden loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ${active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const [cat, setCat] = useState("All");
  const list = (cat === "All" ? projects : projects.filter((p) => p.category === cat)).slice(0, 5);
  const layout = ["md:col-span-7", "md:col-span-4 md:col-start-9 md:mt-32", "md:col-span-5 md:col-start-2", "md:col-span-5 md:col-start-8 md:-mt-24", "md:col-span-8 md:col-start-3"];
  const shapes = ["landscape", "portrait", "portrait", "square", "landscape"] as const;
  return (
    <section className="container-lux py-24 md:py-40">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="eyebrow text-bottle">Selected work</p>
          <h2 className="mt-5 text-5xl md:text-7xl">Featured <em>Projects</em></h2>
        </Reveal>
        <div role="group" aria-label="Filter projects" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`eyebrow shrink-0 border px-4 py-3 transition-colors duration-500 ${cat === c ? "border-bottle bg-bottle text-ivory" : "border-border hover:border-bottle"}`}>{c}</button>
          ))}
        </div>
      </div>
      <motion.div layout className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-12">
        {list.map((p, i) => (
          <motion.div key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: i * 0.05 }}
            className={layout[i % layout.length]}>
            <ProjectCard project={p} shape={shapes[i % shapes.length]} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-20 text-center">
        <Link to="/gallery" className="btn-lux btn-outline-dark">View All Projects</Link>
      </div>
    </section>
  );
}

function Philosophy() {
  const items = [
    { t: "Thoughtful Functionality", b: "Every plan begins with how the room is used — then beauty is built around it." },
    { t: "Timeless Materials", b: "Stone, timber, linen and brass — chosen to soften and deepen with time." },
    { t: "Personal Expression", b: "The finished space should read as yours, not ours." },
  ];
  return (
    <section className="bg-bottle py-24 text-ivory md:py-36">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold">Design Philosophy</p>
          <h2 className="mt-6 text-4xl leading-tight md:text-6xl">Luxury, for us, is a room that <em>quietly fits</em> the life inside it.</h2>
        </Reveal>
        <div className="mt-20 grid border-t border-gold/40 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.12} className="border-b border-gold/40 py-10 md:border-b-0 md:border-r md:px-10 md:last:border-r-0">
              <p className="eyebrow text-champagne">0{i + 1}</p>
              <h3 className="mt-5 text-3xl">{it.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/70">{it.b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="container-lux py-24 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-bottle">The Design Journey</p>
          <h2 className="mt-5 text-5xl md:text-6xl">Four quiet <em>stages.</em></h2>
          <p className="mt-6 text-sm text-muted-foreground">A proposed outline of how projects unfold.</p>
        </Reveal>
        <ol className="grid gap-px bg-border sm:grid-cols-2 md:col-span-8">
          {journey.map((j, i) => (
            <Reveal key={j.n} delay={i * 0.1} className="bg-background p-8 md:p-10">
              <li className="list-none">
                <span className="font-display text-6xl text-gold">{j.n}</span>
                <h3 className="mt-6 text-3xl">{j.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{j.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TestimonialPreview() {
  const t = testimonials[0];
  return (
    <section className="bg-stone py-24 md:py-32">
      <Reveal className="container-lux max-w-4xl text-center">
        <p className="eyebrow text-bottle">In their words</p>
        {t ? (
          <>
            <blockquote className="mt-8 font-display text-3xl leading-snug md:text-5xl">“{t.quote}”</blockquote>
            <p className="eyebrow mt-8 text-muted-foreground">{t.name}{t.project && ` — ${t.project}`}</p>
          </>
        ) : (
          <>
            <p className="mt-8 font-display text-3xl italic leading-snug text-charcoal/70 md:text-5xl">Client stories will appear here once shared with us.</p>
            <Link to="/testimonials" className="link-lux eyebrow mt-10 inline-block text-bottle">Testimonials</Link>
          </>
        )}
      </Reveal>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <img src={images.commercial} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="hero-scrim absolute inset-0" />
      <Reveal className="container-lux relative py-32 text-center text-ivory md:py-48">
        <span className="gold-rule mx-auto" />
        <h2 className="mx-auto mt-8 max-w-4xl text-5xl leading-[0.95] md:text-8xl">Your Space. Your Story. <em>Let's Begin.</em></h2>
        <Link to="/contact" className="btn-lux btn-gold mt-12">Book a Consultation</Link>
      </Reveal>
    </section>
  );
}
