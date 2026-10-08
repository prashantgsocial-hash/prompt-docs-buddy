import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, formatINR, getProduct, products } from "@/lib/products";
import { useCart } from "@/components/cane/cart";
import { IconHeart, IconStar, IconWhatsApp } from "@/components/cane/icons";
import { CaneProductShowcase } from "@/components/cane/widgets";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found — Cane" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const desc = p.description ?? `Handwoven ${p.name} from Cane, crafted in Kerala.`;
    return {
      meta: [
        { title: `${p.name} — Cane` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — Cane` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return <div className="mx-auto max-w-7xl px-6 py-32 text-center"><h1 className="text-4xl">Product not found</h1><Link to="/shop" className="btn-base btn-primary mt-8">Back to Shop</Link></div>;
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"details" | "care" | "shipping">("details");
  const images = [p.image, ...(p.hoverImage ? [p.hoverImage] : [])];
  const [img, setImg] = useState(0);
  const cat = categories.find((c) => c.title === p.category);
  const related = products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/shop" className="hover:text-foreground">Shop</Link>
        {cat && <> / <Link to="/categories/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">{cat.title}</Link></>} / <span className="text-foreground">{p.name}</span>
      </div>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2 md:py-14">
        <div>
          <img key={img} src={images[img]} alt={p.name} width={1024} height={1280} className="aspect-[4/5] w-full animate-fade-up rounded-sm object-cover" />
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((src, k) => (
                <button key={k} onClick={() => setImg(k)} className={`overflow-hidden rounded-sm border-2 ${k === img ? "border-foreground" : "border-transparent"}`}>
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:pl-6">
          {p.badge && <span className="eyebrow text-clay">{p.badge}</span>}
          <h1 className="mt-2 text-5xl leading-tight">{p.name}</h1>
          <div className="mt-4 flex items-center gap-1 text-clay">
            {Array.from({ length: 5 }).map((_, i) => <IconStar key={i} className="h-4 w-4" />)}
            <span className="ml-2 text-sm text-muted-foreground">{p.rating} · {p.reviews} reviews</span>
          </div>
          <p className="mt-6 font-display text-3xl">
            {formatINR(p.salePrice ?? p.price)}
            {p.salePrice && <s className="ml-3 text-lg text-muted-foreground">{formatINR(p.price)}</s>}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>
          <p className="mt-6 text-muted-foreground">{p.description ?? "Hand-caned on a solid teak frame in our Kerala workshop. Light, breathable and built to last for decades."}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-full border">
              <button aria-label="Decrease" className="px-4" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-6 text-center text-sm">{qty}</span>
              <button aria-label="Increase" className="px-4" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button onClick={() => { for (let i = 0; i < qty; i++) add(p); }} className="btn-base btn-primary flex-1">Add to Cart</button>
            <button aria-label="Wishlist" className="flex h-12 w-12 items-center justify-center rounded-full border"><IconHeart className="h-4 w-4" /></button>
          </div>
          <a href={`https://wa.me/919800000000?text=${encodeURIComponent(`Hi, I'm interested in the ${p.name}`)}`} className="btn-base btn-outline mt-3 w-full"><IconWhatsApp className="h-4 w-4" /> Enquire on WhatsApp</a>

          <ul className="mt-8 grid grid-cols-3 gap-3 border-y py-5 text-center text-xs text-muted-foreground">
            <li>Free shipping<br />over ₹25,000</li><li>Handwoven<br />in Kerala</li><li>7-day<br />easy returns</li>
          </ul>

          <div className="mt-8">
            <div className="flex gap-6 border-b">
              {(["details", "care", "shipping"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-3 text-xs font-semibold uppercase tracking-[0.18em] ${tab === t ? "border-foreground" : "border-transparent text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
            <div className="pt-5 text-sm text-muted-foreground">
              {tab === "details" && <p>{p.materials ?? "Natural rattan cane weave on solid teak frame."} {p.dimensions ?? "Dimensions shared on request."}</p>}
              {tab === "care" && <p>Dust weekly with a soft brush. Wipe with a damp cloth and dry in shade. Avoid long hours of direct sun and damp floors.</p>}
              {tab === "shipping" && <p>Ships across India in 7–12 working days, fully assembled and blanket-wrapped. Free over ₹25,000.</p>}
            </div>
          </div>
        </div>
      </section>
      <CaneProductShowcase eyebrow="You may also like" heading="Related pieces" products={related} />
    </>
  );
}
