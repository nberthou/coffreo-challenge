import { createContext, useState, FC, ReactNode } from "react";
import { Race, Rocket } from "@/types";

type RaceContextType = {
  selectedRockets: { player: Rocket | null; opponent: Rocket | null };
  selectRocket: (rocket: Rocket) => void;
  currentRace: Race | null;
  setCurrentRace: (race: Race | null) => void;
  deselectRocket: (rocket: Rocket) => void;
};

export const RaceContext = createContext<RaceContextType | undefined>(
  undefined
);

export const RaceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRockets, setSelectedRockets] = useState<{
    player: Rocket | null;
    opponent: Rocket | null;
  }>({ player: null, opponent: null });
  const [currentRace, setCurrentRace] = useState<Race | null>(null);

  const selectRocket = (rocket: Rocket) => {
    if (selectedRockets.player === null) {
      setSelectedRockets((prevSelectedRockets) => ({
        ...prevSelectedRockets,
        player: rocket
      }));
    } else if (selectedRockets.opponent === null) {
      setSelectedRockets((prevSelectedRockets) => ({
        ...prevSelectedRockets,
        opponent: rocket
      }));
    }
  };

  const deselectRocket = (rocket: Rocket) => {
    if (selectedRockets.player === rocket) {
      setSelectedRockets((prevSelectedRockets) => ({
        ...prevSelectedRockets,
        player: null
      }));
    } else if (selectedRockets.opponent === rocket) {
      setSelectedRockets((prevSelectedRockets) => ({
        ...prevSelectedRockets,
        opponent: null
      }));
    }
  };

  return (
    <RaceContext.Provider
      value={{
        selectedRockets,
        selectRocket,
        currentRace,
        setCurrentRace,
        deselectRocket
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};
