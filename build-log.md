# AGNES Build Log

**Started:** April 4, 2026  
**Target Phase 1 Complete:** May 31, 2026  
**First Paying Customer:** July 31, 2026

---

## Session 1 — Apr 4, 2026

### Completed
- [x] Created build plan with 7 vertical slices
- [x] Identified Phase 1 roadmap (foundational work → feature slices → hardening)
- [x] Established session-based build strategy (vertical end-to-end flows)

### Current State
- Not started: Slice 0 (Foundation & Observability)
- No code committed yet

### Blockers
None yet.

### Next Session Plan
1. Start **Slice 0**: Next.js scaffolding + Supabase setup
2. Confirm deployment to Vercel free tier
3. Set up structured logging utility
4. Deploy health-check endpoint
5. Verify all wired locally and on Vercel

---

## Session 2 — Apr 25–26, 2026

### Completed
- [x] **Marketing Website — fully built and branded as AGNES**
  - Rebranded from "PingBack by AGNES" to just "AGNES"
  - Designed modern single-page layout: Hero, How It Works (3-step), Features (4 cards), Pricing, CTA, Footer
  - Privacy Policy page with Header, back link, expanded content
  - Terms of Service page with Header, back link, expanded content
  - Sticky header with logo mark, anchor nav links (work from any page via `/#section`)
  - Google Sign-In button wired to Supabase OAuth
  - Final color palette: **Indigo (#4F46E5) + Peach (#FB923C)**
  - Tested 9 color combinations before landing on final palette
  - Mobile-responsive throughout
- [x] **Slice 0 — mostly complete**
  - Next.js App Router + TypeScript scaffolded
  - Supabase client configured (`lib/supabase.ts`)
  - Structured logger (`lib/logger.ts`)
  - Health-check endpoint (`GET /api/health`)
  - Deployed to Vercel, git push triggers auto-deploy

### Current State
- **Marketing website: DONE** — ready to share the Vercel URL
- **Slice 0: Complete** — health check verified locally and on Vercel
- **Slices 1–7: Not started** — core backend (Twilio, AI, calendar) is next

### Blockers
None.

### Next Session Plan
1. Confirm Vercel env vars are live
2. Start **Slice 1**: Supabase schema (`tenants`, `conversations`, `messages`) + RLS policies
3. Twilio webhook handler for missed calls
4. Send hardcoded SMS to prove plumbing works end-to-end

---

## Session 3 — Apr 26, 2026

### Completed
- [x] **Slice 1 — code complete (pending live test)**
  - Supabase schema migration run: `tenants`, `conversations`, `messages`, `appointments` with RLS + indexes
  - Server-side Supabase client (`lib/supabase-admin.ts`) — service role key, bypasses RLS
  - Twilio SMS helper (`lib/twilio.ts`) — `sendSMS()`, `validateTwilioSignature()`
  - Twilio webhook handler (`app/api/twilio/webhook/route.ts`)
    - Handles incoming voice calls → returns `<Hangup/>` TwiML immediately
    - Async processing via `after()`: tenant lookup, dedup (60s window), conversation + message creation
    - Sends hardcoded follow-up SMS to caller
    - Notifies owner via SMS
    - Twilio signature validation (skipped in dev)
    - Structured logging with request correlation IDs
  - Test script (`scripts/test-webhook.ts`) — simulates Twilio voice webhook locally
  - Twilio SDK installed (`twilio` v5)
  - Build verified — `next build` passes with zero errors

### Current State
- **Slice 1: Code complete** — needs live test with real Twilio call
- **Still needed:** Insert a test tenant row in Supabase, deploy to Vercel, configure Twilio webhook URL

### Blockers
None.

### Next Session Plan
1. Insert test tenant row in Supabase
2. Deploy to Vercel
3. Set Vercel env vars (SUPABASE_SERVICE_ROLE_KEY, TWILIO_*)
4. Configure Twilio voice webhook URL → Vercel endpoint
5. Test end-to-end: call Twilio number → receive SMS
6. Start **Slice 2**: AI-generated first reply (Azure OpenAI)

---

## Known Issues & Workarounds

### Issue: Supabase Free-Tier Project Pause
**Risk:** Free projects pause after 7 days of inactivity; paused DB during webhook event = missed lead.  
**Mitigation (Phase 1):** Accept risk for pilot scale. Add uptime check if moving to production sooner.  
**Phase 2 Action:** Evaluate paid tier or monitor schedule.

### Issue: Google OAuth Testing-Mode Token Expiry
**Risk:** Refresh tokens in testing mode expire quickly (~7 days), breaking calendar booking.  
**Mitigation (Phase 1):** Run 10+ day test with pilot tenant before going live. Monitor token expiry.  
**Phase 2 Action:** Submit for Google OAuth verification to avoid testing-mode limitations.

### Issue: Twilio Webhook Deduplication
**Risk:** Twilio can resend webhooks; duplicate processing causes duplicate SMS.  
**Mitigation:** Add idempotency via `twilio_message_sid` UNIQUE constraint + `CallSid` for call events.

### Issue: Owner Takeover Ambiguity
**Risk:** If two leads are close in time, "find most recent ai_active" can misroute owner messages.  
**Mitigation (Phase 1):** Single active takeover per tenant operational rule. Include lead identifier in owner notification.

---

## Tech Debt & Post-MVP

### Phase 2 Only
- [ ] Stripe payment integration
- [ ] SendGrid transactional email
- [ ] Admin dashboard
- [ ] STOP/opt-out handling (minimal in Phase 1)
- [ ] Google OAuth verification
- [ ] Sentry monitoring (10+ customers)

### Post-MVP
- [ ] Demo video
- [ ] Feature flags / subscription UI
- [ ] Advanced observability (Datadog, custom dashboards)
- [ ] Reminder SMS or scheduled jobs
- [ ] Self-serve customer onboarding

---

## Metrics & Observations

### Pilot Metrics (Track During Phase 1)
- Total tenants: 
- Total conversations:
- Booking success rate (%):
- Owner takeover rate (%):
- Error rate (webhook failures, AI timeouts):
- Avg response time (webhook to SMS):
- Google Calendar failures (count):
- Twilio SMS delivery rate (%):

### Performance Observations
- Vercel cold-start time: ___ ms
- Supabase query latency: ___ ms avg
- Azure OpenAI response time: ___ ms avg
- Twilio SMS delivery time: ___ s

---

## Session Notes & Lessons

### Session 1
- Established vertical-slice strategy to learn system inside-out
- Defined 7 slices from foundation to hardening (not layer-by-layer)
- Planned realistic timeline: ~4 weeks to Phase 1 MVP, 4 more weeks to first paying customer

---

## How to Use This Log

1. **At session start:** Read "Current State" and "Next Session Plan" from last session.
2. **During session:** Update "Completed" and "Blockers" as you go.
3. **At session end:** Update "Current State" and write "Next Session Plan" for next session.
4. **Track metrics:** Optionally log pilot stats and performance observations.
5. **Escalate issues:** If a blocker is blocking progress for >1 hour, note it under "Blockers" and ping for help.
