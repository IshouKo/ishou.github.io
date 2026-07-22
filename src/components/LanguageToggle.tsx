"use client";

import { useAtom } from "jotai";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { localeAtom } from "@/state/atoms";

export function LanguageToggle() {
  const [locale, setLocale] = useAtom(localeAtom);
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="language-toggle"
      onClick={() => setLocale(locale === "ja" ? "en" : "ja")}
      aria-label="Switch language"
    >
      <Languages size={17} aria-hidden="true" />
      <span>{t("common.language")}</span>
    </button>
  );
}
