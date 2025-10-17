# Smart Search Component - Demo (React + TypeScript) - Jest Edition

This repository contains a reusable **Smart Search** component implemented in **React + TypeScript**.
It demonstrates a search input with a results dropdown, keyboard navigation, clear and loading states,
theme support, CSS Modules (style isolation), and tests with **Jest + React Testing Library**.

## Features implemented (per Zafire Code Challenge)
- Search input with clear button and loading state
- Results dropdown with keyboard navigation (ArrowUp/Down, Enter, Escape)
- Flexible filtering logic that works with various item shapes
- Style isolation via CSS Modules (`.module.css`)
- Theme support (`light` / `dark`) via prop
- Mobile/touch friendly (click/tap handlers and responsive styling)
- Accessible attributes (ARIA) for input and listbox
- Tests covering rendering, filtering, keyboard nav, and selection

## Tech stack
- React 18 + TypeScript
- Vite for dev/build
- Jest + React Testing Library for tests
- CSS Modules for style isolation
- ESLint + Prettier for linting & formatting
- GitHub Actions for CI (runs lint + tests)

## Setup (local)
```bash
# unzip the project and move into folder
cd smart-search-component

# install deps
npm install

# dev server
npm run dev

# run tests
npm run test

# run lint
npm run lint

# format code
npm run format
```

## Pushing to GitHub (one-time)
This repo is configured to push to your GitHub account `hamwentrawat` as `smart-search-component`.
Run these commands (ensure you've created the empty repo on GitHub first):
```bash
git init
git add .
git commit -m "Initial commit - Jest + ESLint + Prettier"
git branch -M main
git remote add origin https://github.com/hamwentrawat/smart-search-component.git
git push -u origin main
```

## CI
A GitHub Actions workflow is included at `.github/workflows/test.yml` that runs lint and tests on push.

## Notes
- In CI, `npm ci` is used for reproducible installs.
- This project uses `ts-jest` for TypeScript support in Jest.
- You can enable Husky and lint-staged hooks locally if desired (not enabled by default in this zip).

# smart-search-component
