"use client";

import { useRouter } from "next/navigation";

const ShowMoreButton = ({ session }: { session: string }) => {
  const router = useRouter();

  const handleShuffle = () => {
    router.push(`/recipeResult?session=${session}&showMore=true`);
  };
  return (
    <button
      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center text-sm font-medium transition-colors"
      onClick={handleShuffle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Вижте още препоръки
    </button>
  );
};

export default ShowMoreButton;
