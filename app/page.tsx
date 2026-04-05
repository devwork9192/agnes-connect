export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AGNES</h1>
        <p className="text-lg text-gray-600 mb-8">
          Missed Call Recovery — Phase 1 MVP
        </p>
        <nav className="space-x-4">
          <a href="/about" className="text-blue-600 hover:underline">
            About
          </a>
          <a href="/how-it-works" className="text-blue-600 hover:underline">
            How It Works
          </a>
          <a href="/pricing" className="text-blue-600 hover:underline">
            Pricing
          </a>
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact
          </a>
        </nav>
        <p className="text-sm text-gray-500 mt-8">
          Catching missed calls with AI since 2026.
        </p>
      </div>
    </main>
  );
}
