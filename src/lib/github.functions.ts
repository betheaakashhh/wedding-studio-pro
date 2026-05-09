import { createServerFn } from "@tanstack/react-start";

const REPO = "betheaakashhh/release";

export type Asset = {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
};
export type Release = {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string | null;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
  assets: Asset[];
};

export type RepoStats = { stars: number; forks: number; open_issues: number };

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "wedding-studio-site",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export const getLatestRelease = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const releases = await gh<Release[]>(`/repos/${REPO}/releases?per_page=1`);
    return { release: releases[0] ?? null, error: null as string | null };
  } catch (e: any) {
    return { release: null, error: e.message ?? "Failed to fetch release" };
  }
});

export const getAllReleases = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const releases = await gh<Release[]>(`/repos/${REPO}/releases?per_page=50`);
    return { releases, error: null as string | null };
  } catch (e: any) {
    return { releases: [] as Release[], error: e.message ?? "Failed to fetch releases" };
  }
});

export const getRepoStats = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const repo = await gh<{ stargazers_count: number; forks_count: number; open_issues_count: number }>(`/repos/${REPO}`);
    return {
      stats: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        open_issues: repo.open_issues_count,
      } as RepoStats,
      error: null as string | null,
    };
  } catch (e: any) {
    return { stats: { stars: 0, forks: 0, open_issues: 0 } as RepoStats, error: e.message };
  }
});
