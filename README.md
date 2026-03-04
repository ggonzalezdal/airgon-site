# airgon.dev

Source code for **airgon.dev**, the personal website and project hub of Gonzalo González Dalbes.

This repository hosts the static site deployed automatically through Cloudflare Pages.

## Deployment Architecture

The website uses a modern continuous deployment pipeline:

GitHub Repository → Cloudflare Pages → airgon.dev

Every time a commit is pushed to the `main` branch, Cloudflare automatically rebuilds and deploys the site globally.

## Project Structure

```
airgon-site/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

Currently the site is a simple static webpage, but it will evolve into a project hub containing:

- portfolio projects
- experiments and labs
- the wine management application
- future tools and demos

## Development Workflow

Development follows a standard Git workflow:

```
edit files locally
git add .
git commit -m "message"
git push
```

Cloudflare Pages automatically detects the new commit and redeploys the website.

## Local Development

Clone the repository:

```
git clone https://github.com/gonzalezdal/airgon-site.git
```

Enter the project directory:

```
cd airgon-site
```

Open `index.html` in a browser or run a local development server.

Example with Python:

```
python3 -m http.server
```

Then open:

```
http://localhost:8000
```

## Domain

The website is available at:

```
https://airgon.dev
```

Subdomains may host future projects such as:

```
wine.airgon.dev
lab.airgon.dev
war.airgon.dev
```

## Author

Gonzalo González Dalbes  
Barcelona, Spain
