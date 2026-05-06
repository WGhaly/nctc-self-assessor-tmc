# Product Requirements Document
## NCTC Invention Readiness Self-Assessment Tool

**Version:** 1.1  
**Date:** April 19, 2026  
**Issuing Authority:** National Center of Technology Commercialization (NCTC)  
**Standards Body:** Academy of Scientific Research & Technology (ASRT)  
**Document Status:** Updated — Open Questions Resolved

---

## 1. Executive Summary

The NCTC Invention Readiness Self-Assessment Tool is a national-level, responsive web application that enables Egyptian inventors and researchers to independently evaluate the maturity of their inventions across three internationally recognized readiness dimensions: Technology Readiness Level (TRL), Manufacturing Readiness Level (MRL), and Commercialization Readiness Level (CRL). The tool operationalizes criteria established by ASRT and NCTC. It collects submitter information at the start, saves each completed assessment to an NCTC admin panel, and supports both Arabic and English throughout. There is no login, no user accounts, and no evidence upload — it is a pure self-assessment tool designed for maximum simplicity and national reach.

---

## 2. Problem Statement

Inventors and researchers in Egypt often lack a structured, accessible mechanism to gauge where their inventions stand in the journey from scientific concept to market-ready product. Without a clear readiness baseline:

- Inventors seek funding or support without knowing their actual stage
- NCTC has no visibility into the national pipeline of inventions and their maturity
- No unified tool exists that collects inventor details, walks them through TRL/MRL/CRL, and stores results in one place for NCTC follow-up

---

## 3. Objectives

1. Provide a single, authoritative national tool for invention readiness self-assessment
2. Collect structured inventor/researcher information so NCTC can identify and follow up on promising submissions
3. Guide inventors through TRL, MRL, and CRL frameworks in plain, accessible language — with in-context help at every level
4. Store all completed assessments in an admin panel accessible to NCTC staff
5. Be fully usable on mobile phones, tablets, and desktop computers
6. Support Arabic and English with equal fidelity, including RTL layout for Arabic

---

## 4. Target Users

### 4.1 Submitters (Public-Facing)

| User Segment | Description |
|---|---|
| **Independent Inventors** | Individuals with a concept or prototype seeking to understand their stage |
| **University Researchers** | Academic staff and postgraduate students commercializing research outputs |
| **Startup Founders** | Early-stage deep-tech founders evaluating invention maturity |
| **R&D Teams** | Corporate or government lab teams assessing internal innovations |

### 4.2 Administrators (Internal)

| User Segment | Description |
|---|---|
| **NCTC Program Officers** | Staff who review submitted assessments and may contact inventors for follow-up |

---

## 5. Scope

### 5.1 In Scope

- Structured intake form: full name, phone number, affiliation, invention/research title
- Guided self-assessment wizard across TRL (9 levels), MRL (10 levels), and CRL (9 levels)
- Info (ⓘ) button on every level within each matrix providing contextual explanation
- Linear, sequential unlock: a user cannot access Level N+1 until Level N has been read and the user has made a selection
- No evidence upload — all fields are self-declared
- Honesty declaration before final submission, including consent to share information with NCTC
- All submitted assessments saved to a backend datastore viewable in an NCTC admin panel
- Bilingual UI: Arabic (default, RTL) and English (LTR), with a language toggle accessible at all times
- Responsive design: mobile phones, tablets, and desktop computers
- NCTC branding throughout

### 5.2 Out of Scope (v1.0)

- User accounts, login, or saved session history
- Integration with any existing NCTC portal or system
- "What's Next" guidance or program recommendations
- Analytics dashboards
- Native iOS/Android app
- Evidence or document upload
- PDF export (candidate for v2.0)

---

## 6. Functional Requirements

### 6.1 Landing Screen

- **FR-001** Display NCTC logo, tool title in both Arabic and English, and a one-line description of the tool's purpose
- **FR-002** Single primary CTA: "Start Assessment" / "ابدأ التقييم"
- **FR-003** Language toggle (AR / EN) visible at all times in the header, persisting across all steps
- **FR-004** Brief explanation of what TRL, MRL, and CRL are — displayed as a collapsible "About the Assessment" / "عن التقييم" section
- **FR-005** Disclaimer: this is a self-assessment tool and does not constitute an official certification

### 6.2 Step 1 — Inventor / Researcher Information Form

- **FR-006** Collect the following fields:

| Field | Arabic Label | Required |
|---|---|---|
| Full Name | الاسم الكامل | Yes |
| Phone Number | رقم الهاتف | Yes |
| Affiliation (institution/company/individual) | الانتماء المؤسسي | Yes |
| Research / Invention Title | عنوان البحث أو الاختراع | Yes |
| Brief Description (max 300 characters) | وصف مختصر | Optional |
| Primary Sector | القطاع الرئيسي | Yes |

- **FR-007** Sector dropdown options (bilingual): Agriculture / الزراعة, Health & Medicine / الصحة والطب, Energy / الطاقة, ICT / تكنولوجيا المعلومات, Manufacturing / التصنيع, Defense & Security / الدفاع والأمن, Environment / البيئة, Other / أخرى
- **FR-008** Phone number field must accept Egyptian and international formats
- **FR-009** Validation: all required fields must be filled before proceeding; inline error messages in the active language

### 6.3 Step 2 — TRL Assessment

- **FR-010** Display a short framing statement before the level list: explain what TRL measures in one sentence
- **FR-011** Present all 9 TRL levels as a vertically scrollable list of selectable cards
- **FR-012** Each card displays: level number badge, level name, and criterion statement in the active language
- **FR-013** Each card has an ⓘ (info) icon button. Tapping/clicking it opens a modal or popover with a deeper plain-language explanation of what that level means in practice — without requiring the user to leave the screen
- **FR-014** Level cards are **sequentially unlocked**: TRL 1 is available on load; each subsequent level unlocks only after the user has selected the previous level. The user cannot skip levels
- **FR-015** The user selects exactly one level — the one that best describes where their invention is today. Selection is a single-choice (radio-style) interaction
- **FR-016** Selected card shows a clear active state (highlighted border, checkmark icon). Locked cards show muted opacity and a lock icon
- **FR-017** "Next: MRL" / "التالي: مستوى الاستعداد التصنيعي" button is enabled only when a TRL level has been selected

### 6.4 Step 3 — MRL Assessment

- **FR-018** Same interaction pattern as TRL (FR-010 through FR-017), applied to MRL levels 1–10
- **FR-019** MRL framing statement explains what manufacturing readiness means in one sentence
- **FR-020** Sequential unlock applied independently: MRL 1 is available on load, each subsequent MRL level unlocks after the previous is selected
- **FR-021** "Next: CRL" / "التالي: مستوى الاستعداد التجاري" button enabled only when an MRL level has been selected

### 6.5 Step 4 — CRL Assessment

- **FR-022** Same interaction pattern applied to CRL levels 1–9
- **FR-023** CRL framing statement explains what commercialization readiness means in one sentence
- **FR-024** Sequential unlock applied independently across CRL 1–9
- **FR-025** "Review & Submit" / "مراجعة وإرسال" button enabled only when a CRL level has been selected

### 6.6 Step 5 — Review & Honesty Declaration

- **FR-026** Display a summary of all entered information: name, phone, affiliation, title, sector, TRL score (number + label), MRL score, CRL score
- **FR-027** Display the following declaration in the active language:

> **English:** "I declare that all information provided in this self-assessment is accurate and truthful to the best of my knowledge. I understand that this is a self-assessment and not an official evaluation. I consent to sharing this information with the National Center of Technology Commercialization (NCTC) for the purpose of supporting and developing innovations in Egypt."

> **Arabic:** "أُقرّ بأن جميع المعلومات الواردة في هذا التقييم الذاتي دقيقة وصادقة في حدود علمي. أفهم أن هذا تقييم ذاتي وليس تقييمًا رسميًا. وأوافق على مشاركة هذه المعلومات مع المركز الوطني لتسويق التكنولوجيا (NCTC) بهدف دعم الابتكارات وتطويرها في مصر."

- **FR-028** Declaration requires an explicit checkbox tick before the Submit button is enabled
- **FR-029** Submit button is disabled until the checkbox is ticked

### 6.7 Step 6 — Submission Confirmation

- **FR-030** After successful submission, display: NCTC logo, thank-you message, submitter's name, unique submission reference number
- **FR-031** Confirmation message (active language):

> **English:** "Thank you, [Name]. Your assessment has been successfully submitted. Our team at NCTC may be in touch if we'd like to learn more about your invention."

> **Arabic:** "شكرًا لك، [الاسم]. تم إرسال تقييمك بنجاح. قد يتواصل معك فريق NCTC إذا أردنا معرفة المزيد عن اختراعك."

- **FR-032** "Start a New Assessment" / "بدء تقييم جديد" button resets everything — no data pre-filled

### 6.8 Admin Panel

- **FR-033** Password-protected admin panel at `/admin`
- **FR-034** Admin login: username + password (no self-registration)
- **FR-035** Submissions table with columns: Date, Reference No., Name, Phone, Affiliation, Invention Title, Sector, TRL, MRL, CRL
- **FR-036** Sort and filter by: date, sector, TRL level, MRL level, CRL level
- **FR-037** Click any row to view full submission detail
- **FR-038** Export all submissions to CSV
- **FR-039** Admin panel in English only

---

## 7. Non-Functional Requirements

### 7.1 Performance
- **NFR-001** First Contentful Paint < 2s on a 4G mobile connection

### 7.2 Accessibility
- **NFR-002** WCAG 2.1 AA compliance
- **NFR-003** Minimum touch target size: 44×44px on mobile
- **NFR-004** Sufficient color contrast across all branded colors

### 7.3 Compatibility
- **NFR-005** Fully functional on iOS Safari 15+, Android Chrome 90+, Chrome/Firefox/Edge/Safari desktop
- **NFR-006** Full RTL layout for Arabic; LTR for English — switching language must flip layout without page reload

### 7.4 Security
- **NFR-007** Admin panel protected by authentication — unauthenticated requests to `/admin` redirect to login
- **NFR-008** All data in transit encrypted via TLS
- **NFR-009** Submission reference numbers use UUID v4 (non-guessable)
- **NFR-010** Passwords stored as bcrypt hashes

### 7.5 Internationalisation
- **NFR-011** All UI strings externalized into language files (en.json / ar.json)
- **NFR-012** Arabic is the default language on first load
- **NFR-013** Language preference persisted for the session

---

## 8. Design & Branding

### 8.1 Color Palette

| Role | Hex | Usage |
|---|---|---|
| Deep Navy | `#01093d` | Primary background, headers, level badges |
| Electric Blue | `#2015ff` | CTAs, active selection state, progress indicators |
| White | `#ffffff` | Body text on dark, card backgrounds |
| Near-Black | `#161616` | Secondary background, footer |

### 8.2 Main Gradient
**60% `#01093d`** into **40% `#161616`** — hero sections, header, full-screen backgrounds

### 8.3 Logo
- NCTC logo in header on all screens; white variant on dark backgrounds; 16px minimum clearspace

### 8.4 Typography
- Arabic: **Cairo** (Google Fonts), weights 400/600/700
- English: **Inter** (Google Fonts), weights 400/600/700
- Body: 16px, line-height 1.6

### 8.5 Components
- Cards: `border-radius: 12px`; active state: `2px solid #2015ff` + checkmark; locked state: opacity 0.4 + lock icon
- ⓘ button: small circular outlined icon; opens modal overlay
- Progress stepper: persistent top bar, Steps 1–6, active/complete/pending states

### 8.6 Breakpoints
- Base: 390px | sm: 640px | md: 768px | lg: 1024px | Max content width: 800px centered

---

## 9. Information Architecture

```
Landing
└── [Start Assessment]
    ├── Step 1: Inventor Information Form
    ├── Step 2: TRL (levels 1–9, sequentially unlocked, ⓘ per level)
    ├── Step 3: MRL (levels 1–10, sequentially unlocked, ⓘ per level)
    ├── Step 4: CRL (levels 1–9, sequentially unlocked, ⓘ per level)
    ├── Step 5: Review + Honesty Declaration + [Submit]
    └── Step 6: Confirmation + Reference Number

/admin (authenticated)
    ├── Submissions Table (sort, filter, export CSV)
    └── Submission Detail View
```

---

## 10. User Stories

| ID | As a… | I want to… | Priority |
|---|---|---|---|
| US-001 | Inventor | Enter name, phone, affiliation, and invention title | High |
| US-002 | Inventor | Read each TRL/MRL/CRL level in plain language before selecting | High |
| US-003 | Inventor | Tap ⓘ on any level to get a contextual explanation | High |
| US-004 | Inventor | Be prevented from skipping levels | High |
| US-005 | Inventor | Complete TRL + MRL + CRL in one flow | High |
| US-006 | Inventor | Tick a declaration and consent before submitting | High |
| US-007 | Inventor | Use the tool fully in Arabic | High |
| US-008 | Inventor | Use the tool on my phone | High |
| US-009 | Inventor | Receive a confirmation with a reference number | High |
| US-010 | NCTC Staff | Log in and view all submitted assessments | High |
| US-011 | NCTC Staff | Filter by sector, TRL, MRL, CRL | High |
| US-012 | NCTC Staff | Export all submissions to CSV | Medium |
| US-013 | NCTC Staff | View full details of any single submission | High |

---

## 11. Sequential Level Unlock Logic

1. On module load: only Level 1 is active; all higher levels are shown but locked (muted, non-interactive)
2. Selecting Level N unlocks Level N+1 for interaction
3. The user may change their selection to any previously unlocked level at any time before pressing Next
4. The ⓘ info button is available on all levels, locked or not — users can read ahead
5. The "Next" button activates only when at least one level is selected
6. No level is skippable

---

## 12. ⓘ Info Button Content Specification

Each level in each matrix must have a separate info payload, distinct from the criterion card text. Content must:
- Explain what activity or evidence typically characterizes the level (without requiring the user to provide evidence)
- Include a short real-world example where applicable
- Be 3–5 sentences, plain language, no jargon
- Be available in both Arabic and English

> Info content to be authored by the development team in consultation with NCTC subject-matter experts before launch.

---

## 13. Criteria Reference (ASRT/NCTC Standard)

### TRL — Technology Readiness Levels

| Level | Label | Criterion |
|---|---|---|
| TRL 1 | Basic Principle Observed | You've identified a scientific principle that could underpin your invention, but haven't yet thought of a specific application for it |
| TRL 2 | Concept Formulated | You've identified a potential application for that principle, but haven't run any experiments to test it yet |
| TRL 3 | Proof of Concept | You've run lab experiments or analytical tests confirming the core idea could work, but the components haven't been integrated or tested together yet |
| TRL 4 | Lab Prototype Built and Tested | You've integrated the key components into a basic working prototype and confirmed it functions in a controlled lab — but it's a rough assembly, not yet tested under realistic conditions |
| TRL 5 | Lab Prototype Tested in a Realistic Setting | You've tested that same prototype in conditions that simulate the real-world environment it's intended for — but it's still at component level, not a full system yet |
| TRL 6 | Full Prototype Demonstrated in a Realistic Setting | You've scaled up to a full representative prototype of the complete system and demonstrated it works in a realistic environment — but not yet in an actual real-world setting |
| TRL 7 | Full Prototype Demonstrated in a Real Operational Setting | You've demonstrated that full prototype in an actual real-world operational environment — but it's still a prototype, not the final production-ready version |
| TRL 8 | Final System Built and Qualified | You've built the final production-ready system and completed all testing and qualification — but it hasn't yet accumulated a track record of sustained real-world operation |
| TRL 9 | System Proven in Real-World Operation | Your final system has been deployed and proven to work reliably under actual operating conditions over time |

### MRL — Manufacturing Readiness Levels

| Level | Criterion |
|---|---|
| MRL 1 | You've started exploring what it would generally take to manufacture something like your invention — but no specific concepts or plans exist yet |
| MRL 2 | You've identified initial ideas for materials, processes, and suppliers — but no assessment of feasibility or cost has been done yet |
| MRL 3 | You've done a first assessment of whether your invention can actually be manufactured — but no risks have been formally identified or documented yet |
| MRL 4 | You've identified and documented the key manufacturing risks with mitigation plans — but haven't tested any materials or processes in a realistic setting yet |
| MRL 5 | You've tested individual components using production materials — but you're still figuring out the processes |
| MRL 6 | You've defined most processes and tested at subsystem level — but haven't proven them in a realistic production setting yet |
| MRL 7 | You've fully demonstrated those processes in a production-representative environment — but no production line exists yet |
| MRL 8 | A complete pilot production line has been built, run, and validated end-to-end |
| MRL 9 | Your invention is now in active low-rate production and consistently meeting quality and cost targets |
| MRL 10 | Your invention is in full-rate production and the focus has shifted to continuous improvement |

### CRL — Commercialization Readiness Levels

| Level | Criterion |
|---|---|
| CRL 1 | You have identified a problem and thought of a unique solution. No specific plans or drawings exist yet |
| CRL 2 | You have looked at the market, rules, and operating environment. You have identified possible applications and competitors. You also have a rough idea of how to make money and what value you offer |
| CRL 3 | You have talked to real customers and done a detailed survey. You have evidence that your business case makes sense. You understand the value chain, competing products, and target applications well |
| CRL 4 | You have written a simple business plan that covers costs, income, supply chain, distribution channels, target markets, and investment needs |
| CRL 5 | You have identified the relevant industry standards and regulations. You have obtained the necessary approvals, or you are in the process of getting them. You have also considered standardization requirements |
| CRL 6 | You have a clear vision and story for your invention. You have a plan to commercialize it, including how to make it, market it, and deliver it |
| CRL 7 | You have a strategic partnership to work with another party, such as a company, partner, or licensee, to sell your invention. Your detailed business plan has been validated. You have a Go-to-Market strategy in place |
| CRL 8 | You have confirmed supply and demand routes. Your value chain, distribution, and marketing plans are operational. Production has been confirmed. Certification and regulatory work is underway |
| CRL 9 | Your final Go-to-Market strategy is ready. All certifications and regulatory requirements have been met. You have a phased launch plan ready to implement |

---

## 14. Arabic Translations — Key UI Strings

| English | Arabic |
|---|---|
| Start Assessment | ابدأ التقييم |
| Invention Readiness Self-Assessment | التقييم الذاتي لجاهزية الاختراع |
| Full Name | الاسم الكامل |
| Phone Number | رقم الهاتف |
| Affiliation | الانتماء المؤسسي |
| Research / Invention Title | عنوان البحث أو الاختراع |
| Brief Description | وصف مختصر |
| Primary Sector | القطاع الرئيسي |
| Technology Readiness Level | مستوى الجاهزية التكنولوجية |
| Manufacturing Readiness Level | مستوى الاستعداد التصنيعي |
| Commercialization Readiness Level | مستوى الاستعداد التجاري |
| Next | التالي |
| Back | رجوع |
| Review & Submit | مراجعة وإرسال |
| Submit | إرسال |
| Start New Assessment | بدء تقييم جديد |
| About the Assessment | عن التقييم |
| Level locked — complete the previous level first | المستوى مقفل — أكمل المستوى السابق أولاً |
| Selected | تم الاختيار |
| Agriculture | الزراعة |
| Health & Medicine | الصحة والطب |
| Energy | الطاقة |
| ICT | تكنولوجيا المعلومات |
| Manufacturing | التصنيع |
| Defense & Security | الدفاع والأمن |
| Environment | البيئة |
| Other | أخرى |
| Basic Principle Observed | رصد المبدأ الأساسي |
| Concept Formulated | صياغة المفهوم |
| Proof of Concept | إثبات المفهوم |
| Lab Prototype Built and Tested | بناء نموذج أولي معملي واختباره |
| Lab Prototype Tested in a Realistic Setting | اختبار النموذج الأولي في بيئة واقعية |
| Full Prototype Demonstrated in a Realistic Setting | إثبات النموذج الكامل في بيئة واقعية |
| Full Prototype Demonstrated in a Real Operational Setting | إثبات النموذج الكامل في بيئة تشغيلية حقيقية |
| Final System Built and Qualified | بناء النظام النهائي وتأهيله |
| System Proven in Real-World Operation | إثبات النظام في التشغيل الفعلي |

> Full bilingual string files (en.json / ar.json) to be delivered as part of the development build.

---

## 15. Acceptance Criteria

| ID | Criterion |
|---|---|
| AC-001 | A user can complete the full intake form + TRL + MRL + CRL assessment in under 10 minutes |
| AC-002 | Fully usable on a 390px wide mobile screen |
| AC-003 | Switching language flips layout (RTL/LTR) without page reload |
| AC-004 | User cannot access TRL Level N+1 without selecting Level N |
| AC-005 | Same sequential-unlock rule applies independently to MRL and CRL |
| AC-006 | ⓘ info button opens modal on every level without navigating away |
| AC-007 | Submit button disabled until honesty declaration checkbox is ticked |
| AC-008 | Every submitted assessment appears in the admin panel within 5 seconds |
| AC-009 | Unauthenticated access to `/admin` redirects to login |
| AC-010 | Admin CSV export contains all fields for all submissions |
| AC-011 | All 28 criteria (9 TRL + 10 MRL + 9 CRL) present verbatim |
| AC-012 | Lighthouse accessibility score ≥ 90 |

---

## 16. Technical Architecture

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React (Vite) | Multi-step wizard, component-based |
| Styling | Tailwind CSS | Mobile-first, RTL plugin available |
| i18n | react-i18next | Mature, RTL direction switching |
| Backend | Node.js + Express | Lightweight API for submission storage |
| Database | PostgreSQL | Structured storage, good admin query support |
| Admin Panel | React (protected route, same codebase) | Single deployable unit |
| Auth (Admin) | JWT + bcrypt | Secure, stateless |
| Hosting | VPS / cloud server | Full control |
| Reference IDs | UUID v4 | Non-guessable |

---

## 17. Data Model — Submission Record

```
Submission {
  id:              UUID (PK)
  created_at:      timestamp
  full_name:       string
  phone:           string
  affiliation:     string
  invention_title: string
  description:     string (nullable)
  sector:          enum
  trl:             integer (1–9)
  mrl:             integer (1–10)
  crl:             integer (1–9)
  language:        enum (ar | en)
  declaration:     boolean (always true on stored record)
}
```

---

## 18. Milestones

| Phase | Deliverable | Target |
|---|---|---|
| Phase 1 | Approved PRD | Week 1 ✓ |
| Phase 2 | UI design (mobile + desktop, AR + EN) | Week 2 |
| Phase 3 | Frontend — intake form + TRL/MRL/CRL wizard with sequential unlock | Week 3 |
| Phase 4 | Backend — submission API + database + admin panel | Week 4 |
| Phase 5 | Bilingual content review + ⓘ info text authoring | Week 5 |
| Phase 6 | QA: mobile, tablet, desktop; RTL; sequential lock; admin panel | Week 6 |
| Phase 7 | UAT with 10 pilot inventors | Week 7 |
| Phase 8 | Production launch | Week 8 |

---

## 19. Resolved Decisions Log

| Question | Decision |
|---|---|
| User accounts? | No |
| Data storage? | All submissions saved to backend DB, viewable in NCTC admin panel |
| Portal integration? | None for v1.0 |
| Arabic translation sign-off? | Not required — development team delivers translation |
| "What's Next" guidance? | Not included in v1.0 |
| Native app or web? | Responsive web app only |
| Analytics? | None |
| Evidence upload? | None — pure self-assessment |
| PDF export? | Out of scope for v1.0 |

---

## 20. Glossary

| Term | Definition |
|---|---|
| **TRL** | Technology Readiness Level (1–9) |
| **MRL** | Manufacturing Readiness Level (1–10) |
| **CRL** | Commercialization Readiness Level (1–9) |
| **ASRT** | Academy of Scientific Research & Technology |
| **NCTC** | National Center of Technology Commercialization |
| **RTL** | Right-to-Left text direction (Arabic) |
| **Sequential Unlock** | UX mechanic: Level N+1 is inaccessible until Level N is selected |
| **ⓘ Info Button** | Circular icon on each level card that opens a contextual explanation modal |

---

*Document ready for design and development handoff.*

**Prepared for:** National Center of Technology Commercialization (NCTC)  
**Under the authority of:** Academy of Scientific Research & Technology (ASRT)
