import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/lib/products";
import { CanePageHeader, CaneShopByCategory } from "@/components/cane/widgets";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Shop by Category — Cane" },
      { name: "description", content: "Seating, dining, bedroom, lighting and outdoor cane furniture." },
      { property: "og:title", content: "Shop by Category — Cane" },
      { property: "og:description", content: "Find handwoven cane furniture for every room." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <>
      <CanePageHeader eyebrow="Browse" heading="Categories" description="Find the right piece for every corner of your home." />
      <CaneShopByCategory heading="All categories" categories={categories} />
    </>
  );
}
