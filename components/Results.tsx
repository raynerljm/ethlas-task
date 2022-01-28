import { FC } from "react";
import { Vote } from "../types";

type Props = {
  votes: Vote[];
};

const Results: FC<Props> = ({ votes }) => {
  const processVotes = (votes: Vote[]) => {
    const map = new Map();
    for (const { votedFor, votedAgainst } of votes) {
      if (!map.has(votedFor)) map.set(votedFor, [0, 0]);
      if (!map.has(votedAgainst)) map.set(votedAgainst, [0, 0]);
      map.get(votedFor)[0]++;
      map.get(votedFor)[1]++;
      map.get(votedAgainst)[1]++;
    }
    const idAndCounts = Array.from(map.entries());
    const idAndPercentages = idAndCounts.map((x) => [x[0], x[1][0] / x[1][1]]);
    idAndPercentages.sort((a, b) => b[1] - a[1]);
    return idAndPercentages;
  };

  return (
    <>
      <div>
        {processVotes(votes).map((vote) => (
          <div key={vote[0]} className="text-white">
            {vote[0]}: {vote[1]}
          </div>
        ))}
      </div>
    </>
  );
};
export default Results;
