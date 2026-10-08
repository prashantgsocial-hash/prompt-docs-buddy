import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { CanePageHeader, CaneProductShowcase } from "@/components/cane/widgets";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Cane Furniture — Cane" },
      { name: "description", content: "Browse handwoven cane chairs, benches, headboards and lighting. Free shipping over ₹25,000." },
      { property: "og:title", content: "Shop All Cane Furniture — Cane" },
      { property: "og:description", content: "Handwoven cane chairs, benches, headboards and lighting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <>
      <CanePageHeader eyebrow="The Collection" heading="Shop" description="Every piece handwoven in our Kerala workshop." />
      <CaneProductShowcase heading={`${products.length} pieces`} products={products} columns={3} filters />
    </>
  );
}
