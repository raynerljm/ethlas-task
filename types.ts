export interface Vote extends VoteWithoutId {
  id: string;
}

export interface VoteWithoutId {
  votedFor: number;
  votedForName: string;
  votedAgainst: number;
  votedAgainstName: string;
}

export type VoteMap = {
  [key: string]: VoteMapValue;
};

export type VoteMapValue = { votes: number; total: number; id: number };

export type Person = {
  id: number;
  name: string;
  image: string;
};

export type RankedName = {
  id: number;
  name: string;
  percentage: number;
  position: number;
  count: number;
};
