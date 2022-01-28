import { Dispatch, FC, SetStateAction, useState } from "react";
import { Vote } from "../../types";
import Countdown from "./Countdown";
import ResultsBar from "./ResultsBar";

type Props = {
  votes: Vote[];
  voteSelection: { for: string; against: string };
  setCountdown: Dispatch<SetStateAction<number>>;
};

const Results: FC<Props> = ({ votes, voteSelection, setCountdown }) => {
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
          rankedName.position <= 3 ||
          rankedName.name === voteSelection.for ||
          rankedName.name === voteSelection.against
      );
    const votedFor = map.get(voteSelection.for);

    return {
      rankedNames,
      votedForCount: votedFor ? votedFor.votes - 1 : 0,
    };
  };

  const { rankedNames, votedForCount } = processVotes(votes || []);

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <p className="text-white text-center text-3xl">
          You voted for{" "}
          <span className="text-ethlas-yellow">{voteSelection.for}</span>
          <p className="text-center text-base text-gray-300">
            {votedForCount} other user{votedForCount === 1 ? "" : "s"} voted
            similarly
          </p>
        </p>
        <h1 className="text-white text-4xl text-center font-semibold mt-8">
          Rankings
        </h1>
        <div className="flex flex-col gap-2 w-96">
          {rankedNames.map((rankedName) => (
            <ResultsBar
              rankedName={rankedName}
              key={rankedName.name}
              voteSelection={voteSelection}
            />
          ))}
        </div>
        <Countdown setCountdown={setCountdown} />
      </div>
    </>
  );
};
export default Results;
