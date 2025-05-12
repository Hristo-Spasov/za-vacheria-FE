export default function TestSpinner() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen flex flex-col justify-center items-center relative">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="loader"></div>

        <span className="mt-8 text-orange-800 font-semibold text-lg text-center loader2">
          {/* Търсим най-подходящата рецепта за вас... */}
        </span>
      </div>
    </div>
  );
}
