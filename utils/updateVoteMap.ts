import { VoteMap, VoteWithoutId } from "../types";

export const updateVoteMap = (voteMap: VoteMap, vote: VoteWithoutId) => {
  if (voteMap[vote.votedForName] === undefined)
    voteMap[vote.votedForName] = { votes: 0, total: 0 };
  if (voteMap[vote.votedAgainstName] === undefined)
    voteMap[vote.votedAgainstName] = { votes: 0, total: 0 };
  voteMap[vote.votedForName].votes += 1;
  voteMap[vote.votedForName].total += 1;
  voteMap[vote.votedAgainstName].total += 1;
  return { ...voteMap };
};
