export const SkeletonBlock = ({ className = "", animate = true }: { className?: string; animate?: boolean }) => (
  <div className={`relative overflow-hidden rounded-lg bg-orange-200/50 ${className}`}>
    {animate && <div className="skeleton-shimmer" />}
  </div>
);

export default function RecipeCardSkeleton() {
  return (
    <div aria-hidden="true" data-slot="recipe-card-skeleton" className="relative flex h-[320px] flex-col overflow-hidden rounded-xl bg-white/80 shadow-lg">
      <SkeletonBlock animate={false} className="h-36 w-full shrink-0 rounded-none" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
        <SkeletonBlock animate={false} className="h-5 w-3/4" />
        <div className="flex gap-2">
          <SkeletonBlock animate={false} className="h-6 w-16 rounded-full" />
          <SkeletonBlock animate={false} className="h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-2">
          <SkeletonBlock animate={false} className="h-2 w-full" />
          <SkeletonBlock animate={false} className="h-2 w-2/3" />
        </div>
        <SkeletonBlock animate={false} className="mt-auto h-8 w-full" />
      </div>
      <div className="skeleton-shimmer" />
    </div>
  );
}
