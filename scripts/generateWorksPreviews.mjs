import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { Octokit } from "octokit";

const root = process.cwd();
const worksPath = path.join(root, "content", "works.json");
const publicGenerated = path.join(root, "public", "generated");
const srcGenerated = path.join(root, "src", "generated");

await mkdir(publicGenerated, { recursive: true });
await mkdir(srcGenerated, { recursive: true });

const works = JSON.parse(await readFile(worksPath, "utf8"));
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN || undefined });

const escapeXml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const wrap = (text, max = 52) => {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
};

const generatedWorks = [];
const githubStats = {};

for (const work of works) {
  let repoData = null;

  if (work.repository) {
    const [owner, repo] = work.repository.split("/");
    try {
      const response = await octokit.rest.repos.get({ owner, repo });
      repoData = response.data;
      githubStats[work.repository] = {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        language: repoData.language,
        updatedAt: repoData.updated_at,
        url: repoData.html_url,
      };
    } catch (error) {
      console.warn(`[preview] GitHub metadata unavailable for ${work.repository}: ${error.message}`);
      githubStats[work.repository] = null;
    }
  }

  const description = repoData?.description || work.descriptionEn;
  const previewFile = `${work.id}.svg`;
  const descriptionLines = wrap(description, 58);
  const titleLines = wrap(work.title, 42);

  const titleSvg = titleLines
    .map((line, index) => `<text x="54" y="${104 + index * 38}" font-size="29" font-weight="700" fill="#172033">${escapeXml(line)}</text>`)
    .join("\n");
  const descriptionStart = 104 + titleLines.length * 38 + 24;
  const descriptionSvg = descriptionLines
    .map((line, index) => `<text x="54" y="${descriptionStart + index * 27}" font-size="18" fill="#526071">${escapeXml(line)}</text>`)
    .join("\n");

  const meta = repoData
    ? `${repoData.language || "Code"}  •  ★ ${repoData.stargazers_count}  •  ${work.repository}`
    : work.tags.join("  •  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f8fbff"/>
      <stop offset="1" stop-color="#eaf3ff"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" x2="1">
      <stop offset="0" stop-color="#3498db"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" rx="28" fill="url(#bg)"/>
  <rect x="0" y="0" width="18" height="675" fill="url(#accent)"/>
  <circle cx="1080" cy="110" r="150" fill="#d9eaff" opacity=".65"/>
  <circle cx="1120" cy="620" r="205" fill="#cfe3ff" opacity=".45"/>
  <rect x="54" y="43" width="112" height="36" rx="18" fill="#dcecff"/>
  <text x="110" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#2563eb">${escapeXml(work.year)}</text>
  <g font-family="Arial, 'Hiragino Sans', sans-serif">${titleSvg}${descriptionSvg}</g>
  <rect x="54" y="552" width="1092" height="72" rx="16" fill="#ffffff" opacity=".88"/>
  <text x="82" y="596" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#445064">${escapeXml(meta)}</text>
</svg>`;

  await writeFile(path.join(publicGenerated, previewFile), svg, "utf8");

  let resolvedImage = `/generated/${previewFile}`;
  if (work.localImage) {
    try {
      await access(path.join(root, "public", work.localImage));
      resolvedImage = `/${work.localImage}`;
    } catch {
      // Generated SVG remains the fallback.
    }
  }

  generatedWorks.push({
    ...work,
    resolvedImage,
    github: repoData
      ? {
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          language: repoData.language,
          updatedAt: repoData.updated_at,
        }
      : null,
  });
}

await writeFile(
  path.join(srcGenerated, "works-preview.json"),
  JSON.stringify(generatedWorks, null, 2),
  "utf8",
);
await writeFile(
  path.join(publicGenerated, "github-stats.json"),
  JSON.stringify(githubStats, null, 2),
  "utf8",
);

console.log(`[preview] generated ${generatedWorks.length} work previews`);
