# AGNES Build Plan — Phase 1 & Phase 2

**Project Goal:** AI-powered missed call recovery for local home service businesses (Canada).  
**Phase 1 Target:** End of May 2026 (pilots live)  
**Phase 2 Target:** End of July 2026 (first paying customer)

---

## Core System Architecture

- **Platform:** Next.js on Vercel (free tier)
- **Database:** Supabase with Row-Level Security
- **AI:** Azure OpenAI (SMS generation)
- **Call Handling:** Twilio (receive forwarded calls, send SMS)
- **Calendar:** Google Calendar API (OAuth per tenant)
- **Payments:** Stripe (Phase 2 only)
- **Email:** SendGrid (Phase 2 only)

---

## Build Strategy: Vertical Slices

Build one **end-to-end user flow** at a time. Each slice includes DB, API, and observability—no "layer by layer" approach.  
Rationale: Validates integration early, forces architectural decisions visible, enables real testing.

---

## Slice 0: Foundation & Observability

**Goal:** Next.js + Supabase scaffolding with structured logging.

**Tasks:**
- [ ] Next.js project setup (App Router, TypeScript, ESLint)
- [ ] Supabase project creation
- [ ] Environment variables configured locally and on Vercel
- [ ] Structured logging utility (request ID, timestamps, correlation IDs)
- [ ] Basic health-check endpoint (`GET /api/health`)
- [ ] Vercel deployment working (free tier)

**Definition of Done:**
- `npm run dev` runs locally without errors
- Deployed to Vercel with preview URL
- Request logs visible in Vercel function logs
- Supabase introspection shows project is live

**Estimated Duration:** 2–4 hours

---

## Slice 1: Missed Call → Static SMS (No AI)

**Goal:** Prove core plumbing: Twilio webhook → Supabase → Twilio SMS.

**User Flow:**
1. Caller dials business number (forwarded to Twilio).
2. Twilio sends `POST /api/twilio/webhook` with missed call event.
3. API looks up tenant by Twilio number.
4. API sends hardcoded SMS to caller.
5. API saves conversation + message record.
6. API notifies owner via SMS.

**Tasks:**
- [ ] Create Supabase schema: `tenants`, `conversations`, `messages`
- [ ] Implement RLS policies (multi-tenant isolation)
- [ ] Create Twilio webhook handler (`POST /api/twilio/webhook`)
  - Parse incoming webhook
  - Validate Twilio signature
  - Lookup tenant
  - Handle idempotency (avoid duplicate responses)
- [ ] Implement outbound SMS logic (call Twilio API)
- [ ] Write test script with sample Twilio webhook payload
- [ ] Deploy and test with Twilio sandbox

**Definition of Done:**
- Webhook handler returns HTTP 200 immediately
- Sample incoming event triggers SMS and DB write
- Conversation + message records visible in Supabase
- Request correlation IDs tracked in logs
- No duplicate SMS on webhook retry

**Estimated Duration:** 4–6 hours

---

## Slice 2: AI-Generated First Reply (Azure OpenAI)

**Goal:** Replace static SMS with AI-generated message + guardrails.

**User Flow:**
1. (Same as Slice 1, but...)
2. API calls Azure OpenAI to generate follow-up SMS.
3. Prompt includes: business name, caller context, guardrails (no pricing, no time commitments).
4. If AI fails, fallback to: `"Let me have [Owner Name] follow up with you shortly."`
5. Send SMS (AI reply or fallback).

**Tasks:**
- [ ] Configure Azure OpenAI credentials (key, endpoint, model)
- [ ] Design and document prompt template
- [ ] Implement prompt guardrail tests (verify no pricing/commitments in output)
- [ ] Implement AI call with error handling
- [ ] Add fallback logic (exponential backoff, then fallback message)
- [ ] Log all AI calls (prompt, response, cost estimate)
- [ ] Write unit tests for guardrails

**Definition of Done:**
- AI response < 160 characters (SMS limit)
- Fallback message sent on Azure timeout/error
- All AI calls logged with tracing
- Guardrail tests pass (mock and real prompts)
- Vercel logs show AI response time

**Estimated Duration:** 3–5 hours

---

## Slice 3: Owner Notification + Owner Takeover

**Goal:** Notify owner, detect owner reply, flip to relay-only mode.

**User Flow:**
1. New lead arrives → owner notified via SMS: `"New lead from [phone]. AGNES is handling. Reply here to take over."`
2. Owner replies anything from their registered phone → conversation flips to `owner_takeover`.
3. First owner message relayed to caller.
4. After takeover, all caller replies forwarded to owner, owner replies forwarded to caller — AGNES silent.

**Tasks:**
- [ ] Add `owner_cell_encrypted` to tenant schema (using Supabase Vault)
- [ ] Implement owner SMS notification after each new lead
- [ ] Implement webhook handler for **inbound SMS** (from owner or caller)
- [ ] Detect if sender is owner_cell → trigger takeover flow
  - Find most recent `ai_active` conversation for this tenant
  - Flip status to `owner_takeover`, set `outcome=owner_handled`
  - Relay owner's message to caller
- [ ] After takeover: relay all caller messages to owner, all owner messages to caller
- [ ] Add conversation status lifecycle tests

**Definition of Done:**
- Owner notification SMS sent on new lead
- First owner reply detected and conversation flipped
- Relay messages are properly saved + forwarded
- Conversation status visible in DB
- Test scenario: simulate owner takeover end-to-end

**Estimated Duration:** 4–6 hours

---

## Slice 4: Inbound Caller SMS & Conversation Memory

**Goal:** Caller can reply; system maintains conversation thread.

**User Flow:**
1. Caller replies to first SMS.
2. API receives inbound SMS from caller.
3. API loads conversation history.
4. If `ai_active`: generate contextual AI reply, append to thread.
5. If `owner_takeover`: relay to owner (no AI).
6. Save all messages with idempotency (avoid duplicate processing).

**Tasks:**
- [ ] Implement inbound SMS parser (extract sender, message body)
- [ ] Load conversation history by contact_phone + tenant_id
- [ ] Branch on conversation status (ai_active vs owner_takeover)
  - `ai_active`: call AI with conversation thread, send reply, append to messages
  - `owner_takeover`: forward to owner, append to messages, no AI
- [ ] Add idempotency key: `twilio_message_sid` UNIQUE constraint
- [ ] Handle duplicate webhook deliveries gracefully (HTTP 200, no duplicate message)
- [ ] Add `last_activity_at` timestamp update on every message

**Definition of Done:**
- Caller can send multiple SMS; thread is maintained
- AI responses reference prior context
- Idempotency test passes (send same webhook twice, verify one message in DB)
- Conversation status and outcome logic verified

**Estimated Duration:** 3–5 hours

---

## Slice 5: Calendar Booking (Google Calendar OAuth + Availability Check)

**Goal:** System can check availability and book appointments.

**User Flow:**
1. Caller requests appointment (e.g., `"I need AC repair tomorrow 2pm"`).
2. API calls AI to extract date/time intent from message.
3. API queries Google Calendar for owner's availability.
4. If slot is free, create calendar event.
5. Confirm to caller via SMS: `"You're booked for Tuesday 2pm — see you then!"`
6. Update conversation: `status=closed, outcome=booked`.

**Tasks:**
- [ ] Add `google_calendar_id`, `google_refresh_token_encrypted` to tenant schema
- [ ] Implement Google OAuth flow (one-time authorization link)
- [ ] Implement token refresh logic (handle 401 gracefully)
- [ ] Implement availability check (query calendar for free slots)
- [ ] Implement event creation logic
- [ ] Add `appointments` table (tenant, conversation, contact_phone, calendar_event_id, scheduled_at, status)
- [ ] Update conversation status=closed, outcome=booked after booking
- [ ] Handle booking errors (calendar API down, invalid time) with fallback

**Definition of Done:**
- Tenant can authorize Google Calendar (one-time)
- Calendar event is created and visible in Google Calendar
- Appointment record saved in DB
- Confirmation SMS sent to caller
- Test scenario: simulate full booking flow

**Estimated Duration:** 5–7 hours

---

## Slice 6: Returning Caller Context Logic

**Goal:** Returning callers get contextual, contextual replies.

**User Flow:**
1. Caller phones again (new missed call).
2. System finds prior conversation(s).
3. Branching:
   - **Open within 24h:** "Hey, we're still connected — anything else?"
   - **Previously abandoned:** "Last time you mentioned [X] — still interested?"
   - **Has upcoming appointment:** "I see you're booked for [date] — is this about that?"
   - **Repeat customer (completed job):** "Good to hear from you again!"

**Tasks:**
- [ ] Implement returning-caller detection (lookup by contact_phone, tenant_id)
- [ ] Load most recent prior conversation(s)
- [ ] Implement branching logic in AI prompt (pass conversation history + outcome)
- [ ] Add context-aware prompt templates for each branch
- [ ] Test all four scenarios

**Definition of Done:**
- Returning caller detection works
- AI generates contextual replies per branch
- Context-aware prompts pass guardrail tests
- Scenarios tested: abandoned, returning, repeat customer

**Estimated Duration:** 2–4 hours

---

## Slice 7: Hardening & Operational Readiness

**Goal:** Reliability before pilots; runbooks in place.

**Tasks:**
- [ ] Add retry logic for Twilio API calls (exponential backoff)
- [ ] Add retry logic for Azure OpenAI (exponential backoff)
- [ ] Implement call deduplication for Twilio webhooks (idempotency keys)
- [ ] Add structured error logging (categorize errors: provider vs. app)
- [ ] Create manual retention purge script (purge conversations older than 90 days)
- [ ] Create runbook: "How to debug a missed call"
- [ ] Create runbook: "How to provision a new tenant"
- [ ] Create runbook: "Payment failure handling" (for Phase 2 preview)
- [ ] Load test with 10+ concurrent conversations
- [ ] Verify Supabase free-tier limits (RLS performance, query counts)

**Definition of Done:**
- All API failures logged with categorization
- Retry logic tested (mock provider failures)
- Retention purge script tested (dry-run, then real)
- Runbooks written and verified (try them once)
- Load test shows no degradation at expected pilot scale

**Estimated Duration:** 4–6 hours

---

## Marketing Website (Phase 1)

**Goal:** Professional presence; legal compliance pages.

**Tasks:**
- [ ] Single-page site: About, How It Works, Pricing, Contact
- [ ] Privacy Policy page (required before first paying customer)
- [ ] Terms of Service page (required before first paying customer)
- [ ] Deploy to Vercel under same project or separate domain
- [ ] Add analytics (optional for Phase 1)

**Definition of Done:**
- Site deploys and is accessible
- Privacy Policy published and visible
- ToS published and visible
- Mobile-responsive

**Estimated Duration:** 3–5 hours (depends on design depth)

---

## Phase 2 Features (After July 1)

Do not build these now. Scope for Phase 2:

1. **Stripe Payment Integration**
   - Checkout page for sign-up
   - Subscription + setup fee ($299 CAD + $99/month)
   - Webhook handlers (`payment.succeeded`, `invoice.payment_failed`, `invoice.paid`)
   - Payment failure → suspend tenant

2. **SendGrid Transactional Email**
   - Welcome email on sign-up
   - Go-live email after provisioning
   - Payment receipt email

3. **Admin Dashboard**
   - List active tenants
   - Daily conversation count per tenant

4. **STOP/Opt-Out Handling**
   - Inbound STOP SMS → set `opted_out=true` on conversation
   - All outbound SMS check opt-out before sending

5. **Google OAuth Verification**
   - Submit to Google for verification (1–4 weeks)
   - Enables any business account to authorize without warning

6. **Sentry Error Monitoring** (only if 10+ customers)

---

## Timeline Summary

| Phase | Duration | Target Date | Key Milestone |
|-------|----------|-------------|---------------|
| Slice 0–2 | 1 week | Apr 11 | Webhook → AI SMS working |
| Slice 3–4 | 1 week | Apr 18 | Owner takeover + multi-turn SMS |
| Slice 5–6 | 1 week | Apr 25 | Booking flow + returning caller |
| Slice 7 + Website | 1 week | May 2 | Hardened, runbooks, site live |
| Pilot period | 3–4 weeks | May 31 | Gather feedback, fix bugs |
| Phase 2 build | 4 weeks | Jul 15 | Stripe, dashboard, compliance |
| First customer | End Jul | Jul 31 | Revenue target |

---

## Session Resume Template

Use this prompt at the start of each session:

```
Resume AGNES build.
Read: build-plan.md and build-log.md
Summarize:
1. Current slice status (in-progress or completed)
2. Any blockers from last session
3. Next exact step(s)
4. Then proceed with implementation.
```
