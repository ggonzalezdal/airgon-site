# Wine Manager

Wine Manager is a lightweight web application for browsing and exploring a wine catalog.  
The project is designed as a simple, fast, and maintainable interface for managing wine datasets.

The current version provides a responsive table interface with filtering, sorting, pagination, and a detailed modal view for each wine.

## Features

Version 0.2.0 includes:

- Full-text search across wine attributes
- Filtering by type, country, and region
- Column sorting (ascending and descending)
- Pagination (default 25 wines per page)
- Wine detail modal
- Dark-theme compatible interface
- Responsive layout

The application currently loads approximately 1500 wines from a local JSON dataset.

## Project Structure

airgon-site  
projects  
wine-manager  
data  
wines.json  
app.js  
style.css  
index.html

## Current Architecture

The application currently runs as a static frontend application.

Frontend  
→ JSON dataset

The data is loaded directly in the browser from a local dataset.

## Development Workflow

Feature development follows a simple branching model:

main  
Stable releases

feature/*  
Feature development branches

Each milestone is tagged and released.

## Roadmap

The next milestone focuses on moving from a static dataset to a database-backed architecture.

See roadmap.md for details.

## Upcoming Milestone

Version 0.3.0 will introduce database integration:

- PostgreSQL database (Supabase)
- Import existing wine dataset
- Replace local JSON with database queries
- Prepare architecture for future backend/API layer

## License

MIT License