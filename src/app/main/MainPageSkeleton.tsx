const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-lg bg-orange-200/50 ${className}`}>
    <div className="skeleton-shimmer" />
  </div>
);

const CardSkeleton = () => (
  <div className="rounded-xl overflow-hidden shadow-lg bg-white/80">
    {/* Image placeholder */}
    <SkeletonBlock className="h-48 w-full rounded-none" />
    {/* Content */}
    <div className="p-4 space-y-3">
      <SkeletonBlock className="h-5 w-3/4" />
      <div className="flex gap-2">
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-20 rounded-full" />
      </div>
      <SkeletonBlock className="h-3 w-full" />
      <SkeletonBlock className="h-3 w-5/6" />
      <SkeletonBlock className="h-3 w-2/3" />
      <SkeletonBlock className="h-9 w-full rounded-md mt-2" />
    </div>
  </div>
);

const MainPageSkeleton = () => {
  return (
    <section className="flex h-full w-full items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10 isolate pointer-events-none" />

      <div className="grid h-full w-full gap-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-5 z-10 relative">
        {/* Sidebar skeleton — hidden on mobile */}
        <div className="hidden lg:flex lg:flex-col lg:gap-4 lg:col-span-1 lg:row-span-5 p-2">
          <SkeletonBlock className="h-6 w-2/3 mb-2" />
          <SkeletonBlock className="h-8 w-full" />
          <SkeletonBlock className="h-8 w-full" />
          <SkeletonBlock className="h-8 w-full" />
          <div className="mt-4" />
          <SkeletonBlock className="h-6 w-2/3 mb-2" />
          <SkeletonBlock className="h-8 w-full" />
          <SkeletonBlock className="h-8 w-full" />
          <div className="mt-4" />
          <SkeletonBlock className="h-6 w-2/3 mb-2" />
          <SkeletonBlock className="h-10 w-full" />
        </div>

        {/* Main content area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 lg:row-span-5">
          {/* Search bar skeleton */}
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="flex-1">
              <SkeletonBlock className="h-10 w-full rounded-full" />
            </div>
            {/* Mobile filter button placeholder */}
            <div className="lg:hidden">
              <SkeletonBlock className="h-10 w-10 rounded-lg" />
            </div>
          </div>

          {/* Recipe card grid skeleton */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
      {/* Pagination skeleton */}
      <div className=" flex items-center gap-2 justify-center">
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
      </div>
        </div>
      </div>

    </section>
  );
};

export default MainPageSkeleton;