import { FC } from "react";
import Image from "next/image";

import { type Rocket } from "@/types";

type RocketCard = {
  rocket: Rocket;
  onClick: () => void;
};

export const RocketCard: FC<RocketCard> = ({ rocket, onClick }) => {
  return (
    <div
      className="flex items-center flex-col justify-between p-4 bg-[#182030] text-[#ffc107] rounded-lg shadow-lg border-2 border-[#ffc107] cursor-pointer "
      onClick={onClick}
    >
      <Image width={80} height={80} src={rocket.image} alt={rocket.name} />
      <div>
        <h3 className="text-xl font-bold">{rocket.name}</h3>
        <p className="text-sm">{rocket.description}</p>
      </div>
    </div>
  );
};
