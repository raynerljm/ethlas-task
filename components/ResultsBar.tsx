import { FC } from "react";

type Props = {
  rankedName: { position: number; name: string; percentage: number };
  votedForName: string;
};

const ResultsBar: FC<Props> = ({ rankedName, votedForName }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <h1
          className={`whitespace-nowrap self-center ${
            votedForName === rankedName.name
              ? "text-ethlas-orange"
              : "text-white"
          }`}
        >
          {rankedName.position}. {rankedName.name}
        </h1>
        <div className="w-full h-8 bg-gray-800 rounded-full relative grid place-items-center">
          <span className="text-blue-100 text-center z-10">
            {(rankedName.percentage * 100).toFixed(2)}%
          </span>
          <div
            className={`bg-ethlas-orange h-full rounded-full absolute left-0`}
            style={{ width: `${rankedName.percentage * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};
export default ResultsBar;
