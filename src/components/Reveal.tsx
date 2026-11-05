import type { ElementType, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

/** Fades/slides content in once when it scrolls into view. */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLElement>(0.12);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
