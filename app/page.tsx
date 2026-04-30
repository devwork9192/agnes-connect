import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center">
        {/* ── Hero ── */}
        <section className="w-full grid-pattern relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Every Missed Call<br />
                <span className="text-accent">Costs You a Job.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-lg leading-relaxed">
                AGNES automatically texts back anyone who calls when you can&apos;t answer — qualifies
                the lead and books the appointment. You stay on the job.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-accent-400 transition-colors"
                >
                  Request Early Access →
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  See How It Works
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">✓</span> No new phone number
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">✓</span> We handle setup for you
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">✓</span> 24/7 — evenings, weekends, holidays
                </span>
              </div>
            </div>

            {/* Right — Phone mockup (RingBack style) */}
            <div className="flex justify-center md:justify-end">
              <div className="w-72 rounded-[2.5rem] bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-4 pb-2">
                  <span className="text-white text-xs">9:41</span>
                  <span className="text-white text-xs">●●●● 5G</span>
                </div>
                {/* Contact header */}
                <div className="flex items-center gap-3 px-5 py-3">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">SM</div>
                  <div>
                    <div className="text-white text-sm font-semibold">Sarah Mitchell</div>
                    <div className="text-gray-500 text-xs">+1 (647) 555-0192</div>
                  </div>
                  <span className="ml-auto text-gray-500 text-xs">now</span>
                </div>
                {/* Chat thread */}
                <div className="px-4 pb-6 space-y-3">
                  {/* Missed call banner */}
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-2.5 text-center">
                    <span className="text-red-400 text-xs font-medium">📞 Missed call · 2:34 PM</span>
                  </div>
                  {/* AGNES reply */}
                  <div className="flex justify-end">
                    <div className="bg-accent rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-gray-900 text-[13px] leading-relaxed font-medium">Hey Sarah, sorry I missed you — I&apos;m on a job. This is Mike&apos;s AI assistant. Can I help book you in?</p>
                    </div>
                  </div>
                  {/* Customer reply */}
                  <div className="flex justify-start">
                    <div className="bg-[#2a2a2a] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-white text-[13px]">Yes please! My boiler is leaking, need someone urgently</p>
                    </div>
                  </div>
                  {/* AGNES offer */}
                  <div className="flex justify-end">
                    <div className="bg-accent rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-gray-900 text-[13px] leading-relaxed font-medium">On it. Mike has tomorrow 8am or today 6pm. Which works?</p>
                    </div>
                  </div>
                  {/* Customer pick */}
                  <div className="flex justify-start">
                    <div className="bg-[#2a2a2a] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <p className="text-white text-[13px]">Today 6pm 🙏</p>
                    </div>
                  </div>
                  {/* Confirmation */}
                  <div className="flex justify-end">
                    <div className="bg-accent rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] flex items-center gap-2">
                      <span className="text-gray-900">✓</span>
                      <p className="text-gray-900 text-[13px] font-medium">Job booked · Today 6:00 PM · added to calendar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <section className="w-full">
          {/* Hero image */}
          <div className="w-full h-64 md:h-80 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/trades-bg.jpg")' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
          </div>
          {/* Trust strip */}
          <div className="w-full border-y border-white/10 bg-[#0d0d0d] py-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5">Built for the Trades</p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium text-gray-400">
              <span>Plumbers</span>
              <span>Electricians</span>
              <span>HVAC</span>
              <span>Roofers</span>
              <span>Landscapers</span>
              <span>Handymen</span>
              <span>Painters</span>
              <span>Cleaners</span>
            </div>
          </div>
        </section>

        {/* ── The Problem ── */}
        <section className="w-full py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">The Problem</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Every missed call is a job<br />your competitor just won.
              </h2>
              <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-2xl">
                You&apos;re under a sink, on a roof, or driving between jobs — you can&apos;t pick up. By the time you call back, they&apos;ve already booked someone else.
              </p>
            </div>
            {/* Stat cards */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-[#111] p-8">
                <div className="text-4xl font-extrabold text-accent">62%</div>
                <p className="mt-2 text-sm text-gray-500">of trades calls go unanswered during the workday</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#111] p-8">
                <div className="text-4xl font-extrabold text-accent">85%</div>
                <p className="mt-2 text-sm text-gray-500">of customers won&apos;t leave a voicemail — they just call the next guy</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#111] p-8">
                <div className="text-4xl font-extrabold text-accent">$23k</div>
                <p className="mt-2 text-sm text-gray-500">average revenue lost per tradesperson per year</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="w-full py-20 md:py-28 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Three steps. Zero effort.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative rounded-2xl border border-white/10 bg-[#111] p-8">
                <span className="absolute top-6 right-6 text-6xl font-extrabold text-white/5">01</span>
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="#F59E0B" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">You miss a call</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Your phone is silenced, you&apos;re driving, or you&apos;re on another job. AGNES picks it up the moment it ends.</p>
              </div>
              {/* Step 2 */}
              <div className="relative rounded-2xl border border-white/10 bg-[#111] p-8">
                <span className="absolute top-6 right-6 text-6xl font-extrabold text-white/5">02</span>
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                    <path d="M6 8h.01M10 8h.01M6 12h12M6 16h8" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">We text them back instantly</h3>
                <p className="text-gray-400 text-sm leading-relaxed">A natural, friendly SMS in your voice — within seconds. Asks what they need, where, and how urgent.</p>
              </div>
              {/* Step 3 */}
              <div className="relative rounded-2xl border border-white/10 bg-[#111] p-8">
                <span className="absolute top-6 right-6 text-6xl font-extrabold text-white/5">03</span>
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M9 16l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Job lands in your calendar</h3>
                <p className="text-gray-400 text-sm leading-relaxed">We check your calendar, offer slots, lock it in, and send you a summary. You show up. You get paid.</p>
              </div>
            </div>
            <div className="mt-14 text-center">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <span className="text-2xl">🔧</span>
                <p className="text-gray-300 text-sm">You stay on the job. <span className="text-white font-semibold">AGNES captures every lead.</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What It Does (Features) ── */}
        <section className="w-full py-20 md:py-28 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">What It Does</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Your sharpest tool<br />isn&apos;t in the van.
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl text-lg leading-relaxed">Built specifically for tradespeople — not a generic chatbot, not a call centre, just smart follow-up that books jobs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  ),
                  title: "Instant Text Follow-Up",
                  desc: "AGNES texts back within 30 seconds of a missed call — before your customer can Google the next contractor.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  ),
                  title: "Owner Takeover",
                  desc: "See conversations in real time. Reply from your own phone anytime — AGNES steps aside immediately and lets you handle it.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                  title: "Google Calendar Booking",
                  desc: "AGNES checks your actual availability and confirms appointments directly in your calendar — no double-bookings, no back-and-forth.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  ),
                  title: "Works with Your Number",
                  desc: "No porting, no new SIM. AGNES uses call forwarding on your existing business number. Customers never know the difference.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                  ),
                  title: "After-Hours Coverage",
                  desc: "AGNES runs 24/7 — evenings, weekends, holidays. Stop losing Saturday calls to competitors who answer.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  ),
                  title: "Smart Lead Qualification",
                  desc: "AGNES asks the right questions — job type, urgency, address — so you show up to every job prepared and ready to quote.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card-hover rounded-2xl border border-white/10 bg-[#111] p-7">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{title}</h3>
                      <p className="mt-1 text-gray-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="w-full py-20 md:py-28 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">Pricing</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Simple. Transparent. One plan.</h2>
              <p className="mt-4 text-gray-400">No hidden fees. Cancel anytime.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              {/* Pricing card */}
              <div className="rounded-2xl border border-white/10 bg-[#111] p-10 md:p-12 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1 text-xs font-semibold text-accent uppercase tracking-wide">Early Access</span>
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">$99</span>
                  <span className="text-lg text-gray-500">CAD / mo</span>
                </div>
                <p className="text-sm text-gray-500 mb-8">+ $299 CAD one-time setup fee</p>
                <div className="inline-grid grid-cols-1 gap-3 text-sm text-gray-400 text-left mb-8">
                  {[
                    "AI-powered missed call text-back",
                    "Automatic appointment booking",
                    "Google Calendar integration",
                    "Owner takeover — always in control",
                    "Works with your existing number",
                    "24/7 — including after hours",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <span className="text-accent text-xs">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div>
                  <a
                    href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-accent-400 transition-colors"
                  >
                    Request Early Access →
                  </a>
                </div>
                <p className="mt-4 text-xs text-gray-500">No long-term contract · Cancel anytime</p>

                {/* ROI math — nested card below */}
                <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 px-6 py-4">
                  <h3 className="font-bold text-white text-sm mb-3">The math is simple</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm">
                    <div className="flex flex-col"><span className="text-gray-400">Avg job value</span><span className="font-semibold text-white text-lg">~$350</span></div>
                    <div className="flex flex-col"><span className="text-gray-400">Extra jobs / mo</span><span className="font-semibold text-white text-lg">3–5</span></div>
                    <div className="flex flex-col"><span className="text-gray-400">Revenue recovered</span><span className="font-bold text-accent text-lg">$1,050–$1,750</span></div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Pays for itself with one job.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-20 md:py-28 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Common Questions</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: "Do I need to get a new phone number?",
                  a: "No. AGNES works with your existing business number using call forwarding. When a call goes unanswered, it routes to AGNES automatically. Your customers see your same number — nothing changes for them.",
                },
                {
                  q: "What if I want to take over the conversation?",
                  a: "Just reply to the text thread from your own phone. AGNES detects your message and immediately steps back. No special commands needed.",
                },
                {
                  q: "Does it work after hours and on weekends?",
                  a: "Yes — that's one of the biggest wins. AGNES runs 24/7, so Saturday afternoon calls, Sunday evening inquiries, and holiday leads are all captured and booked automatically.",
                },
                {
                  q: "How long does setup take?",
                  a: "Just one dial code on your carrier — we send you a simple 1-page guide and handle the rest. AGNES is personalized with your business name and trade type before you finish your next coffee.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group rounded-2xl border border-white/10 bg-[#111] p-6 cursor-pointer">
                  <summary className="font-semibold text-white list-none flex justify-between items-center gap-4">
                    {q}
                    <svg className="w-5 h-5 text-gray-500 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="cta-gradient rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Stop losing jobs<br />to your voicemail.
              </h2>
              <p className="mt-4 text-gray-400 text-lg">
                Dead-simple setup. First job booked usually within the first day.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-accent-400 transition-colors"
                >
                  Start free trial →
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="w-full text-gray-500 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="28" height="20" rx="4" fill="#F59E0B" />
                    <polygon points="8,24 8,29 14,24" fill="#F59E0B" />
                    <path d="M10 12h6M10 16h10" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="24" cy="10" r="5" fill="#0a0a0a" stroke="#F59E0B" strokeWidth="1.5" />
                    <path d="M22 10l1.5 1.5L26 8.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-bold text-white">AGNES</span>
                </div>
                <p className="text-sm text-gray-500">The AI receptionist built for tradespeople. Never lose a job to a missed call again.</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Product</h4>
                <nav className="flex flex-col gap-2 text-sm">
                  <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
                  <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
                </nav>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Get in Touch</h4>
                <nav className="flex flex-col gap-2 text-sm">
                  <a href="mailto:hello@agnesconnect.com" className="hover:text-white transition-colors">hello@agnesconnect.com</a>
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </nav>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
              &copy; {new Date().getFullYear()} AGNES &mdash; Built for the trades.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
        