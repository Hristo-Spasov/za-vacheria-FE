import Link from "next/link";
import React from "react";

interface CardButtonProps {
  route: string;
  text: string;
  variant?: "main" | "alternative" | "login" | "logout";
  className?: string;
  showIcon?: boolean;
}

const CardButton = ({
  route,
  text,
  variant = "main",
  className = "",
  showIcon = true,
}: CardButtonProps) => {
  const baseClasses = "inline-flex items-center gap-2 transition duration-300 ";

  const variantClasses = {
    main: "bg-orange-500 mt-5 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 shadow-md",
    alternative:
      "w-full justify-center bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg text-sm transform group-hover:translate-y-0 translate-y-1 opacity-90 group-hover:opacity-100",
    login:
      "px-4 py-2 rounded border border-orange-600 text-orange-600 hover:bg-orange-50 transition text-center",
    logout:"px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition text-center",
  };
  const textClasses = {
    main: "font-bold",
    alternative: "font-medium",
    login: "font-medium",
    logout:"font-medium",
  };
  return (
    <Link
      href={route}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <span className={textClasses[variant]}>{text}</span>
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${variant === "main" ? "h-5 w-5" : "h-4 w-4"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          {variant === "main" ? (
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          )}
        </svg>
      )}
    </Link>
  );
};

export default CardButton;
