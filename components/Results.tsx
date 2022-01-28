import { FC } from "react";
import { Vote } from "../types";

type Props = {
  votes: Vote[];
};

const Results: FC<Props> = ({ votes }) => {
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
      .sort((a, b) => b.percentage - a.percentage);
    return rankedNames;
  };

  return (
    <>
      <div>
        {processVotes(votes).map((vote) => (
          <div key={vote.name} className="text-white">
            {vote.name}: {vote.percentage}
          </div>
        ))}
      </div>
    </>
  );
};
export default Results;
