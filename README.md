# AAS Guide

Documentation viewer for the AAS system, built with Next.js.

## Getting Started

Install dependencies, then run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the guide.

## Project Structure

```text
content/     Generated guide chapters consumed by the app
md/AAS/      Source documentation for the AAS system
src/app/     Next.js App Router entry points
src/lib/     Content loading and markdown rendering
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
```
