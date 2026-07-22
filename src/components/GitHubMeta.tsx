"use client";

import useSWR from "swr";
import { GitFork, Star } from "lucide-react";
import type { GitHubStat } from "@/types/work";
import { withBasePath } from "@/lib/basePath";

type StatsMap = Record<string, GitHubStat>;

const fetcher = async (url: string): Promise<StatsMap> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to load GitHub metadata");
  return response.json() as Promise<StatsMap>;
};

export function GitHubMeta({ repository }: { repository: string }) {
  const { data } = useSWR<StatsMap>(
    withBasePath("/generated/github-stats.json"),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const stats = data?.[repository];
  if (!stats) return null;

  return (
    <div className="github-meta" aria-label={`${repository} GitHub statistics`}>
      {stats.language ? <span>{stats.language}</span> : null}
      <span>
        <Star size={14} aria-hidden="true" />
        {stats.stars}
      </span>
      <span>
        <GitFork size={14} aria-hidden="true" />
        {stats.forks}
      </span>
    </div>
  );
}
