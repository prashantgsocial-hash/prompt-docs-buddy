import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, posts } from "@/lib/products";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found — Cane" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — Cane Blog` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return <div className="mx-auto max-w-7xl px-6 py-32 text-center"><h1 className="text-4xl">Article not found</h1><Link to="/blog" className="btn-base btn-primary mt-8">All Articles</Link></div>;
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const more = posts.filter((p) => p.slug !== post.slug);
  return (
    <article>
      <header className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <p className="eyebrow mb-4">{post.category} · {post.date} · {post.readTime}</p>
        <h1 className="text-5xl leading-tight md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>
      </header>
      <img src={post.image} alt={post.title} className="mx-auto mt-12 aspect-[16/9] w-full max-w-6xl object-cover md:rounded-sm" />
      <div className="mx-auto max-w-2xl space-y-6 px-6 py-16 text-lg leading-relaxed">
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
      <section className="border-t bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="eyebrow mb-8">Keep reading</p>
          <div className="grid gap-10 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex gap-5">
                <img src={p.image} alt="" loading="lazy" className="aspect-square w-32 rounded-sm object-cover" />
                <div><p className="eyebrow">{p.category}</p><h3 className="mt-2 text-2xl group-hover:text-clay">{p.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
