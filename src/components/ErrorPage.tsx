"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage({
  title = "Възникна грешка",
  message = "Нещо се обърка. Моля, опитайте отново или се върнете към началната страница.",
  error,
}: {
  title?: string;
  message?: string;
  error?: Error | string;
}) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen flex flex-col items-center justify-center relative">
      {/* food pattern overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10 pointer-events-none"></div>
      <div className="relative z-10 max-w-lg w-full p-6 sm:p-10 bg-white/80 backdrop-blur rounded-xl shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-orange-800 mb-4 text-center">
          {title}
        </h1>
        <p className="mb-4 text-gray-700 text-center">{message}</p>
        {error && (
          <pre className="mb-6 bg-orange-50 text-orange-700 rounded p-3 w-full overflow-x-auto text-xs text-left">
            {typeof error === "string" ? error : error.message}
          </pre>
        )}
        <button
          onClick={() => router.push("/")}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded transition"
        >
          Към началната страница
        </button>
      </div>
    </div>
  );
}
