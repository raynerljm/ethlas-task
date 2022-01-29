import { FC } from "react";
import { RankedName } from "../../types";

type Props = {
  rankedName: RankedName;
  voteSelection: { for: string; against: string };
};

/**
 * Renders a single result bar for a single Starwars person.
 * If it is a voted for person, it is yellow.
 * Else If it is a voted against person, it is red.
 * Else it is white.
 *
 * @returns {FC}
 */

const ResultsBar: FC<Props> = ({ rankedName, voteSelection }) => {
  return (
    <>
      <div className="grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 sm:gap-4 group">
        <h1
          className={`whitespace-nowrap self-center ${
            voteSelection.for === rankedName.name
              ? "text-ethlas-yellow"
              : voteSelection.against === rankedName.name
              ? "text-red-500"
              : "text-white"
          }`}
        >
          {rankedName.position}. {rankedName.name}
        </h1>
        <div className="grid relative place-items-center w-full h-8 bg-gray-800 rounded-full">
          <span className="z-10 text-center text-blue-100 group-hover:hidden">
            {(rankedName.percentage * 100).toFixed(2)}%
          </span>
          <span className="hidden z-10 text-center text-blue-100 group-hover:inline">
            {rankedName.count} votes
          </span>

          <div
            className={`${
              voteSelection.for === rankedName.name
                ? "bg-ethlas-yellow"
                : voteSelection.against === rankedName.name
                ? "bg-red-500"
                : "bg-gray-700 group-hover:bg-gray-500"
            } h-full rounded-full absolute left-0`}
            style={{ width: `${rankedName.percentage * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};
export default ResultsBar;
