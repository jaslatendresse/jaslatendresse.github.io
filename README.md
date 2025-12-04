# Minimal academic page

I always found what is already out there too complicated, heavy. I wanted something minimalistic, simple, easy. So this is plain HTML/CSS site with zero build steps. Edit JSON, drop a PDF, push to GitHub Pages.

## Structure
- `index.html` – landing page driven by `data/profile.json`.
- `publications.html` – renders list from `data/publications.json`.
- `academic.html` – talks/service/mentoring from `data/academic.json`.
- `experience.html` – internships/industry roles from `data/industry.json`.
- `cv.html` – displays `cv.pdf`.
- `assets/styles.css` – styles.
- `assets/main.js` – tiny helper that loads JSON and populates the pages.
- `assets/avatar.svg` – placeholder avatar.

## Quick edit
1. Update `data/profile.json` with bio, avatar path, and links.
2. Update `data/publications.json` to add/remove papers (order is preserved).
3. Update `data/academic.json` for talks/lectures/service and `data/industry.json` for internships/roles.
4. Drop PDF as `cv.pdf` in the project root.

## Preview locally
Because the pages fetch local JSON, open them via a small server (not the file:// URL):
```bash
python3 -m http.server 4000
```
Then visit http://localhost:4000/.

## Deploy
Push to the `main` branch of your `username.github.io` repo. GitHub Pages will serve `index.html` automatically.
