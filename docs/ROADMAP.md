# Wine Manager Roadmap

This document outlines the development milestones for the Wine Manager project.

The goal is to evolve the application from a static frontend prototype into a scalable wine catalog platform.

---

## v0.1.0 — Initial Interface

Status: Completed

- Static table rendering
- Dataset loaded from JSON
- Basic UI layout
- Initial deployment

---

## v0.2.0 — Interactive Catalog

Status: Completed

Major usability improvements to the wine catalog interface.

Features:

- Column sorting
- Search functionality
- Filtering by wine attributes
- Pagination
- Wine detail modal
- Dark-theme compatible interface
- Responsive layout improvements

This version represents the completed frontend MVP.

---

## v0.3.0 — Database Integration

Status: Planned

Transition from static JSON data to a database-backed architecture.

Objectives:

- Create PostgreSQL database schema
- Import wine dataset into database
- Replace local JSON data source
- Query wines from database
- Maintain existing frontend features (search, filters, pagination)

Target stack:

Frontend  
→ Supabase (PostgreSQL)

---

## v0.4.0 — Data Management

Status: Planned

Enhancements focused on managing and extending the wine dataset.

Potential features:

- Wine rating system
- Favorite wines
- Advanced filters
- Price and vintage range filtering
- Data normalization (regions, producers, varieties)

---

## v0.5.0 — Backend Layer

Status: Planned

Introduce an API layer between the frontend and the database.

Objectives:

- REST API for wine queries
- Server-side filtering and pagination
- Improved query performance
- Backend validation and business logic

Architecture:

Frontend  
→ API  
→ Database

---

## Long-Term Goals

- Advanced search capabilities
- Wine recommendation features
- Integration with external wine datasets
- Administrative interface for managing wines