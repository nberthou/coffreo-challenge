"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <h1 className="text-6xl font-bold">Rocket race 🚀</h1>
      <h2 className="text-3xl">Qui sera le plus rapide ?</h2>
      <Button onClick={() => router.push("/rocket-list")}>Commencer.</Button>
    </>
  );
}
