# Plura — Multi-Tenant SaaS Agency Management Platform

Plura is a full-stack multi-tenant SaaS platform built as a Final Year Project for the BS Software Engineering program at Government College University Faisalabad (2020–2024). The platform enables digital agencies to onboard clients, manage sub-accounts, build websites, run marketing funnels, and handle billing — all from a single white-labeled dashboard.

The scope and architecture of Plura is comparable to commercial tools like GoHighLevel.

---

## Core Features

- **Multi-Tenancy** — Each agency and their sub-accounts operate in fully isolated workspaces with separate data boundaries
- **White-Labeling** — Agencies can brand the platform as their own product for their clients
- **Drag-and-Drop Website & Funnel Builder** — Live preview editor with component-level style customization and one-click publishing
- **Stripe Subscription Billing** — Tiered subscription plans with Stripe Connect for marketplace-style payment flows, allowing agencies to collect payments from their own clients
- **Role-Based Access Control** — Three permission levels: Agency Owner, Sub-Account User, and Guest
- **CRM Contacts Module** — Manage client contacts per sub-account
- **Kanban Pipeline Board** — Deal tracking with drag-and-drop pipeline stages
- **Media Library** — Cloud file uploads and asset management via UploadThing
- **Authentication** — Secure sign-in and session management via Clerk

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | MySQL via Neon |
| ORM | Prisma |
| Auth | Clerk |
| Payments | Stripe, Stripe Connect |
| File Uploads | UploadThing |
| Styling | Tailwind CSS, Shadcn UI |
| Deployment | Vercel |

---

## Architecture Highlights

- Multi-tenant schema designed with Prisma — agency and sub-account data fully isolated at the database level
- Stripe webhook-driven event handling to keep subscription and billing states accurate in real time
- Next.js App Router with server components for performance and scalability
- Role-based middleware protecting routes across all three user levels
- Modular component architecture for the drag-and-drop builder with live DOM preview

---

## Project Context

**Degree:** BS Software Engineering  
**Institution:** Government College University Faisalabad, Pakistan  
**Session:** 2020–2024  
**Project Type:** Final Year Project (Group — 2 members)  
**Individual Contribution:** System architecture, backend development, database schema design, Stripe integration, drag-and-drop builder, authentication, RBAC, CRM, pipeline board, media library, deployment

---

## Local Setup

```bash
git clone https://github.com/your-username/plura.git
cd plura
npm install
```

Create a `.env` file and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
NEXT_PUBLIC_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

```bash
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
