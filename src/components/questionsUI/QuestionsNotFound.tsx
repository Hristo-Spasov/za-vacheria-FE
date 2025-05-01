import Link from "next/link";

const QuestionsNotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.png')] opacity-10 z-0"></div>
      <div className="text-center p-8 bg-white rounded-xl shadow-md z-10">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">
          Няма налични въпроси
        </h2>
        <p>Моля опитайте по-късно.</p>
      </div>
      <Link
        href="/"
        className="mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold py-3 px-8 rounded-full text-lg shadow-md z-10"
      >
        Към началната страница
      </Link>
    </div>
  );
};

export default QuestionsNotFound;
