import { FC } from "react";

type Button = {
  children: string;
  onClick: () => void;
};

export const Button: FC<Button> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
