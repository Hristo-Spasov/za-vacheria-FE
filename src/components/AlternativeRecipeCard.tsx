import Image from "next/image";

const AlternativeRecipeCard = ({ idx }: { idx: number }) => {
  return (
    <div
      key={idx}
      className="bg-white bg-opacity-75 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-orange-300 border border-transparent"
    >
      <div className="relative">
        <Image
          src={`/recipe-${idx}.png`}
          className="w-full h-40 object-cover"
          width={300}
          height={160}
          alt={`Alternative Recipe ${idx}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-4 relative">
        <h4 className="font-bold text-orange-700 border-b border-orange-100 pb-2">
          Alternative Recipe {idx}
        </h4>

        <div className="text-sm text-orange-600 mt-1 flex gap-2">
          <span className="bg-orange-50 px-2 py-0.5 rounded-full text-xs">
            ⏱️ 25 min
          </span>
          <span className="bg-orange-50 px-2 py-0.5 rounded-full text-xs">
            Medium
          </span>
        </div>

        <button className="mt-3 w-full bg-orange-100 hover:bg-orange-200 text-orange-800 py-1.5 px-3 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1">
          View Recipe
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlternativeRecipeCard;
