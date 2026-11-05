import { isSet, site } from "../content/site";
import { ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

interface Channel {
  key: "upwork";
  name: string;
  intro: string;
  services: string;
  cta: string;
  url: string;
}

const channels: Channel[] = [
  {
    key: "upwork",
    name: "Upwork",
    intro:
      "On Upwork I work with clients who prefer to share a project brief, discuss objectives and agree a working structure.",
    services:
      "Channel strategy, platform-specific promotion and audience growth planning for creators and businesses.",
    cta: "Connect With Me on Upwork",
    url: site.links.upwork,
  },
];

export function FreelancePlatforms() {
  return (
    <section aria-labelledby="platforms-heading" className="border-y border-line bg-surface py-24 text-ink sm:py-28">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-accent-text">Freelance platform presence</p>
            <h3 id="platforms-heading" className="text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl">
              Available Through Established Freelance Platforms.
            </h3>
          </div>
          <p className="self-end text-[1.05rem] font-medium leading-relaxed text-muted lg:col-span-5">
            I work with clients through Upwork, providing accessible and structured ways to discuss
            projects, review services, and establish professional working relationships.
          </p>
        </Reveal>

        <div className="mt-12 grid max-w-3xl gap-6">
          {channels.map((c, i) => {
            const live = isSet(c.url);
            return (
              <Reveal key={c.key} delay={i * 100}>
                <div className="card card-hover flex h-full flex-col p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-3xl font-bold tracking-tight">{c.name}</p>
                    <span className="eyebrow rounded-full border border-line-strong px-3 py-1.5 text-[0.62rem] text-muted">Hiring channel</span>
                  </div>
                  <p className="mt-6 text-ink">{c.intro}</p>
                  <p className="mt-3 text-sm text-muted">{c.services}</p>
                  <div className="mt-auto pt-8">
                    {live ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        {c.cta} <ArrowUpRight size={18} />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <>
                        <span className="btn btn-primary" role="link" aria-disabled="true">
                          {c.cta} <ArrowUpRight size={18} />
                        </span>
                        <p className="mt-3 text-xs text-muted">Profile link coming soon.</p>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
