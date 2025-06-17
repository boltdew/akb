# ✈️ Product Requirements Document (PRD)
**Project:** Aviation Docs Subscription Platform  
**Stack:** Next.js + MDX · Clerk · Stripe · Xata · Vercel · Pagefind  

---

## 1. Overview

### 1.1 Purpose  
To build a secure, scalable, and monetized documentation platform for aviation engineers and trainees using modern JAMstack technologies. The platform will gate access to 2000+ MDX pages based on user subscriptions, managed via Clerk (auth), Stripe (payments), and Xata (access logic).

### 1.2 Background  
The current system consists of a large set of static Markdown/MDX files (aviation systems organized by ATA chapters). All files are public. This project aims to introduce:

- User authentication
- Subscription billing
- Content gating
- Search across 2000+ docs

---

## 2. Objectives & Success Metrics

| Objective | Success Metric |
|----------|----------------|
| Secure user authentication via Clerk | 95% of test users can register/login |
| Gated access to premium docs | 100% of unauthorized users redirected |
| Offer trials, monthly, and lifetime plans | 10+ paid subs in first 30 days |
| Seamless Stripe checkout experience | <5% payment failure rate |
| Blazing-fast search on 2000+ docs | <300ms average query latency |
| Fast load times | <2s page load globally (90th percentile) |

---

## 3. Scope

### 3.1 In Scope

- MDX-based documentation engine with dynamic access logic
- Auth system with Clerk (email + OAuth)
- Subscription plans using Stripe (trial, monthly, lifetime)
- Webhook handling and access state updates via Xata
- User dashboard: plan status, billing link, renewal
- Static search with Pagefind
- CI/CD via GitHub + Vercel

### 3.2 Out of Scope

- Team-based licenses or multi-user plans
- Admin CMS (edits via Git)
- Multi-language support

---

## 4. User Personas & Stories

### Personas

- **Avi Trainee**: New user exploring free trial docs
- **Aircraft Engineer**: Professional subscribing for full access
- **Admin**: Monitors subscriptions, updates docs in Git

### Key User Stories

| ID | User Story |
|----|------------|
| US01 | As a user, I want to sign up with email or Google so I can access documentation |
| US02 | As a new user, I want a 7-day trial so I can explore the platform |
| US03 | As a user, I want to pay monthly (35 AED) or lifetime (125 AED) to unlock all docs |
| US04 | As a user, I want to be redirected if I try to access gated content without a subscription |
| US05 | As a subscriber, I want to see my plan and renewal date |
| US06 | As any user, I want to search all 2000+ docs instantly |

---

## 5. Functional Requirements

### 5.1 Docs Engine

- All content authored in `.mdx` and stored in `/content/`
- Dynamic routing via `[...slug].tsx`
- MDX rendering via `next-mdx-remote` or `contentlayer`
- Public vs. protected content gated in `getServerSideProps()`

### 5.2 Authentication

- Clerk integration for email/password and OAuth (Google, GitHub)
- Use Clerk `withServerSideAuth` or JWT middleware in protected pages
- Clerk webhook updates Xata `users` table (`user.created`, `user.deleted`)

### 5.3 Subscription & Payments

- Stripe products:
  - Plan A: Trial + Monthly (35 AED)
  - Plan B: One-time Lifetime (125 AED)
- Stripe Checkout (hosted payment flow)
- Webhook handler (`/api/webhook`) processes:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `customer.subscription.deleted`
- On success, update Xata `users` table: `subscription_status = active`, `plan_type = monthly|lifetime`

### 5.4 Content Gating

- Gated logic inside `getServerSideProps()` for MDX pages
- If user has no active sub, redirect to `/pricing`
- Free trial pages available via `trial_access` flag in Xata

### 5.5 Dashboard

- Page `/dashboard` shows:
  - Plan type, status, renewal date
  - Button: "Manage Billing" (Stripe Customer Portal)
- Authenticated-only access

### 5.6 Search

- Pagefind integration:
  - Build index at deploy
  - Instant client-side search
  - Only indexes public pages (or trial-accessible ones)

---

## 6. Non-Functional Requirements

- **Performance:** <2s page load (90th percentile)
- **Security:** HTTPS, Stripe signature validation, auth tokens secured
- **SEO:** Open docs crawlable, gated content blocked
- **Accessibility:** WCAG 2.1 AA compliant
- **Scalability:** Handles 2000+ MDX files; supports SSR/ISR as needed

---

## 7. Technical Architecture

Client (Browser)
   |
   |-- Clerk (Auth UI)
   |-- Stripe Checkout
   |
Next.js (Vercel SSR)
   |-- /docs/[slug].tsx   ← MDX page w/ auth gating
   |-- /dashboard.tsx     ← User view
   |-- /pricing.tsx       ← Public
   |-- /api/webhook.ts    ← Stripe → Xata
   |
   |-- content/           ← 2000+ MDX files
   |-- lib/auth.ts        ← Clerk session check
   |-- lib/stripe.ts      ← Stripe utils
   |-- lib/db.ts          ← Xata SDK
   |-- lib/mdx.ts         ← MDX render logic

---

## 8. API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/webhook` | POST | Stripe webhook handler |
| `/api/user-status` | GET | Return current user's sub status |
| `/api/docs-access` | GET | Return access status for a slug |

---

## 9. Environment Variables

```
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
XATA_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## 10. DevOps & Deployment

- GitHub → Vercel CI/CD pipeline
- Preview deployments on feature branches
- Production deploy on `main`
- Local dev with `vercel dev` and Clerk dev keys

---

## 11. Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Static MDX can't gate content at build | Use SSR + session-based gating |
| Webhook failures (Stripe) | Make webhook idempotent + log to Vercel |
| Trial abuse | Track trial usage per Clerk user ID in Xata |
| Search indexing gated pages | Index only allowed pages in Pagefind |
