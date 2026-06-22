/**
 * Loading skeleton for cuisine listing pages.
 */
export default function CuisineLoading() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900"
      aria-busy="true"
      aria-label="Loading cuisine restaurants"
    >
      <div className="h-16 bg-white dark:bg-slate-950 border-b animate-pulse" />
      <div className="h-52 bg-gradient-to-r from-orange-300 to-orange-400 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 w-56 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-48 bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
