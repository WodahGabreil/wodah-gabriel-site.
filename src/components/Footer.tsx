import { isSet, site } from "../content/site";
import { Logo } from "./Icons";
import { sections } from "./Nav";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line-dark bg-midnight text-ivory">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-display text-lg font-semibold">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-mist">
            {site.title}. Platform-specific marketing and audience development for YouTube, TikTok, Twitch and Kick.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4 text-mist">Navigate</p>
          <ul className="space-y-2.5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ivory/85 no-underline hover:text-lime">{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow mb-4 text-mist">Work with me</p>
          <ul className="space-y-2.5 text-sm">
            <li>{isSet(site.links.fiverr) ? <a href={site.links.fiverr} target="_blank" rel="noopener noreferrer" className="text-ivory/85 no-underline hover:text-lime">Fiverr</a> : <span className="text-mist">Fiverr (coming soon)</span>}</li>
            <li>{isSet(site.links.upwork) ? <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="text-ivory/85 no-underline hover:text-lime">Upwork</a> : <span className="text-mist">Upwork (coming soon)</span>}</li>
            <li>{isSet(site.contact.email) ? <a href={`mailto:${site.contact.email}`} className="text-ivory/85 no-underline hover:text-lime">{site.contact.email}</a> : <a href="#contact" className="text-ivory/85 no-underline hover:text-lime">Send an inquiry</a>}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-mist sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Results vary by platform, content and market. No growth outcome is guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}
