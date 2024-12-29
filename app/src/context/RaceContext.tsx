import { createContext, useState, FC, ReactNode } from "react";
import { Race, Rocket } from "@/types";

type RaceContextType = {
  selectedRockets: Rocket[];
  selectRocket: (rocket: Rocket) => void;
  currentRace: Race | null;
  setCurrentRace: (race: Race | null) => void;
};

const RaceContext = createContext<RaceContextType | undefined>(undefined);

export const RaceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRockets, setSelectedRockets] = useState<Rocket[]>([]);
  const [currentRace, setCurrentRace] = useState<Race | null>(null);

  const selectRocket = (rocket: Rocket) => {
    if (
      selectedRockets.length < 2 &&
      !selectedRockets.find((selectedRocket) => selectedRocket.id === rocket.id)
    ) {
      setSelectedRockets((prevRockets) => [...prevRockets, rocket]);
    }
  };

  return (
    <RaceContext.Provider
      value={{
        selectedRockets,
        selectRocket,
        currentRace,
        setCurrentRace
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};
