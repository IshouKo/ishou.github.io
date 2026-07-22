import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { I18nSync } from "@/components/I18nSync";

export const metadata: Metadata = {
  title: "Ishou Ko | AI & Computer Vision Portfolio",
  description:
    "Portfolio of Ishou Ko, a computer vision researcher and AI engineer at Keio University.",
  openGraph: {
    title: "Ishou Ko | AI & Computer Vision Portfolio",
    description:
      "Computer vision research, publications, patents, internships, and AI system projects.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <I18nSync />
        {children}
      </body>
    </html>
  );
}
