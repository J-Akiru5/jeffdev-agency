---
trigger: always_on
---

# 📈 JEFFDEV AGENCY - STARTUP BUSINESS LOGIC

## 1. THE "REVENUE FILTER" (PRIMARY DIRECTIVE)
Before writing any feature, the Agent must evaluate it against the **ROI Test**:
1.  **Does this drive leads?** (Conversion)
2.  **Does this build trust?** (Authority)
3.  **Does this save time?** (Automation)
*If the answer is NO, reject the request and propose a high-value alternative.*

## 2. CONVERSION ARCHITECTURE
*Every interaction must lead to a capture event.*
- **The "No Dead Ends" Rule:** Never leave a user at the bottom of a page without a next step.
    - *Bad:* A footer with just copyright.
    - *Good:* "Ready to Scale? [Start Project]" button above the footer.
- **The "High-Ticket" Modal:** Instead of a generic `mailto:` link, use a structured **Intake Form** (Server Action) that qualifies the client (e.g., Budget Range, Timeline).
- **Pricing Psychology:** Always present services as **"Investment Packages"** (Productized Services), not hourly rates.

## 3. TRUST & LEGALITY (THE "ENTERPRISE" SHIELD)
- **Identity Enforcement:**
    - **Voice:** Always "We/The Studio." Never "I/Me."
    - **Legal Name:** Invoices and Footers MUST use "JeffDev Web Development Services" (DTI: VLLP979818395984).
- **Risk Mitigation:**
    - **TOS Checkboxes:** Mandatory on all forms.
    - **Cookie/Data Consent:** Implicit or explicit depending on region (Target: Global/US-Standard).
    - **No "Student" Language:** Flag terms like "cheap," "learning," or "freelancer." Replace with "efficient," "innovating," and "partner."

## 4. PRODUCT-LED SERVICES (VIBECODER STRATEGY)
*We don't just sell time; we sell our Proprietary Engine.*
- **The "Secret Sauce" Narrative:** When describing services, reference internal tools (e.g., "Powered by Vibecoder Engine"). This justifies higher prices.
- **Show, Don't Just Tell:** Use the `case_studies` data to show *metrics* (e.g., "Reduced load time by 40%"), not just screenshots.

## 5. ANALYTICS & VISIBILITY
- **Event Tracking:** Every CTA click must have a tracking tag (e.g., `onClick={() => track('lead_submit')}`).
- **CRM Integration:** Form submissions should ideally pipe into a structured list (Firestore) for follow-up, not just an email inbox.

## 6. MVP EXECUTION (SPEED > PERFECTION)
- **The "Pareto" Code:** Build the 20% of features that deliver 80% of value.
- **Hardcode First:** If a feature (like a Blog) delays launch by >2 days, hardcode it or link externally (`portfolio.jeffdev.studio`) and ship the site.