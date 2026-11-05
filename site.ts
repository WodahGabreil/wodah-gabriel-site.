/**
 * SITE SETTINGS: the main place to edit contact details, links and the form.
 * Anything containing "REPLACE" is treated as "not supplied yet" and the
 * related button shows a "coming soon" state instead of a broken link.
 */
export const site = {
  name: "Wodah Gabriel",
  title: "Digital Marketing & Audience Growth Strategist",

  // Optional portrait. Put a photo in /public (e.g. public/portrait.jpg) and set "portrait.jpg".
  // Leave empty to show the monogram card instead.
  portrait: "portrait.jpg",

  links: {
    // Optional: add a Fiverr profile URL here and it appears in the "Hire me" strip. Leave empty to hide.
    fiverr: "",
    upwork: "https://www.upwork.com/freelancers/~018749afb4ba446076?mp_source=share",
  },

  contact: {
    email: "wodahtaye03@gmail.com",
    // Digits only, with country code, no "+" or spaces. Example: "2348012345678"
    whatsappNumber: "2348058573227",
    // How the number is shown on screen. Example: "+234 801 234 5678"
    whatsappDisplay: "+234 805 857 3227",
    // Direct WhatsApp chat link. When set, the WhatsApp button uses it instead of the number above.
    whatsappLink: "https://wa.me/message/JLUWT46BFEOVJ1",
  },

  /**
   * CONTACT FORM BACKEND
   * Paste a form endpoint URL here (Formspree, Web3Forms, Basin, Netlify, etc.).
   * The form POSTs JSON to it. See README for step-by-step setup.
   *
   * While this is empty the form still validates, but it does NOT claim to have
   * sent anything: it opens the visitor's email app with the message pre-filled.
   */
  formEndpoint: "",
  // Some providers need an access key sent with the data (e.g. Web3Forms). Leave empty otherwise.
  formAccessKey: "",
} as const;

export const isSet = (value: string | undefined): value is string =>
  Boolean(value) && !String(value).includes("REPLACE");
