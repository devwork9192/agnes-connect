import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center">
        {/* ── Hero ── */}
        <section className="hero-gradient w-full">
          <div className="max-w-6xl mx-auto px-6 py-28 md:py-36 text-center">
            <div className="inline-block mb-6 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-300 backdrop-blur-sm border border-white/10">
              AI-Powered Missed Call Recovery
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Never Lose a Customer
              <br />
              <span className="text-accent">to a Missed Call Again</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              AGNES catches your unanswered calls, follows up instantly via text,
              qualifies leads, and books appointments — so you stay on the job
              while every opportunity is handled.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg hover:bg-accent-400 transition-colors"
              >
                Request Early Access
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* ── Social proof bar ── */}
        <section className="w-full bg-primary-50 border-y border-primary-100">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-primary-700 font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Built for HVAC, plumbing &amp; electrical
            </span>
            <span className="hidden sm:block text-primary-200">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Works with your existing phone number
            </span>
            <span className="hidden sm:block text-primary-200">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Canada-first, pricing in CAD
            </span>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="w-full bg-white py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                How AGNES Works
              </h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                Three simple steps — you stay focused on the job, AGNES handles the rest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="card-hover relative bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div className="absolute top-6 left-8 text-5xl font-black text-gray-100">1</div>
                <h3 className="text-lg font-semibold text-gray-900">You Miss a Call</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  When you&apos;re on a job, driving, or after hours — the call forwards to AGNES automatically.
                </p>
              </div>

              {/* Step 2 */}
              <div className="card-hover relative bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div className="absolute top-6 left-8 text-5xl font-black text-gray-100">2</div>
                <h3 className="text-lg font-semibold text-gray-900">AGNES Follows Up</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  Within seconds, AGNES sends a friendly, AI-crafted text to the caller and qualifies their needs.
                </p>
              </div>

              {/* Step 3 */}
              <div className="card-hover relative bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div className="absolute top-6 left-8 text-5xl font-black text-gray-100">3</div>
                <h3 className="text-lg font-semibold text-gray-900">Appointment Booked</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  AGNES checks your Google Calendar, finds an open slot, and confirms the booking via text.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="w-full bg-slate-50 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Built for Busy Tradespeople
              </h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                AGNES works quietly in the background so you can focus on what you do best.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-hover bg-white rounded-2xl border border-gray-100 p-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Follow-Up</h3>
                    <p className="mt-1 text-sm text-gray-500">Missed calls get a text within seconds — no leads slip through the cracks.</p>
                  </div>
                </div>
              </div>

              <div className="card-hover bg-white rounded-2xl border border-gray-100 p-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Owner Takeover</h3>
                    <p className="mt-1 text-sm text-gray-500">Reply from your phone and AGNES steps aside — you&apos;re always in control.</p>
                  </div>
                </div>
              </div>

              <div className="card-hover bg-white rounded-2xl border border-gray-100 p-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Scheduling</h3>
                    <p className="mt-1 text-sm text-gray-500">Connects to Google Calendar to check real availability and book appointments.</p>
                  </div>
                </div>
              </div>

              <div className="card-hover bg-white rounded-2xl border border-gray-100 p-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Your Existing Number</h3>
                    <p className="mt-1 text-sm text-gray-500">No new phone number needed — AGNES works with call forwarding on the number your customers already know.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="w-full bg-white py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                One plan. No hidden fees. Cancel anytime.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="glow rounded-2xl border-2 border-primary-100 bg-white p-10 text-center">
                <div className="inline-block rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wide mb-6">
                  Early Access
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">$99</span>
                  <span className="text-lg text-gray-400">CAD / mo</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">+ $299 CAD one-time setup</p>
                <ul className="mt-8 space-y-3 text-left text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    AI-powered missed call follow-up
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Automatic appointment booking
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Google Calendar integration
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Owner takeover — stay in control
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Works with your existing phone number
                  </li>
                </ul>
                <a
                  href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
                  className="mt-8 block w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-white shadow hover:bg-primary-700 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full hero-gradient py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Stop Losing Customers to Voicemail
            </h2>
            <p className="mt-4 text-slate-300 text-lg">
              Join the early access program and let AGNES recover your missed calls starting today.
            </p>
            <a
              href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg hover:bg-accent-400 transition-colors"
            >
              Request Early Access
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="w-full bg-slate-900 text-slate-400 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xs">A</span>
                </div>
                <span className="font-semibold text-white">AGNES</span>
              </div>
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <a href="mailto:hello@agnesconnect.com" className="hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
              &copy; {new Date().getFullYear()} AGNES &mdash; Built for local home-service businesses in Canada.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
        