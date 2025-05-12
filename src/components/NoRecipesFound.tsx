import Link from "next/link";

const NoRecipesFound = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center">
      {/* Food pattern overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10 pointer-events-none"></div>
      <div className="relative z-10 max-w-lg w-full mx-auto bg-white/90 rounded-3xl shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-800 mb-4 text-center">
          Няма намерени рецепти, които да отговарят на вашите предпочитания
        </h2>
        <Link
          href="/questions"
          className="mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold py-3 px-8 rounded-full text-lg shadow-md"
        >
          Опитайте отново
        </Link>
      </div>
    </div>
  );
};

export default NoRecipesFound;
