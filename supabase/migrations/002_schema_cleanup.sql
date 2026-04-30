-- AGNES Phase 1 — Schema Cleanup Migration
-- Run this in Supabase Studio → SQL Editor
-- Drops all existing tables and recreates with cleaned-up schema
--
-- Changes from 001:
--   - Removed owner_cell_encrypted (using owner_phone for notifications)
--   - owner_gmail → email
--   - owner_existing_number → owner_phone
--   - twilio_number → agnes_number
--   - preferred_language → language
--   - timezone/currency/language use CHECK constraints (fixed options)
--   - Removed all Stripe columns from tenants
--   - Added separate payments table (manual Interac/cash tracking)
--   - Table named 'accounts' (AGNES's clients = accounts, their callers = contacts)

-- ============================================================
-- 0. DROP EXISTING TABLES (reverse FK order)
-- ============================================================
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;

-- Drop old trigger function if exists
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- ============================================================
-- 1. ACCOUNTS
-- ============================================================
CREATE TABLE accounts (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name   TEXT NOT NULL,
  owner_name      TEXT NOT NULL,             -- owner's full name (used in SMS personalization)
  owner_email     TEXT,                      -- owner's email (for notifications, login)
  owner_phone     TEXT NOT NULL,             -- owner's cell for SMS notifications
  agnes_number    TEXT NOT NULL UNIQUE,      -- AGNES-assigned Twilio number (hidden from callers)
  status          TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'suspended', 'cancelled')),
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for account lookup by AGNES number (webhook hot path)
CREATE INDEX idx_accounts_agnes_number ON accounts (agnes_number);

-- ============================================================
-- 2. CONVERSATIONS
-- ============================================================
CREATE TABLE conversations (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  contact_phone   TEXT NOT NULL,             -- caller's phone number
  channel         TEXT NOT NULL DEFAULT 'sms'
                  CHECK (channel IN ('sms', 'voice')),
  status          TEXT NOT NULL DEFAULT 'ai_active'
                  CHECK (status IN ('ai_active', 'owner_takeover', 'closed')),
  outcome         TEXT
                  CHECK (outcome IN ('booked', 'owner_handled', 'abandoned', 'no_response')),
  opted_out       BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at      TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_conversations_account_contact
  ON conversations (account_id, contact_phone, created_at DESC);

CREATE INDEX idx_conversations_account_status
  ON conversations (account_id, status) WHERE status = 'ai_active';

-- ============================================================
-- 3. MESSAGES
-- ============================================================
CREATE TABLE messages (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id   UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  twilio_message_sid TEXT UNIQUE,            -- idempotency key
  role              TEXT NOT NULL
                    CHECK (role IN ('assistant', 'caller', 'owner', 'system')),
  direction         TEXT NOT NULL
                    CHECK (direction IN ('inbound', 'outbound')),
  body              TEXT NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_messages_conversation
  ON messages (conversation_id, created_at ASC);

-- ============================================================
-- 4. APPOINTMENTS
-- ============================================================
CREATE TABLE appointments (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id        UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
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
-- 5. PAYMENTS (manual tracking — Interac, cash, cheque)
-- ============================================================
CREATE TABLE payments (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  period          TEXT NOT NULL              -- billing month in YYYY-MM format (e.g. '2026-05')
                  CHECK (period ~ '^\d{4}-(0[1-9]|1[0-2])$'),
  amount          NUMERIC(10,2) NOT NULL,    -- dollar amount (e.g. 99.00, 299.50)
  method          TEXT NOT NULL              -- how they paid
                  CHECK (method IN ('interac', 'cash', 'cheque', 'stripe')),
  reference       TEXT,                      -- e-transfer confirmation #, cheque #, etc.
  note            TEXT,                      -- "Setup fee", "First month", etc.
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_payments_account ON payments (account_id, created_at DESC);

-- ============================================================
-- 6. ROW-LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on accounts"
  ON accounts FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on conversations"
  ON conversations FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on messages"
  ON messages FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on appointments"
  ON appointments FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on payments"
  ON payments FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================
-- 7. AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 8. RE-INSERT TEST ACCOUNT
-- ============================================================
INSERT INTO accounts (business_name, owner_name, owner_phone, agnes_number)
VALUES ('Joe''s Plumbing', 'Joe Smith', '+14168012175', '+19782881860');
