import { Vote } from "../types";

/**
 * Returns the votes per Person in descending order according to their vote percentages.
 * Percentages are calculated with votes / total_votes.
 *
 * @param votes An array of Vote objects
 * @param voteSelection Currently selected votes (only used in Summary page)
 * @param limit The top k results to show
 * @returns
 */

export const processVotes = (
  votes: Vote[],
  voteSelection: { for: string; against: string },
  limit: number
) => {
  const map = new Map();
  for (const { votedForName, votedAgainstName } of votes) {
    if (!map.has(votedForName)) map.set(votedForName, { votes: 0, total: 0 });
    if (!map.has(votedAgainstName))
      map.set(votedAgainstName, { votes: 0, total: 0 });
    map.get(votedForName).votes += 1;
    map.get(votedForName).total += 1;
    map.get(votedAgainstName).total += 1;
  }
  const rankedNames = Array.from(map.entries())
    .map((vote) => {
      return { name: vote[0], percentage: vote[1].votes / vote[1].total };
    })
    .sort((a, b) => b.percentage - a.percentage)
    .map((rankedName, idx) => {
      return { position: idx + 1, ...rankedName };
    })
    .filter(
      (rankedName) =>
        rankedName.position <= limit ||
        rankedName.name === voteSelection.for ||
        rankedName.name === voteSelection.against
    );
  const votedFor = map.get(voteSelection.for);

  return {
    rankedNames,
    votedForCount: votedFor ? votedFor.votes - 1 : 0,
  };
};
