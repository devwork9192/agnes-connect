-- AGNES Phase 1 — Core Schema Migration
-- Run this in Supabase Studio → SQL Editor
-- Creates: tenants, conversations, messages, appointments
-- Includes RLS policies for multi-tenant isolation

-- ============================================================
-- 1. TENANTS
-- ============================================================
CREATE TABLE IF NOT EXISTS tenants (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name   TEXT NOT NULL,
  owner_existing_number TEXT NOT NULL,       -- owner's real phone (what callers dial)
  owner_cell_encrypted  TEXT,                -- owner's cell for notifications (encrypted via Vault)
  owner_gmail     TEXT,
  twilio_number   TEXT NOT NULL UNIQUE,      -- hidden AGNES Twilio number (forwarding target)
  google_calendar_id            TEXT,
  google_refresh_token_encrypted TEXT,
  timezone        TEXT NOT NULL DEFAULT 'America/Toronto',
  currency        TEXT NOT NULL DEFAULT 'CAD',
  preferred_language TEXT NOT NULL DEFAULT 'en',
  status          TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'suspended', 'cancelled')),
  -- Phase 2 columns (nullable, created now to avoid future migration)
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  subscription_status     TEXT,
  plan_id                 TEXT,
  cancelled_at            TIMESTAMPTZ,
  setup_fee_paid_at       TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for tenant lookup by Twilio number (webhook hot path)
CREATE INDEX IF NOT EXISTS idx_tenants_twilio_number ON tenants (twilio_number);

-- ============================================================
-- 2. CONVERSATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS conversations (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  contact_phone   TEXT NOT NULL,             -- caller's phone number
  channel         TEXT NOT NULL DEFAULT 'sms'
                  CHECK (channel IN ('sms', 'voice')),
  status          TEXT NOT NULL DEFAULT 'ai_active'
                  CHECK (status IN ('ai_active', 'owner_takeover', 'closed')),
  outcome         TEXT
                  CHECK (outcome IN ('booked', 'owner_handled', 'abandoned', 'no_response')),
  -- Phase 2 column
  opted_out       BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at      TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for looking up conversations by caller phone + tenant (returning caller check)
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_contact
  ON conversations (tenant_id, contact_phone, created_at DESC);

-- Index for finding active conversations per tenant (owner takeover lookup)
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_status
  ON conversations (tenant_id, status) WHERE status = 'ai_active';

-- ============================================================
-- 3. MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id   UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  twilio_message_sid TEXT UNIQUE,            -- idempotency key — prevents duplicate processing
  role              TEXT NOT NULL
                    CHECK (role IN ('assistant', 'caller', 'owner', 'system')),
  direction         TEXT NOT NULL
                    CHECK (direction IN ('inbound', 'outbound')),
  body              TEXT NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for loading conversation thread in order
CREATE INDEX IF NOT EXISTS idx_messages_conversation
  ON messages (conversation_id, created_at ASC);

-- ============================================================
-- 4. APPOINTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id         UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  conversation_id   UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  contact_phone     TEXT NOT NULL,
  calendar_event_id TEXT,
  scheduled_at      TIMESTAMPTZ NOT NULL,
  status            TEXT NOT NULL DEFAULT 'confirmed'
                    CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================
-- 5. ROW-LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (our API uses service role key)
-- These policies allow the service_role full access.
-- No anon/public access — all data is server-side only.

-- Tenants: service role can do everything
CREATE POLICY "Service role full access on tenants"
  ON tenants FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Conversations: service role can do everything
CREATE POLICY "Service role full access on conversations"
  ON conversations FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Messages: service role can do everything
CREATE POLICY "Service role full access on messages"
  ON messages FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Appointments: service role can do everything
CREATE POLICY "Service role full access on appointments"
  ON appointments FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================
-- 6. AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
