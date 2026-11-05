import { isSet, site } from "../content/site";
import { ArrowRight, ArrowUpRight, Mail, WhatsApp } from "./Icons";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

function Row({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-lime">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs uppercase tracking-widest text-mist">{label}</span>
        <span className="mt-0.5 block truncate text-ivory">{value}</span>
      </span>
      {href && <ArrowUpRight size={18} className="shrink-0 text-mist group-hover:text-lime" />}
    </>
  );
  return href ? (
    <a href={href} className="group flex items-center gap-4 border-b border-line-dark py-4 no-underline" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-4 border-b border-line-dark py-4 opacity-60">{inner}</div>
  );
}

export function Contact() {
  const { email, whatsappNumber, whatsappDisplay } = site.contact;
  return (
    <section id="contact" className="bg-midnight py-20 text-ivory sm:py-28">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-lime">05 · Contact &amp; project inquiries</p>
            <h2 className="text-[2.2rem] font-semibold leading-[1.05] sm:text-5xl">Let's Discuss Your Next Growth Project.</h2>
          </div>
          <p className="self-end text-mist lg:col-span-5">
            Whether you are developing a YouTube channel, improving your TikTok presence, promoting a Twitch
            stream, or building visibility on Kick, I would be interested in understanding your objectives and
            discussing how I can support your project.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <p className="eyebrow mb-2 text-mist">Direct contact</p>
            <div className="border-t border-line-dark">
              <Row
                icon={<Mail size={18} />}
                label="Professional email"
                value={isSet(email) ? email : "Email coming soon"}
                href={isSet(email) ? `mailto:${email}` : undefined}
              />
              <Row
                icon={<WhatsApp size={18} />}
                label="WhatsApp"
                value={isSet(whatsappNumber) ? whatsappDisplay : "WhatsApp coming soon"}
                href={isSet(whatsappNumber) ? `https://wa.me/${whatsappNumber}` : undefined}
              />
              <Row
                icon={<span className="font-display text-sm font-bold">Fi</span>}
                label="Fiverr"
                value={isSet(site.links.fiverr) ? "View my Fiverr profile" : "Profile link coming soon"}
                href={isSet(site.links.fiverr) ? site.links.fiverr : undefined}
              />
              <Row
                icon={<span className="font-display text-sm font-bold">Up</span>}
                label="Upwork"
                value={isSet(site.links.upwork) ? "View my Upwork profile" : "Profile link coming soon"}
                href={isSet(site.links.upwork) ? site.links.upwork : undefined}
              />
            </div>
          </Reveal>
        </div>

        {/* Final CTA */}
        <Reveal className="mt-20 sm:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-lime p-8 text-midnight sm:p-14">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-midnight/15" aria-hidden="true" />
            <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-midnight/15" aria-hidden="true" />
            <h3 className="relative max-w-3xl text-[1.9rem] font-semibold leading-[1.08] sm:text-5xl">
              Your Next Stage of Digital Growth Starts With a Strategy.
            </h3>
            <p className="relative mt-5 max-w-xl text-midnight/80">
              Let's identify the opportunities, define the objectives, and build a marketing approach suited to your platform.
            </p>
            <a
              href="#inquiry-form"
              onClick={() => setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 600)}
              className="btn btn-navy relative mt-8"
            >
              Discuss Your Project <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
