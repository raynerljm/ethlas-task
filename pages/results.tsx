import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "../lib/prisma";
import Body from "../components/Layout/Body";
import ResultsBar from "../components/Results/ResultsBar";
import { processVotes } from "../utils/processVotes";
import { processVoteMap } from "../utils/processVoteMap";
import Navbar from "../components/Layout/Navbar";
import { RankedName } from "../types";
import Footer from "../components/Layout/Footer";

const emptyVoteSelection = { for: "", against: "" };
const limit = Number.MAX_SAFE_INTEGER;

export const getServerSideProps: GetServerSideProps = async () => {
  const votes = await prisma.vote.findMany();
  const voteMap = processVotes(votes);
  const { rankedNames } = processVoteMap(voteMap, emptyVoteSelection, limit);
  return {
    props: {
      rankedNames,
    },
  };
};

/**
 * Page that renders the results of all the voting.
 *
 * @returns {NextPage}
 */

const results: NextPage = ({
  rankedNames,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Navbar />
      <Body className="flex flex-col gap-8 justify-center items-center my-24">
        <h1 className="text-3xl text-center text-white">
          The one who dislikes sand the most is
          <br />
          <span className="text-ethlas-yellow">{rankedNames[0].name}</span>
        </h1>
        <div className="w-1/2 flex flex-col gap-1">
          {rankedNames.map((rankedName: RankedName) => (
            <ResultsBar
              key={rankedName.name}
              rankedName={rankedName}
              voteSelection={emptyVoteSelection}
            />
          ))}
        </div>
      </Body>
      <Footer />
    </>
  );
};
export default results;
