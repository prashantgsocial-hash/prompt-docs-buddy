import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import craft from "@/assets/craft.jpg";
import story from "@/assets/story.jpg";
import { products, spaces, testimonials } from "@/lib/products";
import { CartProvider, CaneMiniCart } from "@/components/cane/cart";
import { CaneBrandBar, CaneHeader, CaneMobileActionBar, CaneSocialRail } from "@/components/cane/header";
import { IconHand, IconLeaf, IconWind } from "@/components/cane/icons";
import {
  CaneBenefits, CaneContactCTA, CaneCraftsmanship, CaneEditorialStatement, CaneEditorialStory,
  CaneFooter, CaneHero, CaneInstagramGallery, CaneProductShowcase, CaneShopBySpace,
  CaneSignatureProduct, CaneTestimonial,
} from "@/components/cane/widgets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cane — Handwoven Cane & Rattan Furniture, Crafted in India" },
      { name: "description", content: "Premium handcrafted cane and rattan furniture for living rooms, balconies, dining and bedrooms. Made by Indian artisans since 2012." },
      { property: "og:title", content: "Cane — Handwoven Cane & Rattan Furniture" },
      { property: "og:description", content: "Premium handcrafted cane furniture, made by Indian artisans since 2012." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "Shop", href: "#shop" },
  { label: "Spaces", href: "#spaces" },
  { label: "Craft", href: "#craft" },
  { label: "Journal", href: "#story" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  return (
    <CartProvider>
      <CaneBrandBar />
      <CaneHeader nav={nav} />
      <CaneSocialRail />
      <main>
        <CaneHero
          image={hero}
          heading="Woven by hand,"
          highlight="made to last."
          description="Cane and rattan furniture shaped by Indian artisans — light, breathable and quietly timeless."
          primary={{ label: "Shop the Collection", href: "#shop" }}
          secondary={{ label: "Our Craft", href: "#craft" }}
        />
        <CaneBenefits items={[
          { number: "01", heading: "NATURAL", description: "Sustainably harvested rattan and solid teak." },
          { number: "02", heading: "BREATHABLE", description: "Open weaves that stay cool in Indian summers." },
          { number: "03", heading: "TIMELESS", description: "Designs that outlive trends, season after season." },
          { number: "04", heading: "LIGHTWEIGHT", description: "Easy to move between rooms and terraces." },
        ]} />
        <CaneEditorialStatement
          eyebrow="Since 2012"
          heading="Furniture that lets your home breathe."
          description="Every piece begins as a single strand of cane, woven over days by a master artisan. The result is furniture with warmth you can feel — and a weave you'll never tire of."
          image={spaces[0]!.image}
          button={{ label: "Discover More", href: "#craft" }}
        />
        <div id="shop">
          <CaneProductShowcase eyebrow="Bestsellers" heading="Pieces our customers love" products={products} columns={3} filters action={{ label: "View All", href: "#" }} />
        </div>
        <CaneSignatureProduct
          product={products[0]!}
          description="Our most loved design. A low, deep lounge chair with a hand-caned back and seat on a solid teak frame — made to be sunk into with a book and a cup of chai."
        />
        <div id="spaces">
          <CaneShopBySpace eyebrow="Shop by Space" heading="For every corner of your home" spaces={spaces} />
        </div>
        <div id="craft">
          <CaneCraftsmanship
            mainImage={craft}
            secondaryImage={products[1]!.image}
            heading="Forty hours of hands in every chair."
            description="Our workshop in Kerala brings together third-generation weavers and woodworkers. Nothing is rushed, and nothing leaves until it's right."
            features={[
              { icon: <IconLeaf />, title: "Responsibly Sourced", text: "Rattan from managed forests, teak from certified plantations." },
              { icon: <IconHand />, title: "Hand-Woven", text: "Every weave is done by hand — no machines, no shortcuts." },
              { icon: <IconWind />, title: "Built for India", text: "Treated to resist humidity, monsoons and daily life." },
            ]}
          />
        </div>
        <CaneTestimonial items={testimonials} />
        <div id="story">
          <CaneEditorialStory
            image={story}
            eyebrow="From the Journal"
            heading="Inside our Kerala workshop"
            description="Meet the families who have been weaving cane for three generations, and see how a Malabar chair comes to life."
            button={{ label: "Read the Story", href: "#" }}
          />
        </div>
        <CaneInstagramGallery handle="@cane.home" images={spaces.map((s) => s.image)} />
        <div id="contact">
          <CaneContactCTA
            image={spaces[4]!.image}
            heading="Furnishing a whole home?"
            description="Our design team offers free consultations for homes, cafés and boutique stays."
            button={{ label: "Book a Consultation", href: "#" }}
            whatsapp="919800000000"
          />
        </div>
      </main>
      <CaneFooter columns={[
        { title: "Shop", links: ["Seating", "Dining", "Bedroom", "Lighting", "Outdoor"] },
        { title: "Help", links: ["Shipping", "Returns", "Care Guide", "FAQ"] },
        { title: "Company", links: ["Our Story", "Craft", "Trade", "Contact"] },
      ]} />
      <CaneMiniCart />
      <CaneMobileActionBar />
    </CartProvider>
  );
}
