import { process, processIntro } from "../content/process";
import { site } from "../content/site";
import { ArrowRight, Compass, Gauge, Layers, Rocket, Search } from "./Icons";
import { Reveal } from "./Reveal";
import { FreelancePlatforms } from "./FreelancePlatforms";

const stepIcons = [Compass, Search, Layers, Rocket, Gauge];

function Portrait() {
  if (site.portrait) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${site.portrait}`}
        alt={`Portrait of ${site.name}`}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-3xl object-cover"
      />
    );
  }
  // Monogram card used until a professional portrait is supplied
  return (
    <div className="relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-3xl bg-midnight p-7 text-ivory">
      <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
      <p className="eyebrow relative text-lime">Independent specialist</p>
      <div className="relative">
        <p className="font-display text-[6rem] font-semibold leading-none tracking-tighter text-lime sm:text-[7.5rem]">WG</p>
        <p className="mt-4 font-display text-2xl font-semibold">{site.name}</p>
        <p className="mt-1 text-sm text-mist">{site.title}</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div id="about">
      <section className="on-light bg-ivory py-20 sm:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow mb-5 text-slate">04 · About &amp; professional approach</p>
              <h2 className="text-[2.2rem] font-semibold leading-[1.05] sm:text-5xl">
                Strategic Thinking Behind Every Growth Project.
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
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
                <p className="font-medium text-midnight">
                  My priority is to provide professional marketing support, clear communication, and a structured
                  approach to every engagement.
                </p>
              </div>
              <a href="#contact" className="btn btn-navy mt-9">
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
          <div className="mt-24 sm:mt-32">
            <Reveal>
              <p className="eyebrow mb-4 text-slate">Professional working framework</p>
              <h3 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{processIntro.headline}</h3>
            </Reveal>

            <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line-light bg-line-light md:grid-cols-2 lg:grid-cols-5">
              {process.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <li key={step.number} className="bg-ivory p-7 transition-colors hover:bg-white lg:p-6 xl:p-7">
                    <Reveal delay={i * 70}>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-4xl font-semibold tracking-tight text-midnight/25">
                          {step.number}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight text-lime">
                          <Icon size={18} />
                        </span>
                      </div>
                      <h4 className="mt-8 text-xl font-semibold leading-tight">{step.title}</h4>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{step.text}</p>
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
