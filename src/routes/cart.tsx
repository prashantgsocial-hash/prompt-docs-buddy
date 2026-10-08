import { createFileRoute, Link } from "@tanstack/react-router";
import { formatINR } from "@/lib/products";
import { useCart } from "@/components/cane/cart";
import { CanePageHeader } from "@/components/cane/widgets";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Cane" },
      { name: "description", content: "Review the handwoven pieces in your cart before checkout." },
      { property: "og:title", content: "Your Cart — Cane" },
      { property: "og:description", content: "Review your cart before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

export const FREE_SHIP = 25000;
export const shippingFor = (subtotal: number) => (subtotal === 0 || subtotal >= FREE_SHIP ? 0 : 1500);

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  const shipping = shippingFor(subtotal);
  if (!lines.length)
    return (
      <>
        <CanePageHeader heading="Your Cart" />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="btn-base btn-primary mt-8">Continue Shopping</Link>
        </div>
      </>
    );
  return (
    <>
      <CanePageHeader heading="Your Cart" />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {lines.map(({ product: p, qty }) => (
            <div key={p.id} className="flex gap-6 border-b py-6">
              <Link to="/product/$id" params={{ id: p.id }}><img src={p.image} alt={p.name} className="h-32 w-28 rounded-sm object-cover" /></Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div><p className="eyebrow text-muted-foreground">{p.category}</p><h3 className="text-2xl">{p.name}</h3></div>
                  <p className="font-display text-xl">{formatINR((p.salePrice ?? p.price) * qty)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-full border">
                    <button aria-label="Decrease" className="px-4 py-2" onClick={() => setQty(p.id, qty - 1)}>−</button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button aria-label="Increase" className="px-4 py-2" onClick={() => setQty(p.id, qty + 1)}>+</button>
                  </div>
                  <button onClick={() => remove(p.id)} className="text-xs uppercase tracking-wider text-muted-foreground underline">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <Link to="/shop" className="mt-8 inline-block text-xs font-semibold uppercase tracking-[0.18em]">← Continue shopping</Link>
        </div>
        <aside className="h-fit bg-secondary p-8">
          <h2 className="text-3xl">Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatINR(shipping) : "Free"}</span></div>
            {shipping > 0 && <p className="text-xs text-muted-foreground">Add {formatINR(FREE_SHIP - subtotal)} more for free shipping.</p>}
          </div>
          <div className="mt-6 flex gap-2">
            <input placeholder="Coupon code" className="flex-1 rounded-full border bg-card px-4 py-2 text-sm" />
            <button className="btn-base btn-outline px-5 py-2">Apply</button>
          </div>
          <div className="mt-6 flex justify-between border-t pt-6 font-display text-2xl"><span>Total</span><span>{formatINR(subtotal + shipping)}</span></div>
          <Link to="/checkout" className="btn-base btn-primary mt-6 w-full">Proceed to Checkout</Link>
        </aside>
      </section>
    </>
  );
}
