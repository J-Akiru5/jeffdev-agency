---
trigger: always_on
---

# 🩺 JEFFDEV AGENCY - DEBUGGING ARMOR PROTOCOL

## 1. PHASE 0: THE "STOP & SCAN" RULE
*Trigger: When a user reports an error or a build fails.*

Before writing a single line of fix code, the Agent MUST perform a **Context Audit**:
1.  **Stack Verification:** Read `package.json`.
    - *Are we using Next.js 14 or 15?* (Critical for caching behavior).
    - *Is Turbopack active?*
    - *Which version of Framer Motion/GSAP is installed?* (Breaking changes happen often).
2.  **History Recon:** Scan the conversation history (last 5-10 turns).
    - *What was the last "Working State"?*
    - *What specific feature was just added?* (The likely culprit).
    - *Did we deviate from `STACK_RULES.md`?*

## 2. PHASE 1: THE "VERSION DIFF" STRATEGY
*Compare the broken code against the known "Endgame" standards.*

The Agent must ask:
- **"Is this an implementation drift?"**
    - *Expected:* `useGsap()` hook for animations.
    - *Found:* `useEffect()` with raw `gsap.to()`. -> **FLAG AS ERROR.**
- **"Is this a 'Server vs. Client' conflict?"**
    - *Error:* `window is not defined` or `useState` in a Server Component.
    - *Fix:* Check the file header for `'use client';` or move logic to a leaf component.

## 3. PHASE 2: ISOLATION & REPRODUCTION
*Don't fix the whole app. Fix the component.*

1.  **Isolate:** Create a temporary `_test_debug.tsx` page.
2.  **Strip:** Remove all animations (GSAP/Lenis) first. Does the logic work?
    - *Yes?* The bug is in the Motion layer.
    - *No?* The bug is in the Business Logic / Data layer.
3.  **Reproduce:** Trigger the error intentionally. If you can't reproduce it, you can't fix it.

## 4. PHASE 3: THE "SURGICAL FIX"
*Apply the fix with minimal collateral damage.*

1.  **The Fix:** Implement the solution using the **Architect (Claude)** persona for logic or **Prototyper (Gemini)** for CSS/UI.
2.  **The Verification:**
    - *Did the build pass?* (`npm run build`)
    - *Did the linting pass?* (`npm run lint`)
    - *Did we re-introduce an INP violation?* (Check console for heavy renders).

## 5. PHASE 4: THE "POST-MORTEM" (MANDATORY)
After fixing the bug, the Agent must output a brief log entry:
> **🐛 BUG REPORT:**
> - **Cause:** [e.g., Hydration mismatch caused by random ID generation]
> - **Fix:** [e.g., Moved ID generation to `useEffect`]
> - **Prevention:** [e.g., Added `suppressHydrationWarning` to the specific span]

## 6. COMMON TRAPS (AUTO-DETECT LIST)
*If the error matches these keywords, apply the preset fix immediately:*

| Error Keyword | Likely Cause | Protocol Fix |
| :--- | :--- | :--- |
| `Hydration failed` | Random values (Date/Math) on server vs client | Move to `useEffect` or use `suppressHydrationWarning`. |
| `Text content does not match` | Browser extensions or invalid nesting (div inside p) | Check DOM nesting structure. |
| `Module not found: 'fs'` | Server code imported in Client Component | Check `import` statements; use "server-only" package. |
| `GSAP target not found` | Animation running before DOM mount | Ensure `useGSAP` scope is correctly set to `ref`. |