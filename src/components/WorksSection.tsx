"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import generatedWorks from "@/generated/works-preview.json";
import { localeAtom } from "@/state/atoms";
import type { Work } from "@/types/work";
import { withBasePath } from "@/lib/basePath";
import { GitHubMeta } from "./GitHubMeta";

const works = generatedWorks as Work[];

export function WorksSection() {
  const locale = useAtomValue(localeAtom);
  const { t } = useTranslation();
  const years = [...new Set(works.map((work) => work.year))].sort((a, b) => Number(b) - Number(a));

  return (
    <section id="projects">
      <h2>{t("section.projects")}</h2>

      {years.map((year) => (
        <div key={year}>
          <div className="year-header">{year}</div>
          {works
            .filter((work) => work.year === year)
            .map((work) => (
              <article className="project-card" key={work.id}>
                <a
                  className="project-image"
                  href={work.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${work.title} preview`}
                >
                  <Image
                    src={withBasePath(work.resolvedImage)}
                    alt={`${work.title} preview`}
                    width={1200}
                    height={675}
                    sizes="(max-width: 980px) 100vw, 50vw"
                    unoptimized
                  />
                </a>
                <div className="project-content">
                  <div className="project-title">{locale === "ja" ? work.titleJa : work.title}</div>
                  <p className="project-text">
                    {locale === "ja" ? work.descriptionJa : work.descriptionEn}
                  </p>
                  <div className="project-tags">
                    {work.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {work.repository ? <GitHubMeta repository={work.repository} /> : null}
                  <a href={work.href} className="read-more" target="_blank" rel="noreferrer">
                    {t("common.readMore")}
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
        </div>
      ))}
    </section>
  );
}
