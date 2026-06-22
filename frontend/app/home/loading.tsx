/**
 * Loading skeleton for the /home restaurant listing page.
 * Shown during server-side data fetching — prevents CLS and improves LCP perception.
 */
export default function HomeLoading() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900"
      aria-busy="true"
      aria-label="Loading restaurants"
    >
      {/* Hero skeleton */}
      <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse" />

      {/* Filter bar skeleton */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Restaurant card skeletons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="h-48 bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
