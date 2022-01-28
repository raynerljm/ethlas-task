export type Vote = {
  id: string;
  votedFor: number;
  votedForName: string;
  votedAgainst: number;
  votedAgainstName: string;
};

export type Person = {
  id: number;
  name: string;
  image: string;
};
