# Portfolio Groupe MTI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page React portfolio site for a group of 4, with team member cards and a project gallery, deployable via Docker Compose on a VPS.

**Architecture:** Single-page React app (Vite) with no routing. All content (team members, projects) is stored in JSON files under `src/data/`. The page is composed of three sections: Hero, TeamSection, ProjectsSection. Built to a static bundle, served by nginx inside a Docker container.

**Tech Stack:** React 18, Vite, vanilla CSS (CSS custom properties), Google Fonts (Inter + Playfair Display), nginx:alpine, Docker multi-stage build, docker-compose v3.

---

## File Map

| File | Role |
|------|------|
| `src/data/team.json` | Team member data (name, role, photo path) |
| `src/data/projects.json` | Project data (title, description, image, link) |
| `src/index.css` | CSS variables (palette, fonts), global reset, all component styles |
| `src/components/Hero.jsx` | Top banner with group name, promo, tagline |
| `src/components/TeamSection.jsx` | 4-card responsive team grid |
| `src/components/ProjectsSection.jsx` | Project grid, reads from projects.json |
| `src/components/ProjectCard.jsx` | Individual project card (image, title, desc, link) |
| `src/App.jsx` | Root component, assembles the three sections |
| `src/main.jsx` | Vite entry point (generated, minimal edits) |
| `Dockerfile` | Multi-stage: node build → nginx:alpine serve |
| `docker-compose.yml` | Single service, port 3000:80, restart unless-stopped |
| `public/images/team/` | Team photo placeholders (lucile.png, lea.png, marie.png, baptiste.png) |
| `public/images/projects/` | Project screenshot placeholders |

---

## Task 1: Scaffold Vite + React project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`

- [ ] **Step 1: Initialize Vite project**

```bash
npm create vite@latest . -- --template react
```

Answer prompts: framework = React, variant = JavaScript. This scaffolds `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 3: Remove Vite boilerplate files**

Delete these files — they'll be replaced:
```bash
rm src/App.css src/assets/react.svg public/vite.svg
```

Also clear the contents of `src/index.css` (keep the file, empty it).

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:5173`. The page may show errors since App.jsx still has boilerplate — that's fine.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: scaffold Vite React project"
```

---

## Task 2: CSS variables, Google Fonts, global styles

**Files:**
- Modify: `src/index.css` (full content)
- Modify: `index.html` (add Google Fonts link)

- [ ] **Step 1: Add Google Fonts to index.html**

In `index.html`, add inside `<head>` before the existing `<link>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Write global CSS**

Replace the full content of `src/index.css` with:

```css
:root {
  --color-rose: #f8c8d4;
  --color-lavande: #d8cff0;
  --color-peche: #fde8d8;
  --color-bg: #fdf9f7;
  --color-text: #3a3a3a;
  --color-accent: #b8a9d9;
  --font-body: 'Inter', sans-serif;
  --font-title: 'Playfair Display', serif;
  --radius: 16px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: var(--font-title);
}

img {
  display: block;
  max-width: 100%;
}

/* ── Hero ─────────────────────────────────────── */

.hero {
  background: linear-gradient(135deg, var(--color-rose) 0%, var(--color-lavande) 100%);
  padding: 100px 40px;
  text-align: center;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 12px;
  color: var(--color-text);
}

.hero-subtitle {
  font-size: 1rem;
  color: #777;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-tagline {
  font-size: 1.15rem;
  font-style: italic;
  color: #555;
}

/* ── Shared section layout ────────────────────── */

.section {
  padding: 70px 40px;
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section h2 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  margin-bottom: 48px;
  text-align: center;
}

/* ── Team ─────────────────────────────────────── */

.team-section {
  background: white;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

.team-card {
  background: var(--color-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 28px 20px;
  text-align: center;
  transition: transform 0.2s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 16px;
  border: 3px solid var(--color-rose);
}

.team-card h3 {
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.team-card p {
  font-size: 0.88rem;
  color: #999;
}

/* ── Projects ─────────────────────────────────── */

.projects-section {
  background: var(--color-peche);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

.project-card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-content h3 {
  font-size: 1.15rem;
  margin-bottom: 8px;
}

.project-content p {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 20px;
  flex: 1;
}

.btn {
  display: inline-block;
  align-self: flex-start;
  background: var(--color-accent);
  color: white;
  padding: 10px 22px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.85;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/index.css index.html
git commit -m "style: add CSS variables, global styles, and component styles"
```

---

## Task 3: JSON data files + placeholder images

**Files:**
- Create: `src/data/team.json`
- Create: `src/data/projects.json`
- Create: `public/images/team/` (directory with placeholder PNGs)
- Create: `public/images/projects/` (directory with placeholder)

- [ ] **Step 1: Create data directory and team.json**

Create `src/data/team.json`:

```json
[
  { "name": "Lucile",   "role": "...", "photo": "/images/team/lucile.png" },
  { "name": "Léa",     "role": "...", "photo": "/images/team/lea.png" },
  { "name": "Marie",   "role": "...", "photo": "/images/team/marie.png" },
  { "name": "Baptiste","role": "...", "photo": "/images/team/baptiste.png" }
]
```

- [ ] **Step 2: Create projects.json**

Create `src/data/projects.json`:

```json
[
  {
    "title": "Projet 1",
    "description": "Description courte du premier projet réalisé en cours.",
    "image": "/images/projects/projet1.png",
    "link": "https://example.com"
  },
  {
    "title": "Projet 2",
    "description": "Description courte du deuxième projet réalisé en cours.",
    "image": "/images/projects/projet2.png",
    "link": "https://example.com"
  }
]
```

- [ ] **Step 3: Create image directories and placeholder files**

```bash
mkdir -p public/images/team public/images/projects
```

For each missing image, the browser will show a broken image icon — that's acceptable until real photos are added. The layout is already built to handle them gracefully.

- [ ] **Step 4: Commit**

```bash
git add src/data/ public/images/
git commit -m "feat: add team and projects data files"
```

---

## Task 4: Hero component

**Files:**
- Create: `src/components/Hero.jsx`

- [ ] **Step 1: Create Hero.jsx**

Create `src/components/Hero.jsx`:

```jsx
export default function Hero() {
  return (
    <section className="hero">
      <h1>Notre Portfolio</h1>
      <p className="hero-subtitle">Promo 2025 · École MTI</p>
      <p className="hero-tagline">Quatre esprits curieux, des projets qui nous ressemblent.</p>
    </section>
  );
}
```

- [ ] **Step 2: Mount Hero in App.jsx to verify**

Replace the content of `src/App.jsx` with:

```jsx
import './index.css';
import Hero from './components/Hero';

export default function App() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Open `http://localhost:5173`. Expected: gradient banner (rose → lavande) with the three lines of text centered.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx src/App.jsx
git commit -m "feat: add Hero section"
```

---

## Task 5: TeamSection component

**Files:**
- Create: `src/components/TeamSection.jsx`

- [ ] **Step 1: Create TeamSection.jsx**

Create `src/components/TeamSection.jsx`:

```jsx
import team from '../data/team.json';

export default function TeamSection() {
  return (
    <section className="section team-section">
      <div className="section-inner">
        <h2>Notre équipe</h2>
        <div className="team-grid">
          {team.map((member) => (
            <div key={member.name} className="team-card">
              <img
                src={member.photo}
                alt={`Photo de ${member.name}`}
                className="team-photo"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add TeamSection to App.jsx**

```jsx
import './index.css';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';

export default function App() {
  return (
    <main>
      <Hero />
      <TeamSection />
    </main>
  );
}
```

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Expected: below the hero, 4 cards side by side on white background. Broken image icons where photos will go — that's expected. Resize the window to verify 2-column then 1-column layout on smaller widths.

- [ ] **Step 4: Commit**

```bash
git add src/components/TeamSection.jsx src/App.jsx
git commit -m "feat: add TeamSection with responsive 4-card grid"
```

---

## Task 6: ProjectCard + ProjectsSection components

**Files:**
- Create: `src/components/ProjectCard.jsx`
- Create: `src/components/ProjectsSection.jsx`

- [ ] **Step 1: Create ProjectCard.jsx**

Create `src/components/ProjectCard.jsx`:

```jsx
export default function ProjectCard({ title, description, image, link }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Voir le projet
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ProjectsSection.jsx**

Create `src/components/ProjectsSection.jsx`:

```jsx
import projects from '../data/projects.json';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  return (
    <section className="section projects-section">
      <div className="section-inner">
        <h2>Nos projets</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add ProjectsSection to App.jsx**

```jsx
import './index.css';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import ProjectsSection from './components/ProjectsSection';

export default function App() {
  return (
    <main>
      <Hero />
      <TeamSection />
      <ProjectsSection />
    </main>
  );
}
```

- [ ] **Step 4: Verify visually**

```bash
npm run dev
```

Expected: peach background section with 2 project cards side by side, each with a placeholder image area, title, description and a lavender "Voir le projet" button. Hover cards to verify the lift animation. Resize to verify 1-column on mobile.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.jsx src/components/ProjectsSection.jsx src/App.jsx
git commit -m "feat: add ProjectCard and ProjectsSection"
```

---

## Task 7: Docker setup

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `.dockerignore`

- [ ] **Step 1: Create .dockerignore**

Create `.dockerignore`:

```
node_modules
dist
.git
.gitignore
*.md
```

- [ ] **Step 2: Create Dockerfile**

Create `Dockerfile`:

```dockerfile
# Stage 1 — build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 — serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

- [ ] **Step 3: Create docker-compose.yml**

Create `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:80"
    restart: unless-stopped
```

- [ ] **Step 4: Test the Docker build locally**

```bash
docker compose up --build
```

Expected: build completes, container starts. Open `http://localhost:3000` — the full site should appear, identical to the dev server.

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "chore: add Docker multi-stage build and docker-compose"
```

---

## Task 8: Footer (minimal)

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/index.css` (append footer styles)
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Footer.jsx**

Create `src/components/Footer.jsx`:

```jsx
export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Lucile, Léa, Marie & Baptiste</p>
    </footer>
  );
}
```

- [ ] **Step 2: Add footer styles to index.css**

Append at the end of `src/index.css`:

```css
/* ── Footer ───────────────────────────────────── */

.footer {
  background: var(--color-lavande);
  text-align: center;
  padding: 24px 40px;
  font-size: 0.85rem;
  color: #666;
}
```

- [ ] **Step 3: Add Footer to App.jsx**

```jsx
import './index.css';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <main>
      <Hero />
      <TeamSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 4: Verify visually**

```bash
npm run dev
```

Expected: lavender footer at the bottom with the names and current year.

- [ ] **Step 5: Final Docker verification**

```bash
docker compose up --build
```

Open `http://localhost:3000`. Scroll through all sections. Verify footer appears.

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.jsx src/index.css src/App.jsx
git commit -m "feat: add footer"
```

---

## How to add a new project later

Edit `src/data/projects.json` and add a new object:

```json
{
  "title": "Nouveau projet",
  "description": "Description du projet.",
  "image": "/images/projects/nouveau.png",
  "link": "https://votre-projet.com"
}
```

Drop the screenshot in `public/images/projects/nouveau.png`. Rebuild the Docker image:

```bash
docker compose up --build -d
```

## How to replace team photos

Drop the PNG files in `public/images/team/` with the exact names:
- `lucile.png`, `lea.png`, `marie.png`, `baptiste.png`

Rebuild the Docker image.
