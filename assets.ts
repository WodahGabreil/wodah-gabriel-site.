/** Resolve a path inside /public so it works on any host or sub-path. */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
