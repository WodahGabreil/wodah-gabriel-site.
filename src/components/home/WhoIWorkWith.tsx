import { whoIWorkWith } from "../../content/home";
import type { WhoIcon } from "../../content/home";
import { Briefcase, Camera, Radio, Tag } from "../Icons";
import { Reveal } from "../Reveal";
import { HomeSection, SectionHead } from "./HomeSection";

const icons: Record<WhoIcon, typeof Camera> = { camera: Camera, radio: Radio, briefcase: Briefcase, tag: Tag };

/** 6. Who I work with: four short audience cards. */
export function WhoIWorkWith() {
  return (
    <HomeSection tone="surface" labelledBy="home-who">
      <SectionHead id="home-who" eyebrow={whoIWorkWith.eyebrow} title={whoIWorkWith.headline} />
      <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {whoIWorkWith.items.map((it, i) => {
          const Icon = icons[it.icon];
          return (
            <li key={it.title} className="h-full">
              <Reveal delay={i * 70} className="h-full">
                <div className="card card-hover h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-strong bg-ground text-accent-text">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-ink">{it.title}</h3>
                  <p className="mt-2 text-[0.95rem] font-medium leading-relaxed text-muted">{it.line}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}
