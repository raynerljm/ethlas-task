import type { NextPage } from "next";
import { useState } from "react";
import Body from "../components/Layout/Body";
import { STARWARS_API_AKABAB } from "../constants";
import { Person } from "../types";

/**
 * Backfills the database with cached data of Star Wars people.
 * The page is used to run the script.
 *
 * @returns {NextPage}
 */

const Backfill: NextPage = () => {
  const [seeding, setSeeding] = useState(false);
  const [log, setLog] = useState<Person[]>([]);

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
      setLog((log) => [...log, personObject]);
    }
  };

  return (
    <Body>
      {seeding ? (
        <>
          <h1 className="text-white text-2xl mb-8 pt-4">
            Backfilling in progress...
          </h1>
          <div className="flex flex-col gap-1 pb-4">
            {log.map((person) => (
              <div key={person.id} className="text-gray-300">
                {person.id}: {person.name} has been cached in the database
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid place-items-center min-h-screen">
          <button
            onClick={() => {
              fetchData();
              setSeeding(true);
            }}
            className="bg-white text-xl font-semibold py-4 px-8 rounded-xl"
          >
            Seed Database
          </button>
        </div>
      )}
    </Body>
  );
};
export default Backfill;
