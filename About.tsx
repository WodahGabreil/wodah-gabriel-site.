import { process, processIntro } from "../content/process";
import { site } from "../content/site";
import { ArrowRight, Compass, Gauge, Layers, Rocket, Search } from "./Icons";
import { Reveal } from "./Reveal";
import { FreelancePlatforms } from "./FreelancePlatforms";
import { scrollToId, takeScrollTarget } from "./navTarget";
import { useEffect } from "react";

const stepIcons = [Compass, Search, Layers, Rocket, Gauge];

function Portrait() {
  if (site.portrait) {
    return (
      <div className="relative">
        <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/20 blur-3xl" aria-hidden="true" />
        <img
          src={`${import.meta.env.BASE_URL}${site.portrait}`}
          alt={`Portrait of ${site.name}`}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-3xl border border-line-strong object-cover object-top"
        />
      </div>
    );
  }
  // Monogram card used until a professional portrait is supplied
  return (
    <div className="card relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden p-7 text-ink">
      <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
      <p className="eyebrow relative text-accent-text">Independent specialist</p>
      <div className="relative">
        <p className="font-display text-[6rem] font-bold leading-none tracking-tighter text-accent sm:text-[7.5rem]">WG</p>
        <p className="mt-4 font-display text-2xl font-bold">{site.name}</p>
        <p className="mt-1 text-sm text-muted">{site.title}</p>
      </div>
    </div>
  );
}

export function About() {
  // Arrive from a Home link: scroll to the working framework
  useEffect(() => {
    const t = takeScrollTarget();
    if (t) scrollToId(t);
  }, []);
  return (
    <div id="about">
      <section className="relative bg-ground py-24 sm:py-32">
        <div className="glow-top absolute inset-x-0 top-0 h-[28rem]" aria-hidden="true" />
        <div className="container-x relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow mb-5 text-accent-text">04 · About &amp; professional approach</p>
              <h2 className="text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
                Strategic Thinking Behind Every Growth Project.
              </h2>
              <div className="mt-9 max-w-2xl space-y-5 text-[1.05rem] font-medium leading-[1.8] text-muted">
                <p>
                  I'm {site.name}, an independent digital marketing and audience growth specialist working across
                  YouTube, TikTok, Twitch, and Kick.
                </p>
                <p>
                  My work focuses on helping creators, streamers, and businesses strengthen their digital presence
                  through platform-specific marketing, strategic promotion, and audience development.
                </p>
                <p>
                  I approach every project with an understanding that different platforms require different
                  strategies. Rather than applying the same promotional approach everywhere, I focus on the client's
                  objectives, existing position, target audience, and the opportunities available within their chosen
                  platform.
                </p>
                <p className="font-medium text-ink">
                  My priority is to provide professional marketing support, clear communication, and a structured
                  approach to every engagement.
                </p>
              </div>
              <a href="#contact" className="btn btn-primary mt-10">
                Start a conversation <ArrowRight size={18} />
              </a>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <div className="mx-auto max-w-sm lg:max-w-none">
                <Portrait />
              </div>
            </Reveal>
          </div>

          {/* Working framework */}
          <div id="framework" className="mt-28 scroll-mt-24 sm:mt-36">
            <Reveal>
              <p className="eyebrow mb-4 text-accent-text">Professional working framework</p>
              <h3 className="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.035em] text-ink sm:text-5xl">{processIntro.headline}</h3>
            </Reveal>

            <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {process.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <li key={step.number} className="h-full">
                    <Reveal delay={i * 70} className="h-full">
                      <div className="card card-hover h-full p-6">
                        <div className="flex items-center justify-between">
                          <span className="font-display text-4xl font-bold tracking-tight text-accent">{step.number}</span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent-text">
                            <Icon size={18} />
                          </span>
                        </div>
                        <h4 className="mt-8 text-xl font-bold leading-tight text-ink">{step.title}</h4>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <FreelancePlatforms />
    </div>
  );
}
