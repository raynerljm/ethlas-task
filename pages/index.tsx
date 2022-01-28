import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Body from "../components/Layout/Body";
import Loading from "../components/Loading";
import PersonCard from "../components/PersonCard";
import Results from "../components/Results";
import { prisma } from "../lib/prisma";
import { Person, Vote } from "../types";
import { getTwoIds } from "../utils/getRandomPerson";

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

const Home: NextPage = ({
  firstPerson,
  secondPerson,
  votes,
}: {
  firstPerson: Person;
  secondPerson: Person;
  votes: Vote[];
}) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);

  async function saveVote(selected: string) {
    let vote;
    if (selected === "first") {
      vote = {
        votedFor: firstPerson.id,
        votedForName: firstPerson.name,
        votedAgainst: secondPerson.id,
        votedAgainstName: secondPerson.name,
      };
    } else {
      vote = {
        votedFor: secondPerson.id,
        votedForName: secondPerson.name,
        votedAgainst: firstPerson.id,
        votedAgainstName: firstPerson.name,
      };
    }
    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify(vote),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    setCountdown(3);

    router.replace(router.asPath);
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
      {/* <Loading /> */}
      <Body>
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
          <h1 className="text-4xl text-white text-center">
            Who dislikes{" "}
            <span className="uppercase font-semibold text-amber-500">sand</span>{" "}
            more?
          </h1>
          {countdown === 0 ? (
            <div className="text-xl flex flex-col sm:flex-row gap-4 sm:gap-16">
              <PersonCard
                person={firstPerson}
                saveVote={() => saveVote("first")}
              />
              <PersonCard
                person={secondPerson}
                saveVote={() => saveVote("second")}
              />
            </div>
          ) : (
            <Results votes={votes} />
          )}
        </div>
      </Body>
    </>
  );
};

export default Home;
