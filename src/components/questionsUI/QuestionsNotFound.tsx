import Link from "next/link";

const QuestionsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">
          Няма налични въпроси
        </h2>
        <p>Моля опитайте по-късно.</p>
      </div>
      <Link
        href="/"
        className="mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold py-3 px-8 rounded-full text-lg shadow-md"
      >
        Към началната страница
      </Link>
    </div>
  );
};

export default QuestionsNotFound;
