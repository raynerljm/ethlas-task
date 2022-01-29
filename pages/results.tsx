// Next and React Imports
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
// Prisma
import { prisma } from "../lib/prisma";
// Components
import Body from "../components/Layout/Body";
import ResultsBar from "../components/Results/ResultsBar";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
// Util Functions
import { processVotes } from "../utils/processVotes";
import { processVoteMap } from "../utils/processVoteMap";
import { initEmptyVoteSelection } from "../utils/initEmptyVoteSelection";
// Types
import { RankedName } from "../types";
import { emptyVoteSelection, MAX_PERSON_ID } from "../constants";

export const getServerSideProps: GetServerSideProps = async () => {
  const votes = await prisma.vote.findMany();
  const voteMap = processVotes(votes);
  const { rankedNames } = processVoteMap(
    voteMap,
    initEmptyVoteSelection(),
    MAX_PERSON_ID
  );
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
        <div className="flex flex-col gap-1 w-3/4">
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
