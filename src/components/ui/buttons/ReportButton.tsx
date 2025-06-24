"use client";

import { useState } from "react";

const ReportButton = ({ recipeId }: { recipeId: string }) => {
  const isDev = process.env.NODE_ENV !== "production";
  const [disabled, setDisabled] = useState(false);
  const handleReport = async (recipeId: string) => {
    try {
      const res = await fetch(
        `${
          isDev ? "http://localhost:3000" : "https://zavecheria.com"
        }/api/reports?recipeId=${recipeId}`,
        {
          method: "POST",
        }
      );

      if (res.status === 200) {
        setDisabled(true);
      }
    } catch (error) {
      console.error("Грешка при сигнализиране:", error);
    }
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 hover:underline  transition-colors cursor-pointer disabled:text-green-700 disabled:cursor-auto hover:disabled:no-underline "
        aria-label="Сигнализирайте при нередност с рецептата"
        onClick={() => handleReport(recipeId)}
        disabled={disabled}
      >
        {disabled
          ? "Успешно сигнализирахте за нередност с рецептата!"
          : "Сигнализирайте при нередност с рецептата"}
      </button>
    </div>
  );
};

export default ReportButton;
