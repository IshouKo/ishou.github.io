"use client";

import Image from "next/image";
import { ExternalLink, Github, Mail, Network, Newspaper } from "lucide-react";
import { useSetAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  articles,
  awards,
  certifications,
  education,
  internships,
  patents,
  publications,
  researchExperience,
  skillGroups,
} from "@/data/portfolio";
import { activeSectionAtom, localeAtom } from "@/state/atoms";
import { withBasePath } from "@/lib/basePath";
import { Sidebar } from "./Sidebar";
import { TimelineSection } from "./TimelineSection";
import { WorksSection } from "./WorksSection";

const sectionIds = [
  "profile",
  "publications",
  "patents",
  "experience",
  "awards",
  "education",
  "skills",
  "projects",
  "articles",
];

export function PortfolioClient() {
  const setActiveSection = useSetAtom(activeSectionAtom);
  const locale = useAtomValue(localeAtom);
  const { t } = useTranslation();

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.01, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <>
      <Sidebar />
      <main className="main-content min-h-screen">
        <div className="container">
          <header id="profile">
            <Image
              src={withBasePath("/profile.jpg")}
              className="profile-img"
              alt="Ishou Ko"
              width={150}
              height={150}
              priority
              unoptimized
            />
            <h1>Ishou Ko</h1>
            <p className="profile-role">{t("profile.role")}</p>
            <div className="contact-links">
              <a href="https://aoki-medialab.jp" target="_blank" rel="noreferrer">
                <Network size={17} /> Aoki Lab
              </a>
              <a href="https://github.com/IshouKo" target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub
              </a>
              <a href="mailto:iko777412@gmail.com">
                <Mail size={17} /> Email
              </a>
              <a href="https://orcid.org/0009-0007-3787-8553" target="_blank" rel="noreferrer">
                <ExternalLink size={17} /> ORCID
              </a>
              <a href="https://www.linkedin.com/in/ishou/" target="_blank" rel="noreferrer">
                <ExternalLink size={17} /> LinkedIn
              </a>
            </div>
          </header>

          <section id="about">
            <div className="profile-info">
              <div className="bio">
                <p>{t("profile.bio")}</p>
              </div>
            </div>
          </section>

          <TimelineSection
            id="publications"
            title={t("section.publications")}
            items={publications}
          >
            <div className="subsection-label">Research submission experience</div>
            {researchExperience.map((item) => (
              <article className="timeline-item" key={item.title}>
                <span className="date">{item.date}</span>
                <div className="institution">{item.title}</div>
                <div className="description">{item.description}</div>
              </article>
            ))}
          </TimelineSection>

          <TimelineSection id="patents" title={t("section.patents")} items={patents} />
          <TimelineSection id="experience" title={t("section.internships")} items={internships} />
          <TimelineSection id="awards" title={t("section.awards")} items={awards} />
          <TimelineSection id="education" title={t("section.education")} items={education} />

          <section id="skills" className="timeline-section">
            <h2>{t("section.skills")}</h2>
            <div className="section-timeline">
              {skillGroups.map((group) => (
                <article className="timeline-item skill-item" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="tag-list">
                    {group.values.map((value) => (
                      <span className="tag" key={value}>
                        {value}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
              <article className="timeline-item skill-item">
                <h3>{locale === "ja" ? "資格" : "Certifications"}</h3>
                <ul className="certifications">
                  {certifications.map((certification) => (
                    <li key={certification}>{certification}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <WorksSection />

          <section id="articles">
            <h2>{t("section.articles")}</h2>
            <div className="article-grid">
              {articles.map((article) => (
                <article className="article-card" key={article.href}>
                  <span className="article-label">{article.label}</span>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <a
                    href={article.href}
                    className="article-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Newspaper size={17} />
                    noteで読む
                    <ExternalLink size={14} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <footer>
            <p>© 2026 IshouKo. All Rights Reserved.</p>
            <p className="footer-stack">
              Next.js 15 · React 19 · TypeScript · Tailwind CSS · i18next · Jotai · SWR · Octokit
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
