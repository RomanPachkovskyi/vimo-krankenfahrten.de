# ViMo Krankenfahrten

React/Vite one-page site for `vimo-krankenfahrten.de`.

## Development

```sh
cd site
npm install
npm run dev
```

## Checks

```sh
cd site
npm test
npm run build
```

## GitHub Pages Deploy

The repository is configured with GitHub Actions in `.github/workflows/deploy.yml`.
Every push to `main` builds the React app from `site/` and deploys `site/dist` to GitHub Pages.

In GitHub, enable Pages with:

- Source: GitHub Actions
- Custom domain: `vimo-krankenfahrten.de`
