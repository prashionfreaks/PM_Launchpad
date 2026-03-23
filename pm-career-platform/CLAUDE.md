# CLAUDE.md - PM Launchpad

## Project Overview

PM Launchpad is a React web application for aspiring Product Managers. It provides career path guidance, skill evaluation, a gamified learning roadmap, hands-on labs, mock video interviews, job discovery, and a shareable portfolio — all in a single platform.

## Tech Stack

- **Framework:** React 19 + React Router v7 (BrowserRouter)
- **Build:** Vite 8 (dev server on port 5173)
- **Icons:** Lucide React
- **Charts:** Recharts (RadarChart, BarChart)
- **State:** React Context API + useReducer, persisted to localStorage (`pm-platform-state`)
- **PDF Parsing:** pdf.js loaded from CDN at runtime
- **Voice/Video:** Web Speech API (recognition + synthesis), getUserMedia for webcam

## Project Structure

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Routes + AppProvider wrapper
├── App.css                   # Minimal app-level styles
├── index.css                 # All component/page styles (single CSS file)
├── context/
│   └── AppContext.jsx        # Global state: useReducer + localStorage persistence
├── components/
│   └── Layout.jsx            # Sidebar nav, XP bar, level system, mobile menu
├── pages/
│   ├── Register.jsx          # 3-step onboarding (name, role, PM goal)
│   ├── Profile.jsx           # Overview + Evaluation subtabs (quiz + results inline)
│   ├── Quiz.jsx              # Legacy — redirects to /profile?tab=evaluation
│   ├── Results.jsx           # Legacy — redirects to /profile?tab=evaluation
│   ├── Roadmap.jsx           # Sequential milestones with quizzes, XP, PM booking
│   ├── Labs.jsx              # Articles, case studies, mock tests, company prep, branding
│   ├── Interview.jsx         # AI mock video interview with webcam + speech
│   ├── Jobs.jsx              # Job board with filtering + relevance scoring
│   ├── Portfolio.jsx         # Resume upload/parse, profile, education, share
│   └── PublicPortfolio.jsx   # Public read-only portfolio (decoded from URL param)
├── data/
│   ├── quizQuestions.js      # PM roles, categories, quiz questions, role weights
│   ├── roadmapData.js        # Milestones, courses, role transitions, path recommendations
│   └── labsData.js           # Articles, case studies, mock tests, company question banks, jobs
└── assets/
    └── hero.png, react.svg, vite.svg
```

## Commands

```bash
npm run dev       # Start Vite dev server with HMR (port 5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## State Management

All state is in `AppContext.jsx` via `useReducer`. Changes auto-persist to localStorage.

**State shape:**
```
{ user, quizResults, selectedPath, roadmapProgress, labsProgress, interviewResult, portfolio }
```

**Key actions:**
- `SET_USER` — registration data
- `SET_QUIZ_RESULTS` — evaluation scores (categoryResults, overallScore, weakAreas, strongAreas)
- `SET_SELECTED_PATH` — chosen PM role path ID
- `UPDATE_ROADMAP_PROGRESS` / `COMPLETE_MILESTONE_QUIZ` — milestone tracking
- `UPDATE_LABS_PROGRESS` — articles read, test scores
- `SET_INTERVIEW_RESULT` — mock interview scores
- `UPDATE_PORTFOLIO` — portfolio fields (education, skills, experience, etc.)
- `RESET` — clear everything

## Routing

- `/` — Register (or redirect to /profile if logged in)
- `/profile` — Profile with Overview and Evaluation subtabs
- `/profile?tab=evaluation` — Shows quiz or results inline
- `/roadmap` — Learning roadmap with milestones
- `/labs` — Practical labs (5 tabs)
- `/interview` — Mock video interview
- `/jobs` — Job board
- `/portfolio` — Portfolio builder + share
- `/portfolio/public?d=<base64>` — Public shareable portfolio (no auth required)
- `/quiz`, `/results` — Legacy redirects to `/profile?tab=evaluation`

## Key Architecture Decisions

- **Single CSS file** (`index.css`) — all styles in one file, organized by section with comment headers
- **No backend** — entirely client-side; data encoded in URLs for sharing
- **Shareable portfolio** uses base64-encoded JSON in URL query param `?d=`
- **Quiz/Results consolidated** into Profile page as subtabs (not separate routes)
- **PDF parsing** uses pdf.js loaded dynamically from CDN with two-column layout detection
- **XP/Level system** calculated from roadmapProgress in Layout.jsx (5 levels: PM Aspirant → PM Leader)
- **Webcam** uses getUserMedia with PiP overlay; graceful fallback if unavailable
- **Speech recognition** uses webkitSpeechRecognition with interim results
- **Light/Dark theme** via `data-theme` attribute on `<html>`, CSS custom properties, persisted to localStorage (`pm-platform-theme`). Toggle in Layout.jsx sidebar. Inline script in `index.html` prevents FOUC.

## Data Files

- **quizQuestions.js** — 8 PM roles, 8 skill categories, ~30 generic + role-specific questions, scoring weights per role
- **roadmapData.js** — `getMilestones(roleId)` returns milestones with courses/quizzes/XP; `getFastestPath(currentRole)` recommends quickest transition; `getTransitionInfo()` returns duration/difficulty
- **labsData.js** — curated articles, case study challenges, mock tests, company question banks (Google, Meta, Amazon, Apple, Microsoft, Stripe, Netflix, Spotify with 54+ questions), branding strategies, job listings

## XP & Leveling

Calculated in `Layout.jsx` from `state.roadmapProgress`:
- Level 1: PM Aspirant (0 XP)
- Level 2: Associate PM (500+ XP)
- Level 3: PM (1500+ XP)
- Level 4: Senior PM (2500+ XP)
- Level 5: PM Leader (4000+ XP)

## Data Flow

```
Register → SET_USER
  → Profile/Evaluation → SET_QUIZ_RESULTS → SET_SELECTED_PATH
    → Roadmap → COMPLETE_MILESTONE_QUIZ (pass 80%+) → UPDATE_ROADMAP_PROGRESS
      → Interview → SET_INTERVIEW_RESULT
        → Labs → UPDATE_LABS_PROGRESS
          → Portfolio → UPDATE_PORTFOLIO → Share (base64 URL)
```

## Important Patterns

- **Profile subtabs** use `useSearchParams` for URL-driven tab state
- **Milestone quizzes** require 80%+ to pass and unlock next milestone
- **Interview unlock** requires completing all roadmap milestones
- **PM booking** appears after AI interview score >= 70%, uses Google Calendar URL generation
- **Company prep** in Labs has filterable question banks by type (product-design, estimation, analytical, strategy, behavioral, metrics, execution, writing)
- **Resume parser** (`parseResumeText` in Portfolio.jsx) handles section detection, two-column PDF layouts, multi-line education/experience merging

## Code Style

- Functional components with hooks throughout
- No TypeScript (plain JSX)
- Inline event handlers in JSX
- CSS class naming: kebab-case (e.g., `.share-generate-btn-v2`, `.pub-hero-card`)
- Icons from lucide-react imported per-component
