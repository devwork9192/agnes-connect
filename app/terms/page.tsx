import Header from "../components/Header";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Link href="/" className="text-sm text-primary hover:underline mb-8 inline-block">&larr; Back to home</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              These Terms govern the use of AGNES. This pilot site is provided for
              early access customers. A comprehensive Terms of Service will be published
              before signing up paying customers and will include refund and liability terms.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Service Description</h2>
            <p>
              AGNES is an AI-powered missed call recovery service. When a call to your
              business goes unanswered, AGNES sends an automated SMS follow-up to the
              caller to qualify the lead and, where possible, book an appointment.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Payments</h2>
            <p>
              Pilot customers will be billed per agreed terms. Public customers will use
              subscription billing. Service is suspended immediately on payment failure
              and resumes automatically when payment succeeds.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">AI Disclosure</h2>
            <p>
              AGNES uses artificial intelligence to generate SMS responses. AGNES identifies
              itself as an AI assistant in all interactions and will not make price quotes
              or time commitments without verifying calendar availability.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Contact</h2>
            <p>
              For questions about these terms, email{" "}
              <a href="mailto:hello@agnesconnect.com" className="text-primary hover:underline">hello@agnesconnect.com</a>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
