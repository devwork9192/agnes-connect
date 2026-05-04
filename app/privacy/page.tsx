import Header from "../components/Header";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Link href="/" className="text-sm text-primary hover:underline mb-8 inline-block">&larr; Back to home</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              AGNES collects caller phone numbers and conversation content to provide
              missed call recovery services. Conversations are retained for 90 days
              and may be processed by third-party AI services. A comprehensive privacy
              policy will be published before accepting any paying customers.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Data We Collect</h2>
            <ul className="list-disc list-inside space-y-1.5 text-gray-600">
              <li>Caller phone number and call metadata</li>
              <li>Conversation content (SMS messages)</li>
              <li>Google Calendar access tokens when the owner authorises booking</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Data Retention</h2>
            <p>Conversation data is retained for 90 days, then permanently purged.</p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Third-Party Services</h2>
            <p>
              AGNES uses Twilio for SMS delivery, OpenAI for message generation, Google Calendar
              for appointment booking, and Supabase for data storage. Each provider has its own
              privacy policy governing data handling.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Contact</h2>
            <p>
              For questions about this policy, email{" "}
              <a href="mailto:info@agnesai.ca" className="text-primary hover:underline">info@agnesai.ca</a>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
