import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>

      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4">
            Готов ли си за вкусно приключение?
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Не губи повече време в чудене какво да сготвиш. Отговори на няколко
            въпроса и открий перфектната рецепта за теб!
          </p>

          {/* CTA Button */}
          <Link
            href="/questions"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>🚀</span>
            <span>Започни сега!</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          {/* Additional Info */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Без регистрация</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Отнема по-малко от 2 минути</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>100% безплатно</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;