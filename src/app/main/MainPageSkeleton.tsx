import CardSkeleton, { SkeletonBlock } from "@/components/RecipeCardSkeleton";

const MainPageSkeleton = () => {
  return (
    <section className="relative w-full p-4 md:p-8">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10 isolate pointer-events-none" />

      <div className="relative z-10 grid w-full items-start gap-4 grid-cols-1 lg:grid-cols-4">
        {/* Sidebar skeleton — hidden on mobile */}
        <div className="hidden lg:flex lg:flex-col lg:gap-4 lg:col-span-1 p-2">
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
        <div className="min-w-0 col-span-1 lg:col-span-3 flex flex-col gap-4">
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
