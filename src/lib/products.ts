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

export interface Space {
  title: string;
  description: string;
  image: string;
  href: string;
}

export const spaces: Space[] = [
  { title: "Living Room", description: "Loungers, armchairs & coffee tables", image: roomLiving, href: "#" },
  { title: "Balcony", description: "Compact chairs & planters", image: roomBalcony, href: "#" },
  { title: "Dining", description: "Dining chairs & benches", image: roomDining, href: "#" },
  { title: "Bedroom", description: "Headboards & bedside pieces", image: roomBedroom, href: "#" },
  { title: "Outdoor", description: "Weather-treated garden sets", image: roomOutdoor, href: "#" },
  { title: "Reading Corner", description: "High-back chairs & lamps", image: roomReading, href: "#" },
];

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
