export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-gradient mb-4">VMotiv Notes</h1>
        <p className="text-lg text-neutral-600 mb-8">
          A powerful note-taking application with AI-powered features
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-primary-600 text-white rounded-2xl shadow-soft hover:bg-primary-700 transition-smooth">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white border border-neutral-200 text-neutral-950 rounded-2xl shadow-soft hover:bg-neutral-50 transition-smooth">
            Learn More
          </button>
        </div>
      </div>
    </main>
  )
}
