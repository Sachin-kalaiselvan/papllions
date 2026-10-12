import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/content/site";
import { ease } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start Your Project with Papillons" },
      { name: "description", content: "Tell Papillons about your space and book a design consultation." },
      { property: "og:title", content: "Start Your Project — Papillons" },
      { property: "og:description", content: "Tell us about your space and book a design consultation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, "Please enter a valid phone number"),
  projectType: z.string().min(1, "Please choose a project type"),
  propertyType: z.string().min(1, "Please choose a property type"),
  location: z.string().trim().min(2, "Please enter a location").max(120),
  budget: z.string().min(1, "Please choose a budget range"),
  contactMethod: z.string().min(1, "Please choose a contact method"),
  brief: z.string().trim().min(10, "A few words about your project, please").max(2000),
});
type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

const options = {
  projectType: ["Full home", "Living spaces", "Bedroom", "Kitchen & dining", "Bespoke furniture", "Commercial"],
  propertyType: ["Apartment", "Villa / independent house", "Office", "Hospitality / retail", "Other"],
  budget: ["To be discussed", "Under ₹10 lakh", "₹10 – 25 lakh", "₹25 – 50 lakh", "₹50 lakh +"],
};

// The enquiry form is not yet connected to a delivery service.
// Set to true once a backend endpoint is in place.
const SUBMISSION_CONNECTED = false;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Fields | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => { const k = i.path[0] as keyof Fields; errs[k] ??= i.message; });
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setErrors({});
    setDone(r.data);
  };

  const mailto = done
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${done.name}`)}&body=${encodeURIComponent(
        Object.entries(done).map(([k, v]) => `${k}: ${v}`).join("\n"))}`
    : "";

  return (
    <>
      <PageHero eyebrow="Contact" title="Start your project." intro="Share a little about your space. We'll be in touch to arrange a consultation." />
      <section className="container-lux grid gap-16 py-20 md:grid-cols-12 md:py-32">
        <aside className="space-y-10 md:col-span-4">
          <Info label="Email"><a href={`mailto:${site.email}`} className="link-lux">{site.email}</a></Info>
          <Info label="Phone"><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-lux">{site.phone}</a></Info>
          {site.whatsapp && <Info label="WhatsApp"><a href={`https://wa.me/${site.whatsapp}`} className="link-lux">Message us</a></Info>}
          <Info label="Studio">{site.address}</Info>
          <Info label="Hours">{site.hours}</Info>
          {site.isPlaceholder && <p className="text-xs text-muted-foreground">These details are placeholders until confirmed.</p>}
        </aside>

        <div className="md:col-span-7 md:col-start-6">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}
              role="status" className="border border-gold/60 bg-stone p-8 md:p-12">
              <span className="gold-rule" />
              {SUBMISSION_CONNECTED ? (
                <h2 className="mt-6 text-4xl">Thank you, {done.name.split(" ")[0]}.</h2>
              ) : (
                <>
                  <h2 className="mt-6 text-4xl">Almost there, {done.name.split(" ")[0]}.</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Online enquiries aren't connected yet, so your details have <strong>not</strong> been sent. Please send them by email — we've prepared the message for you.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href={mailto} className="btn-lux btn-green">Send by email</a>
                    <button type="button" onClick={() => setDone(null)} className="btn-lux btn-outline-dark">Edit details</button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <Field name="name" label="Full name" autoComplete="name" errors={errors} />
              <Field name="email" label="Email" type="email" autoComplete="email" errors={errors} />
              <Field name="phone" label="Phone" type="tel" autoComplete="tel" errors={errors} />
              <Field name="location" label="Location" autoComplete="address-level2" errors={errors} />
              <Select name="projectType" label="Project type" opts={options.projectType} errors={errors} />
              <Select name="propertyType" label="Property type" opts={options.propertyType} errors={errors} />
              <Select name="budget" label="Approximate budget" opts={options.budget} errors={errors} />
              <fieldset className="sm:col-span-1">
                <legend className="eyebrow text-muted-foreground">Preferred contact</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Email", "Phone", "WhatsApp"].map((m) => (
                    <label key={m} className="cursor-pointer">
                      <input type="radio" name="contactMethod" value={m} className="peer sr-only" />
                      <span className="eyebrow inline-block border border-input px-4 py-3 transition-colors peer-checked:border-bottle peer-checked:bg-bottle peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-gold">{m}</span>
                    </label>
                  ))}
                </div>
                {errors.contactMethod && <p role="alert" className="mt-2 text-xs text-destructive">{errors.contactMethod}</p>}
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="f-brief" className="eyebrow text-muted-foreground">Project brief</label>
                <textarea id="f-brief" name="brief" rows={5} aria-invalid={!!errors.brief} aria-describedby={errors.brief ? "e-brief" : undefined}
                  className="field-lux resize-none" placeholder="Tell us about the space, how you'd like to use it, and your timeline." />
                {errors.brief && <p id="e-brief" role="alert" className="mt-2 text-xs text-destructive">{errors.brief}</p>}
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-lux btn-green w-full sm:w-auto">Send Enquiry</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="eyebrow text-gold">{label}</p><div className="mt-3 font-display text-2xl">{children}</div></div>;
}

function Field({ name, label, type = "text", autoComplete, errors }: { name: keyof Fields; label: string; type?: string; autoComplete?: string; errors: Errors }) {
  const err = errors[name];
  return (
    <div>
      <label htmlFor={`f-${name}`} className="eyebrow text-muted-foreground">{label}</label>
      <input id={`f-${name}`} name={name} type={type} autoComplete={autoComplete} aria-invalid={!!err}
        aria-describedby={err ? `e-${name}` : undefined} className="field-lux" />
      {err && <p id={`e-${name}`} role="alert" className="mt-2 text-xs text-destructive">{err}</p>}
    </div>
  );
}

function Select({ name, label, opts, errors }: { name: keyof Fields; label: string; opts: string[]; errors: Errors }) {
  const err = errors[name];
  return (
    <div>
      <label htmlFor={`f-${name}`} className="eyebrow text-muted-foreground">{label}</label>
      <select id={`f-${name}`} name={name} defaultValue="" aria-invalid={!!err} aria-describedby={err ? `e-${name}` : undefined} className="field-lux">
        <option value="" disabled>Select…</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
      {err && <p id={`e-${name}`} role="alert" className="mt-2 text-xs text-destructive">{err}</p>}
    </div>
  );
}
