import LottieSpinner from "@/components/ui/LottieSpinner";

const Loading = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen flex flex-col justify-center items-center relative">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.png')] opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <LottieSpinner />
        </div>
        {/* Thematic message */}
        <span className="mt-8 text-orange-800 font-semibold text-lg text-center">
          Търсим най-подходящата рецепта за вас...
        </span>
      </div>
    </div>
  );
};

export default Loading;
