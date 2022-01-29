// Next and React
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useEffect, useState } from "react";
// Prisma
import { prisma } from "../lib/prisma";
// Components
import Body from "../components/Layout/Body";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import PersonCard from "../components/Cards/PersonCard";
import SummaryResults from "../components/Results/SummaryResults";
// Constants
import { COUNTDOWN_TIME } from "../constants";
// Util Functions
import { processVotes } from "../utils/processVotes";
import { updateVoteMap } from "../utils/updateVoteMap";
import { getTwoIds } from "../utils/getRandomPerson";
import { initEmptyVoteSelection } from "../utils/initEmptyVoteSelection";
// Types
import { Person, Vote } from "../types";

/**
 * Server-side function that runs upon a request by a user.
 * Helps to fetch the cached Starwars people data and put it in a JSON object.
 *
 * @returns
 */

export const getServerSideProps: GetServerSideProps = async () => {
  // Processing people into a people map
  const people: Person[] = await prisma.person.findMany();
  const peopleMap: { [key: number]: Person } = {};
  for (const person of people) peopleMap[person.id] = person;
  // Processing votes into a vote map
  const votes: Vote[] = await prisma.vote.findMany();
  const voteMap = processVotes(votes);

  return {
    props: {
      peopleMapStringified: JSON.stringify(peopleMap),
      voteMapStringified: JSON.stringify(voteMap),
    },
  };
};

/**
 * Page that renders the poll where users can vote who dislikes sand more.
 *
 * @returns {NextPage}
 */

const Home: NextPage = ({
  peopleMapStringified,
  voteMapStringified,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Parse the people map from a string into a JSON object (acts as a HashMap for O(1) retrieval using person ID)
  const peopleMap = JSON.parse(peopleMapStringified);
  const [voteMap, setVoteMap] = useState(JSON.parse(voteMapStringified));
  // The two people currently being compared
  const [firstPerson, setFirstPerson] = useState<Person>();
  const [secondPerson, setSecondPerson] = useState<Person>();
  // The countdown for showing the summary results page
  const [countdown, setCountdown] = useState(0);
  // The most recent selected vote (to render options chosen in the summary results page)
  const [voteSelection, setVoteSelection] = useState(initEmptyVoteSelection());

  /**
   * Saves most recent vote into the database.
   * Resets the two choices.
   * Refresh the countdown timer.
   *
   * @param selected The selected
   * @returns
   */
  const saveVote = async (isFirst: boolean) => {
    if (!firstPerson || !secondPerson) return;

    // New vote to be saved into the database
    const vote = {
      votedFor: isFirst ? firstPerson.id : secondPerson.id,
      votedForName: isFirst ? firstPerson.name : secondPerson.name,
      votedAgainst: isFirst ? secondPerson.id : firstPerson.id,
      votedAgainstName: isFirst ? secondPerson.name : firstPerson.name,
    };

    // Increment the vote count locally
    setVoteMap(updateVoteMap(voteMap, vote));

    // Resets the two choices
    setTwoRandomPeople();
    // Sets the most immediate vote
    setVoteSelection({
      for: vote.votedForName,
      against: vote.votedAgainstName,
    });
    // Refreshes the countdown timer
    setCountdown(COUNTDOWN_TIME);

    // Making the POST request
    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify(vote),
    });

    if (!response.ok) throw new Error(response.statusText);
  };

  /**
   * Sets the first and second person randomly.
   *
   * @returns
   */
  const setTwoRandomPeople = () => {
    const { firstId, secondId } = getTwoIds();
    setFirstPerson(peopleMap[firstId]);
    setSecondPerson(peopleMap[secondId]);
  };

  // Sets the first two random people upon mounting
  useEffect(() => {
    setTwoRandomPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mechanism for timing down the countdown timer
  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }
  }, [countdown]);

  // Instantaneous so did not create a loading component for this
  if (!firstPerson || !secondPerson) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Body>
        <div className="flex flex-col gap-8 justify-center items-center min-h-screen sm:gap-4">
          {countdown <= 0 ? (
            <>
              <h1 className="mb-12 text-4xl text-center text-white">
                Who dislikes{" "}
                <span className="font-semibold text-amber-500 uppercase">
                  sand
                </span>{" "}
                more?
              </h1>
              <div className="flex flex-col gap-12 text-xl sm:flex-row sm:gap-16">
                <PersonCard
                  person={firstPerson}
                  saveVote={() => saveVote(true)}
                />
                <PersonCard
                  person={secondPerson}
                  saveVote={() => saveVote(false)}
                />
              </div>
            </>
          ) : (
            <SummaryResults
              voteMap={voteMap}
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
