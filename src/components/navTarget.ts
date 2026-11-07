/**
 * Lets a link on one page land on a specific spot of another page:
 * scroll to an element id, or open a case study. Read once by the destination page.
 */
let scrollTo: string | undefined;
let openCase: string | undefined;

export const setNavTarget = (t: { scrollTo?: string; openCase?: string }) => {
  scrollTo = t.scrollTo;
  openCase = t.openCase;
};
export const takeScrollTarget = () => {
  const v = scrollTo;
  scrollTo = undefined;
  return v;
};
export const takeCaseTarget = () => {
  const v = openCase;
  openCase = undefined;
  return v;
};

/** Scroll to an element shortly after a page mounts (lets layout and reveals settle first). */
export const scrollToId = (id: string) =>
  window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
