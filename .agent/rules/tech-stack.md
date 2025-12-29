---
trigger: model_decision
description: Look at the tech stack. 
---

# ⚡ JEFFDEV AGENCY - TECH STACK PROTOCOLS

## 1. CORE ARCHITECTURE
- **Framework:** Next.js 14+ (App Router).
- **Runtime:** Node.js (Latest LTS).
- **Compiler:** Turbopack (`next dev --turbo`).
- **Rendering Strategy:**
    - **Default:** Server Components (RSC) for all marketing pages (Services, Landing).
    - **Client Components:** restricted to interactive "islands" (Forms, Modals, GSAP Animations).

## 2. BACKEND & DATA LAYER
### A. Database: Firebase (Firestore)
- **SDK Strategy:**
    - **Server-Side (Preferred):** Use `firebase-admin` inside Server Actions for secure writes (Inquiry Forms, Bookings).
    - **Client-Side:** Use `firebase/app` ONLY if realtime listeners are strictly required (e.g., Live Chat).
- **Security:** NEVER expose Service Account credentials in `NEXT_PUBLIC_` variables.

### B. Object Storage: Cloudflare R2
- **Integration:** Use `@aws-sdk/client-s3` (S3 Compatible SDK).
- **Credentialing:**
    - `R2_ACCESS_KEY_ID`
    - `R2_SECRET_ACCESS_KEY`
    - `R2_BUCKET_NAME`
    - `R2_ACCOUNT_ID`
- **Usage:** Serve heavy assets (Video backgrounds, High-Res Case Study images) via R2 public custom domain (e.g., `cdn.jeffdev.studio`) to bypass Vercel bandwidth limits.

### C. Communications: Resend
- **Transactional:** Use `resend` SDK for all outbound notifications.
- **Trigger:** Fired via Server Action upon successful Firestore write (e.g., `sendWelcomeEmail` after form submit).
- **Templates:** Use `react-email` components for branded HTML emails.

## 3. FRONTEND ENGINEERING
### A. Styling & Motion (The "Endgame" Stack)
- **CSS:** Tailwind CSS + `clsx` + `tailwind-merge`.
- **Global Scroll:** `@studio-freight/lenis` (Singleton provider in `layout.tsx`).
- **Orchestration:**
    - **GSAP:** Use `ScrollTrigger` for complex timeline animations (Hero reveals, Section pins).
    - **Framer Motion:** Use for discrete UI state transitions (Hover, Modal Enter/Exit).
- **Optimization:** Use `will-change` sparingly. Kill GSAP instances on `useEffect` cleanup.

### B. Validation & Type Safety
- **Schema Validation:** **Zod** is MANDATORY for:
    - Environment Variables (`env.mjs`).
    - Form Inputs (Server Actions).
    - CMS/JSON Data Integrity.
- **TypeScript:** Strict Mode enabled. No `any` types allowed in Production.

## 4. DEPLOYMENT & CI/CD
- **Platform:** Vercel Pro.
- **Build Command:** `next build`.
- **Environment Checks:** Build MUST fail if `TECH_STACK` rules (like linting or type checking) are violated.