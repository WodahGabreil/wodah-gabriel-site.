import { useEffect, useState } from "react";

export const pages = ["home", "services", "case-studies", "about", "contact"] as const;
export type PageId = (typeof pages)[number];

const read = (): PageId | null => {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h) return "home";
  return (pages as readonly string[]).includes(h) ? (h as PageId) : null;
};

/**
 * Hash-based page routing (#home, #services, #case-studies, #about, #contact).
 * Works on any static host with no server rewrites. Unknown hashes keep the current page.
 */
export function useRoute(): PageId {
  const [page, setPage] = useState<PageId>(() => read() ?? "home");
  useEffect(() => {
    const onHash = () => setPage((prev) => read() ?? prev);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return page;
}
