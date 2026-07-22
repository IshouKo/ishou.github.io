# Ishou Portfolio — Next.js Edition

A migration of the original single-file portfolio to a modern, statically deployable frontend while preserving the existing visual design.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- i18next / react-i18next
- Jotai
- SWR
- Octokit
- Build-time Works Preview generation

## Design policy

The visible page intentionally preserves the original structure:

- Fixed desktop sidebar
- Mobile drawer navigation
- Centered profile header
- Timeline sections
- Two-column project cards
- Article cards
- Original light color palette and spacing

The migration changes the implementation, not the visual identity.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Reuse the original images

This package includes fallback images so the project can run by itself.

For the original appearance, copy these files from the current portfolio repository to the **project root**:

```text
profile.jpg
EMARS.gif
ai_system.png
ai_expense.png
sns_project.png
```

`npm run dev` and `npm run build` automatically copy them into `public/`.

## Automatic Works Preview

`npm run generate:works-preview`:

1. Reads `content/works.json`
2. Uses Octokit to retrieve public GitHub repository metadata
3. Generates an SVG preview for every work
4. Resolves the original local image when it exists
5. Writes `src/generated/works-preview.json`
6. Writes `public/generated/github-stats.json`

SWR loads the generated GitHub metadata in the browser without requiring a server API route.

Set a token when you need higher GitHub API rate limits:

```bash
cp .env.example .env.local
```

```env
GITHUB_TOKEN=github_pat_xxx
```

Never commit the token.

## GitHub Pages

The project uses static export. The included workflow deploys the `out/` directory.

For the repository `IshouKo/ishou.github.io`, the workflow sets:

```env
NEXT_PUBLIC_BASE_PATH=/ishou.github.io
```

If the site is instead hosted at a root domain or Vercel, leave `NEXT_PUBLIC_BASE_PATH` empty.

## Content editing

- Profile, publications, experience, skills: `src/data/portfolio.ts`
- Project descriptions and repositories: `content/works.json`
- Japanese/English UI labels: `src/i18n/resources.ts`
- Exact visual styling: `src/app/globals.css`

## Important content correction

The Era SNS text describes the current implementation accurately: the SNS foundation and identity-verification prototype are implemented, while automatic Safe Zone assignment remains a future extension.
