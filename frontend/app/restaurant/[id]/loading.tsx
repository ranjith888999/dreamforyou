/**
 * Loading skeleton for the restaurant detail page.
 * Prevents layout shift during data fetching — improves CLS score.
 */
export default function RestaurantLoading() {
  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
      aria-busy="true"
      aria-label="Loading restaurant"
    >
      {/* Nav skeleton */}
      <div className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 animate-pulse" />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
        {[60, 80, 100].map((w, i) => (
          <div key={i} className={`h-4 w-${w < 100 ? '16' : '24'} bg-slate-200 dark:bg-slate-700 rounded animate-pulse`} />
        ))}
      </div>

      {/* Restaurant hero skeleton */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
          <div className="md:col-span-2 space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
            <div className="flex gap-4">
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-6 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Menu grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
