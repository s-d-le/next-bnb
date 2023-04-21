"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      className={`relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed 
      ${
        outline
          ? "border-black bg-white text-black"
          : "border-rose-500 bg-rose-500 text-white"
      }
      ${
        small
          ? "border-[1px] py-1 text-sm font-light"
          : "text-md border-2 py-3 font-semibold"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
