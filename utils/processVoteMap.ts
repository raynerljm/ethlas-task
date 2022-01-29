/**
 * Returns the votes per Person in descending order according to their vote percentages.
 * Percentages are calculated with votes / total_votes.
 *
 * @param {{ [key: string]: { votes: number; total: number } }} voteMap Vote map object
 * @param {{ for: string; against: string }} voteSelection Currently selected votes (only used in Summary page)
 * @param {number} limit The top k results to show
 * @returns
 */

export const processVoteMap = (
  voteMap: { [key: string]: { votes: number; total: number } },
  voteSelection: { for: string; against: string },
  limit: number
) => {
  const rankedNames = Object.entries(voteMap)
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
  const votedFor = voteMap[voteSelection.for];

  return {
    rankedNames,
    votedForCount: votedFor ? votedFor.votes - 1 : 0,
  };
};
