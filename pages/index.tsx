import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Body from "../components/Layout/Body";
import Loading from "../components/Loading";
import PersonCard from "../components/PersonCard";
import { prisma } from "../lib/prisma";
import { getTwoIds } from "../utils/getRandomPerson";

export const getServerSideProps: GetServerSideProps = async () => {
  const { first, second } = getTwoIds();
  const firstPerson = await prisma.person.findUnique({
    where: { id: first },
  });
  const secondPerson = await prisma.person.findUnique({
    where: { id: second },
  });
  return {
    props: {
      firstPerson,
      secondPerson,
    },
  };
};

const Home: NextPage = ({
  firstPerson,
  secondPerson,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  async function saveVote(selected: string) {
    const voteObject = { votedFor: null, votedAgainst: null };
    if (selected === "first") {
      voteObject.votedFor = firstPerson.id;
      voteObject.votedAgainst = secondPerson.id;
    } else {
      voteObject.votedFor = secondPerson.id;
      voteObject.votedAgainst = firstPerson.id;
    }
    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify(voteObject),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.replace(router.asPath);
  }

  return (
    <>
      <Loading />
      <Body>
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
          <h1 className="text-4xl text-white">
            Who dislikes{" "}
            <span className="uppercase font-semibold text-amber-500">sand</span>{" "}
            more?
          </h1>
          <div className="text-xl flex gap-16">
            <PersonCard
              person={firstPerson}
              saveVote={() => saveVote("first")}
            />
            <PersonCard
              person={secondPerson}
              saveVote={() => saveVote("second")}
            />
          </div>
        </div>
      </Body>
    </>
  );
};

export default Home;
