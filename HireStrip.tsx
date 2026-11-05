import { hireStrip } from "../../content/home";
import { isSet, site } from "../../content/site";
import { ArrowUpRight } from "../Icons";
import { Reveal } from "../Reveal";
import { HomeSection, PageLink } from "./HomeSection";

/**
 * 7. Hire through trusted platforms. Shows only the profile links that are set in site.ts
 * (Upwork now; add `fiverr` there and it appears). With no links it shows nothing.
 */
export function HireStrip() {
  const links = [
    { name: "Fiverr", href: site.links.fiverr, cta: "Explore My Fiverr Profile" },
    { name: "Upwork", href: site.links.upwork, cta: "Connect With Me on Upwork" },
  ].filter((l) => isSet(l.href));
  if (!links.length) return null;

  return (
    <HomeSection labelledBy="home-hire">
      <Reveal>
        <div className="card flex flex-col items-start justify-between gap-8 p-7 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="eyebrow mb-3 text-accent-text">{hireStrip.eyebrow}</p>
            <h2 id="home-hire" className="text-[1.9rem] font-bold leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
              {hireStrip.headline}
            </h2>
            <p className="mt-3 text-[1rem] font-medium leading-relaxed text-muted">{hireStrip.copy}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {links.map((l) => (
              <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {l.cta} <ArrowUpRight size={18} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            <PageLink to="contact" className="btn btn-outline">
              {hireStrip.inquiry}
            </PageLink>
          </div>
        </div>
      </Reveal>
    </HomeSection>
  );
}
