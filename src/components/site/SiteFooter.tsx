import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest text-ivory/80">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <p className="font-display text-4xl text-ivory md:text-5xl">Papillons</p>
          <span className="gold-rule mt-6" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">Interiors shaped around the way you live — composed with light, material and care.</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/about" className="link-lux">About</Link></li>
            <li><Link to="/gallery" className="link-lux">Gallery</Link></li>
            <li><Link to="/testimonials" className="link-lux">Testimonials</Link></li>
            <li><Link to="/contact" className="link-lux">Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-gold">Studio</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href={`mailto:${site.email}`} className="link-lux">{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-lux">{site.phone}</a></li>
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
          {site.isPlaceholder && <p className="mt-4 text-xs text-champagne/70">Contact details are placeholders pending confirmation.</p>}
        </div>
      </div>
      <div className="container-lux flex flex-col gap-2 border-t border-ivory/10 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Papillons. All rights reserved.</p>
        <p>Portfolio imagery is illustrative.</p>
      </div>
    </footer>
  );
}
