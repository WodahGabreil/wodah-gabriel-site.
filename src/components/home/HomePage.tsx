import { Hero } from "../Hero";
import { StatsStrip } from "../StatsStrip";
import { PlatformBand } from "./PlatformBand";
import { WhyStrategy } from "./WhyStrategy";
import { FeaturedResult } from "./FeaturedResult";
import { ServicesPreview } from "./ServicesPreview";
import { ProcessPreview } from "./ProcessPreview";
import { WhoIWorkWith } from "./WhoIWorkWith";
import { HireStrip } from "./HireStrip";
import { Faq } from "./Faq";
import { HomeTestimonials } from "./HomeTestimonials";
import { FinalCta } from "./FinalCta";

/**
 * The Home page: the hero, then the story blocks, all inside one #home wrapper.
 * Copy for every block lives in src/content/home.ts.
 */
export function HomePage() {
  return (
    <div id="home">
      <Hero />
      <StatsStrip />
      <PlatformBand />
      <WhyStrategy />
      <FeaturedResult />
      <ServicesPreview />
      <ProcessPreview />
      <WhoIWorkWith />
      <HireStrip />
      <Faq />
      <HomeTestimonials />
      <FinalCta />
    </div>
  );
}
