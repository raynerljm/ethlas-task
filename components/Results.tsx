import { FC } from "react";
import { Vote } from "../types";
import ResultsBar from "./ResultsBar";

type Props = {
  votes: Vote[];
  votedForName: string;
};

const Results: FC<Props> = ({ votes, votedForName }) => {
  const processVotes = (votes: Vote[]) => {
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
          rankedName.position <= 3 || rankedName.name === votedForName
      );
    return rankedNames;
  };

  return (
    <>
      <div>
        {processVotes(votes).map((rankedName) => (
          <ResultsBar
            rankedName={rankedName}
            key={rankedName.name}
            votedForName={votedForName}
          />
        ))}
      </div>
    </>
  );
};
export default Results;
