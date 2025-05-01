import Link from "next/link";
import React from "react";

const QuestionsErrorMessage = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">
          Възникна грешка при зареждане на въпросите
        </h2>
        <p>Моля, опитайте отново по-късно.</p>
        <pre className="mt-4 text-xs text-red-500">{error?.message}</pre>
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

export default QuestionsErrorMessage;
