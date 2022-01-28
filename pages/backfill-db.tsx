import type { NextPage } from "next";
import { useState } from "react";
import { STARWARS_API_AKABAB } from "../constants";
import { Person } from "../types";

/**
 * Backfills the database with cached data of Star Wars people.
 * The page is used to run the script.
 *
 * @returns {NextPage}
 */

const Backfill: NextPage = () => {
  const [seeded, setSeeded] = useState(false);

  const fetchData = async () => {
    const res = await fetch(STARWARS_API_AKABAB);
    const data = await res.json();

    for (const person of data) {
      const personObject: Person = {
        id: person.id,
        name: person.name,
        image: person.image,
      };
      const response = await fetch("/api/person", {
        method: "POST",
        body: JSON.stringify(personObject),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }
  };

  return (
    <div className="bg-black min-h-screen grid place-items-center">
      {seeded ? (
        <h1 className="text-white text-2xl">Seeding completed</h1>
      ) : (
        <button
          onClick={() => {
            fetchData();
            setSeeded(true);
          }}
          className="bg-white p-4"
        >
          Seed Database
        </button>
      )}
    </div>
  );
};
export default Backfill;
