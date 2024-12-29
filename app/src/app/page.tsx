"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo-client";

import { RaceProvider } from "@/context/RaceContext";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <RaceProvider>Lalalala</RaceProvider>
    </ApolloProvider>
  );
}
