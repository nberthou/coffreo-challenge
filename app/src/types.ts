export type Rocket = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type RocketProgress = {
  id: string;
  exploded: boolean;
  progress: number;
};

export type Race = {
  id: string;
  rocket1: RocketProgress;
  rocket2: RocketProgress;
  winner: string;
};
