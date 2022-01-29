import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Body from "../components/Layout/Body";
import Loading from "../components/EmptyStates/Loading";
import PersonCard from "../components/Cards/PersonCard";
import Results from "../components/Results/SummaryResults";
import { COUNTDOWN_TIME } from "../constants";
import { prisma } from "../lib/prisma";
import { getTwoIds } from "../utils/getRandomPerson";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export const getServerSideProps: GetServerSideProps = async () => {
  const { first, second } = getTwoIds();
  const firstPerson = await prisma.person.findUnique({
    where: { id: first },
  });
  const secondPerson = await prisma.person.findUnique({
    where: { id: second },
  });
  const votes = await prisma.vote.findMany();
  return {
    props: {
      firstPerson,
      secondPerson,
      votes,
    },
  };
};

/**
 * Page that renders the poll where users can vote who dislikes sand more.
 *
 * @returns {NextPage}
 */

const Home: NextPage = ({
  firstPerson,
  secondPerson,
  votes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);
  const [voteSelection, setVoteSelection] = useState({ for: "", against: "" });
  async function saveVote(selected: string) {
    const vote = {
      votedFor: selected === "first" ? firstPerson.id : secondPerson.id,
      votedForName: selected === "first" ? firstPerson.name : secondPerson.name,
      votedAgainst: selected === "first" ? secondPerson.id : firstPerson.id,
      votedAgainstName:
        selected === "first" ? secondPerson.name : firstPerson.name,
    };
    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify(vote),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    router.replace(router.asPath);
    setVoteSelection({
      for: vote.votedForName,
      against: vote.votedAgainstName,
    });
    setCountdown(COUNTDOWN_TIME);
  }

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }
  }, [countdown]);

  return (
    <>
      <Navbar />
      <Body>
        <div className="min-h-screen flex flex-col gap-8 sm:gap-4 justify-center items-center">
          {countdown <= 0 ? (
            <>
              <h1 className="text-4xl text-white text-center mb-12">
                Who dislikes{" "}
                <span className="uppercase font-semibold text-amber-500">
                  sand
                </span>{" "}
                more?
              </h1>
              <div className="text-xl flex flex-col sm:flex-row gap-12 sm:gap-16">
                <PersonCard
                  person={firstPerson}
                  saveVote={() => saveVote("first")}
                />
                <PersonCard
                  person={secondPerson}
                  saveVote={() => saveVote("second")}
                />
              </div>
            </>
          ) : (
            <Results
              votes={votes}
              voteSelection={voteSelection}
              setCountdown={setCountdown}
            />
          )}
        </div>
      </Body>

      <Footer />
    </>
  );
};

export default Home;
