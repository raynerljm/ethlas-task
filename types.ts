export type Vote = {
  id: string;
  votedFor: number;
  votedAgainst: number;
};

export type Person = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
};

export type PersonImage = {
  id: number;
  image: string;
};
