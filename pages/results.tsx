import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "../lib/prisma";
import Body from "../components/Layout/Body";
import ResultsBar from "../components/Results/ResultsBar";
import { processVotes } from "../utils/processVotes";

export const getServerSideProps: GetServerSideProps = async () => {
  const votes = await prisma.vote.findMany();
  return {
    props: {
      votes,
    },
  };
};

/**
 * Page that renders the results of all the voting.
 *
 * @returns {NextPage}
 */

const results: NextPage = ({
  votes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const emptyVoteSelection = { for: "", against: "" };
  const limit = Number.MAX_SAFE_INTEGER;
  const { rankedNames } = processVotes(votes, emptyVoteSelection, limit);

  return (
    <Body>
      {rankedNames.map((rankedName) => (
        <ResultsBar
          key={rankedName.name}
          rankedName={rankedName}
          voteSelection={emptyVoteSelection}
        />
      ))}
    </Body>
  );
};
export default results;
