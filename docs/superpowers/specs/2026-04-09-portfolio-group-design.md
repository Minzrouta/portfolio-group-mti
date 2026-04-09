# Portfolio Groupe MTI — Design Spec

**Date:** 2026-04-09  
**Groupe:** Lucile, Léa, Marie, Baptiste

---

## Objectif

Site vitrine one-page en React JS répertoriant les projets réalisés en cours par le groupe de 4. Déployable sur VPS via Docker Compose. Le VPS gère son propre nginx en reverse proxy vers le conteneur.

---

## Architecture

### Stack
- **Frontend:** React + Vite
- **Styles:** CSS vanilla avec variables custom (pas de framework)
- **Déploiement:** Docker multi-stage build → nginx interne → port exposé via docker-compose

### Structure des fichiers

```
portfolio-group-mti/
├── public/
│   └── images/              # photos équipe + screenshots projets
├── src/
│   ├── data/
│   │   ├── team.json        # données membres (nom, rôle, photo)
│   │   └── projects.json    # données projets (titre, desc, image, lien)
│   ├── components/
│   │   ├── Hero.jsx             # section d'accroche
│   │   ├── TeamSection.jsx      # section équipe (4 membres)
│   │   ├── ProjectsSection.jsx  # section galerie projets
│   │   └── ProjectCard.jsx      # carte individuelle d'un projet
│   ├── App.jsx
│   └── index.css            # variables CSS + styles globaux
├── docker-compose.yml
└── Dockerfile
```

---

## Sections de la page

### 1. Hero
- Titre du groupe (ex: "Notre Portfolio")
- Sous-titre : promo / école (placeholder à remplir)
- Petite phrase d'accroche
- Fond avec légère teinte pastel

### 2. TeamSection
- Titre de section "Notre équipe"
- 4 cartes côte à côte (responsive → 2 colonnes sur tablette, 1 sur mobile)
- Chaque carte : photo ronde, prénom, rôle (placeholder)
- Images dans `public/images/team/`

### 3. ProjectsSection
- Titre de section "Nos projets"
- Grille responsive : 2 colonnes desktop → 1 colonne mobile
- Évolutive : 2 projets maintenant, prévu 8-10 à terme
- Chaque ProjectCard : image, titre, description courte, bouton "Voir le projet" (lien externe)

---

## Données (JSON)

### `team.json`
```json
[
  { "name": "Lucile", "role": "...", "photo": "/images/team/lucile.png" },
  { "name": "Léa",    "role": "...", "photo": "/images/team/lea.png" },
  { "name": "Marie",  "role": "...", "photo": "/images/team/marie.png" },
  { "name": "Baptiste","role": "...", "photo": "/images/team/baptiste.png" }
]
```

### `projects.json`
```json
[
  {
    "title": "Nom du projet",
    "description": "Courte description du projet.",
    "image": "/images/projects/projet1.jpg",
    "link": "https://..."
  }
]
```

---

## Style

- **Palette:** rose poudré `#f8c8d4`, lavande `#d8cff0`, pêche `#fde8d8`, fond blanc cassé `#fdf9f7`
- **Typographie:** `Inter` (body) + `Playfair Display` (titres) — Google Fonts
- **Cartes:** coins arrondis, légère ombre, hover avec élévation subtile
- **Boutons:** couleur accentuation lavande/rose, coins arrondis

---

## Docker

### Dockerfile (multi-stage)
1. Stage `build` : Node.js, `npm install`, `npm run build`
2. Stage `serve` : nginx alpine, copie du build dans `/usr/share/nginx/html`

### docker-compose.yml
- Service unique `app`
- Port configurable (ex: `3000:80`)
- Restart policy: `unless-stopped`
- Le nginx du VPS fait le reverse proxy vers ce port

---

## Contraintes
- Pas de backend, pas de base de données
- Contenu entièrement statique, mis à jour via les fichiers JSON
- Le nginx VPS gère SSL/domaine en amont
