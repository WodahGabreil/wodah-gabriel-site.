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
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-accent/10 text-accent-text">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs uppercase tracking-widest text-muted">{label}</span>
        <span className="mt-0.5 block truncate text-ink">{value}</span>
      </span>
      {href && <ArrowUpRight size={18} className="shrink-0 text-muted transition-colors group-hover:text-accent-text" />}
    </>
  );
  return href ? (
    <a href={href} className="group flex items-center gap-4 border-b border-line py-4 no-underline" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-4 border-b border-line py-4 opacity-70">{inner}</div>
  );
}

export function Contact() {
  const { email, whatsappNumber, whatsappDisplay, whatsappLink } = site.contact;
  return (
    <section id="contact" className="relative bg-ground py-24 text-ink sm:py-32">
      <div className="glow-top absolute inset-x-0 top-0 h-[28rem]" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-accent-text">05 · Contact &amp; project inquiries</p>
            <h2 className="text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">Let's Discuss Your Next Growth Project.</h2>
          </div>
          <p className="self-end text-[1.05rem] font-medium leading-relaxed text-muted lg:col-span-5">
            Whether you are developing a YouTube channel, improving your TikTok presence, promoting a Twitch
            stream, or building visibility on Kick, I would be interested in understanding your objectives and
            discussing how I can support your project.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className="eyebrow mb-2 text-muted">Direct contact</p>
            <div className="border-t border-line">
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
                href={isSet(whatsappLink) ? whatsappLink : isSet(whatsappNumber) ? `https://wa.me/${whatsappNumber}` : undefined}
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
        <Reveal className="mt-24 sm:mt-32">
          <div className="card relative overflow-hidden p-8 sm:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(40rem_22rem_at_90%_0%,rgb(61_107_255/0.35),transparent_65%)]" aria-hidden="true" />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-accent/25" aria-hidden="true" />
            <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-accent/25" aria-hidden="true" />
            <h3 className="relative max-w-3xl text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
              Your Next Stage of Digital Growth Starts With a Strategy.
            </h3>
            <p className="relative mt-5 max-w-xl text-[1.05rem] text-muted">
              Let's identify the opportunities, define the objectives, and build a marketing approach suited to your platform.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 600);
              }}
              className="btn btn-primary relative mt-9"
            >
              Discuss Your Project <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
