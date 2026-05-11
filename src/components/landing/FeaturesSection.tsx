const FeaturesSection = () => {
  const features = [
    {
      icon: "🎨",
      title: "Персонализирани рецепти",
      description:
        "Получаваш рецепти, съобразени с твоите вкусове, диетични ограничения и какво имаш в хладилника.",
    },
    {
      icon: "⚡",
      title: "Бързо и лесно",
      description:
        "Само няколко въпроса и готово! Намери перфектната рецепта за минути, не часове.",
    },
    {
      icon: "🌍",
      title: "Разнообразие",
      description:
        "От българска кухня до интернационални ястия - имаме рецепти за всеки вкус и повод.",
    },
    {
      icon: "💰",
      title: "Напълно безплатно",
      description:
        "Всички рецепти и функционалности са безплатни. Без скрити такси или абонаменти.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-5"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4">
            Защо да избереш нас?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            &quot;За Вечеря&quot; ти помага да откриеш перфектната рецепта бързо и лесно
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100 hover:border-orange-200"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-orange-800 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                100+
              </div>
              <div className="text-gray-600 text-sm">Рецепти</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                50+
              </div>
              <div className="text-gray-600 text-sm">Въпроса</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                100%
              </div>
              <div className="text-gray-600 text-sm">Безплатно</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600 text-sm">Достъпно</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;