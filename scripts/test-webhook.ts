/**
 * Test script — simulates a Twilio voice webhook hitting the local API.
 *
 * Usage:
 *   npx tsx scripts/test-webhook.ts
 *
 * Prerequisites:
 *   1. `npm run dev` running on port 3000
 *   2. An account row in Supabase with agnes_number = your TWILIO_PHONE_NUMBER
 *      (see the INSERT example below)
 */

const WEBHOOK_URL = 'http://localhost:3000/api/twilio/webhook'

// Simulated Twilio voice webhook parameters
const params = new URLSearchParams({
  CallSid: 'CA_TEST_' + Date.now(),
  AccountSid: process.env.TWILIO_ACCOUNT_SID || 'AC_TEST_PLACEHOLDER',
  From: '+14168012175',          // fake caller number (change to your verified number for real SMS)
  To: '+19782881860',            // your Twilio number — must match a tenant's agnes_number
  CallStatus: 'ringing',
  Direction: 'inbound',
  ApiVersion: '2010-04-01',
})

async function main() {
  console.log('🔔 Sending test voice webhook to', WEBHOOK_URL)
  console.log('   CallSid:', params.get('CallSid'))
  console.log('   From:', params.get('From'))
  console.log('   To:', params.get('To'))
  console.log()

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const body = await response.text()

  console.log('📥 Response status:', response.status)
  console.log('📥 Response body:')
  console.log(body)
  console.log()

  if (response.ok && body.includes('<Hangup/>')) {
    console.log('✅ TwiML contains <Hangup/> — voice handler is working')
    console.log('   Check Vercel/server logs for async processing results.')
    console.log('   Check Supabase for new conversation + message rows.')
  } else {
    console.log('❌ Unexpected response — check the webhook handler.')
  }
}

main().catch(console.error)
