// Cane Brand Bar + Premium Header + Social Rail + Mobile Action Bar.
import { useEffect, useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { useCart } from "./cart";
import { IconBag, IconClose, IconHeart, IconInstagram, IconMenu, IconPhone, IconPin, IconSearch, IconUser, IconWhatsApp, IconX } from "./icons";

export interface NavItem { label: string; href: NonNullable<LinkProps["to"]> }

export function CaneBrandBar({ launchYear = 2012, text = "Crafted in India", phone = "+91 98000 00000" }) {
  return (
    <div className="bg-espresso text-ivory">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-2 text-[11px] uppercase tracking-[0.22em] md:justify-between">
        <span>Est. {launchYear} · {text}</span>
        <span className="hidden md:inline">Free shipping over ₹25,000 · {phone}</span>
      </div>
    </div>
  );
}

export function CaneHeader({ logo = "Cane", nav, transparent = true }: { logo?: string; nav: NavItem[]; transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = !transparent || scrolled || menu;

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-500 ${solid ? "bg-background/95 text-foreground shadow-sm backdrop-blur" : "bg-transparent text-cane-white"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <button className="md:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <IconClose /> : <IconMenu />}</button>
        <Link to="/" className="font-display text-3xl tracking-tight">{logo}<span className="text-clay">.</span></Link>
        <nav className="hidden gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.label} to={n.href} activeOptions={{ exact: n.href === "/" }} activeProps={{ className: "text-clay" }} className="text-xs font-semibold uppercase tracking-[0.18em] opacity-90 hover:opacity-100">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden sm:block"><IconSearch /></button>
          <button aria-label="Account" className="hidden sm:block"><IconUser /></button>
          <button aria-label="Wishlist" className="hidden sm:block"><IconHeart /></button>
          <button aria-label="Cart" className="relative" onClick={() => setOpen(true)}>
            <IconBag />
            {count > 0 && <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[10px] text-cane-white">{count}</span>}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="flex flex-col gap-4 border-t bg-background px-6 py-6 md:hidden">
          {nav.map((n) => <Link key={n.label} to={n.href} onClick={() => setMenu(false)} className="font-display text-2xl">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function CaneSocialRail({ instagram = "#", x = "#", justdial = "#", phone = "+919800000000", whatsapp = "919800000000" }) {
  const items = [
    { icon: <IconInstagram className="h-4 w-4" />, href: instagram, label: "Instagram" },
    { icon: <IconX className="h-4 w-4" />, href: x, label: "X" },
    { icon: <IconPin className="h-4 w-4" />, href: justdial, label: "Justdial" },
    { icon: <IconPhone className="h-4 w-4" />, href: `tel:${phone}`, label: "Call us" },
    { icon: <IconWhatsApp className="h-4 w-4" />, href: `https://wa.me/${whatsapp}`, label: "WhatsApp" },
  ];
  return (
    <div className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
      {items.map((i) => (
        <a key={i.label} href={i.href} title={i.label} aria-label={i.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition hover:bg-espresso hover:text-ivory">
          {i.icon}
        </a>
      ))}
    </div>
  );
}

export function CaneMobileActionBar({ phone = "+919800000000", whatsapp = "919800000000" }) {
  const { count, setOpen } = useCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-3 border-t bg-background md:hidden">
      <a href={`https://wa.me/${whatsapp}`} className="flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider"><IconWhatsApp />WhatsApp</a>
      <a href={`tel:${phone}`} className="flex flex-col items-center justify-center gap-1 border-x text-[10px] uppercase tracking-wider"><IconPhone />Call</a>
      <button onClick={() => setOpen(true)} className="flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider"><IconBag />Cart ({count})</button>
    </div>
  );
}
