import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CanePageHeader } from "@/components/cane/widgets";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Shipping, Returns & Care | Cane" },
      { name: "description", content: "Answers about delivery, returns, custom orders and caring for cane furniture." },
      { property: "og:title", content: "Frequently Asked Questions — Cane" },
      { property: "og:description", content: "Delivery, returns, custom orders and cane care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Faq,
});

const groups = [
  { title: "Orders & Shipping", items: [
    { q: "How long does delivery take?", a: "Most pieces ship across India in 7–12 working days. Made-to-order pieces take 3–4 weeks." },
    { q: "Is shipping free?", a: "Shipping is free on orders over ₹25,000. Below that, a flat ₹1,500 applies." },
    { q: "Do pieces arrive assembled?", a: "Yes — everything arrives fully assembled and blanket-wrapped." },
  ]},
  { title: "Returns & Warranty", items: [
    { q: "What is your return policy?", a: "Unused pieces can be returned within 7 days of delivery. Custom orders are non-returnable." },
    { q: "Is there a warranty?", a: "All frames carry a 1-year warranty against manufacturing defects." },
  ]},
  { title: "Care & Custom", items: [
    { q: "Can cane be used outdoors?", a: "Our outdoor range is weather-treated. Indoor pieces should stay in covered spaces, away from rain." },
    { q: "Do you make custom sizes?", a: "Yes. WhatsApp us your dimensions and we'll share a quote within a day." },
    { q: "How do I clean cane?", a: "Dust weekly with a soft brush and wipe monthly with a damp cloth. Dry in shade." },
  ]},
];

function Faq() {
  const [open, setOpen] = useState<string | null>(groups[0]!.items[0]!.q);
  return (
    <>
      <CanePageHeader eyebrow="Help" heading="Frequently asked" description="Can't find an answer? We're a WhatsApp away." />
      <section className="mx-auto max-w-3xl px-6 py-20">
        {groups.map((g) => (
          <div key={g.title} className="mb-14">
            <p className="eyebrow mb-4">{g.title}</p>
            <div className="border-t">
              {g.items.map((it) => {
                const isOpen = open === it.q;
                return (
                  <div key={it.q} className="border-b">
                    <button onClick={() => setOpen(isOpen ? null : it.q)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                      <span className="font-display text-xl">{it.q}</span>
                      <span className={`text-2xl transition ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {isOpen && <p className="animate-fade-up pb-6 text-muted-foreground">{it.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="bg-secondary p-10 text-center">
          <h2 className="text-3xl">Still have questions?</h2>
          <Link to="/contact" className="btn-base btn-primary mt-6">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
