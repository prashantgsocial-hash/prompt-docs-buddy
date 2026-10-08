// Demo catalogue data — in the WordPress build these come from WooCommerce
// (product, categories, ratings, sale prices). Nothing here is hardcoded
// into components; every section receives its content via props, mirroring
// the planned Elementor widget controls.

import chairLounge from "@/assets/products/lounge-chair.jpg";
import chairDining from "@/assets/products/dining-chair.jpg";
import benchCane from "@/assets/products/bench.jpg";
import headboard from "@/assets/products/headboard.jpg";
import pendant from "@/assets/products/pendant.jpg";
import armchair from "@/assets/products/armchair.jpg";
import roomLiving from "@/assets/spaces/living-room.jpg";
import roomBalcony from "@/assets/spaces/balcony.jpg";
import roomDining from "@/assets/spaces/dining.jpg";
import roomBedroom from "@/assets/spaces/bedroom.jpg";
import roomOutdoor from "@/assets/spaces/outdoor.jpg";
import roomReading from "@/assets/spaces/reading.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage?: string;
  badge?: "Sale" | "New" | "Best Seller";
  description?: string;
  materials?: string;
  dimensions?: string;
}

export const products: Product[] = [
  {
    id: "malabar-lounge",
    name: "Malabar Lounge Chair",
    category: "Seating",
    price: 24500,
    salePrice: 19900,
    rating: 4.9,
    reviews: 132,
    image: chairLounge,
    hoverImage: armchair,
    badge: "Best Seller",
    description: "A low, deep lounge chair with a hand-caned back and seat on a solid teak frame — made to be sunk into with a book and a cup of chai.",
  },
  {
    id: "kovalam-dining",
    name: "Kovalam Dining Chair",
    category: "Dining",
    price: 12800,
    rating: 4.8,
    reviews: 89,
    image: chairDining,
  },
  {
    id: "alleppey-bench",
    name: "Alleppey Cane Bench",
    category: "Seating",
    price: 18400,
    salePrice: 15900,
    rating: 4.7,
    reviews: 64,
    image: benchCane,
    badge: "Sale",
  },
  {
    id: "coorg-headboard",
    name: "Coorg Rattan Headboard",
    category: "Bedroom",
    price: 21500,
    rating: 4.9,
    reviews: 47,
    image: headboard,
    badge: "New",
  },
  {
    id: "pondicherry-pendant",
    name: "Pondicherry Pendant Light",
    category: "Lighting",
    price: 6900,
    salePrice: 5400,
    rating: 4.6,
    reviews: 112,
    image: pendant,
    badge: "Sale",
  },
  {
    id: "nilgiri-armchair",
    name: "Nilgiri Armchair",
    category: "Seating",
    price: 26900,
    rating: 5.0,
    reviews: 38,
    image: armchair,
    badge: "New",
  },
];

export interface Category {
  slug: string;
  title: string;
  description: string;
  image: string;
}

// Mirrors WooCommerce product categories (product.category === title).
export const categories: Category[] = [
  { slug: "seating", title: "Seating", description: "Loungers, armchairs & benches", image: roomLiving },
  { slug: "dining", title: "Dining", description: "Dining chairs & tables", image: roomDining },
  { slug: "bedroom", title: "Bedroom", description: "Headboards & bedside pieces", image: roomBedroom },
  { slug: "lighting", title: "Lighting", description: "Woven pendants & lamps", image: roomReading },
  { slug: "outdoor", title: "Outdoor", description: "Weather-treated garden sets", image: roomOutdoor },
  { slug: "balcony", title: "Balcony", description: "Compact chairs & planters", image: roomBalcony },
];

export const productsInCategory = (c: Category) => products.filter((p) => p.category === c.title);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "inside-our-kerala-workshop", title: "Inside our Kerala workshop", category: "Craft",
    excerpt: "Meet the families who have been weaving cane for three generations, and see how a Malabar chair comes to life.",
    date: "12 Sep 2026", readTime: "6 min read", image: roomReading,
    body: [
      "Our workshop sits a short drive from the backwaters of Alleppey. Every morning, weavers settle in with bundles of soaked cane, softened just enough to bend without breaking.",
      "A single Malabar Lounge Chair takes around forty hours of hand-weaving. The pattern is counted strand by strand — there is no template other than memory and practice.",
      "Many of our artisans learned from their parents, and are now teaching their own children. Buying a Cane piece keeps that knowledge alive.",
    ],
  },
  {
    slug: "caring-for-cane-furniture", title: "How to care for cane furniture", category: "Care Guide",
    excerpt: "Simple habits that keep your cane looking beautiful through Indian summers and monsoons.",
    date: "28 Aug 2026", readTime: "4 min read", image: roomLiving,
    body: [
      "Dust weekly with a soft brush, getting into the gaps of the weave. Once a month, wipe with a cloth dampened in mild soapy water and let it dry in the shade.",
      "Avoid harsh direct sunlight for long hours — it can dry cane out. During the monsoon, keep pieces off damp floors and let air circulate.",
      "If a strand loosens, don't pull it. Send us a photo on WhatsApp and we'll guide you or arrange a repair.",
    ],
  },
  {
    slug: "styling-a-small-balcony", title: "Styling a small balcony with cane", category: "Inspiration",
    excerpt: "Light, breathable pieces that make even a compact city balcony feel like a retreat.",
    date: "05 Aug 2026", readTime: "5 min read", image: roomBalcony,
    body: [
      "Start with one anchor piece — a low lounge chair or a two-seater bench. Cane's open weave keeps it visually light, so the space doesn't feel crowded.",
      "Add a pendant light and a few planters at different heights. Layer a cotton cushion in an earthy tone and you're done.",
      "Because cane is lightweight, you can move pieces indoors when the rains arrive.",
    ],
  },
];
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  review: string;
  product: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ananya Iyer",
    location: "Bengaluru",
    rating: 5,
    review:
      "The Malabar chair is the most beautiful piece in our home. The weave is immaculate and it arrived perfectly packed. Worth every rupee.",
    product: "Malabar Lounge Chair",
    verified: true,
  },
  {
    name: "Rohit Malhotra",
    location: "Mumbai",
    rating: 5,
    review:
      "We furnished our entire balcony with Cane pieces. Light enough to move around, sturdy enough for daily use. The craftsmanship shows.",
    product: "Alleppey Cane Bench",
    verified: true,
  },
  {
    name: "Sarah D'Souza",
    location: "Goa",
    rating: 5,
    review:
      "Our guesthouse is full of their furniture. Guests constantly ask where it's from. Three years of heavy use and it still looks new.",
    product: "Kovalam Dining Chair",
    verified: true,
  },
];

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
