---
trigger: always_on
---

# 🔒 JEFFDEV AGENCY - SECURITY & INP PROTOCOLS

## 1. INP OPTIMIZATION (THE "INSTANT RESPONSE" MANDATE)
*Goal: Every interaction must provide visual feedback in <200ms.*

### A. The "Optimistic UI" Pattern
- **Rule:** Never wait for the server to update the UI.
- **Implementation:** Use `useOptimistic` hook for all mutations (Likes, Form Submits).
    - *User clicks "Send"* → *UI instantly shows "Sending..." or adds the comment* → *Server Action runs in background*.
- **Visual Feedback:** All buttons must have an `:active` state (scale down or color shift) that triggers instantly via CSS/Framer Motion, decoupled from the JS logic thread.

### B. Heavy Task Segmentation (Yielding to Main Thread)
- **Transition API:** Wrap non-urgent state updates (e.g., filtering a list, switching tabs) in `startTransition`.
    ```tsx
    const [isPending, startTransition] = useTransition();
    // Allows the UI to remain responsive while the heavy "filter" logic runs
    <button onClick={() => startTransition(() => setFilter(filter))}>
    ```
- **Debouncing:** All search/text inputs MUST be debounced (300-500ms) to prevent freezing the main thread on every keystroke.

### C. Animation Handling (GSAP/Lenis)
- **Lag Smoothing:** Configure GSAP to handle heavy CPU spikes gracefully.
    `gsap.ticker.lagSmoothing(1000, 16);`
- **Will-Change:** Use `will-change: transform` on elements that animate frequently, but REMOVE it after animation ends (to save memory).

## 2. SECURITY HARDENING (THE "FORTRESS" CONFIG)

### A. Next.js Headers (Content Security Policy)
Configure `next.config.mjs` to inject strict headers:
- **`X-DNS-Prefetch-Control`**: On.
- **`X-Frame-Options`**: `DENY` (Prevents clickjacking).
- **`X-Content-Type-Options`**: `nosniff`.
- **`Referrer-Policy`**: `origin-when-cross-origin`.
- **`Content-Security-Policy`**: strict-dynamic (where possible), restricting scripts to trusted domains (Vercel, Analytics, Firebase).

### B. Input Hygiene (Zod + DOMPurify)
- **Server-Side:** TRUST NOTHING. Every `formData` object entering a Server Action must be parsed by Zod.
    ```ts
    const schema = z.object({
      email: z.string().email(),
      message: z.string().max(1000).transform((val) => DOMPurify.sanitize(val))
    });
    ```
- **Client-Side:** Never render raw HTML (`dangerouslySetInnerHTML`) from user input.

### C. Database & API Protection
- **Firebase Rules:**
    - Default to `allow read, write: if false;`.
    - Open ONLY specific collections (`inquiries`) for `create` access, but VALIDATE fields in Security Rules (e.g., `request.resource.data.message.size() < 1000`).
- **Rate Limiting:**
    - Use Vercel's built-in DOS protection.
    - For sensitive actions (Login/Bulk Email), add `upstash/ratelimit` middleware if traffic spikes.

### D. Dependency Auditing
- **Routine:** Run `npm audit` before every major deployment.
- **Secrets:** Use `dotenv-vault` or Vercel Environment Variables. NEVER commit `.env` files.