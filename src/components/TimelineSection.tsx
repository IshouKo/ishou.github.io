import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import type { TimelineItem } from "@/data/portfolio";

type Props = {
  id: string;
  title: string;
  items: TimelineItem[];
  children?: ReactNode;
};

export function TimelineSection({ id, title, items, children }: Props) {
  return (
    <section id={id} className="timeline-section">
      <h2>{title}</h2>
      <div className="section-timeline">
        {items.map((item, index) => (
          <article className="timeline-item" key={`${item.title}-${index}`}>
            {item.date ? <span className="date">{item.date}</span> : null}
            <div className="institution">
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              ) : (
                item.title
              )}
            </div>
            {item.description ? <div className="description">{item.description}</div> : null}
          </article>
        ))}
        {children}
      </div>
    </section>
  );
}
