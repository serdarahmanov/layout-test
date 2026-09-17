# Layout Test

An experimental Next.js project for learning how mobile browser chrome, notches, Dynamic Island cutouts, safe areas, viewport units, and scrolling affect page layout and animation.

The project is organized into two connected parts:

- `docs/test-cases/` contains the written definition for each experiment.
- `app/test-1/`, `app/test-2/`, and so on contain the corresponding runnable pages.

Each test page is intended to make one layout behavior visible in a real mobile browser. Tests will be added incrementally as the viewport behavior is explored.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the home page in `app/page.tsx`. The page auto-updates as you edit the file.

## Test pages

The first viewport comparison pages are available at:

- [Test 1](http://localhost:3000/test-1) — `100vh`, baseline “broken” case.
- [Test 2](http://localhost:3000/test-2) — `100dvh`, dynamic viewport height.
- [Test 3](http://localhost:3000/test-3) — `100svh`, safe minimum viewport height.

The written definitions are in [`docs/test-cases/`](docs/test-cases/).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
