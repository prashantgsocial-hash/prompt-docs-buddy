import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CanePageHeader } from "@/components/cane/widgets";
import { IconPhone, IconPin, IconWhatsApp } from "@/components/cane/icons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Cane" },
      { name: "description", content: "Call, WhatsApp or write to Cane for orders, custom pieces and free design consultations." },
      { property: "og:title", content: "Contact Cane" },
      { property: "og:description", content: "Orders, custom pieces and free design consultations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full border-b border-border bg-transparent py-3 text-sm focus:border-foreground focus:outline-none";
  return (
    <>
      <CanePageHeader eyebrow="Get in touch" heading="Contact Us" description="Questions, custom sizes or a whole-home project — we'd love to hear from you." />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-5">
        <div className="space-y-8 md:col-span-2">
          {[
            { icon: <IconWhatsApp />, title: "WhatsApp", text: "+91 98000 00000", href: "https://wa.me/919800000000" },
            { icon: <IconPhone />, title: "Call", text: "+91 98000 00000 · Mon–Sat, 10am–7pm", href: "tel:+919800000000" },
            { icon: <IconPin />, title: "Workshop", text: "Alleppey, Kerala, India", href: "#" },
          ].map((c) => (
            <a key={c.title} href={c.href} className="flex gap-5 border-t pt-6">
              <span className="text-clay">{c.icon}</span>
              <div><h3 className="text-2xl">{c.title}</h3><p className="mt-1 text-sm text-muted-foreground">{c.text}</p></div>
            </a>
          ))}
        </div>
        <div className="md:col-span-3">
          {sent ? (
            <div className="bg-secondary p-12 text-center">
              <h2 className="text-4xl">Thank you.</h2>
              <p className="mt-4 text-muted-foreground">We'll get back to you within one working day.</p>
            </div>
          ) : (
            <form className="grid gap-6 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input required placeholder="Name" className={field} />
              <input required type="email" placeholder="Email" className={field} />
              <input placeholder="Phone" className={field} />
              <select className={field} defaultValue="General enquiry">
                <option>General enquiry</option><option>Order support</option><option>Custom piece</option><option>Design consultation</option>
              </select>
              <textarea required rows={5} placeholder="Message" className={`${field} sm:col-span-2`} />
              <button className="btn-base btn-primary sm:col-span-2 sm:justify-self-start">Send Message</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
