import hero from "@/assets/hero.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import materials from "@/assets/materials.jpg";
import commercial from "@/assets/commercial.jpg";
import furniture from "@/assets/furniture.jpg";
import dining from "@/assets/dining.jpg";
import bath from "@/assets/bath.jpg";

export const images = { hero, bedroom, kitchen, materials, commercial, furniture, dining, bath };

export type Shape = "landscape" | "portrait" | "square";
export type ProjectImage = { src: string; alt: string; shape: Shape };

export type Project = {
  slug: string;
  title: string;
  category: string;
  location?: string;
  summary: string;
  description: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  /** true = illustrative demonstration content, not a completed Papillons project */
  demo: boolean;
};

const L = (src: string, alt: string): ProjectImage => ({ src, alt, shape: "landscape" });
const P = (src: string, alt: string): ProjectImage => ({ src, alt, shape: "portrait" });
const S = (src: string, alt: string): ProjectImage => ({ src, alt, shape: "square" });

/**
 * DEMONSTRATION CONTENT — replace with verified Papillons projects.
 * Titles describe the concept only; no locations or clients are claimed.
 */
export const projects: Project[] = [
  {
    slug: "green-salon",
    title: "The Green Salon",
    category: "Living",
    summary: "A living room anchored in deep velvet, travertine and morning light.",
    description: [
      "An illustrative concept exploring how a single saturated colour can hold a large, light-filled room together.",
      "Limewashed walls soften the architecture, while a low travertine table and bouclé seating keep the palette tactile and calm.",
    ],
    cover: L(hero, "Living room with a bottle-green velvet sofa and travertine table beneath arched windows"),
    gallery: [L(hero, "Wide view of the green living room"), S(materials, "Travertine, oak, brass and bouclé samples"), P(furniture, "Fluted walnut sideboard with ceramics")],
    demo: true,
  },
  {
    slug: "oak-retreat",
    title: "Oak Retreat",
    category: "Bedroom",
    summary: "Panelled oak, linen and green marble for a quiet place to rest.",
    description: [
      "An illustrative bedroom study in warmth and restraint.",
      "Full-height oak panelling wraps the room; a single marble plinth and a brass sconce provide the only punctuation.",
    ],
    cover: P(bedroom, "Bedroom with oak-panelled walls, linen bedding and green marble bedside table"),
    gallery: [P(bedroom, "Oak-panelled bedroom"), S(materials, "Material palette"), L(bath, "Adjoining bathroom with green zellige")],
    demo: true,
  },
  {
    slug: "lacquer-kitchen",
    title: "Lacquer Kitchen",
    category: "Kitchen & Dining",
    summary: "Green lacquer, honed marble and walnut in an open kitchen.",
    description: [
      "An illustrative kitchen concept where cabinetry is treated as architecture.",
      "A waterfall marble island and herringbone oak floor connect cooking and dining into one generous room.",
    ],
    cover: L(kitchen, "Kitchen with dark green cabinetry, marble island and brass pendants"),
    gallery: [L(kitchen, "Open kitchen and dining"), P(dining, "Round travertine dining table"), S(materials, "Brass and stone details")],
    demo: true,
  },
  {
    slug: "travertine-dining",
    title: "Travertine Dining",
    category: "Kitchen & Dining",
    summary: "A sculptural pendant above a round stone table.",
    description: [
      "An illustrative dining room built around a single monolithic table.",
      "Moss velvet chairs and a soft paper pendant balance the weight of the stone.",
    ],
    cover: P(dining, "Dining room with round travertine table and green velvet chairs"),
    gallery: [P(dining, "Dining room"), L(kitchen, "Adjacent kitchen"), P(furniture, "Bespoke sideboard")],
    demo: true,
  },
  {
    slug: "zellige-bath",
    title: "Zellige Bath",
    category: "Bath",
    summary: "Hand-glazed green tile and a carved stone tub.",
    description: [
      "An illustrative bathroom concept where colour lives in a single tiled wall.",
      "Everything else is plaster, stone and brushed brass — quiet enough to let the tile breathe.",
    ],
    cover: L(bath, "Bathroom with green zellige wall and freestanding stone bath"),
    gallery: [L(bath, "Zellige bathroom"), P(bedroom, "Adjoining bedroom"), S(materials, "Stone and brass")],
    demo: true,
  },
  {
    slug: "fluted-sideboard",
    title: "Fluted Sideboard",
    category: "Bespoke Furniture",
    summary: "A walnut piece drawn for one wall.",
    description: [
      "An illustrative bespoke furniture study.",
      "Tambour-fluted walnut doors with slim brass pulls, scaled precisely to the wall it sits on.",
    ],
    cover: P(furniture, "Fluted walnut sideboard with brass handles and ceramics"),
    gallery: [P(furniture, "Sideboard"), S(materials, "Fluted oak sample"), L(hero, "In a living room setting")],
    demo: true,
  },
  {
    slug: "arcade-lounge",
    title: "Arcade Lounge",
    category: "Commercial",
    summary: "Arched mirrors and green banquettes for evening hospitality.",
    description: [
      "An illustrative hospitality concept with a residential sensibility.",
      "Long velvet banquettes, arched brass mirrors and low light create intimacy in a long room.",
    ],
    cover: L(commercial, "Lounge with green velvet banquettes, marble tables and arched mirrors"),
    gallery: [L(commercial, "Lounge interior"), S(materials, "Material palette"), P(dining, "Private dining")],
    demo: true,
  },
  {
    slug: "material-library",
    title: "Material Library",
    category: "Living",
    summary: "Travertine, fluted oak, brass and bouclé.",
    description: [
      "An illustrative look at the material palette behind the studio's concepts.",
      "Every project begins on a table like this one — natural materials, held in natural light.",
    ],
    cover: S(materials, "Close-up of travertine, fluted oak, brushed brass and bouclé fabric"),
    gallery: [S(materials, "Materials"), L(hero, "Applied in a living room"), P(bedroom, "Applied in a bedroom")],
    demo: true,
  },
];

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
