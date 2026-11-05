import type { PlatformId } from "../content/types";

/**
 * Lets a service button pre-select a platform in the contact form.
 * The form lives on another page, so the choice is held here until the form mounts.
 */
let pending: PlatformId | undefined;

export const startInquiry = (platform?: PlatformId) => {
  pending = platform;
};
export const peekInquiry = () => pending;
export const clearInquiry = () => {
  pending = undefined;
};
