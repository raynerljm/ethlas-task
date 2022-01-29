import { Vote } from "../types";
import { updateVoteMap } from "./updateVoteMap";
/**
 * Converts an array of votes into a Vote Map.
 * A vote map has a Person's ID as a key.
 * The value is an Object with:
 * - votes as the number of votes the person has received.
 * - total as the total number of votes the person has been in.
 *
 * @param {Vote[]} votes An array of Vote objects
 * @returns {{[key: number]: {votes: number; total: number}}} voteMap
 */

export const processVotes = (votes: Vote[]) => {
  const voteMap: { [key: string]: { votes: number; total: number } } = {};
  for (const vote of votes) {
    updateVoteMap(voteMap, vote);
  }
  return voteMap;
};
