import Link from "next/link";
import React from "react";

interface ActionButtonProps {
  route: string;
  text: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const ActionButton = ({
  route,
  text,
  variant = "primary",
  className = "",
}: ActionButtonProps) => {
  const baseClasses =
    "font-medium py-2 px-6 sm:px-8 border rounded-full shadow-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md hover:translate-y-[-2px]";

  const variantClasses = {
    primary:
      "bg-white hover:bg-orange-200 text-orange-800 border-orange-300 hover:border-orange-400",
    secondary:
      "bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600",
  };
  return (
    <Link
      href={route}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <span>{text}</span>
    </Link>
  );
};

export default ActionButton;
