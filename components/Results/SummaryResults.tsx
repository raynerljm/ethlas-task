import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Vote } from "../../types";
import { processVotes } from "../../utils/processVotes";
import Countdown from "./Countdown";
import ResultsBar from "./ResultsBar";

type Props = {
  votes: Vote[];
  voteSelection: { for: string; against: string };
  setCountdown: Dispatch<SetStateAction<number>>;
};

/**
 * Renders the summary page that displays after each vote.
 *
 * @returns {FC}
 */

const SummaryResults: FC<Props> = ({ votes, voteSelection, setCountdown }) => {
  const { rankedNames, votedForCount } = processVotes(votes, voteSelection, 3);

  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <p className="text-3xl text-center text-white">
          You voted for{" "}
          <span className="text-ethlas-yellow">{voteSelection.for}</span>
          <p className="text-base text-center text-gray-300">
            {votedForCount} other user{votedForCount === 1 ? "" : "s"} voted
            similarly
          </p>
        </p>
        <h1 className="mt-8 text-4xl font-semibold text-center text-white">
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
export default SummaryResults;
