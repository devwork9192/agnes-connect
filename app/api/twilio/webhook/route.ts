import { NextRequest } from 'next/server'
import { after } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendSMS, validateTwilioSignature } from '@/lib/twilio'
import Logger from '@/lib/logger'

export async function POST(request: NextRequest) {
  const log = new Logger()

  // Twilio POSTs application/x-www-form-urlencoded
  const formData = await request.formData()
  const params: Record<string, string> = {}
  formData.forEach((value, key) => {
    params[key] = value.toString()
  })

  // Validate Twilio signature in production
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'development') {
    const signature = request.headers.get('x-twilio-signature') || ''
    const url = request.url
    if (!validateTwilioSignature(url, params, signature)) {
      log.warn('Invalid Twilio signature', { url })
      return new Response('Forbidden', { status: 403 })
    }
  }

  const callSid = params.CallSid
  const from = params.From       // caller's phone number
  const to = params.To           // our Twilio number

  // --- Voice webhook (incoming/forwarded call) ---
  if (callSid) {
    log.info('Incoming voice call', { callSid, from, to })

    // Process the missed call asynchronously after returning TwiML
    after(async () => {
      await handleMissedCall(callSid, from, to, log)
    })

    // Return <Hangup/> immediately so the caller isn't left waiting
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Hangup/></Response>',
      { headers: { 'Content-Type': 'text/xml' } }
    )
  }

  // --- SMS webhook (future slices) ---
  log.info('Non-voice webhook received (SMS handling not yet implemented)', { params })
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
    { headers: { 'Content-Type': 'text/xml' } }
  )
}

// ─── Missed Call Handler ─────────────────────────────────────
async function handleMissedCall(
  callSid: string,
  callerPhone: string,
  twilioNumber: string,
  log: Logger
) {
  try {
    // 1. Look up account by AGNES number
    const { data: account, error: accError } = await supabaseAdmin
      .from('accounts')
      .select('id, business_name, owner_name, owner_phone, agnes_number, status')
      .eq('agnes_number', twilioNumber)
      .eq('status', 'active')
      .single()

    if (accError || !account) {
      log.error('Account not found', { twilioNumber }, accError ? new Error(accError.message) : undefined)
      return
    }

    log.info('Account matched', { accountId: account.id, business: account.business_name })

    // 2. Dedup — skip if a conversation from this caller already exists in the last 60s
    const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString()
    const { data: recent } = await supabaseAdmin
      .from('conversations')
      .select('id')
      .eq('account_id', account.id)
      .eq('contact_phone', callerPhone)
      .gte('created_at', oneMinuteAgo)
      .limit(1)

    if (recent && recent.length > 0) {
      log.info('Duplicate call within 60s, skipping', { callSid, callerPhone })
      return
    }

    // 3. Create conversation
    const { data: conversation, error: convError } = await supabaseAdmin
      .from('conversations')
      .insert({
        account_id: account.id,
        contact_phone: callerPhone,
        channel: 'voice',
        status: 'ai_active',
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        last_activity_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (convError || !conversation) {
      log.error('Failed to create conversation', {}, convError ? new Error(convError.message) : undefined)
      return
    }

    log.info('Conversation created', { conversationId: conversation.id })

    // 4. Record the inbound call as a system message (includes CallSid for tracing)
    await supabaseAdmin.from('messages').insert({
      conversation_id: conversation.id,
      role: 'system',
      direction: 'inbound',
      body: `Missed voice call from ${callerPhone} (CallSid: ${callSid})`,
    })

    // 5. Send follow-up SMS to caller (hardcoded for Slice 1 — AI in Slice 2)
    const callerMessage =
      `Hi! Thanks for calling ${account.business_name}. ` +
      `We missed your call but we'd love to help. What can we do for you?`

    const callerMsgSid = await sendSMS(account.agnes_number, callerPhone, callerMessage)

    await supabaseAdmin.from('messages').insert({
      conversation_id: conversation.id,
      twilio_message_sid: callerMsgSid,
      role: 'assistant',
      direction: 'outbound',
      body: callerMessage,
    })

    log.info('SMS sent to caller', { callerPhone, messageSid: callerMsgSid })

    // 6. Notify owner via SMS
    if (account.owner_phone) {
      const ownerMessage =
        `📞 Missed call from ${callerPhone}. ` +
        `AGNES sent a follow-up SMS. Reply here to take over the conversation.`

      const ownerMsgSid = await sendSMS(
        account.agnes_number,
        account.owner_phone,
        ownerMessage
      )

      await supabaseAdmin.from('messages').insert({
        conversation_id: conversation.id,
        twilio_message_sid: ownerMsgSid,
        role: 'system',
        direction: 'outbound',
        body: ownerMessage,
      })

      log.info('Owner notified', { messageSid: ownerMsgSid })
    } else {
      log.warn('Owner phone not set — skipping owner notification', { accountId: account.id })
    }
  } catch (err) {
    log.error(
      'handleMissedCall failed',
      { callSid, callerPhone, twilioNumber },
      err instanceof Error ? err : new Error(String(err))
    )
  }
}
