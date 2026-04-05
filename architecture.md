# Architecture Overview


# Phase 1

Covers the core system: missed call handling, AI responses, calendar booking, owner relay, and marketing website. Runs on Vercel free tier with Supabase. Manual tenant provisioning by admin. 


## Onboarding Flow — Customer Journey


```mermaid
sequenceDiagram
    participant CU as Business Owner
    participant ADM as Admin (You)
    participant DB as Supabase Studio
    participant TW as Twilio
    participant CAL as Google Calendar

    CU->>ADM: Agrees to sign up — pays via e-transfer or invoice
    ADM->>DB: Create tenant record (business name, owner cell, existing number)
    ADM->>TW: Provision backend Twilio number (hidden from customer)
    ADM->>DB: Update tenant: twilio_number, status=active
    ADM->>CU: Email — 1-page carrier forwarding setup guide
    ADM->>CU: Email — Google Calendar auth link (one-time OAuth)
    CU->>CAL: Clicks link, grants AGNES access to calendar
    CU->>CU: Dials carrier forwarding code on existing phone (~2 min)
    ADM->>CU: Optional 15-min call to confirm forwarding is working
    CU->>CU: Test — calls their own number, doesn't answer
    CU->>CU: Receives AI follow-up SMS — live!
```


## Conversation Flow — Missed Call to Booked Appointment


```mermaid
sequenceDiagram
    participant C as Caller (New Lead)
    participant PH as Owner's Existing Number
    participant T as Twilio (AGNES Backend)
    participant API as Next.js API
    participant AI as Azure OpenAI
    participant DB as Supabase
    participant OWN as Business Owner
    participant CAL as Google Calendar

    C->>PH: Calls owner's existing number
    Note over PH: Owner is on a job, no answer after 4 rings
    PH->>T: Carrier forwards call to AGNES Twilio number
    T->>API: POST /api/twilio (missed call webhook)
    API->>DB: Lookup tenant by Twilio number
    API->>DB: Check prior conversations for this caller number
    DB-->>API: No prior record — treat as new lead
    DB-->>API: Tenant config (business name, owner cell, google_calendar_id)
    API->>AI: Generate missed call follow-up SMS
    AI-->>API: Personalised response text
    API->>DB: Save new conversation (status=ai_active)
    API->>T: Send SMS to original caller
    T->>C: "Hi, I missed your call — I'm [Business]. How can I help?"
    API->>OWN: Notify owner via SMS — "New lead from [number]. AGNES is on it. Reply here to take over."
    C->>T: "I need an HVAC repair booked for tomorrow"
    T->>API: POST /api/twilio (inbound SMS)
    API->>AI: Extract appointment request
    AI-->>API: Date/time + details
    API->>CAL: Create calendar event
    CAL-->>API: Confirmation
    API->>T: Send booking confirmation SMS
    T->>C: "You're booked for Tuesday 2pm — see you then!"
    API->>DB: Update conversation status=closed, outcome=booked
```


## Conversation Flow — Returning Caller

```mermaid
sequenceDiagram
    participant C as Returning Caller
    participant T as Twilio (AGNES Backend)
    participant API as Next.js API
    participant AI as Azure OpenAI
    participant DB as Supabase

    C->>T: Calls again (missed, forwarded to AGNES)
    T->>API: POST /api/twilio
    API->>DB: Look up caller phone number
    DB-->>API: Prior conversation found

    alt Open conversation within last 24 hours
        API->>AI: Continue existing thread — skip opener
        AI-->>API: Contextual reply
        API->>T: "Hey, we're still connected — anything else I can help with?"
    else Previously did NOT book (outcome=abandoned)
        API->>AI: Re-engage with prior context
        AI-->>API: "Last time you mentioned [topic] — were you still looking for help?"
        API->>T: Send re-engagement SMS
    else Has upcoming appointment
        API->>AI: Reference appointment context
        AI-->>API: "I see you're booked for [date] — is this about that, or something new?"
        API->>T: Send contextual SMS
    else Repeat customer (past completed job)
        API->>AI: Warm returning customer greeting
        AI-->>API: "Good to hear from you again — how can I help?"
        API->>T: Send warm greeting SMS
    end

    API->>DB: Update or create conversation record (status=ai_active)
```

## Conversation Flow — Owner Takeover via Native SMS

```mermaid
sequenceDiagram
    participant C as Caller
    participant T as Twilio (AGNES Backend)
    participant API as Next.js API
    participant DB as Supabase
    participant OWN as Business Owner (native SMS)

    Note over API,OWN: AGNES is handling conversation (status=ai_active)
    API->>OWN: "New lead from [number] re: AC repair. AGNES is on it. Reply to this message to take over."

    OWN->>T: Owner replies anything from their native phone
    T->>API: POST /api/twilio (inbound from owner_cell)
    API->>DB: Detect sender is owner_cell — find most recent ai_active conversation for this tenant
    API->>DB: Set conversation status=owner_takeover, outcome=owner_handled
    API->>T: Relay owner's first message to caller
    T->>C: Owner's message (caller sees seamless continuation)

    C->>T: Caller replies
    T->>API: POST /api/twilio (inbound from caller)
    API->>DB: status=owner_takeover — skip AI, no response generated
    API->>T: Forward caller reply to owner's phone
    T->>OWN: Caller's message forwarded

    Note over OWN,C: Owner and caller continue natively — AGNES relays silently, no further AI involvement
```

## Data Model

> All Phase 2 columns — `stripe_customer_id`, `stripe_subscription_id`, `subscription_status`, `plan_id`, `cancelled_at`, `setup_fee_paid_at` — and `opted_out` are created in the Phase 1 migration as nullable/false. No migration needed when Phase 2 is activated.

```mermaid
erDiagram
    TENANTS {
        uuid id PK
        string business_name
        string owner_existing_number
        string owner_cell_encrypted
        string owner_gmail
        string twilio_number
        string google_calendar_id
        string google_refresh_token_encrypted
        string timezone
        string currency
        string preferred_language
        string status
        timestamp created_at
        timestamp updated_at
    }
    CONVERSATIONS {
        uuid id PK
        uuid tenant_id FK
        string contact_phone
        string channel
        string status
        string outcome
        timestamp expires_at
        timestamp last_activity_at
        timestamp created_at
    }
    MESSAGES {
        uuid id PK
        uuid conversation_id FK
        string twilio_message_sid
        string role
        string direction
        string body
        timestamp created_at
    }
    APPOINTMENTS {
        uuid id PK
        uuid tenant_id FK
        uuid conversation_id FK
        string contact_phone
        string calendar_event_id
        timestamp scheduled_at
        string status
        string notes
        timestamp created_at
        timestamp updated_at
    }

    TENANTS ||--o{ CONVERSATIONS : has
    CONVERSATIONS ||--o{ MESSAGES : contains
    TENANTS ||--o{ APPOINTMENTS : books
    CONVERSATIONS ||--o{ APPOINTMENTS : generates
```

## Notes — Phase 1

- **Number model:** The owner keeps their existing phone number. AGNES uses a hidden Twilio number as the forwarding target. Callers always dial the owner's number and never see the Twilio number.
- **Call forwarding:** Owner configures no-answer forwarding on their carrier using a single dial code (~2 min). AGNES provides per-carrier instructions at onboarding.
- **AGNES trigger:** Missed calls only. Twilio call status callbacks (`no-answer`, `busy`, `failed`) gate all AI activity. If the owner answers, AGNES plays no role.
- **Voice TwiML:** The webhook must return `<Hangup/>` immediately when a forwarded call arrives — this ends the call gracefully and allows the StatusCallback to fire the SMS chain.
- **Follow-up policy:** One AI-generated SMS after a missed call. No reminders. No scheduled jobs.
- **Owner takeover:** When the owner replies to any AGNES notification from their `owner_cell`, the conversation is marked `owner_takeover` and AGNES stops generating AI responses. AGNES continues relaying silently. No commands needed — first reply triggers it.
- **CASL compliance:** Canada-first. Callers who dialled the owner's number provide implied consent for a single service-response SMS. The `currency` field determines jurisdiction for future US onboarding (`USD` = TCPA).
- **Data retention:** `expires_at` is set to `created_at + 90 days`. Manual purge for Phase 1.
- **Idempotency:** `twilio_message_sid` has a UNIQUE constraint on `MESSAGES`. Duplicate webhook deliveries are silently ignored.
- **Serverless timeout:** The handler returns HTTP 200 immediately. AI calls, DB writes, and outbound SMS are dispatched asynchronously via Vercel `waitUntil`.
- **Conversation lifecycle:** `status`: `ai_active` → `owner_takeover` → `closed`. `outcome`: `booked`, `owner_handled`, `abandoned`, or `no_response`.
- **Multi-tenancy:** All data is scoped by `tenant_id`. Supabase Row-Level Security (RLS) enforces isolation — RLS policies must be authored alongside the schema migration.
- **Google Calendar OAuth:** Admin adds owner Gmail to the Google Cloud Console allowlist (30 sec per customer), then sends a one-time OAuth link in the go-live email. AGNES stores the refresh token encrypted via Supabase Vault and handles token refresh transparently (`401` → refresh → retry). The app stays in testing mode for Phase 1 — no Google verification needed.
- **Encryption:** `owner_cell_encrypted` and `google_refresh_token_encrypted` use Supabase Vault (built-in, free tier).


# Phase 2

> Adds to Phase 1: Stripe payment integration, SendGrid transactional email, Sentry error monitoring, Admin Dashboard UI, STOP/opt-out compliance, and automated onboarding notification from Stripe.


## Onboarding Flow — Customer Journey

> Owner signs up via the website. Stripe handles payment. Admin is notified and completes provisioning.

```mermaid
sequenceDiagram
    participant CU as Business Owner
    participant WEB as AGNES Website
    participant STR as Stripe
    participant SG as SendGrid
    participant ADM as Admin (You)

    CU->>WEB: Visits site, clicks Sign Up
    WEB->>STR: Redirect to Stripe Checkout
    CU->>STR: Enters payment details
    STR-->>CU: Payment confirmed
    STR->>WEB: Webhook — payment.succeeded
    SG->>CU: Welcome email — "You'll be live within 24 to 48 hours"
    ADM->>ADM: Receives new signup notification
    ADM->>CU: Provisions Twilio number + sends forwarding guide + OAuth link
    CU->>CU: Dials carrier forwarding code on existing phone (~2 min)
    CU->>CU: Clicks OAuth link — grants AGNES calendar access
    SG->>CU: Go-live confirmation — AGNES is now catching your missed calls
    CU->>CU: Test — calls their own number, doesn't answer
    CU->>CU: Receives AI follow-up SMS — live!
```

## Onboarding Flow — Admin Setup

> Stripe payment triggers admin notification. Admin still manually provisions the Twilio number. Full self-serve provisioning is post-Phase 2.

```mermaid
sequenceDiagram
    participant STR as Stripe
    participant API as Next.js API
    participant DB as Supabase
    participant ADM as Admin (You)
    participant TW as Twilio Console
    participant SG as SendGrid
    participant CU as Business Owner

    STR->>API: POST /api/stripe/webhook (payment.succeeded)
    API->>DB: Create pending tenant record
    API->>SG: Notify admin — new signup with customer details
    Note over ADM: Admin receives email notification
    ADM->>TW: Provision Twilio number for this tenant
    ADM->>DB: Update tenant — twilio_number, owner_gmail, status=active
    ADM->>CU: Send carrier forwarding guide + Google Calendar OAuth link
    CU->>CU: Completes setup steps
    ADM->>CU: Optional 15-min onboarding call
```

## Data Model — Phase 2 (Full Target Schema)

> Adds to Phase 1 schema: `opted_out` on CONVERSATIONS (STOP/opt-out handling), and Stripe fields populated on TENANTS.

```mermaid
erDiagram
    TENANTS {
        uuid id PK
        string business_name
        string owner_existing_number
        string owner_cell_encrypted
        string owner_gmail
        string twilio_number
        string google_calendar_id
        string google_refresh_token_encrypted
        string timezone
        string currency
        string preferred_language
        string stripe_customer_id
        string stripe_subscription_id
        string subscription_status
        string plan_id
        timestamp setup_fee_paid_at
        timestamp cancelled_at
        string status
        timestamp created_at
        timestamp updated_at
    }
    CONVERSATIONS {
        uuid id PK
        uuid tenant_id FK
        string contact_phone
        string channel
        string status
        string outcome
        boolean opted_out
        timestamp expires_at
        timestamp last_activity_at
        timestamp created_at
    }
    MESSAGES {
        uuid id PK
        uuid conversation_id FK
        string twilio_message_sid
        string role
        string direction
        string body
        timestamp created_at
    }
    APPOINTMENTS {
        uuid id PK
        uuid tenant_id FK
        uuid conversation_id FK
        string contact_phone
        string calendar_event_id
        timestamp scheduled_at
        string status
        string notes
        timestamp created_at
        timestamp updated_at
    }

    TENANTS ||--o{ CONVERSATIONS : has
    CONVERSATIONS ||--o{ MESSAGES : contains
    TENANTS ||--o{ APPOINTMENTS : books
    CONVERSATIONS ||--o{ APPOINTMENTS : generates
```

## Notes — Phase 2

- **Stripe integration:** Webhooks `payment.succeeded`, `invoice.payment_failed`, `invoice.paid`, and `customer.subscription.deleted` update tenant `status` and `subscription_status` automatically.
- **Payment failure:** On `invoice.payment_failed`, tenant `status` is set to `suspended` and AGNES stops responding. Status returns to `active` automatically on `invoice.paid`.
- **STOP / opt-out:** Inbound STOP sets `opted_out = true` on the conversation. All outbound paths check this flag before sending. Required before going public.
- **SendGrid:** Transactional emails for welcome, go-live, and payment receipts. Free tier: 100/day.
- **Sentry:** Add when Vercel function logs alone are insufficient (typically at 10+ customers).
- **Admin Dashboard:** Read-only page showing tenants and daily conversation counts. Use Supabase Studio for anything deeper.
- **Google OAuth verification:** Required before going public so any Google account can authorize without a warning screen. Takes 1–4 weeks — requires a published Privacy Policy URL. Start before building the Phase 2 sign-up flow.
- **Customer offboarding:** When a customer cancels, stamp `cancelled_at`, release the Twilio number back to the pool, revoke Google Calendar OAuth, and set `status = cancelled`. Close any open conversations. No data is deleted — retained for the 90-day window then purged normally.