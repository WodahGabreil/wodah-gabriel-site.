import { isSet, site } from "../content/site";
import { Logo } from "./Icons";
import { sections } from "./Nav";

const link = "text-muted no-underline transition-colors hover:text-accent-text";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ground text-ink">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-display text-lg font-bold tracking-tight">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {site.title}. Platform-specific marketing and audience development for YouTube, TikTok, Twitch and Kick.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4 text-muted">Navigate</p>
          <ul className="space-y-2.5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={link}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow mb-4 text-muted">Work with me</p>
          <ul className="space-y-2.5 text-sm">
            <li>{isSet(site.links.upwork) ? <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className={link}>Upwork</a> : <span className="text-muted">Upwork (coming soon)</span>}</li>
            <li>{isSet(site.contact.email) ? <a href={`mailto:${site.contact.email}`} className={link}>{site.contact.email}</a> : <a href="#contact" className={link}>Send an inquiry</a>}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Results vary by platform, content and market. No growth outcome is guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}
