import React from "react";

interface FormButtonProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const FormButton: React.FC<FormButtonProps> = ({
  disabled = true,
  type = "button",
  children,
  className = "",
  onClick,
}) => (
  <button
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export default FormButton;
