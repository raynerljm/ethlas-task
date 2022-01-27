import { FC } from "react";
import Head from "next/head";

/**
 * Returns a Head component so that all the metadata is easy to edit and maintain.
 *
 * @returns {FC}
 */

const MyHead: FC = () => {
  return (
    <Head>
      <title>Starwars - Who dislikes sand more?</title>
      <meta
        name="description"
        content="A voting application to finally find out who hates sand the most"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default MyHead;
