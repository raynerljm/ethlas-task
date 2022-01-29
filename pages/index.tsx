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
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-6xl text-white font-semibold text-center text-opacity-90">
            Who dislikes
            <br />
            <span className="text-7xl text-gradient-orange">sand</span>?
          </h1>
          <div className="h-16 flex flex-col items-center overflow-hidden">
            <div className="animate-show">
              <div className="carousel-name-box bg-blue-900">
                Luke Skywalker
              </div>
            </div>
            <div className="">
              <div className="carousel-name-box bg-green-900">
                Jar Jar Binks
              </div>
            </div>
            <div className="">
              <div className="carousel-name-box bg-red-900">Count Dooku</div>
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
