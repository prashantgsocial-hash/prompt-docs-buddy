import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/products";
import { CanePageHeader } from "@/components/cane/widgets";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Craft, Care & Inspiration | Cane" },
      { name: "description", content: "Stories from our Kerala workshop, cane care guides and styling ideas." },
      { property: "og:title", content: "The Cane Blog" },
      { property: "og:description", content: "Stories from our workshop, care guides and styling ideas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

function Blog() {
  const [first, ...rest] = posts;
  return (
    <>
      <CanePageHeader eyebrow="Blog" heading="Stories & guides" description="From our workshop to your home." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        {first && (
          <Link to="/blog/$slug" params={{ slug: first.slug }} className="group grid items-center gap-10 md:grid-cols-2">
            <img src={first.image} alt={first.title} className="aspect-[4/3] w-full rounded-sm object-cover transition duration-700 group-hover:opacity-90" />
            <div>
              <p className="eyebrow mb-3">{first.category} · {first.date}</p>
              <h2 className="text-4xl leading-tight group-hover:text-clay md:text-5xl">{first.title}</h2>
              <p className="mt-4 text-muted-foreground">{first.excerpt}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em]">Read story →</p>
            </div>
          </Link>
        )}
        <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
              <p className="eyebrow mt-5">{p.category} · {p.readTime}</p>
              <h3 className="mt-2 text-2xl group-hover:text-clay">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
