import { createFileRoute } from "@tanstack/react-router";
import craft from "@/assets/craft.jpg";
import story from "@/assets/story.jpg";
import { products } from "@/lib/products";
import { IconHand, IconLeaf, IconWind } from "@/components/cane/icons";
import { CaneBenefits, CaneContactCTA, CaneCraftsmanship, CaneEditorialStatement, CanePageHeader } from "@/components/cane/widgets";

export const Route = createFileRoute("/craft")({
  head: () => ({
    meta: [
      { title: "Our Craft — Handwoven in Kerala | Cane" },
      { name: "description", content: "How our Kerala artisans hand-weave every Cane piece, from sourcing rattan to the final finish." },
      { property: "og:title", content: "Our Craft — Cane" },
      { property: "og:description", content: "Forty hours of hands in every chair." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Craft,
});

const steps = [
  { n: "01", t: "Sourcing", d: "Rattan from managed forests and teak from certified plantations." },
  { n: "02", t: "Framing", d: "Solid teak frames are cut, joined and sanded by hand." },
  { n: "03", t: "Weaving", d: "Soaked cane is woven strand by strand — up to forty hours per chair." },
  { n: "04", t: "Finishing", d: "Natural lacquer and humidity treatment for Indian climates." },
];

function Craft() {
  return (
    <>
      <CanePageHeader eyebrow="Our Craft" heading="Made slowly, by hand." description="Inside the Kerala workshop where every Cane piece begins." image={craft} />
      <CaneEditorialStatement
        eyebrow="Since 2012"
        heading="Three generations of weavers."
        description="Our artisans learned from their parents and now teach their children. Every purchase keeps a living craft — and a community — thriving."
        image={story}
        button={{ label: "Shop the Collection", href: "/shop" }}
      />
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="eyebrow mb-3">The Process</p>
          <h2 className="mb-12 text-4xl md:text-5xl">From strand to heirloom</h2>
          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-foreground/20 pt-6">
                <p className="font-display text-4xl italic text-clay">{s.n}</p>
                <h3 className="mt-3 text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CaneCraftsmanship
        mainImage={craft}
        secondaryImage={products[1]!.image}
        heading="Forty hours of hands in every chair."
        description="Nothing is rushed, and nothing leaves until it's right."
        features={[
          { icon: <IconLeaf />, title: "Responsibly Sourced", text: "Rattan from managed forests, teak from certified plantations." },
          { icon: <IconHand />, title: "Hand-Woven", text: "Every weave is done by hand — no machines, no shortcuts." },
          { icon: <IconWind />, title: "Built for India", text: "Treated to resist humidity, monsoons and daily life." },
        ]}
      />
      <CaneBenefits items={[
        { number: "40+", heading: "ARTISANS", description: "Weavers and woodworkers in our workshop." },
        { number: "40h", heading: "PER CHAIR", description: "Of hand-weaving in a lounge chair." },
        { number: "14", heading: "YEARS", description: "Of making furniture since 2012." },
        { number: "1", heading: "YEAR WARRANTY", description: "On every frame we make." },
      ]} />
      <CaneContactCTA image={story} heading="Want something made just for you?" description="We take custom sizes and finishes for homes and hospitality." button={{ label: "Contact Us", href: "/contact" }} whatsapp="919800000000" />
    </>
  );
}
