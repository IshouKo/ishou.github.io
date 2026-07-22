import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Locale = "ja" | "en";

export const localeAtom = atomWithStorage<Locale>("portfolio-locale", "ja");
export const sidebarOpenAtom = atom(false);
export const activeSectionAtom = atom("profile");
