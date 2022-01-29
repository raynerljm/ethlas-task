import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "../lib/prisma";
import Body from "../components/Layout/Body";
import ResultsBar from "../components/Results/ResultsBar";
import { processVotes } from "../utils/processVotes";
import Navbar from "../components/Layout/Navbar";
import { RankedName } from "../types";
import Footer from "../components/Layout/Footer";

const emptyVoteSelection = { for: "", against: "" };

export const getServerSideProps: GetServerSideProps = async () => {
  const votes = await prisma.vote.findMany();
  const limit = Number.MAX_SAFE_INTEGER;
  const { rankedNames } = processVotes(votes, emptyVoteSelection, limit);
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
      <Body className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-white text-center text-3xl">
          The one who dislikes sand the most is
          <br />
          <span className="text-ethlas-yellow">{rankedNames[0].name}</span>
        </h1>
        <div className="w-1/2">
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
