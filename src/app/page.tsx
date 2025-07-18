import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen py-2 px-4 text-center ">
        <div className="absolute top-0 right-0 w-[50%] h-full">
          <Image
            src="/cooking-icon.png"
            alt="Cooking Icon"
            fill
            className="aspect-square object-cover shadow-lg"
            priority={true}
          />
        </div>
        <div className="bg-white bg-opacity-75 backdrop-blur-sm rounded-xl p-8 shadow-md max-w-xl">
          <h1 className="text-5xl font-bold text-orange-800 mb-4">
            Добре дошли в &quot;За Вечеря&quot;
          </h1>
          <p className="text-2xl text-orange-700 max-w-2xl mb-10">
            <strong>&quot;За Вечеря&quot;</strong> е нова платформа, която ви помага да
                откриете рецепти според вашите вкусове и нужди. Отговорете на
                няколко кратки въпроса и ще получите подбрани предложения
                специално за вас.
          </p>
          <Link href="/questions">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Напред
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
