"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";

import { RocketsList } from "@/components/RocketsList";
import { RaceProvider } from "@/context/RaceContext";

export default function RocketList() {
  return (
    <ApolloProvider client={client}>
      <RaceProvider>
        <RocketsList />
      </RaceProvider>
    </ApolloProvider>
  );
}
