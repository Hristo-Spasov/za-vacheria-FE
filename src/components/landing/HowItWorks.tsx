import Link from "next/link";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: "❓",
      title: "Отговори на въпросите",
      description:
        "Отговори на няколко кратки въпроса за твоите вкусове, предпочитания и какво имаш в хладилника.",
    },
    {
      number: "2",
      icon: "🎯",
      title: "Получи персонализирани препоръки",
      description:
        "Нашата система ще анализира отговорите ти и ще ти предложи рецепти, съобразени специално с теб.",
    },
    {
      number: "3",
      icon: "🍳",
      title: "Сготви и се наслади",
      description:
        "Избери рецепта, която ти харесва, и започни да готвиш. Бързо, лесно и вкусно!",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400"></div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4">
            Как работи?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Само 3 лесни стъпки до перфектната рецепта за теб
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-orange-200 z-0"></div>
              )}

              {/* Card */}
              <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 mt-4">{step.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-orange-800 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Готов да започнеш?{" "}
            <Link
              href="/questions"
              className="text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2"
            >
              Натисни тук
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;