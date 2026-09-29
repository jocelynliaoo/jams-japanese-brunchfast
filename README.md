# Jam's Japanese Brunchfast website

A mobile-first, static invitation website with three tabs:

- Details — invitation artwork + animated title
- Menu — menu artwork
- RSVP — custom styled RSVP form

## 1. Preview locally

Open `index.html` in your browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 2. Turn on RSVP submissions

The form is styled and ready, but it needs a form endpoint.

1. Create a free Formspree form at https://formspree.io/
2. Copy the endpoint they give you, for example:
   `https://formspree.io/f/abcdwxyz`
3. In `index.html`, replace:
   `https://formspree.io/f/YOUR_FORM_ID`
   with your real endpoint.

No backend code is required.

## 3. Host for free on GitHub Pages

1. Create a new public GitHub repository, e.g. `jams-brunchfast`.
2. Upload everything in this folder to the repository root.
3. In GitHub: Settings → Pages.
4. Under “Build and deployment,” choose “Deploy from a branch.”
5. Select `main` and `/ (root)`, then Save.
6. GitHub will give you a public URL similar to:
   `https://YOUR-USERNAME.github.io/jams-brunchfast/`

Because this site is plain HTML/CSS/JS, there is no build step.

## 4. Easy edits

- Invitation/title positioning: `.animated-title` in `styles.css`
- Background: `body` / `body::before` in `styles.css`
- RSVP questions: `<form id="rsvp-form">` in `index.html`
- Colors: variables at the top of `styles.css`

## Assets

All supplied artwork is in `assets/` and is used directly so the site matches the original invitation aesthetic.
