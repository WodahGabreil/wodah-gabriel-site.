import { isSet, site } from "../content/site";
import { ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

interface Channel {
  key: "fiverr" | "upwork";
  name: string;
  intro: string;
  services: string;
  cta: string;
  url: string;
}

const channels: Channel[] = [
  {
    key: "fiverr",
    name: "Fiverr",
    intro:
      "My Fiverr profile is a straightforward way to review the services I offer and start a project with a clear scope.",
    services:
      "YouTube, TikTok, Twitch and Kick marketing, promotion and audience development services.",
    cta: "Explore My Fiverr Profile",
    url: site.links.fiverr,
  },
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
    <section aria-labelledby="platforms-heading" className="bg-navy py-20 text-ivory sm:py-24">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-lime">Freelance platform presence</p>
            <h3 id="platforms-heading" className="text-3xl font-semibold leading-tight sm:text-5xl">
              Available Through Established Freelance Platforms.
            </h3>
          </div>
          <p className="self-end text-mist lg:col-span-5">
            I work with clients through Fiverr and Upwork, providing accessible and structured ways to discuss
            projects, review services, and establish professional working relationships.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {channels.map((c, i) => {
            const live = isSet(c.url);
            return (
              <Reveal key={c.key} delay={i * 100}>
                <div className="flex h-full flex-col rounded-3xl border border-white/12 bg-midnight p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-3xl font-semibold tracking-tight">{c.name}</p>
                    <span className="eyebrow rounded-full border border-white/15 px-3 py-1.5 text-[0.62rem] text-mist">
                      Hiring channel
                    </span>
                  </div>
                  <p className="mt-6 text-ivory/90">{c.intro}</p>
                  <p className="mt-3 text-sm text-mist">{c.services}</p>
                  <div className="mt-auto pt-8">
                    {live ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn btn-lime">
                        {c.cta} <ArrowUpRight size={18} />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <>
                        <span className="btn btn-lime" role="link" aria-disabled="true">
                          {c.cta} <ArrowUpRight size={18} />
                        </span>
                        <p className="mt-3 text-xs text-mist">Profile link coming soon.</p>
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
