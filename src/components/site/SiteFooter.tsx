import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest text-ivory/80">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <img src="/papillon-lockup-light.svg" alt="Papillon Interiors — The Design You Desire"
            width={491} height={100} className="h-12 w-auto md:h-14" />
          <span className="gold-rule mt-6" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">Interiors shaped around the way you live — composed with light, material and care.</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li><Link to="/about" className="tap"><span className="link-lux">About</span></Link></li>
            <li><Link to="/gallery" className="tap"><span className="link-lux">Gallery</span></Link></li>
            <li><Link to="/testimonials" className="tap"><span className="link-lux">Testimonials</span></Link></li>
            <li><Link to="/contact" className="tap"><span className="link-lux">Contact</span></Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-gold">Studio</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li><a href={`mailto:${site.email}`} className="tap"><span className="link-lux break-all">{site.email}</span></a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tap"><span className="link-lux">{site.phone}</span></a></li>
            <li className="pt-2">{site.address}</li>
            <li>{site.hours}</li>
          </ul>
          {site.isPlaceholder && <p className="mt-4 text-xs text-champagne/70">Contact details are placeholders pending confirmation.</p>}
        </div>
      </div>
      <div className="container-lux flex flex-col gap-2 border-t border-ivory/10 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Papillon Interiors. All rights reserved.</p>
        <p>Portfolio imagery is illustrative.</p>
      </div>
    </footer>
  );
}
