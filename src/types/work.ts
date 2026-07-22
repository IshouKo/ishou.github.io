export type Work = {
  id: string;
  year: string;
  title: string;
  titleJa: string;
  descriptionJa: string;
  descriptionEn: string;
  href: string;
  repository?: string;
  localImage?: string;
  resolvedImage: string;
  kind: "paper" | "github";
  tags: string[];
  github: {
    stars: number;
    forks: number;
    language: string | null;
    updatedAt: string;
  } | null;
};

export type GitHubStat = {
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
} | null;
