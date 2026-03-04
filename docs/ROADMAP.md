# Airgon.dev Projects Roadmap

This document tracks the development milestones of the **airgon.dev projects repository**, starting with the **Wine Manager application**.

The goal is to progressively build useful real-world tools while keeping the architecture simple, transparent, and educational.

---

# Version Roadmap

## v0.1.0 — Wine Manager MVP (Pre-release)
Status: ✅ Completed

Initial working version of the Wine Manager tool.

Features:
- Static web application hosted on Cloudflare Pages
- CSV → JSON dataset conversion
- Loading and rendering 1500+ wines
- Search functionality
- Filters:
  - Wine type
  - Country
  - Region
- Clean responsive UI
- Dataset stored locally in JSON
- Automatic deployment via Git push

Tech stack:
- HTML
- CSS
- Vanilla JavaScript
- Cloudflare Pages
- Python utility script for CSV conversion

---

## v0.2.0 — Usability Improvements
Status: 🔜 Planned

Improve browsing experience for large datasets.

Planned features:
- Column sorting
- Pagination
- Result counters
- Better mobile layout
- Improved search performance

---

## v0.3.0 — Wine Detail System
Status: 🔜 Planned

Add deeper wine inspection.

Planned features:
- Wine detail modal
- Additional metadata display
- Supplier information
- Cost / margin display
- Alcohol / bottle volume

---

## v0.4.0 — Data Management
Status: 🔜 Planned

Introduce basic data editing capabilities.

Planned features:
- Add new wines
- Edit wines
- Delete wines
- Import CSV
- Export dataset

---

## v0.5.0 — Wine List Builder
Status: 🔜 Planned

Enable restaurants or wine bars to curate lists.

Planned features:
- Create wine lists
- Add wines to lists
- Sort wine lists
- Print-ready wine lists
- Shareable list URLs

---

## v0.6.0 — Database Integration
Status: 🔜 Planned

Move from static JSON dataset to a database.

Possible technologies:
- Supabase (PostgreSQL)
- Cloudflare Workers API
- Serverless architecture

Benefits:
- Persistent storage
- Multi-user support
- Real-time updates
- Secure editing

---

## v1.0.0 — Production Version
Status: 🚧 Long-term goal

Full restaurant-grade wine management system.

Potential features:
- Authentication
- Role-based access
- Multi-device editing
- Inventory tracking
- Supplier management
- Sales analytics

---

# Long-Term Vision

Airgon.dev aims to become a **collection of practical developer projects**, including:

- Wine Manager
- WAR Assistant
- Restaurant tools
- Data exploration tools

All projects follow these principles:

- Minimal dependencies
- Transparent architecture
- Educational codebase
- Real-world usability

---

Author: Gonzalo González Dalbes  
Project: airgon.dev