import { Dispatch, FC, SetStateAction } from "react";
import { VoteMap } from "../../types";
import { processVoteMap } from "../../utils/processVoteMap";
import Countdown from "./Countdown";
import ResultsBar from "./ResultsBar";

type Props = {
  voteMap: VoteMap;
  voteSelection: { for: string; against: string };
  setCountdown: Dispatch<SetStateAction<number>>;
};

/**
 * Renders the summary page that displays after each vote.
 *
 * @returns {FC}
 */

const SummaryResults: FC<Props> = ({
  voteMap,
  voteSelection,
  setCountdown,
}) => {
  const { rankedNames, votedForCount } = processVoteMap(
    voteMap,
    voteSelection,
    3
  );

  return (
    <>
      <div className="flex flex-col gap-6 items-center pt-6">
        <p className="text-3xl text-center text-white">
          You voted for{" "}
          <span className="text-ethlas-yellow">{voteSelection.for}</span>
          <p className="text-base text-center text-gray-300">
            {votedForCount} other user{votedForCount === 1 ? "" : "s"} voted
            similarly
          </p>
        </p>
        <h1 className="text-4xl font-semibold text-center text-white sm:mt-8">
          Rankings
        </h1>
        <div className="flex flex-col gap-1 w-full">
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
