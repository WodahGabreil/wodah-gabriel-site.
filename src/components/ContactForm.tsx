import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { isSet, site } from "../content/site";
import { services } from "../content/services";
import { ArrowRight, Check } from "./Icons";
import { clearInquiry, peekInquiry } from "./inquiry";

type Values = {
  name: string;
  business: string;
  email: string;
  platform: string;
  service: string;
  objectives: string;
  additional: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "mailto" | "error" | "unconfigured";

const empty: Values = { name: "", business: "", email: "", platform: "", service: "", objectives: "", additional: "" };

const platformOptions = [
  ...services.map((s) => ({ value: s.id as string, label: s.label })),
  { value: "multiple", label: "More than one platform" },
  { value: "unsure", label: "Not sure yet" },
];

const serviceOptions = [
  "Channel or account audit",
  "Promotion and visibility",
  "SEO and discoverability",
  "Audience development strategy",
  "Profile or channel optimization",
  "Competitor and niche research",
  "Long-term growth planning",
  "Not sure yet, I'd like advice",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (v.business.trim().length < 2) e.business = "Please enter your business or channel name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!emailPattern.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.platform) e.platform = "Please choose a platform.";
  if (!v.service) e.service = "Please choose a service.";
  if (v.objectives.trim().length < 10) e.objectives = "Please describe your objectives (at least a sentence).";
  return e;
}

const order: (keyof Values)[] = ["name", "business", "email", "platform", "service", "objectives", "additional"];

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select the platform when a service CTA was clicked on the Services page
  useEffect(() => {
    const platform = peekInquiry();
    if (platform) setValues((v) => ({ ...v, platform }));
    return () => clearInquiry();
  }, []);

  const set = (k: keyof Values, val: string) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (touched[k]) setErrors((er) => ({ ...er, [k]: validate({ ...values, [k]: val })[k] }));
  };
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((er) => ({ ...er, [k]: validate(values)[k] }));
  };

  const summary = () =>
    [
      `Name: ${values.name}`,
      `Business / channel: ${values.business}`,
      `Email: ${values.email}`,
      `Platform: ${platformOptions.find((p) => p.value === values.platform)?.label ?? values.platform}`,
      `Service: ${values.service}`,
      "",
      "Project objectives:",
      values.objectives,
      "",
      "Additional information:",
      values.additional || "(none)",
    ].join("\n");

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    const firstBad = order.find((k) => found[k]);
    if (firstBad) {
      setStatus("idle");
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    // Honeypot: real visitors leave this empty
    const trap = formRef.current?.querySelector<HTMLInputElement>('input[name="website"]');
    if (trap?.value) {
      setStatus("sent");
      return;
    }

    if (isSet(site.formEndpoint)) {
      setStatus("sending");
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...values,
            ...(site.formAccessKey ? { access_key: site.formAccessKey } : {}),
            subject: `New project inquiry from ${values.name}`,
            _replyto: values.email,
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        setValues(empty);
        setTouched({});
      } catch {
        setStatus("error");
      }
      return;
    }

    if (isSet(site.contact.email)) {
      const subject = encodeURIComponent(`Project inquiry: ${values.business}`);
      const body = encodeURIComponent(summary());
      window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }
    setStatus("unconfigured");
  }

  const field = (k: keyof Values) => ({
    id: `f-${k}`,
    name: k,
    value: values[k],
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
    onBlur: () => blur(k),
  });

  const input =
    "mt-2 block w-full rounded-xl border bg-ground px-4 py-3.5 text-[1rem] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 [color-scheme:dark]";
  const cls = (k: keyof Values) => `${input} ${errors[k] ? "border-error" : "border-line-strong"}`;
  const Err = ({ k }: { k: keyof Values }) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-sm font-medium text-error">
        {errors[k]}
      </p>
    ) : null;
  const label = "block text-sm font-semibold text-ink";

  if (status === "sent") {
    return (
      <div role="status" className="card p-8 text-ink sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-text">
          <Check />
        </span>
        <h3 className="mt-6 text-2xl font-semibold">Thank you, your inquiry has been sent.</h3>
        <p className="mt-3 text-muted">
          I'll review your objectives and reply by email. If you don't hear back soon, check your spam folder or
          contact me directly using the options beside this form.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline mt-7">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      id="inquiry-form"
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="card relative p-6 text-ink sm:p-9 [color-scheme:dark]"
      aria-label="Project inquiry form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>Full name</label>
          <input {...field("name")} type="text" autoComplete="name" required className={cls("name")} onChange={(e) => set("name", e.target.value)} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="f-business" className={label}>Business or channel name</label>
          <input {...field("business")} type="text" autoComplete="organization" required className={cls("business")} onChange={(e) => set("business", e.target.value)} />
          <Err k="business" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-email" className={label}>Email address</label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" required placeholder="you@example.com" className={cls("email")} onChange={(e) => set("email", e.target.value)} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor="f-platform" className={label}>Platform of interest</label>
          <select {...field("platform")} required className={cls("platform")} onChange={(e) => set("platform", e.target.value)}>
            <option value="">Select a platform</option>
            {platformOptions.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <Err k="platform" />
        </div>
        <div>
          <label htmlFor="f-service" className={label}>Required marketing service</label>
          <select {...field("service")} required className={cls("service")} onChange={(e) => set("service", e.target.value)}>
            <option value="">Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <Err k="service" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-objectives" className={label}>Project objectives</label>
          <textarea {...field("objectives")} rows={4} required placeholder="What would you like this project to achieve?" className={cls("objectives")} onChange={(e) => set("objectives", e.target.value)} />
          <Err k="objectives" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-additional" className={label}>
            Additional information <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea {...field("additional")} rows={3} placeholder="Links to your channel, timelines, or anything else I should know." className={cls("additional")} onChange={(e) => set("additional", e.target.value)} />
        </div>
      </div>

      {/* Honeypot field for basic bot filtering: hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary sm:min-w-[14rem]">
          {status === "sending" ? "Sending…" : (<>Send Inquiry <ArrowRight size={18} /></>)}
        </button>
        <p className="text-xs text-muted">Your details are used only to reply to your inquiry.</p>
      </div>

      <div aria-live="polite" className="mt-5 empty:hidden">
        {status === "mailto" && (
          <p className="rounded-xl border border-line-strong bg-surface-2 p-4 text-sm text-ink">
            Your email app should now open with your message ready to send. If nothing opens, please email{" "}
            <a className="font-semibold text-accent-text underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> directly.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl border border-error/50 bg-error/10 p-4 text-sm font-medium text-error">
            Sorry, your message could not be sent. Please try again, or contact me through one of the direct options.
          </p>
        )}
        {status === "unconfigured" && (
          <p className="rounded-xl border border-line-strong bg-surface-2 p-4 text-sm font-medium text-ink">
            This form is not connected yet. Please reach out through Upwork for now.
          </p>
        )}
        {Object.values(errors).some(Boolean) && status === "idle" && (
          <p className="text-sm font-medium text-error">Please fix the highlighted fields and try again.</p>
        )}
      </div>
    </form>
  );
}
