import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { PersonImage } from "../types";

const Seed: NextPage = () => {
  const [seeded, setSeeded] = useState(false);

  const fetchData = async () => {
    const res = await fetch(
      "https://akabab.github.io/starwars-api/api/all.json"
    );
    const data = await res.json();

    for (const person of data) {
      const personImage: PersonImage = {
        id: person.id,
        image: person.image,
      };
      const response = await fetch("/api/personImage", {
        method: "POST",
        body: JSON.stringify(personImage),
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
export default Seed;
