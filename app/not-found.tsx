export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full opacity-30 blur-3xl"></div>
            <div className="relative flex items-center justify-center">
              <div className="text-6xl font-bold text-primary-600 opacity-20">
                404
              </div>
              <div className="absolute w-20 h-20 bg-primary-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute w-16 h-16 bg-primary-400 rounded-full opacity-20 animate-float"></div>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-3">
          Page Not Found
        </h1>
        
        <p className="text-lg text-neutral-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium bg-primary-600 text-white shadow-soft hover:bg-primary-700 active:bg-primary-800 transition-colors h-12 px-4 py-2"
          >
            Go Home
          </a>
          
          <a
            href="/help"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium border border-neutral-200 bg-white text-neutral-950 shadow-soft hover:bg-neutral-50 active:bg-neutral-100 transition-colors h-12 px-4 py-2"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
