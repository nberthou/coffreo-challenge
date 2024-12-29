import { FC } from "react";

type Button = {
  children: string;
  onClick: () => void;
  variant: keyof typeof variants;
};

const variants = {
  primary: {
    backgroundColor: "#ffc107",
    textColor: "#182030"
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
      className={`bg-[${variants[variant].backgroundColor}] text-[${variants[variant].textColor}]`}
    >
      {children}
    </button>
  );
};
