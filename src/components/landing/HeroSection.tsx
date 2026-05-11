import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Image
                src="/cooking-icon.png"
                alt="Cooking"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✨</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-800 mb-4 leading-tight">
            Какво ще вечеряме{" "}
            <span className="text-orange-500">днес?</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Не знаеш какво да сготвиш? Отговори на няколко въпроса и ще получиш
            персонализирани рецепти, съобразени с твоите вкусове и предпочитания.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            {/* Primary CTA - Quiz */}
            <Link
              href="/questions"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>🎯</span>
              <span>Намери рецепта</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 pt-8 border-t border-orange-100">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Безплатно</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Бързо и лесно</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Персонализирано</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;