import { gql } from "@apollo/client";

export const START_RACE = gql`
  mutation StartRace($playerRocketId: ID!, $opponentRocketId: ID!) {
    startRace(rocket1: $playerRocketId, rocket2: $opponentRocketId) {
      id
      rocket1 {
        id
        exploded
        progress
      }
      rocket2 {
        id
        exploded
        progress
      }
      winner
    }
  }
`;
