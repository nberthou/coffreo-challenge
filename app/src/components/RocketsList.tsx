import { useContext } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ROCKETS } from "@/lib/graphql/queries/rockets";
import { START_RACE } from "@/lib/graphql/mutations/startRace";

import { type Rocket } from "@/types";

import { RaceContext } from "@/context/RaceContext";

import { RocketCard } from "@/components/RocketCard";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export const RocketsList = () => {
  const { data, loading, error } = useQuery(GET_ROCKETS);
  const [startRace, { loading: startRaceLoading, data: startRaceData }] =
    useMutation(START_RACE);
  const { selectedRockets, selectRocket, deselectRocket } =
    useContext(RaceContext)!;
  const router = useRouter();

  const titleText = selectedRockets.player
    ? "Choisissez votre adversaire !"
    : "Choisissez votre fusée !";

  return (
    <div>
      {loading && <p>Chargement...</p>}
      {error && <p>Une erreur est survenue.</p>}
      {data && (
        <>
          <div>
            <h1 className="text-4xl font-bold">{titleText}</h1>
            <div className="flex flex-wrap justify-center gap-6 mt-8 ">
              {data.rockets
                .filter(
                  (rocket: Rocket) =>
                    !Object.values(selectedRockets).find(
                      (selectedRocket) =>
                        selectedRocket && selectedRocket.id === rocket.id
                    )
                )
                .map((rocket: Rocket) => (
                  <RocketCard
                    key={rocket.id}
                    rocket={rocket}
                    onClick={() => selectRocket(rocket)}
                  />
                ))}
            </div>
          </div>
          <div className="mt-16">
            {(selectedRockets.player || selectedRockets.opponent) && (
              <h2 className="text-3xl font-bold">Vos choix</h2>
            )}
            <div className="flex flex-wrap justify-center gap-6 my-8 ">
              {selectedRockets.player && (
                <div>
                  <p className="mb-6 font-bold text-[#ffc107]">Votre fusée</p>
                  <RocketCard
                    rocket={selectedRockets.player!}
                    onClick={() => deselectRocket(selectedRockets.player!)}
                  />
                </div>
              )}
              {selectedRockets.opponent && (
                <div>
                  <p className="mb-6 font-bold text-[#ffc107]">
                    Votre adversaire
                  </p>
                  <RocketCard
                    rocket={selectedRockets.opponent!}
                    onClick={() => deselectRocket(selectedRockets.opponent!)}
                  />
                </div>
              )}
            </div>
            {selectedRockets.player && selectedRockets.opponent && (
              <Button
                onClick={() => {
                  startRace({
                    variables: {
                      playerRocketId: selectedRockets.player!.id,
                      opponentRocketId: selectedRockets.opponent!.id
                    }
                  });
                  if (!startRaceLoading && startRaceData) {
                    router.push(`/race/${startRaceData.startRace.id}`);
                  }
                }}
              >
                {startRaceLoading
                  ? "La course va commencer"
                  : "Commencer la course"}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
