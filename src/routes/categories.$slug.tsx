import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, productsInCategory } from "@/lib/products";
import { CanePageHeader, CaneProductCard } from "@/components/cane/widgets";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Category not found — Cane" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.category;
    return {
      meta: [
        { title: `${c.title} — Cane Furniture` },
        { name: "description", content: `Handwoven cane ${c.title.toLowerCase()}: ${c.description}.` },
        { property: "og:title", content: `${c.title} — Cane Furniture` },
        { property: "og:description", content: c.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  return <div className="mx-auto max-w-7xl px-6 py-32 text-center"><h1 className="text-4xl">Category not found</h1><Link to="/categories" className="btn-base btn-primary mt-8">All Categories</Link></div>;
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = productsInCategory(category);
  return (
    <>
      <CanePageHeader eyebrow="Category" heading={category.title} description={category.description} image={category.image} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3">
            {list.map((p) => <CaneProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">New pieces for this category are on the loom. Check back soon.</p>
            <Link to="/shop" className="btn-base btn-primary mt-8">Shop All</Link>
          </div>
        )}
      </section>
    </>
  );
}
