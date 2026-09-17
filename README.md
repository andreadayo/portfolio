# Andrea Dayo Portfolio

Personal portfolio website built with Next.js and Sanity.

## Project Structure

- `web/` - Next.js portfolio frontend
- `studio/` - Sanity Studio for managing portfolio content

## Requirements

- Node.js 20 or later
- A Sanity project and dataset

## Setup

Install dependencies in both applications:

```bash
cd web
npm install

cd ../studio
npm install
```

Create `web/.env` with the Sanity project configuration:

```env
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

## Development

Start the frontend:

```bash
cd web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Start Sanity Studio in a second terminal:

```bash
cd studio
npm run dev
```

## Production

Build and start the frontend:

```bash
cd web
npm run build
npm run start
```

Build or deploy the Sanity Studio:

```bash
cd studio
npm run build
npm run deploy
```

## Content and SEO

Portfolio content is managed in Sanity Studio, including projects, experience, SEO settings, social images, and the site URL. The frontend uses that data for page metadata, project social previews, the sitemap, and `robots.txt`.

## Useful Checks

Run the frontend linter:

```bash
cd web
npm run lint
```
