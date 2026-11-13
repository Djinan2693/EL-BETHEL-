/**
 * TickerBanner — the thin scrolling strip at the very top of every page.
 * Content comes from the admin panel (/admin → "Scrolling banner").
 * Hidden entirely when disabled or empty.
 */
import { Link } from "wouter";
import { siteContent, type TickerItem } from "@/lib/siteContent";

const DURATION = { slow: 60, normal: 38, fast: 22 } as const;

function Item({ item }: { item: TickerItem }) {
  const text = <span>{item.text}</span>;
  if (!item.link) return text;
  if (/^https?:\/\//i.test(item.link))
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline decoration-secondary/60 underline-offset-4 hover:text-secondary">
        {item.text}
      </a>
    );
  return (
    <Link href={item.link} className="underline decoration-secondary/60 underline-offset-4 hover:text-secondary">
      {item.text}
    </Link>
  );
}

export function TickerBanner() {
  const { enabled, items, speed } = siteContent.ticker;
  if (!enabled || items.length === 0) return null;

  // Repeat the list so the strip is always wider than the screen, then render
  // it twice: translating by -50% gives a seamless loop.
  const repeat = Math.max(1, Math.ceil(6 / items.length));
  const row = Array.from({ length: repeat }, () => items).flat();
  const seconds = DURATION[speed] * Math.max(1, (row.length * 1) / 6);

  const sequence = (hidden: boolean) => (
    <div className="ticker-seq flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {row.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6"><Item item={item} /></span>
          <span className="text-secondary text-[9px]" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="ticker relative bg-primary text-white/95 text-[13px] font-medium tracking-wide overflow-hidden border-b border-secondary/30"
      role="region"
      aria-label="Announcements"
    >
      <div className="ticker-track flex w-max py-2" style={{ animationDuration: `${seconds}s` }}>
        {sequence(false)}
        {sequence(true)}
      </div>
      {/* soft fade on the edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-primary to-transparent" />
    </div>
  );
}
