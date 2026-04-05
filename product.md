# Project Overview

## Problem Statement

Solo business operators such as HVAC repair mechanics, plumbers, and electricians miss out on business when they miss a call or SMS from potential customers. This happens when they are:
- At a job site
- Outside business hours
- Facing language barriers

This leads to approximately **20% lost revenue** and, more importantly, loss of trust and goodwill in the community.

## Objective

Setup a small business that operates a simple, scalable system to recover missed calls via an AI-powered service that:
- Catches unanswered calls using the business owner's existing phone number
- Instantly follows up with a text when a call goes unanswered
- Qualifies leads automatically with a motive of setting up an appointment for the owner
- Converts inquiries into booked appointments
- Serves local home service businesses (HVAC repair, plumbers, electricians)

## Goal

- **MVP Version:** End of May 2026
- **First Paying Customer:** End of July 2026

---

## MVP Scope & Key Decisions

- **Geography:** Canada-first (pricing in CAD). CASL applies — a caller who dialled the business number has initiated contact; implied consent covers the single AI follow-up SMS. STOP/opt-out handling implemented as a best practice.
- **Follow-up policy:** One AI follow-up SMS after a missed call. No reminder SMS. No scheduled jobs for MVP.
- **AGNES trigger:** Missed (unanswered / forwarded) calls only. If the owner answers, AGNES plays no role.
- **Owner takeover:** The moment the owner replies to any AGNES notification SMS from their phone, the conversation is marked as owner-handled and AGNES steps aside. AGNES continues to silently relay messages between owner and caller. No commands needed.
- **Calendar:** Google Calendar. Owner authorises AGNES via a one-time Google OAuth link sent by admin during onboarding.
- **Business hours enforcement:** Removed from MVP. AGNES always responds to missed calls.
- **Currency:** CAD for MVP. The `currency` field on the tenant record will also determine jurisdiction (CAD = Canada / CASL, USD = USA / TCPA) for future expansion — no code change needed at that point, just a new tenant record.
- **Payment failure:** AGNES service is suspended immediately when a payment fails. Service resumes automatically on next successful payment. No grace period for MVP.
- **Data retention:** Conversations and messages retained for 90 days, then purged. Not critical for MVP given expected low volume.
- **Intent types:** Specific intent classes to be defined iteratively post-scaffold.
- **Legal pre-launch blockers (not engineering):** A Privacy Policy and Terms of Service must be published before the first paying customer. See legal notes in the Pricing section.

---

## MVP Build — Two Phases

### Phase 1 — Make It Work and Look Real
> Goal: pilot customers (friends/family) are live, AGNES is catching missed calls, and there is a professional URL to share.

**1. Core Platform**
- Next.js project scaffolded and deployed to Vercel (free tier)
- Supabase schema: `tenants`, `conversations`, `messages`, `appointments`
- Twilio webhook handler: missed call → AI generates SMS → send to caller → notify owner
- Owner takeover: first owner reply flips conversation to `owner_takeover`, AGNES relays silently
- Admin provisions tenants manually via Supabase Studio — no dashboard needed yet
- Logging via Vercel function logs

**2. AI Layer**
- Generate a short, warm follow-up SMS (under 160 characters)
- Graceful fallback: "Let me have someone follow up with you shortly" + owner notification via SMS
- Prompt guardrails: no price quotes, no time commitments without calendar check, AGNES identifies as an AI assistant
- No intent classification for Phase 1 — just generate a helpful reply

**3. Appointment Booking**
- Google Calendar API (OAuth 2.0 per tenant, admin-led one-time authorization)
- Check real availability before confirming a time slot
- Create event and confirm via SMS to caller

**4. Marketing Website**
Single-page site — gives pilot customers and early prospects a professional URL to visit:
- About / How It Works / Pricing / Contact
- Privacy Policy + Terms of Service pages (required before any paying customer)
- Wordmark only — no logo design, no demo video yet

---

### Phase 2 — Make It Sellable to Strangers
> Goal: polished enough to charge people you don't know, acquired via word of mouth and cold outreach.

**5. Payment Gateway**
- Stripe integration for subscriptions (use e-transfer or invoice for pilot customers — no Stripe needed in Phase 1)
- Payment failure: suspend tenant on `invoice.payment_failed`, auto-resume on `invoice.paid`

**6. Internal Dashboard**
Simple read-only page — use Supabase Studio for anything deeper:
- List of active tenants
- Today's conversation count per tenant

**7. Compliance**
- STOP / opt-out detection (required before going public — zero risk at pilot scale)

---

### Post-MVP — Do Not Build Now
- Demo video
- Feature flags / subscription enable-disable UI
- Sentry / advanced monitoring
- Community outreach, social media, Google Ads
- Reminder SMS or any scheduled jobs
- Self-serve customer onboarding
---

## Pricing

- **Setup Fee:** $299 CAD (one-time) — covers configuration, no-answer call forwarding setup, and onboarding
- **Monthly Subscription:** $99 CAD/month, cancel anytime

> **Pilot customers (Phase 1):** Collect via e-transfer or invoice. Stripe not needed yet.
> **Public customers (Phase 2):** Stripe subscription required before charging strangers.

### Legal Pre-Launch Requirements
> **Required before any paying customer — not engineering tasks.**
- **Privacy Policy** — discloses: data collected (caller phone numbers, conversation content), 90-day retention, and that conversation content is processed by Azure OpenAI (covered under Microsoft's Data Processing Agreement).
- **Terms of Service** — covers: 30-day money-back guarantee scope, limitation of liability, cancellation terms, and payment failure / suspension policy.

---

## Common Objections & How We Address Them

| Objection | Response | MVP Action |
|---|---|---|
| "What if the AI says something wrong?" | AI never quotes prices or commits to times — collects intent only, then books | Strict prompt guardrails |
| "My customers won't reply to a text" | Even 50% response rate recovers leads that were 100% lost before | Sales messaging |
| "Setup sounds complicated" | One carrier dial code, takes 2 min — we send a 1-page guide per carrier | Onboarding guide |
| "What if I answer and AI still texts?" | AGNES only triggers on `no-answer` / `busy` — not if call was picked up | Code (10 lines) |
| "I already have voicemail" | Voicemail requires caller to leave a message and owner to call back — AGNES books while the lead is still engaged | Sales messaging |
| "What if it double-books me?" | Google Calendar integration checks real availability before confirming | Already in scope |
| "What if AI can't answer the question?" | Graceful fallback: "Let me have [Name] follow up" + owner notification | Prompt design |
| "$299 upfront before I know it works" | 30-day money-back guarantee — zero risk to try | Policy (no code) |
| "Can I cancel anytime?" | Yes — cancel anytime after the first month, stated clearly on the pricing page | Sales messaging |
