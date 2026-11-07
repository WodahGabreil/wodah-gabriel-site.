import { whyStrategy } from "../../content/home";
import type { WhyIcon } from "../../content/home";
import { Check, Compass, Layers, Search } from "../Icons";
import { Reveal } from "../Reveal";
import { HomeSection, SectionHead } from "./HomeSection";

const icons: Record<WhyIcon, typeof Check> = { compass: Compass, layers: Layers, search: Search, check: Check };

/** 2. Why strategy beats shortcuts: three or four short points, no guarantees. */
export function WhyStrategy() {
  return (
    <HomeSection tone="surface" labelledBy="home-why">
      <SectionHead id="home-why" eyebrow={whyStrategy.eyebrow} title={whyStrategy.headline} copy={whyStrategy.copy} />
      <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {whyStrategy.points.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <li key={p.title} className="h-full">
              <Reveal delay={i * 70} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-ground p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-text">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-3 text-[0.95rem] font-medium leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}
