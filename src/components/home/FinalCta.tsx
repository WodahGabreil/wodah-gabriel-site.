import { finalCta } from "../../content/home";
import { ArrowRight } from "../Icons";
import { Reveal } from "../Reveal";
import { PageLink } from "./HomeSection";

/** 10. Bold closing band that leads to Contact. */
export function FinalCta() {
  return (
    <section aria-labelledby="home-cta" className="relative isolate overflow-hidden border-t border-line bg-ground py-24 sm:py-32">
      <div className="hero-mesh absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-accent/25" aria-hidden="true" />
      <div className="absolute -right-10 -top-10 -z-10 h-52 w-52 rounded-full border border-accent/25" aria-hidden="true" />
      <div className="container-x">
        <Reveal>
          <h2 id="home-cta" className="max-w-4xl text-[2.4rem] font-bold leading-[1.0] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            {finalCta.headline}
          </h2>
          <p className="mt-6 max-w-xl text-[1.08rem] font-medium leading-relaxed text-muted">{finalCta.copy}</p>
          <PageLink to="contact" className="btn btn-primary mt-10">
            {finalCta.cta} <ArrowRight size={18} />
          </PageLink>
        </Reveal>
      </div>
    </section>
  );
}
