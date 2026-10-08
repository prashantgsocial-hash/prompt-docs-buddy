// Cane widget library. Each export maps 1:1 to a planned Elementor widget
// in the "cane-elementor-widgets" plugin; props = Elementor controls.
import { useState, type ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { formatINR, type Category, type Product, type Testimonial } from "@/lib/products";
import { useCart } from "./cart";
import { IconArrow, IconHeart, IconStar, IconWhatsApp } from "./icons";

type Btn = { label: string; href: NonNullable<LinkProps["to"]> };

/* 1. Cane Hero */
export function CaneHero(p: {
  image: string; heading: string; highlight?: string; description?: string;
  primary?: Btn; secondary?: Btn; align?: "left" | "center"; overlay?: number; height?: string;
}) {
  const { align = "left", overlay = 0.35, height = "min-h-[92vh]" } = p;
  return (
    <section className={`relative -mt-20 flex ${height} items-end overflow-hidden`}>
      <img src={p.image} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-espresso" style={{ opacity: overlay }} />
      <div className={`relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:pb-28 ${align === "center" ? "text-center" : ""}`}>
        <div className={`max-w-2xl animate-fade-up text-cane-white ${align === "center" ? "mx-auto" : ""}`}>
          <h1 className="text-5xl leading-[1.02] md:text-7xl lg:text-8xl">
            {p.heading} {p.highlight && <em className="font-light text-sand">{p.highlight}</em>}
          </h1>
          {p.description && <p className="mt-6 max-w-lg text-base text-ivory/85 md:text-lg">{p.description}</p>}
          <div className={`mt-10 flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
            {p.primary && <Link to={p.primary.href} className="btn-base btn-light">{p.primary.label}</Link>}
            {p.secondary && <Link to={p.secondary.href} className="btn-base border border-cane-white text-cane-white hover:bg-cane-white hover:text-espresso">{p.secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Shared section heading */
function SectionHead({ eyebrow, heading, action }: { eyebrow?: string | undefined; heading: string; action?: Btn | undefined }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">{heading}</h2>
      </div>
      {action && <Link to={action.href} className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.18em]">{action.label} <IconArrow /></Link>}
    </div>
  );
}

/* 2. Cane Editorial Statement */
export function CaneEditorialStatement({ eyebrow, heading, description, image, imagePosition = "right", button }: {
  eyebrow?: string; heading: string; description: string; image: string; imagePosition?: "left" | "right"; button?: Btn;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className={`grid items-center gap-12 md:grid-cols-12 ${imagePosition === "left" ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="md:col-span-6 lg:col-span-5">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="text-4xl leading-tight md:text-5xl">{heading}</h2>
          <p className="mt-6 text-muted-foreground">{description}</p>
          {button && <Link to={button.href} className="btn-base btn-primary mt-8">{button.label}</Link>}
        </div>
        <div className={`md:col-span-6 ${imagePosition === "right" ? "lg:col-start-7" : ""}`}>
          <img src={image} alt="" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-sm object-cover" />
        </div>
      </div>
    </section>
  );
}

/* Cane Product Card */
export function CaneProductCard({ product: p, showRating = true, showCategory = true }: { product: Product; showRating?: boolean; showCategory?: boolean }) {
  const { add } = useCart();
  const [liked, setLiked] = useState(false);
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-sm bg-card">
        <Link to="/product/$id" params={{ id: p.id }} className="block">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1280}
          className={`aspect-[4/5] w-full object-cover transition duration-700 ${p.hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"}`} />
        {p.hoverImage && <img src={p.hoverImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100" />}
        </Link>
        {p.badge && <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${p.badge === "Sale" ? "bg-clay text-cane-white" : "bg-background text-foreground"}`}>{p.badge}</span>}
        <button aria-label="Wishlist" onClick={() => setLiked(!liked)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 ${liked ? "text-clay" : ""}`}>
          <IconHeart className="h-4 w-4" />
        </button>
        <button onClick={() => add(p)}
          className="btn-base btn-primary absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          Quick Add
        </button>
      </div>
      <div className="mt-4 space-y-1">
        {showCategory && <p className="eyebrow text-muted-foreground">{p.category}</p>}
        <h3 className="text-xl"><Link to="/product/$id" params={{ id: p.id }} className="hover:text-clay">{p.name}</Link></h3>
        <div className="flex items-center justify-between">
          <p className="text-sm">
            {p.salePrice ? <><span className="text-clay">{formatINR(p.salePrice)}</span> <s className="ml-1 text-muted-foreground">{formatINR(p.price)}</s></> : formatINR(p.price)}
          </p>
          {showRating && <p className="flex items-center gap-1 text-xs text-muted-foreground"><IconStar className="h-3 w-3 text-clay" />{p.rating} ({p.reviews})</p>}
        </div>
      </div>
    </article>
  );
}

/* 4. Cane Product Showcase / Product Grid */
export function CaneProductShowcase({ eyebrow, heading, products, columns = 4, action, filters }: {
  eyebrow?: string; heading: string; products: Product[]; columns?: 3 | 4; action?: Btn; filters?: boolean;
}) {
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHead eyebrow={eyebrow} heading={heading} action={action} />
      {filters && (
        <div className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${cat === c ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`}>{c}</button>
          ))}
        </div>
      )}
      <div className={`grid grid-cols-2 gap-x-5 gap-y-12 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {list.map((p) => <CaneProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

/* 5. Cane Signature Product */
export function CaneSignatureProduct({ product: p, eyebrow = "Signature Piece", description }: { product: Product; eyebrow?: string; description: string }) {
  const { add } = useCart();
  return (
    <section className="bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-sm object-cover" />
        <div className="md:pl-12">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-5xl leading-tight md:text-6xl">{p.name}</h2>
          <div className="mt-4 flex items-center gap-1 text-clay">
            {Array.from({ length: 5 }).map((_, i) => <IconStar key={i} />)}
            <span className="ml-2 text-sm text-muted-foreground">{p.rating} · {p.reviews} reviews</span>
          </div>
          <p className="mt-6 text-muted-foreground">{description}</p>
          <p className="mt-8 font-display text-3xl">
            {formatINR(p.salePrice ?? p.price)}
            {p.salePrice && <s className="ml-3 text-lg text-muted-foreground">{formatINR(p.price)}</s>}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => add(p)} className="btn-base btn-primary">Add to Cart</button>
            <Link to="/product/$id" params={{ id: p.id }} className="btn-base btn-outline">View Details</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 6. Cane Shop By Category */
export function CaneShopByCategory({ eyebrow, heading, categories: spaces }: { eyebrow?: string; heading: string; categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHead eyebrow={eyebrow} heading={heading} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {spaces.map((s, i) => (
          <Link key={s.slug} to="/categories/$slug" params={{ slug: s.slug }} className={`group relative overflow-hidden rounded-sm ${i === 0 ? "md:row-span-2" : ""}`}>
            <img src={s.image} alt={s.title} loading="lazy" width={1024} height={1280}
              className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 ? "aspect-[4/5] md:h-full" : "aspect-[4/5] md:aspect-[4/3]"}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-cane-white md:p-7">
              <h3 className="text-2xl md:text-3xl">{s.title}</h3>
              <p className="mt-1 hidden text-sm text-ivory/80 md:block">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* 7. Cane Craftsmanship */
export function CaneCraftsmanship({ mainImage, secondaryImage, heading, description, features }: {
  mainImage: string; secondaryImage: string; heading: string; description: string;
  features: { icon: ReactNode; title: string; text: string }[];
}) {
  return (
    <section className="bg-espresso text-ivory">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="relative">
          <img src={mainImage} alt="" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-4/5 rounded-sm object-cover" />
          <img src={secondaryImage} alt="" loading="lazy" className="absolute -bottom-8 right-0 aspect-square w-1/2 rounded-sm border-8 border-espresso object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow mb-4 text-sand">The Craft</p>
          <h2 className="text-4xl leading-tight md:text-5xl">{heading}</h2>
          <p className="mt-6 text-ivory/75">{description}</p>
          <div className="mt-10 space-y-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-5 border-t border-ivory/15 pt-6">
                <span className="text-sand">{f.icon}</span>
                <div><h3 className="text-xl">{f.title}</h3><p className="mt-1 text-sm text-ivory/70">{f.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 8. Cane Benefits */
export function CaneBenefits({ items }: { items: { number: string; heading: string; description: string }[] }) {
  return (
    <section className="border-y">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {items.map((b, i) => (
          <div key={b.heading} className={`px-6 py-14 md:px-10 ${i > 0 ? "lg:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
            <p className="font-display text-5xl italic text-clay">{b.number}</p>
            <h3 className="mt-4 font-ui text-sm font-semibold tracking-[0.22em]">{b.heading}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 9. Cane Editorial Story */
export function CaneEditorialStory({ image, eyebrow, heading, description, button }: { image: string; eyebrow: string; heading: string; description: string; button?: Btn }) {
  return (
    <section className="relative">
      <img src={image} alt="" loading="lazy" width={1920} height={1088} className="h-[70vh] w-full object-cover" />
      <div className="mx-auto -mt-40 max-w-7xl px-6">
        <div className="relative max-w-xl bg-background p-10 md:ml-auto md:p-14">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-4xl leading-tight">{heading}</h2>
          <p className="mt-5 text-muted-foreground">{description}</p>
          {button && <Link to={button.href} className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.18em]">{button.label} <IconArrow /></Link>}
        </div>
      </div>
    </section>
  );
}

/* 10. Cane Testimonial (carousel) */
export function CaneTestimonial({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const t = items[i]!;
  return (
    <section className="mx-auto max-w-4xl px-6 py-28 text-center">
      <p className="eyebrow mb-8">Loved in Homes Across India</p>
      <div className="mb-6 flex justify-center gap-1 text-clay">{Array.from({ length: t.rating }).map((_, k) => <IconStar key={k} className="h-4 w-4" />)}</div>
      <blockquote key={i} className="animate-fade-up font-display text-2xl leading-snug md:text-4xl">“{t.review}”</blockquote>
      <p className="mt-8 text-sm font-semibold">{t.name} <span className="font-normal text-muted-foreground">· {t.location}</span></p>
      <p className="mt-1 text-xs text-muted-foreground">{t.verified && "Verified purchase · "}{t.product}</p>
      <div className="mt-10 flex justify-center gap-2">
        {items.map((_, k) => (
          <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-foreground" : "w-1.5 bg-border"}`} />
        ))}
      </div>
    </section>
  );
}

/* 11. Cane Instagram Gallery (manual images; no API dependency) */
export function CaneInstagramGallery({ handle, images }: { handle: string; images: string[] }) {
  return (
    <section className="py-20">
      <div className="mb-10 text-center">
        <p className="eyebrow mb-3">Follow Along</p>
        <h2 className="text-4xl">{handle}</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6">
        {images.map((src, k) => (
          <a key={k} href="#" className="group relative overflow-hidden">
            <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-espresso/0 transition group-hover:bg-espresso/30" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* 12. Cane Contact CTA */
/* Page banner for inner pages */
export function CanePageHeader({ eyebrow, heading, description, image }: { eyebrow?: string; heading: string; description?: string; image?: string }) {
  if (image) return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden">
      <img src={image} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-espresso/50" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-24 text-cane-white">
        {eyebrow && <p className="eyebrow mb-3 text-sand">{eyebrow}</p>}
        <h1 className="text-5xl md:text-7xl">{heading}</h1>
        {description && <p className="mt-4 max-w-xl text-ivory/85">{description}</p>}
      </div>
    </section>
  );
  return (
    <section className="border-b bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-5xl md:text-7xl">{heading}</h1>
        {description && <p className="mt-4 max-w-xl text-muted-foreground">{description}</p>}
      </div>
    </section>
  );
}

export function CaneContactCTA({ image, heading, description, button, whatsapp }: { image: string; heading: string; description: string; button: Btn; whatsapp: string }) {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-espresso/60" />
      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center text-cane-white">
        <h2 className="text-4xl leading-tight md:text-6xl">{heading}</h2>
        <p className="mt-6 text-ivory/85">{description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to={button.href} className="btn-base btn-light">{button.label}</Link>
          <a href={`https://wa.me/${whatsapp}`} className="btn-base border border-cane-white text-cane-white hover:bg-cane-white hover:text-espresso"><IconWhatsApp className="h-4 w-4" /> WhatsApp Us</a>
        </div>
      </div>
    </section>
  );
}

/* Footer */
export function CaneFooter({ columns }: { columns: { title: string; links: Btn[] }[] }) {
  return (
    <footer className="bg-espresso pb-24 text-ivory md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-display text-4xl">Cane<span className="text-clay">.</span></p>
          <p className="mt-4 max-w-sm text-sm text-ivory/70">Handwoven cane and rattan furniture, made by artisans in India since 2012.</p>
          <form className="mt-8 flex max-w-sm border-b border-ivory/30" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your email" className="flex-1 bg-transparent py-3 text-sm placeholder:text-ivory/50 focus:outline-none" />
            <button className="text-xs font-semibold uppercase tracking-wider">Subscribe</button>
          </form>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="eyebrow mb-5 text-sand">{c.title}</p>
            <ul className="space-y-3 text-sm text-ivory/75">{c.links.map((l) => <li key={l.label}><Link to={l.href} className="hover:text-ivory">{l.label}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ivory/10 py-6 text-center text-xs text-ivory/50">© {new Date().getFullYear()} Cane. All rights reserved.</div>
    </footer>
  );
}
