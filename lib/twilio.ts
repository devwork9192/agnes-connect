import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!

const client = twilio(accountSid, authToken)

/**
 * Send an SMS via Twilio.
 * @param from - The Twilio number to send from (tenant's twilio_number)
 * @param to   - The recipient phone number
 * @param body - The message text
 * @returns The Twilio message SID
 */
export async function sendSMS(
  from: string,
  to: string,
  body: string
): Promise<string> {
  const message = await client.messages.create({ to, from, body })
  return message.sid
}

/**
 * Validate that a request actually came from Twilio.
 * Uses the auth token + X-Twilio-Signature header.
 */
export function validateTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string
): boolean {
  return twilio.validateRequest(authToken, signature, url, params)
}
