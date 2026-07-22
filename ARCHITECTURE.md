# Architecture

## Rendering

The portfolio uses the Next.js App Router and is statically exported. The visible layout remains a single scrolling page.

## State

Jotai stores:

- Current language
- Mobile sidebar open/closed state
- Active navigation section

## Internationalization

`i18next` and `react-i18next` provide Japanese and English resources. Japanese remains the default and intentionally retains bilingual content where the original page displayed both languages.

## Works data

`content/works.json` is the source of truth.

During `predev` and `prebuild`, `scripts/generateWorksPreviews.mjs`:

- Reads the work definitions
- Queries public repository metadata through Octokit
- Generates deterministic SVG preview images
- Selects the original local image when available
- Writes a typed JSON manifest for React
- Writes static GitHub stats for SWR

## Static SWR flow

```text
Octokit at build time
        |
        v
public/generated/github-stats.json
        |
        v
SWR in the browser
        |
        v
Project language / stars / forks
```

This avoids exposing a GitHub token and remains compatible with GitHub Pages.

## Styling

Tailwind CSS is installed and active through the v4 PostCSS integration. Exact legacy styling is retained in `src/app/globals.css` because pseudo-elements, the timeline, and the fixed sidebar need precise visual control.
