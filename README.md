# Next Fundamentals

A lightweight practice project built with **Next.js 15**, **React 19**, and **TypeScript** to explore core Next.js concepts like file-based routing, dynamic routes, server components, and basic API routes.

> **Disclaimer:** This project is intentionally light on styling. It’s all about learning the framework, so… _No Judging!_ 🙃

---

## Features

- **App Router** (`app/` directory) with nested routes
- **Dynamic Routes** for blog posts (`/blog/[slug]`)
- **Markdown-based Content** rendering for posts
- **Simple SEO** metadata and JSON-LD
- **Basic API Route** example (OpenWeather API integration)
- **Server Components** and **Client Components** usage
- Minimal **Tailwind CSS** setup

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router + Turbopack)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (basic utility classes)
- [OpenWeather API](https://openweathermap.org/api) (weather example)
- Markdown parsing for blog posts

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/next-fundamentals.git
cd next-fundamentals
yarn install
```

### 2. Environment Variables

Create a `.env.local` file in the root:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Run the Dev Server

```bash
yarn dev
```

Then visit [http://localhost:3000](http://localhost:3000).

---

## Adding Blog Content

Blog posts are stored as markdown files in:

```
src/app/content/posts/
```

Each post should start with frontmatter:

```markdown
---
title: 'My First Post'
excerpt: 'This is a short summary.'
banner: '/images/banner.jpg'
date: '2025-08-14'
---

Here is the content of the post...
```

---

## Goals of This Project

- Practice **Next.js fundamentals** without getting lost in CSS polish
- Understand **SSR vs CSR** behavior
- Experiment with **dynamic routing**
- Learn how to integrate a simple external API
