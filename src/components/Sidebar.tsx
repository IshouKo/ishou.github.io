"use client";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FileText,
  FolderKanban,
  GraduationCap,
  Layers3,
  Lightbulb,
  Menu,
  Newspaper,
  UserRound,
  X,
} from "lucide-react";
import { useAtom, useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { activeSectionAtom, sidebarOpenAtom } from "@/state/atoms";
import { LanguageToggle } from "./LanguageToggle";

const navigation = [
  { id: "profile", label: "navigation.profile", icon: UserRound },
  { id: "publications", label: "navigation.publications", icon: BookOpen },
  { id: "patents", label: "navigation.patents", icon: Lightbulb },
  { id: "experience", label: "navigation.internships", icon: BriefcaseBusiness },
  { id: "awards", label: "navigation.awards", icon: Award },
  { id: "education", label: "navigation.education", icon: GraduationCap },
  { id: "skills", label: "navigation.skills", icon: Code2 },
  { id: "projects", label: "navigation.projects", icon: FolderKanban },
  { id: "articles", label: "navigation.articles", icon: Newspaper },
];

export function Sidebar() {
  const activeSection = useAtomValue(activeSectionAtom);
  const [open, setOpen] = useAtom(sidebarOpenAtom);
  const { t } = useTranslation();

  const closeOnMobile = () => {
    if (window.innerWidth <= 768) setOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={open ? t("common.menuClose") : t("common.menuOpen")}
        aria-controls="sidebar"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div
        className={`sidebar-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside id="sidebar" className={`sidebar ${open ? "is-open" : ""}`} aria-label="Portfolio navigation">
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">
            <Layers3 size={20} />
          </span>
          <span>Ishou Portfolio</span>
        </div>

        <nav className="sidebar-nav">
          {navigation.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              onClick={closeOnMobile}
            >
              <Icon size={19} aria-hidden="true" />
              <span>{t(label)}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <LanguageToggle />
          <div className="stack-note">
            <FileText size={15} />
            <span>Next.js 15 · React 19</span>
          </div>
        </div>
      </aside>
    </>
  );
}
