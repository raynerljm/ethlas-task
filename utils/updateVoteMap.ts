import { VoteMap, VoteWithoutId } from "../types";

export const updateVoteMap = (voteMap: VoteMap, vote: VoteWithoutId) => {
  if (vote.votedForName === "" || vote.votedAgainstName === "")
    return { ...voteMap };
  if (voteMap[vote.votedForName] === undefined)
    voteMap[vote.votedForName] = { votes: 0, total: 0, id: vote.votedFor };
  if (voteMap[vote.votedAgainstName] === undefined)
    voteMap[vote.votedAgainstName] = {
      votes: 0,
      total: 0,
      id: vote.votedAgainst,
    };
  voteMap[vote.votedForName].votes += 1;
  voteMap[vote.votedForName].total += 1;
  voteMap[vote.votedAgainstName].total += 1;
  return { ...voteMap };
};
