import { testimonials } from "../../content/testimonials";
import { Reveal } from "../Reveal";
import { HomeSection } from "./HomeSection";

/** 9. Testimonials. Renders nothing at all until src/content/testimonials.ts has real entries. */
export function HomeTestimonials() {
  if (testimonials.length === 0) return null;
  return (
    <HomeSection labelledBy="home-testimonials">
      <Reveal>
        <p className="eyebrow mb-4 text-accent-text">Client feedback</p>
        <h2 id="home-testimonials" className="text-[2.2rem] font-bold leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl">
          In Their Own Words.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name + t.quote} delay={i * 80} className="h-full">
            <figure className="card h-full p-8">
              <blockquote className="font-display text-xl font-semibold leading-snug text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-ink">{t.name}</span>
                {t.role ? ` · ${t.role}` : ""}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </HomeSection>
  );
}
