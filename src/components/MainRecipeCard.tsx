import Image from "next/image";

const MainRecipeCard = () => {
  return (
    <div className="bg-white bg-opacity-75 backdrop-blur-sm rounded-xl p-8 shadow-md w-full mb-8 border-l-4 border-orange-500 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-orange-800 mb-2 font-serif border-b-2 border-orange-300 pb-2 inline-block">
        Your Perfect Recipe Match
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2">
          <Image
            src="/recipe-4.png"
            alt="Recipe"
            className="rounded-lg w-full object-cover h-64 shadow-md"
            width={500}
            height={300}
          />
          <div className="absolute top-3 right-3 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-orange-200">
            Perfect Match!
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-orange-700 flex items-center">
            <span className="relative">
              Recipe Name
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-300 rounded-full"></span>
            </span>
          </h3>

          <div className="flex items-center gap-2 mt-2 text-orange-600">
            <div className="bg-orange-50 rounded-full px-3 py-1 flex items-center">
              <span className="mr-1">⏱️</span> 30 min
            </div>
            <div className="bg-orange-50 rounded-full px-3 py-1 flex items-center">
              <span className="mr-1">🔥</span> Easy
            </div>
            <div className="bg-orange-50 rounded-full px-3 py-1 flex items-center">
              <span className="mr-1">🥗</span> Healthy
            </div>
          </div>

          <p className="mt-4 text-gray-700 bg-orange-50 bg-opacity-50 p-3 rounded-lg border-l-2 border-orange-200">
            Brief description of the recipe highlighting why it matches their
            preferences...
          </p>

          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:-translate-y-1 flex items-center gap-2">
            View Full Recipe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainRecipeCard;
