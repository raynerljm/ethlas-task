import { FC } from "react";
import Button from "../Button";
import Body from "../Layout/Body";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

type Props = {
  error?: string;
};

/**
 * Renders an error message upon encountering an error.
 *
 * @returns
 */

const Error: FC<Props> = ({ error }) => {
  return (
    <>
      <Navbar />
      <Body className="flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white">
          Oh no! It looks like something went wrong.
        </h1>
        {error !== "" && <h2 className="text-red-500 mt-1">({error})</h2>}
        <h2 className="text-lg text-gray-300 mt-4">
          Please refresh the page and try again.
        </h2>
        <Button className="w-64 h-14 mt-4">Return to home</Button>
      </Body>
      <Footer />
    </>
  );
};
export default Error;
