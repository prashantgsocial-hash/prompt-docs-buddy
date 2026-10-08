// Cane Mini Cart — slide-in drawer. Mirrors WooCommerce AJAX cart fragments.
import { createContext, useContext, useState, type ReactNode } from "react";
import { formatINR, type Product } from "@/lib/products";
import { Link } from "@tanstack/react-router";
import { IconClose, IconWhatsApp } from "./icons";

interface Line { product: Product; qty: number }
interface CartCtx {
  lines: Line[];
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  count: number;
  subtotal: number;
  clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);
export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const add = (p: Product) => {
    setLines((ls) => {
      const f = ls.find((l) => l.product.id === p.id);
      return f ? ls.map((l) => (l === f ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { product: p, qty: 1 }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setLines((ls) => ls.filter((l) => l.product.id !== id));
  const setQty = (id: string, q: number) =>
    setLines((ls) => ls.map((l) => (l.product.id === id ? { ...l, qty: Math.max(1, q) } : l)));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + (l.product.salePrice ?? l.product.price) * l.qty, 0);
  const clear = () => setLines([]);
  return <Ctx.Provider value={{ lines, open, setOpen, add, remove, setQty, count, subtotal, clear }}>{children}</Ctx.Provider>;
}

export function CaneMiniCart({ freeShippingThreshold = 25000, whatsapp = "919800000000" }) {
  const { lines, open, setOpen, remove, setQty, subtotal } = useCart();
  const pct = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const left = freeShippingThreshold - subtotal;

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-espresso/40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl">Your Cart</h2>
          <button aria-label="Close cart" onClick={() => setOpen(false)}><IconClose /></button>
        </div>

        <div className="border-b px-6 py-4">
          <p className="text-xs text-muted-foreground">
            {left > 0 ? <>Add <strong className="text-foreground">{formatINR(left)}</strong> more for free shipping</> : "You've unlocked free shipping"}
          </p>
          <div className="mt-2 h-1 rounded-full bg-secondary">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 && <p className="py-16 text-center text-muted-foreground">Your cart is empty.</p>}
          {lines.map(({ product: p, qty }) => (
            <div key={p.id} className="flex gap-4 border-b py-4">
              <img src={p.image} alt={p.name} className="h-24 w-20 rounded object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col">
                <p className="font-display text-lg leading-tight">{p.name}</p>
                <p className="text-sm text-muted-foreground">{formatINR(p.salePrice ?? p.price)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border">
                    <button className="px-3 py-1" onClick={() => setQty(p.id, qty - 1)}>−</button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button className="px-3 py-1" onClick={() => setQty(p.id, qty + 1)}>+</button>
                  </div>
                  <button className="text-xs uppercase tracking-wider text-muted-foreground underline" onClick={() => remove(p.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t px-6 py-5">
          <div className="flex gap-2">
            <input placeholder="Coupon code" className="flex-1 rounded-full border bg-card px-4 py-2 text-sm" />
            <button className="btn-base btn-outline px-5 py-2">Apply</button>
          </div>
          <div className="flex justify-between font-display text-xl"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/cart" onClick={() => setOpen(false)} className="btn-base btn-outline">View Cart</Link>
            <Link to="/checkout" onClick={() => setOpen(false)} className="btn-base btn-primary">Checkout</Link>
          </div>
          <a href={`https://wa.me/${whatsapp}`} className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <IconWhatsApp className="h-4 w-4" /> Questions? Chat on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
