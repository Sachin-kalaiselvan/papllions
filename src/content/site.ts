/**
 * Central business configuration. Every value marked PLACEHOLDER must be
 * replaced with details verified by Papillons before launch.
 */
export const site = {
  name: "Papillons",
  tagline: "Interior Design Studio",
  // PLACEHOLDER — replace with real contact details
  email: "hello@papillons.example",
  phone: "+91 00000 00000",
  whatsapp: "", // e.g. "910000000000" — leave empty to hide the WhatsApp link
  address: "Studio address to be confirmed",
  hours: "Mon – Sat, 10:00 – 19:00 (to be confirmed)",
  socials: [
    { label: "Instagram", href: "" },
    { label: "Pinterest", href: "" },
  ],
  isPlaceholder: true,
};

// PLACEHOLDER — services to be confirmed by Papillons before publishing
export const services = [
  { title: "Residential Interiors", body: "Whole-home design, from spatial planning to the final cushion." },
  { title: "Living Spaces", body: "Rooms for gathering, composed around light and conversation." },
  { title: "Bedroom Design", body: "Quiet, layered retreats built for rest." },
  { title: "Kitchen & Dining", body: "Working kitchens with the warmth of a dining room." },
  { title: "Bespoke Furniture & Styling", body: "Pieces drawn for the room they will live in." },
  { title: "Commercial Interiors", body: "Hospitality and workspaces with a residential sensibility." },
];

export const journey = [
  { n: "01", title: "Discover", body: "We listen to how you live, what you keep, and what the space asks for." },
  { n: "02", title: "Design", body: "Plans, materials and light are composed into a single, considered concept." },
  { n: "03", title: "Refine", body: "Samples, details and drawings are adjusted together until every choice feels right." },
  { n: "04", title: "Realise", body: "Craftspeople bring the design to life, with careful oversight through to styling." },
];

/**
 * Genuine, authorised client testimonials only. Leave empty until Papillons
 * supplies approved feedback — the site shows a graceful empty state.
 */
export type Testimonial = { quote: string; name: string; project?: string };
export const testimonials: Testimonial[] = [];
