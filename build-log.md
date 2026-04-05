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

## Session 2

**Date:** TBD

### Completed
- [ ] 

### Current State
- 

### Blockers
- 

### Next Session Plan
- 

---

## Session 3

**Date:** TBD

### Completed
- [ ] 

### Current State
- 

### Blockers
- 

### Next Session Plan
- 

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
