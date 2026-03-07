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

### Current capabilities (v0.2.0)

- Load and display 1500+ wines
- Full-text search across wine attributes
- Filters by:
  - Type
  - Country
  - Region
- Column sorting
- Pagination
- Wine detail modal
- Responsive table interface

Dataset pipeline:

CSV → JSON → Web UI

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

---

# Development

Clone the repository:

git clone https://github.com/ggonzalezdal/airgon-site.git  
cd airgon-site

Run locally using a simple HTTP server:

python -m http.server

Then open:

http://localhost:8000

---

# Deployment

Deployment is handled automatically via **Cloudflare Pages**.

Every push to the `main` branch triggers a new deployment.

---

# Versioning

Releases follow semantic versioning.

Example:

v0.1.0  
v0.2.0

Current milestone:

Wine Manager v0.2.0 — Interactive catalog interface

See `ROADMAP.md` for upcoming development milestones.

---

# Author

Gonzalo González Dalbes  
Barcelona