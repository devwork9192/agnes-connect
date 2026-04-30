import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center">
        {/* ── Hero ── */}
        <section className="hero-gradient w-full">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div className="text-left">
              <div className="inline-block mb-6 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm border border-white/10">
                AI Text-Back for Canadian Tradespeople
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Every Missed Call<br />
                <span className="text-accent">Costs You a Job.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-lg leading-relaxed">
                AGNES automatically texts back anyone who calls and you can&apos;t answer — qualifies
                the lead and books the appointment. You stay on the job. AGNES handles the rest.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2.5"><span className="text-emerald-400 font-bold">✓</span> No new phone number — works with yours</li>
                <li className="flex items-center gap-2.5"><span className="text-emerald-400 font-bold">✓</span> Live in under 10 minutes</li>
                <li className="flex items-center gap-2.5"><span className="text-emerald-400 font-bold">✓</span> 24/7 — evenings, weekends, holidays</li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg hover:bg-accent-400 transition-colors"
                >
                  Request Early Access →
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right — Phone mockup */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-75 translate-y-8" />
                <div className="relative w-64 rounded-[2.5rem] bg-gray-950 border-[3px] border-gray-800 shadow-2xl overflow-hidden">
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="w-24 h-6 bg-black rounded-full" />
                  </div>
                  <div className="px-0 pb-4">
                    <div className="flex justify-between px-4 py-1 text-white/30 text-[10px]">
                      <span>9:41</span><span>●●● WiFi</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-2 border-b border-white/5 mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">AG</div>
                      <div>
                        <div className="text-white text-xs font-semibold">AGNES</div>
                        <div className="text-emerald-400 text-[9px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />Active now
                        </div>
                      </div>
                    </div>
                    <div className="px-3 space-y-2.5">
                      <div className="bg-red-600 rounded-2xl px-3 py-2.5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base shrink-0">📵</div>
                        <div>
                          <div className="text-white text-xs font-bold">Missed Call</div>
                          <div className="text-white/70 text-[10px]">(647) 555-0192</div>
                          <div className="text-white/50 text-[9px]">Just now</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-end">
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[7px] font-bold shrink-0">AG</div>
                        <div className="bg-indigo-700 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%]">
                          <p className="text-white text-[11px] leading-relaxed">Hi! We missed your call 👋 How can we help?</p>
                          <p className="text-white/40 text-[9px] mt-0.5">Just now</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-slate-700 rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%]">
                          <p className="text-white text-[11px]">Leaky pipe — urgent!</p>
                          <p className="text-white/40 text-[9px] mt-0.5">You</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-end">
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[7px] font-bold shrink-0">AG</div>
                        <div className="bg-indigo-700 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%]">
                          <p className="text-white text-[11px] leading-relaxed">Got it! Book tomorrow at 9 AM? ✅</p>
                          <p className="text-white/40 text-[9px] mt-0.5">Just now</p>
                        </div>
                      </div>
                      <div className="bg-emerald-950 border border-emerald-500/40 rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm shrink-0 font-bold">✓</div>
                        <div>
                          <div className="text-white text-[11px] font-bold">Appointment Confirmed</div>
                          <div className="text-emerald-400 text-[10px]">Tomorrow · 9:00 AM</div>
                          <div className="text-white/30 text-[9px]">Mike&apos;s Plumbing</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center py-3">
                    <div className="w-20 h-1 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="w-full bg-gray-950 border-y border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-extrabold text-white">62%</div>
              <div className="mt-1 text-xs text-slate-500 uppercase tracking-wide">of callers won&apos;t leave a voicemail</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-accent">&lt;30s</div>
              <div className="mt-1 text-xs text-slate-500 uppercase tracking-wide">text-back after a missed call</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">3×</div>
              <div className="mt-1 text-xs text-slate-500 uppercase tracking-wide">more leads converted vs voicemail</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400">24/7</div>
              <div className="mt-1 text-xs text-slate-500 uppercase tracking-wide">coverage — evenings, weekends, holidays</div>
            </div>
          </div>
        </section>

        {/* ── The Real Cost ── */}
        <section className="w-full bg-white py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 block">The Real Cost</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                  You can&apos;t answer every call. But every missed call is a job you&apos;ll never know you lost.
                </h2>
                <p className="mt-5 text-gray-500 leading-relaxed">
                  When you&apos;re under a sink, on a roof, or driving between jobs — you miss calls. Those callers don&apos;t wait. They call the next contractor on Google. The job is gone.
                </p>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  The average service call in the trades is worth $250–$800. Miss just 3 calls a week and you&apos;re leaving{" "}
                  <span className="font-semibold text-gray-900">$39,000–$125,000 per year</span> on the table.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-red-50 border border-red-100">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-lg">📵</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Without AGNES</div>
                    <div className="mt-1 text-sm text-gray-500">Customer calls while you&apos;re on a job. No answer. They hang up, Google the next contractor, and book with them.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-lg">✅</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">With AGNES</div>
                    <div className="mt-1 text-sm text-gray-500">Customer calls, AGNES texts back in seconds, qualifies the job, and locks in the booking — while you keep working.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-lg">🔧</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Always in control</div>
                    <div className="mt-1 text-sm text-gray-500">Jump into any conversation at any time — AGNES steps aside the moment you reply from your phone.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="w-full bg-gray-950 py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1 text-sm font-medium text-indigo-400">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">3 Steps. Zero Effort from You.</h2>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">Set it up once in under 10 minutes. AGNES runs in the background every single day.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-red-500/40 via-indigo-500/40 to-emerald-500/40" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6 z-10">
                    <div className="w-28 h-28 rounded-2xl bg-red-950 border border-red-800/60 flex flex-col items-center justify-center gap-1 shadow-lg">
                      <span className="text-4xl">📵</span>
                      <span className="text-red-400 text-[10px] font-semibold tracking-wide uppercase">Missed Call</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md">01</div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Call Goes Unanswered</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                    You&apos;re on a job, driving, or after hours. Your existing number forwards the unanswered call to AGNES — no new number needed.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6 z-10">
                    <div className="w-28 h-28 rounded-2xl bg-indigo-950 border border-indigo-700/50 flex flex-col items-center justify-center gap-1.5 px-2 shadow-lg">
                      <div className="flex flex-col gap-1 w-full px-1">
                        <div className="bg-indigo-600 rounded-lg px-2 py-1 text-white text-[8px] self-start leading-tight">Hi! We missed you 👋</div>
                        <div className="bg-slate-600 rounded-lg px-2 py-1 text-white text-[8px] self-end leading-tight">Leaky pipe — urgent</div>
                        <div className="bg-indigo-600 rounded-lg px-2 py-1 text-white text-[8px] self-start leading-tight">Book 9 AM? ✅</div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center shadow-md">02</div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">AGNES Texts Back Instantly</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                    Within 30 seconds, AGNES sends a professional text in your business name — qualifies the job type, urgency, and proposes a time.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6 z-10">
                    <div className="w-28 h-28 rounded-2xl bg-emerald-950 border border-emerald-700/50 flex flex-col items-center justify-center gap-1 shadow-lg">
                      <span className="text-4xl">📅</span>
                      <span className="text-emerald-400 text-[10px] font-semibold">9:00 AM</span>
                      <span className="text-emerald-300 text-[9px]">Confirmed ✓</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-md">03</div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Job is Booked</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                    AGNES checks your Google Calendar, finds an open slot, and confirms the appointment — all via text, without a single call from you.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-14 text-center">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <span className="text-2xl">🔧</span>
                <p className="text-slate-300 text-sm">You stay on the job. <span className="text-white font-semibold">AGNES captures every lead.</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who It's For ── */}
        <section className="w-full bg-slate-50 py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3 block">Who It&apos;s For</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Built for the Trades</h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">If you work with your hands and your phone rings while you&apos;re busy — AGNES was built for you.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { emoji: "🔧", trade: "Plumbing", desc: "Emergency repairs, drain jobs, water heaters" },
                { emoji: "❄️", trade: "HVAC", desc: "AC installs, furnace repairs, no-heat calls" },
                { emoji: "⚡", trade: "Electrical", desc: "Panel upgrades, EV chargers, troubleshooting" },
                { emoji: "🏠", trade: "Roofing", desc: "Leak repairs, inspections, full installs" },
                { emoji: "🪟", trade: "Windows & Doors", desc: "Installs, quotes, emergency glazing" },
                { emoji: "🧹", trade: "Cleaning", desc: "Residential bookings, recurring clients" },
                { emoji: "🌿", trade: "Landscaping", desc: "Spring cleanups, lawn care, quotes" },
                { emoji: "🔨", trade: "Handyman", desc: "Repairs, odd jobs, small renovations" },
              ].map(({ emoji, trade, desc }) => (
                <div key={trade} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-indigo-200 hover:shadow-sm transition-all">
                  <div className="text-3xl mb-3">{emoji}</div>
                  <div className="font-semibold text-gray-900 text-sm">{trade}</div>
                  <div className="mt-1 text-xs text-gray-400 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="w-full bg-white py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3 block">What You Get</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything You Need. Nothing You Don&apos;t.</h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">AGNES is built specifically for tradespeople — not a generic chatbot, not a call centre, just smart follow-up that books jobs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  title: "Instant Text Follow-Up",
                  desc: "AGNES texts back within 30 seconds of a missed call — before your customer can Google the next contractor.",
                },
                {
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  title: "Owner Takeover",
                  desc: "See conversations in real time. Reply from your own phone anytime — AGNES steps aside immediately and lets you handle it.",
                },
                {
                  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                  title: "Google Calendar Booking",
                  desc: "AGNES checks your actual availability and confirms appointments directly in your calendar — no double-bookings, no back-and-forth.",
                },
                {
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  title: "Works with Your Number",
                  desc: "No porting, no new SIM. AGNES uses call forwarding on your existing business number. Customers never know the difference.",
                },
                {
                  icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
                  title: "After-Hours Coverage",
                  desc: "AGNES runs 24/7 — evenings, weekends, holidays. Stop losing Saturday calls to competitors who answer.",
                },
                {
                  icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
                  title: "Smart Lead Qualification",
                  desc: "AGNES asks the right questions — job type, urgency, address — so you show up to every job prepared and ready to quote.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card-hover bg-white rounded-2xl border border-gray-100 p-7">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{title}</h3>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full bg-slate-50 py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Common Questions</h2>
              <p className="mt-4 text-gray-500">Everything you need to know before getting started.</p>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: "Do I need to get a new phone number?",
                  a: "No. AGNES works with your existing business number using call forwarding. When a call goes unanswered, it routes to AGNES automatically. Your customers see your same number — nothing changes for them.",
                },
                {
                  q: "What if I want to take over the conversation?",
                  a: "Just reply to the text thread from your own phone. AGNES detects your message and immediately steps back. You take it from there — no special commands needed.",
                },
                {
                  q: "Will it sound like a robot to my customers?",
                  a: "No. AGNES texts in a natural, professional tone using your business name. Most customers assume they're texting with a real person on your team.",
                },
                {
                  q: "Does it work after hours and on weekends?",
                  a: "Yes — that's one of the biggest wins. AGNES runs 24/7, so Saturday afternoon calls, Sunday evening inquiries, and statutory holiday leads are all captured and booked automatically.",
                },
                {
                  q: "How long does setup take?",
                  a: "Most customers are fully up and running in under 10 minutes. We guide you through the call forwarding setup and personalize AGNES with your business name, trade type, and availability.",
                },
                {
                  q: "What if I don't use Google Calendar?",
                  a: "Google Calendar is included in the early access plan. Support for other calendar systems is on our roadmap — reach out and let us know what you use.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white rounded-xl border border-gray-100 p-6 cursor-pointer">
                  <summary className="font-semibold text-gray-900 list-none flex justify-between items-center gap-4">
                    {q}
                    <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="w-full bg-white py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3 block">Pricing</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">One plan. No hidden fees. Cancel anytime. Priced in CAD.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* ROI callout */}
              <div className="md:col-span-1 bg-indigo-50 rounded-2xl border border-indigo-100 p-7">
                <h3 className="font-bold text-gray-900 mb-4">The math is simple</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Average job value</span><span className="font-semibold text-gray-900">~$350 CAD</span></div>
                  <div className="flex justify-between"><span>Extra jobs / month</span><span className="font-semibold text-gray-900">3–5</span></div>
                  <div className="flex justify-between border-t border-indigo-200 pt-3 mt-3">
                    <span className="font-semibold">Revenue recovered</span>
                    <span className="font-bold text-indigo-600">~$1,050–$1,750</span>
                  </div>
                </div>
                <p className="mt-5 text-xs text-gray-400">AGNES pays for itself with a single recovered job per month.</p>
              </div>
              {/* Pricing card */}
              <div className="md:col-span-2 glow rounded-2xl border-2 border-indigo-100 bg-white p-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold text-indigo-600 uppercase tracking-wide">Early Access</div>
                  <span className="text-xs text-gray-400">Canada-first · CAD pricing</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-gray-900">$99</span>
                  <span className="text-lg text-gray-400">CAD / mo</span>
                </div>
                <p className="text-sm text-gray-400 mb-8">+ $299 CAD one-time setup fee</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-8">
                  {[
                    "AI-powered missed call text-back",
                    "Automatic appointment booking",
                    "Google Calendar integration",
                    "Owner takeover — always in control",
                    "Works with your existing number",
                    "24/7 — including after hours",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
                  className="block w-full rounded-lg bg-indigo-600 py-3.5 text-sm font-semibold text-white text-center shadow hover:bg-indigo-700 transition-colors"
                >
                  Request Early Access →
                </a>
                <p className="mt-4 text-xs text-gray-400 text-center">No long-term contract · Cancel anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full hero-gradient py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Stop Losing Jobs to Voicemail
            </h2>
            <p className="mt-4 text-slate-300 text-lg max-w-xl mx-auto">
              Join the AGNES early access program and start recovering missed calls this week — without changing how you work.
            </p>
            <a
              href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg hover:bg-accent-400 transition-colors"
            >
              Request Early Access →
            </a>
            <p className="mt-5 text-sm text-slate-400">Built for HVAC · Plumbing · Electrical · and more across Canada</p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="w-full bg-gray-950 text-slate-400 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4 H36 A4 4 0 0 1 40 8 V26 A4 4 0 0 1 36 30 H16 L7 38 V30 H4 A4 4 0 0 1 0 26 V8 A4 4 0 0 1 4 4 Z" fill="#4F46E5"/>
                  <text x="20" y="17" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="13" letterSpacing="1">AG</text>
                </svg>
                <span className="font-semibold text-white">AGNES</span>
              </div>
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <a href="mailto:hello@agnesconnect.com" className="hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-600">
              &copy; {new Date().getFullYear()} AGNES &mdash; AI-powered missed call recovery for home service businesses across Canada.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
        