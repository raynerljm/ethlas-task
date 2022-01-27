import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "../lib/prisma";
import { Vote } from "../types";
import { GetPerson } from "./api/person";
import { getTwoIds } from "../utils/getRandomPerson";

export const getServerSideProps: GetServerSideProps = async () => {
  const { first, second } = getTwoIds();
  const firstImage = await prisma.personImage.findUnique({
    where: { id: first },
  });
  const secondImage = await prisma.personImage.findUnique({
    where: { id: second },
  });
  return {
    props: {
      first,
      second,
      firstImage: firstImage?.image,
      secondImage: secondImage?.image,
    },
  };
};

const Home: NextPage = ({
  first,
  second,
  firstImage,
  secondImage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { person: firstPerson, loading: loadingFirst } = GetPerson(first);
  const { person: secondPerson, loading: loadingSecond } = GetPerson(second);

  const loading = loadingFirst || loadingSecond;

  async function saveVote(selected: string) {
    const voteObject = { votedFor: null, votedAgainst: null };
    if (selected === "first") {
      voteObject.votedFor = first;
      voteObject.votedAgainst = second;
    } else {
      voteObject.votedFor = second;
      voteObject.votedAgainst = first;
    }
    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify(voteObject),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return await response.json();
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-800 text-white w-full flex flex-col justify-center items-center">
      <div className="text-xl flex gap-4">
        <button onClick={() => saveVote("first")}>{firstPerson.name}</button>
        <span>vs</span>
        <button onClick={() => saveVote("second")}>{secondPerson.name}</button>
        <img src={firstImage} />
        <img src={secondImage} />
      </div>
    </div>
  );
};

export default Home;
