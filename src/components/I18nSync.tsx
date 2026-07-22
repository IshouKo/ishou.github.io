"use client";

import { useAtomValue } from "jotai";
import { useEffect } from "react";
import i18n from "@/i18n/client";
import { localeAtom } from "@/state/atoms";

export function I18nSync() {
  const locale = useAtomValue(localeAtom);

  useEffect(() => {
    void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
