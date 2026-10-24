# HackLog

A personal log for side projects and hackathon builds. Track what you built, what you used, which technical decisions you made (and why), and what you learned, all in your browser with no account and no backend.

## Features

- **Project dashboard**: a grid of project cards, newest activity first.
- **Status tracking**: every project is `Idea`, `Building`, `Shipped` or `Abandoned`. Filter the dashboard by status.
- **Tech stack and tags**: record the stack as a comma-separated list and add free-form tags. Click a tag to filter the dashboard by it.
- **Decision log**: for each project, record a decision, the alternatives you considered and your reasoning, so you can remember *why* later.
- **Lessons learned**: a free-text field for the post-mortem.
- **Links and dates**: attach labelled links (repo, demo, write-up) and a start date. An end date is available once a project is Shipped or Abandoned.
- **Local-first**: everything is stored in `localStorage` in your browser.

## Tech stack

| Area | Choice |
|---|---|
| UI | React 19 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Icons | lucide-react |
| Build tool | Vite 8 |
| Linting | ESLint 9 (react-hooks, react-refresh) |
| Hosting config | `vercel.json` (SPA rewrite to `index.html`) |

## Quick start

Requires Node.js 18+ (a current LTS is recommended).

```bash
git clone https://github.com/manojmallick/hacklog.git
cd hacklog
npm install
npm run dev
```

Vite prints the local URL (by default `http://localhost:5173`).

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Dashboard | List, filter by status/tag, open a project |
| `/projects/new` | Project form | Create a project |
| `/projects/:id` | Project detail | View details, add or remove decisions |
| `/projects/:id/edit` | Project form | Edit a project |

## Data model

Projects are saved as JSON under the `hacklog_projects` key in `localStorage`.

```jsonc
{
  "id": "uuid",
  "name": "My project",
  "description": "What it does",
  "status": "Building",          // Idea | Building | Shipped | Abandoned
  "stack": "React, Node, Postgres", // comma-separated
  "tags": ["hackathon", "ai"],
  "startDate": "2026-01-10",
  "endDate": "",                  // only used for Shipped/Abandoned
  "links": [{ "id": "uuid", "label": "Repo", "url": "https://..." }],
  "decisions": [
    { "id": "uuid", "decision": "...", "alternatives": "...", "reasoning": "..." }
  ],
  "lessonsLearned": "",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

> Because data lives in the browser, clearing site data or switching browsers/devices means starting from an empty log. There is no export yet (see the roadmap).

## Project structure

```
src/
├── main.jsx                  App entry
├── App.jsx                   Router and routes
├── pages/                    Dashboard, ProjectDetail, ProjectForm
├── components/
│   ├── ProjectCard.jsx       Card shown on the dashboard
│   ├── StatusFilter.jsx      Status tabs with counts
│   ├── decisions/            AddDecisionForm, DecisionEntry, DecisionList
│   └── ui/                   ConfirmDialog, StatusBadge, TagList
├── context/ProjectsContext.jsx   Shares project state across pages
├── hooks/useProjects.js      CRUD logic for projects and decisions
└── lib/
    ├── storage.js            localStorage load/save with error handling
    └── utils.js              Date formatting, ID and timestamp helpers
```

## Deployment

The repo includes a `vercel.json` that rewrites every path to `index.html`, which client-side routing needs. Any static host works as long as it serves `index.html` for unknown paths.

```bash
npm run build   # upload the dist/ folder
```

## Roadmap

- Export and import projects as JSON
- Search across projects and decisions
- Optional sync (for example a file or a small backend)
- Automated tests

## Author

[Manoj Mallick](https://github.com/manojmallick)
