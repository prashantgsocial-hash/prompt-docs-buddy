import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { formatINR } from "@/lib/products";
import { useCart } from "@/components/cane/cart";
import { CanePageHeader } from "@/components/cane/widgets";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Cane" },
      { name: "description", content: "Secure checkout for your handwoven Cane furniture." },
      { property: "og:title", content: "Checkout — Cane" },
      { property: "og:description", content: "Secure checkout for Cane furniture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const field = "w-full rounded-sm border bg-card px-4 py-3 text-sm focus:border-foreground focus:outline-none";

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [pay, setPay] = useState("upi");
  const [plan, setPlan] = useState<"full" | "advance">("full");
  const [done, setDone] = useState<string | null>(null);
  const shipping = subtotal === 0 || subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + shipping;
  const advance = Math.round(total * 0.1);
  const dueNow = plan === "advance" ? advance : total;

  if (done)
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="eyebrow mb-4">Order {done}</p>
        <h1 className="text-5xl">Thank you!</h1>
        <p className="mt-4 text-muted-foreground">
          {plan === "advance"
            ? `Your ${formatINR(advance)} advance is received. We'll WhatsApp you dispatch updates within 2 working days — the balance of ${formatINR(total - advance)} is payable before dispatch.`
            : "Your order is confirmed. We'll WhatsApp you dispatch updates within 2 working days."}
        </p>
        <Link to="/shop" className="btn-base btn-primary mt-10">Continue Shopping</Link>
      </div>
    );

  if (!lines.length)
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-4xl">Your cart is empty</h1>
        <Link to="/shop" className="btn-base btn-primary mt-8">Shop Now</Link>
      </div>
    );

  return (
    <>
      <CanePageHeader heading="Checkout" />
      <form
        className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-5"
        onSubmit={(e) => { e.preventDefault(); clear(); setDone("#CN" + Math.floor(10000 + Math.random() * 89999)); }}
      >
        <div className="space-y-10 lg:col-span-3">
          <fieldset className="space-y-4">
            <legend className="mb-4 text-2xl">Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className={field} />
              <input required type="tel" placeholder="Mobile number" className={field} />
            </div>
            <input required type="email" placeholder="Email" className={field} />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="mb-4 text-2xl">Delivery address</legend>
            <input required placeholder="House / flat, street" className={field} />
            <input placeholder="Landmark (optional)" className={field} />
            <div className="grid gap-4 sm:grid-cols-3">
              <input required placeholder="City" className={field} />
              <input required placeholder="State" className={field} />
              <input required inputMode="numeric" pattern="[0-9]{6}" placeholder="PIN code" className={field} />
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-4 text-2xl">Payment plan</legend>
            <div className="divide-y rounded-sm border">
              <label className="flex cursor-pointer items-start gap-3 px-4 py-4 text-sm">
                <input type="radio" name="plan" checked={plan === "full"} onChange={() => setPlan("full")} className="mt-0.5 accent-current" />
                <span>
                  Pay in full — {formatINR(total)}
                  <span className="block text-xs text-muted-foreground">Your order goes straight into production.</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 px-4 py-4 text-sm">
                <input type="radio" name="plan" checked={plan === "advance"} onChange={() => setPlan("advance")} className="mt-0.5 accent-current" />
                <span>
                  Book with 10% advance — {formatINR(advance)} now
                  <span className="block text-xs text-muted-foreground">Reserve your piece today; pay the balance of {formatINR(total - advance)} before dispatch.</span>
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-4 text-2xl">Payment method</legend>
            <div className="divide-y rounded-sm border">
              {[
                { id: "upi", label: "UPI (GPay, PhonePe, Paytm)" },
                { id: "card", label: "Credit / Debit Card" },
                { id: "netbanking", label: "Net Banking" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((o) => (
                <label key={o.id} className="flex cursor-pointer items-center gap-3 px-4 py-4 text-sm">
                  <input type="radio" name="pay" checked={pay === o.id} onChange={() => setPay(o.id)} className="accent-current" />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
          <button className="btn-base btn-primary w-full">
            {plan === "advance" ? `Book Now · Pay ${formatINR(advance)}` : `Place Order · ${formatINR(total)}`}
          </button>
        </div>
        <aside className="h-fit bg-secondary p-8 lg:col-span-2">
          <h2 className="text-2xl">Order summary</h2>
          <div className="mt-6 space-y-4">
            {lines.map(({ product: p, qty }) => (
              <div key={p.id} className="flex items-center gap-4">
                <img src={p.image} alt="" className="h-16 w-14 rounded-sm object-cover" />
                <div className="flex-1 text-sm"><p>{p.name}</p><p className="text-muted-foreground">Qty {qty}</p></div>
                <p className="text-sm">{formatINR((p.salePrice ?? p.price) * qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t pt-6 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatINR(shipping) : "Free"}</span></div>
          </div>
          <div className="mt-4 flex justify-between border-t pt-4 font-display text-2xl"><span>Total</span><span>{formatINR(subtotal + shipping)}</span></div>
        </aside>
      </form>
    </>
  );
}
