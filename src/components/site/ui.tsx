import type { ReactNode } from "react";
import { useLocale, L } from "@/lib/locale-context";
import type { Picture } from "@/content/site";
import { Control } from "./Control";
import type { Localized } from "@/content/types";

export function Img({
  pic,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  eager = false,
  className = "",
}: {
  pic: Picture;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const { t } = useLocale();
  return (
    <img
      src={pic.src}
      {...(pic.srcSet ? { srcSet: pic.srcSet, sizes } : {})}
      width={pic.width}
      height={pic.height}
      alt={t(pic.alt)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      className={className}
    />
  );
}

export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow?: Localized;
  title: ReactNode;
  lead?: Localized;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const { t } = useLocale();
  return (
    <section className="glow-hero">
      <div
        className={`shell grid gap-10 pb-10 pt-12 md:pb-14 md:pt-16 ${aside ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center" : ""}`}
      >
        <div className="rise max-w-3xl">
          {eyebrow && <p className="eyebrow">{t(eyebrow)}</p>}
          <h1 className="display-1 mt-4">{title}</h1>
          {lead && <p className="lede mt-6 max-w-2xl">{t(lead)}</p>}
          {children}
        </div>
        {aside && <div className="rise rise-2">{aside}</div>}
      </div>
    </section>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; count?: number }[];
}) {
  return (
    <div className="seg seg-wrap" role="group" aria-label={label}>
      {options.map((o) => (
        <Control
          key={o.value}
          type="button"
          className="seg-item"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
          {o.count !== undefined && <span className="seg-count">{o.count}</span>}
        </Control>
      ))}
    </div>
  );
}

export function External({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { t } = useLocale();
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only">
        {t(L(" (opens in a new tab)", " (se abre en una pestaña nueva)"))}
      </span>
    </a>
  );
}
