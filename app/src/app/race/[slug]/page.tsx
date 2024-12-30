"use client";

import { useParams, useRouter } from "next/navigation";

import { useContext, useEffect, useState } from "react";
import { RaceContext } from "@/context/RaceContext";

import { useSubscription } from "@apollo/client";
import { ROCKET_PROGRESS } from "@/lib/graphql/subscriptions/rocketProgress";

import { type Rocket } from "@/types";
import Image from "next/image";
import { Button } from "@/components/Button";

export default function Race() {
  const { slug } = useParams();
  const router = useRouter();

  const [winner, setWinner] = useState<Rocket | null>();

  const { selectedRockets, currentRace } = useContext(RaceContext)!;
  const { data: playerRocketData, loading } = useSubscription(ROCKET_PROGRESS, {
    variables: {
      raceId: slug,
      rocketId: selectedRockets.player?.id
    }
  });

  console.debug("--------------------------------------------");
  console.debug("page.tsx loading l.29", loading, playerRocketData);
  console.debug("--------------------------------------------");

  const { data: opponentRocketData } = useSubscription(ROCKET_PROGRESS, {
    variables: {
      raceId: slug,
      rocketId: selectedRockets.opponent?.id
    }
  });

  const { player, opponent } = selectedRockets;

  useEffect(() => {
    if (!player && !opponent) {
      router.push("/rocket-list");
    }

    if (
      playerRocketData?.rocketProgress.exploded ||
      opponentRocketData?.rocketProgress?.progress === 100
    ) {
      setWinner(opponent);
    } else if (
      playerRocketData?.rocketProgress?.progress === 100 ||
      opponentRocketData?.rocketProgress?.exploded
    ) {
      setWinner(player);
    } else {
      setWinner(null);
    }
  }, [player, opponent, router, opponentRocketData, playerRocketData]);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {winner
          ? `${winner.name} a gagné la course !`
          : "La course du siècle !"}
      </h1>
      <div className="flex justify-around items-center w-screen">
        <div className="h-80">
          <h2 className="text-2xl font-bold text-[#ffc107] relative top-0">
            {player!.name}
          </h2>
          {playerRocketData?.rocketProgress.exploded
            ? "Le moteur a explosé"
            : `${
                playerRocketData?.rocketProgress.progress ||
                currentRace?.rocket1.progress
              }%`}
          <Image
            src={player!.image}
            width={128}
            height={128}
            alt={player!.name}
            className="relative top-full transition-transform duration-200 ease-linear"
            style={{
              transform: `translateY(-${playerRocketData?.rocketProgress.progress}%)`
            }}
          />
        </div>
        <p className="text-2xl font-bold">VS</p>
        <div className="h-80">
          <h2 className="text-2xl font-bold text-[#ffc107]">
            {opponent!.name}
          </h2>
          {opponentRocketData?.rocketProgress.exploded
            ? "Le moteur a explosé"
            : `${
                opponentRocketData?.rocketProgress.progress ||
                currentRace?.rocket2.progress
              }%`}
          <Image
            src={opponent!.image}
            width={128}
            height={128}
            alt={opponent!.name}
            className="relative top-full transition-transform duration-200 ease-linear"
            style={{
              transform: `translateY(-${opponentRocketData?.rocketProgress.progress}%)`
            }}
          />
        </div>
      </div>
      {winner && (
        <Button onClick={() => router.push("/rocket-list")}>
          Retour à la liste des fusées
        </Button>
      )}
    </div>
  );
}
