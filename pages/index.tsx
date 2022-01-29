import type { NextPage } from "next";
import Loading from "../components/EmptyStates/Loading";
import Body from "../components/Layout/Body";
import Button from "../components/Button";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

/**
 * Returns a landing page with a CTA to vote.
 *
 * @returns
 */

const Home: NextPage = () => {
  return (
    <>
      <Loading />
      <Navbar />
      <Body className="grid place-items-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-6xl font-semibold text-center text-white text-opacity-90">
            Who dislikes
            <br />
            <span className="text-7xl text-gradient-orange">sand</span>?
          </h1>
          <div className="flex overflow-hidden flex-col items-center h-16">
            <div className="animate-show">
              <div className="bg-blue-900 carousel-name-box">
                Luke Skywalker
              </div>
            </div>
            <div className="">
              <div className="bg-green-900 carousel-name-box">
                Jar Jar Binks
              </div>
            </div>
            <div className="">
              <div className="bg-red-900 carousel-name-box">Count Dooku</div>
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
