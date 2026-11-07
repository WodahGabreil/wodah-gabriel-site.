import { useEffect, useRef } from "react";
import { Nav, sections } from "./components/Nav";
import { HomePage } from "./components/home/HomePage";
import { Services } from "./components/Services";
import { CaseStudies } from "./components/CaseStudies";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { useRoute } from "./hooks/useRoute";
import { site } from "./content/site";

export default function App() {
  const page = useRoute();
  const first = useRef(true);

  // On each page change: jump to the top, move focus to the content, update the tab title
  useEffect(() => {
    const label = sections.find((s) => s.id === page)?.label;
    document.title = page === "home" || !label ? `${site.name} | ${site.title}` : `${label} | ${site.name}`;
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [page]);

  return (
    <>
      <Nav page={page} />
      <main id="main" tabIndex={-1} className="bg-ground outline-none">
        <div key={page} className="page-enter bg-ground">
          {page === "home" && <HomePage />}
          {page === "services" && <Services />}
          {page === "case-studies" && <CaseStudies />}
          {page === "about" && <About />}
          {page === "contact" && <Contact />}
        </div>
      </main>
      <Footer />
    </>
  );
}
