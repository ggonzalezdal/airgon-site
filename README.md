# airgon.dev

This repository contains the source code for projects published on:

https://airgon.dev

The goal of this repository is to host **small, practical web applications and experiments** developed as part of my learning journey in software development.

---

# Projects

## Wine Manager

A web-based tool designed to explore and manage large wine datasets.

Live demo:

https://airgon.dev/projects/wine-manager/

Current capabilities:

- Load and display 1500+ wines
- Search across multiple fields
- Filter wines by:
  - Type
  - Country
  - Region
- Clean table-based interface
- Fast static deployment

Dataset format:

```
CSV → JSON → Web UI
```

---

# Technology Stack

Frontend

- HTML
- CSS
- Vanilla JavaScript

Hosting

- Cloudflare Pages

Utilities

- Python script for converting CSV datasets to JSON

---

# Repository Structure

```
airgon-site
│
├─ css/
│   └─ style.css
│
├─ projects/
│   ├─ war-assistant/
│   │
│   └─ wine-manager/
│       ├─ index.html
│       ├─ app.js
│       ├─ style.css
│       └─ data/
│           ├─ wines.csv
│           └─ wines.json
│
├─ tools/
│   └─ csv_to_wines_json.py
│
├─ README.md
├─ ROADMAP.md
└─ .gitignore
```

---

# Development

Clone the repository:

```
git clone https://github.com/ggonzalezdal/airgon-site.git
cd airgon-site
```

Open locally:

```
index.html
```

Or use a local server.

Example:

```
python -m http.server
```

---

# Deployment

Deployment is handled automatically via **Cloudflare Pages**.

Every push to the `main` branch triggers a new deployment.

---

# Versioning

Releases follow semantic versioning.

Example:

```
v0.1.0
```

The current version:

**Wine Manager MVP (Pre-release)**

See:

```
ROADMAP.md
```

for the full development plan.

---

# Author

Gonzalo González Dalbes  
Barcelona