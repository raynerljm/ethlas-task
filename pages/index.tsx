import type { NextPage } from "next";
import LandingPageLoading from "../components/EmptyStates/LandingPageLoading";
import Body from "../components/Layout/Body";
import Button from "../components/Button";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { useEffect, useState } from "react";
import { BLUE_NAMES, GREEN_NAMES, RED_NAMES } from "../constants";

/**
 * Returns a landing page with a CTA to vote.
 *
 * @returns
 */

const Home: NextPage = () => {
  const [blueName, setBlueName] = useState("");
  const [greenName, setGreenName] = useState("");
  const [redName, setRedName] = useState("");

  // Randomizes the names every 5 seconds (per roll)
  useEffect(() => {
    const randomizeNames = () => {
      setBlueName(BLUE_NAMES[Math.floor(Math.random() * BLUE_NAMES.length)]);
      setGreenName(GREEN_NAMES[Math.floor(Math.random() * GREEN_NAMES.length)]);
      setRedName(RED_NAMES[Math.floor(Math.random() * RED_NAMES.length)]);
      setTimeout(randomizeNames, 5000);
    };

    randomizeNames();
  }, []);

  return (
    <>
      <LandingPageLoading />
      <Navbar />
      <Body className="grid place-items-center">
        <div className="flex flex-col gap-16 items-center">
          <h1 className="text-6xl font-semibold text-center text-white text-opacity-90">
            Who dislikes
            <br />
            <span className="text-7xl text-gradient-orange">sand</span>?
          </h1>
          <div className="flex overflow-hidden flex-col items-center h-16">
            <div className="animate-show">
              <div className="bg-blue-900 carousel-name-box">{blueName}</div>
            </div>
            <div className="">
              <div className="bg-green-900 carousel-name-box">{greenName}</div>
            </div>
            <div className="">
              <div className="bg-red-900 carousel-name-box">{redName}</div>
            </div>
          </div>
          <Button className="w-48 h-14" href="/poll">
            Vote Now
          </Button>
        </div>
      </Body>
      <Footer />
    </>
  );
};
export default Home;
