---
trigger: always_on
---

# 💎 JEFFDEV AGENCY - VISUAL CONSTITUTION

## 1. CORE PHILOSOPHY ("THE ENDGAME")
- **Vibe:** Precision Engineering, Stealth Luxury, "Operating System" feel.
- **Rule of Thumb:** If it looks like a standard template, **reject it**.
- **Dark Mode Only:** There is no light mode. The universe is `#050505`.

## 2. PRIMITIVES

### A. Color Palette
- **Canvas (Backgrounds):**
    - `bg-void`: `#050505` (Base Layer)
    - `bg-glass`: `rgba(10, 10, 10, 0.6)` (Card Layer + Backdrop Blur)
- **Accents (Holographic):**
    - `primary-cyan`: `#06b6d4` (Cyan-500)
    - `primary-purple`: `#8b5cf6` (Violet-500)
    - `success-emerald`: `#10b981` (Emerald-500)
- **Borders:**
    - `border-subtle`: `rgba(255, 255, 255, 0.08)`
    - `border-active`: `rgba(255, 255, 255, 0.15)`

### B. Typography
- **Headings:** `Inter` (Variable).
    - Tracking: `-0.02em` (Tight).
    - Weight: `600` (SemiBold) to `900` (Black).
- **Technical/Data:** `JetBrains Mono`.
    - Use for: Tags, Code snippets, DTI numbers, Statistics.
    - Tracking: `-0.01em`.

### C. Geometry (Selected: Precision)
- **Radius:** `rounded-md` (6px) or `rounded-sm` (4px).
- **Constraint:** NEVER use `rounded-xl` or `rounded-2xl` unless it is a massive modal. We are sharp, not bubbly.

## 3. COMPONENT ARCHITECTURE

### A. Buttons (Selected: "Ghost Glow")
The primary action is NOT a solid block of color. It is a void that glows.
- **Base:** `bg-black/50` `backdrop-blur-md` `border border-white/10`.
- **Effect:** Use **Magic UI `Border Beam`** or moving gradient borders.
- **Hover:** Text turns White, Border glows brighter.
- **Code Reference:**
  ```tsx
  <button className="relative overflow-hidden rounded-md border border-white/10 bg-black/20 px-6 py-2 transition-all hover:border-white/20">
    <span className="relative z-10 font-mono text-sm uppercase tracking-wider text-white">
      Get_Quote
    </span>
    {/* Moving Gradient Border Effect */}
    <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 transition-opacity hover:opacity-100" />
  </button>