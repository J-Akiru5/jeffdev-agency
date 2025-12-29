---
trigger: always_on
---

# 🔍 JEFFDEV AGENCY - SEO & METADATA PROTOCOLS

## 1. CORE STRATEGY: "AUTHORITY FIRST"
- **Title Template:** `%s // JeffDev Studio`
    - *Bad:* "Home - JeffDev Website Maker"
    - *Good:* "Enterprise Cloud Architecture // JeffDev Studio"
- **Description:** concise, B2B-focused. Avoid "freelancer" language. Use "Agency," "Studio," "SaaS Solutions."
- **Canonical URLs:** MANDATORY. Prevent duplicate content issues between the Portfolio subdomain and the Agency main domain.

## 2. NEXT.JS 14 IMPLEMENTATION
### A. Static vs. Dynamic
- **Static Pages (Home/Services):** Use `export const metadata: Metadata = { ... }`.
- **Dynamic Pages (Case Studies):** Use `export async function generateMetadata({ params })`.

### B. Open Graph (The "Link Preview" Win)
- **Technology:** `next/og` (`ImageResponse`).
- **Design:** Do NOT use static PNGs. Generate OG images programmatically that feature:
    - The Page Title (e.g., "Vibecoder Engine").
    - The "Endgame" Grid Background.
    - The "JeffDev" Logo in the corner.
- **Why:** This proves technical competence before they even click the link.

## 3. STRUCTURED DATA (JSON-LD)
*This is how we whisper to Google: "We are a real business."*

### A. Organization Schema (Global)
Inject this into `layout.tsx` `<body>`:
```json
{
  "@context": "[https://schema.org](https://schema.org)",
  "@type": "ProfessionalService",
  "name": "JeffDev Web Development Services",
  "founder": "Jeff Edrick Martinez",
  "legalName": "JeffDev Web Development Services",
  "taxID": "VLLP979818395984",
  "url": "[https://jeffdev.studio](https://jeffdev.studio)",
  "logo": "[https://jeffdev.studio/brand/logo-symbol.png](https://jeffdev.studio/brand/logo-symbol.png)",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Iloilo",
    "addressCountry": "PH"
  },
  "priceRange": "$$$"
}
