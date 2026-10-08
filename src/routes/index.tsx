import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import craft from "@/assets/craft.jpg";
import story from "@/assets/story.jpg";
import { categories, products, testimonials } from "@/lib/products";
import { IconHand, IconLeaf, IconWind } from "@/components/cane/icons";
import {
  CaneBenefits, CaneContactCTA, CaneCraftsmanship, CaneEditorialStatement, CaneEditorialStory,
  CaneHero, CaneInstagramGallery, CaneProductShowcase, CaneShopByCategory,
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

function Index() {
  return (
    <>
      <CaneHero
        image={hero}
        heading="Woven by hand,"
        highlight="made to last."
        description="Cane and rattan furniture shaped by Indian artisans — light, breathable and quietly timeless."
        primary={{ label: "Shop the Collection", href: "/shop" }}
        secondary={{ label: "Browse Categories", href: "/categories" }}
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
        image={categories[0]!.image}
        button={{ label: "Shop Now", href: "/shop" }}
      />
      <CaneProductShowcase eyebrow="Bestsellers" heading="Pieces our customers love" products={products} columns={3} filters action={{ label: "View All", href: "/shop" }} />
      <CaneSignatureProduct product={products[0]!} description={products[0]!.description ?? ""} />
      <CaneShopByCategory eyebrow="Shop by Category" heading="For every corner of your home" categories={categories} />
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
      <CaneTestimonial items={testimonials} />
      <CaneEditorialStory
        image={story}
        eyebrow="From the Blog"
        heading="Inside our Kerala workshop"
        description="Meet the families who have been weaving cane for three generations, and see how a Malabar chair comes to life."
        button={{ label: "Read the Blog", href: "/blog" }}
      />
      <CaneInstagramGallery handle="@cane.home" images={categories.map((s) => s.image)} />
      <CaneContactCTA
        image={categories[4]!.image}
        heading="Furnishing a whole home?"
        description="Our design team offers free consultations for homes, cafés and boutique stays."
        button={{ label: "Contact Us", href: "/contact" }}
        whatsapp="919800000000"
      />
    </>
  );
}
