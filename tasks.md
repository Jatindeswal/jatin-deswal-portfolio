# Project Roadmap & Execution Tasks

- [x] **Stage 1: Workspace Scaffolding & Data Modeling**
  - [x] Scaffold Vite + React + TypeScript in project root
  - [x] Install dependencies: `lucide-react`, `clsx`, `tailwind-merge`, `tailwindcss`, `postcss`, `autoprefixer`
  - [x] Configure Tailwind CSS and dark-mode styles with Inter and JetBrains Mono typography
  - [x] Define TypeScript interfaces in `src/types/portfolio.ts`
  - [x] Implement complete data layer in `src/data/portfolio.ts` with 5 featured projects, skills matrix, and updated education details
  - [x] Verify zero TypeScript errors with `npx tsc --noEmit`

- [x] **Stage 2: Core Layout, Navigation & Hero Section**
  - [x] Implement sticky glassmorphic `Navbar.tsx` with mobile drawer and quick links
  - [x] Build high-impact `Hero.tsx` with role title, status terminal badge, call-to-action buttons, and social pills
  - [x] Set up ambient lighting and subtle background grid/gradient

- [x] **Stage 3: Bento Grid Projects & Interactive Modals**
  - [x] Build `ProjectsSection.tsx` with responsive Bento Grid layout
  - [x] Implement category filter pills (`All`, `AI/ML & Vision`, `Systems & Network`, `Web & Cloud`, `Mobile`)
  - [x] Implement `ProjectModal.tsx` displaying deep architectural breakdown, problem statements, and paper/submission badges

- [x] **Stage 4: Skills Matrix & Interactive Tech Stack**
  - [x] Build `SkillsSection.tsx` categorizing AI & Data Science, Languages, Web & Application, and Systems/Networking/Tools
  - [x] Implement visual category selectors and proficiency/stack tags

- [x] **Stage 5: Journey / Experience & Education Timeline**
  - [x] Build `TimelineSection.tsx` with vertical visual milestone path
  - [x] Add cards for ICRITO 2027 paper submission, Amity B.Tech CSE, CCNA Certification, and Scholars Rosary Senior Secondary School

- [x] **Stage 6: Contact Section, Footer & Production Verification**
  - [x] Build `ContactSection.tsx` with one-click copy email pill and clean interactive contact form with inline validation
  - [x] Build `Footer.tsx` with status indicators and copyright
  - [x] Full production build check (`npm run build`) and lint verification
