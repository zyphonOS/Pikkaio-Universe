// app/page.tsx - The Pikkaio Landing Page

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        {/* The Hook */}
        <h1 className="text-5xl font-bold mb-4">PIKK<span className="text-gray-400">AIO</span></h1>
        {/* The Generative Contradiction */}
        <p className="text-xl mb-8 text-gray-300">Reality is a read-only file. <span className="text-white">We have write-access.</span></p>
        {/* The Invocation */}
        <div className="border border-gray-800 p-6 rounded-lg bg-gray-900/50">
          <p className="text-lg mb-4">&quot;Silence speaks loudest. Not absence—compression. Every unsaid word is a vault of force.&quot;</p>
            <a href="/codex">
              <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition">
                Enter the Codex
              </button>
            </a>
        </div>
      </div>
    </div>
  );
}