import { FC } from "react";

type Button = {
  children: string;
  onClick: () => void;
  variant?: keyof typeof variants;
};

const variants = {
  primary: {
    backgroundColor: "bg-[#ffc107]",
    textColor: "text-[#182030]"
  }
};

export const Button: FC<Button> = ({
  children,
  onClick,
  variant = "primary"
}) => {
  return (
    <button
      onClick={onClick}
      className={`${variants[variant].backgroundColor} ${variants[variant].textColor} px-4 py-2 rounded-full font-bold my-3`}
    >
      {children}
    </button>
  );
};
