import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Person } from "../../types";
import Button from "../Button";
import { FALLBACK_IMAGE } from "../../constants";

type Props = {
  person: Person;
  saveVote: () => void;
};

/**
 * Renders the display card of a Starwars person.
 * Also where users click to vote.
 *
 * @param {Person} person Starwars person to render.
 * @param {() => void} saveVote Saves the current vote of the user into the database.
 * @returns {FC}
 */

const PersonCard: FC<Props> = ({ person, saveVote }) => {
  const [isImageError, setImageError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (person.image === null) {
      setImageError(true);
    } else {
      setImageError(false);
    }
    setSubmitting(false);
  }, [person]);

  const submit = () => {
    setSubmitting(true);
    saveVote();
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-center sm:gap-8 group">
        <div className="relative w-48 sm:w-64 md:w-72">
          <Image
            src={isImageError ? FALLBACK_IMAGE : person.image}
            alt={person.name}
            width="288"
            height="288"
            className="object-cover rounded-xl transition-all cursor-pointer group-hover:scale-95 aspect-square"
            onClick={submit}
            onError={() => setImageError(true)}
          />
        </div>
        <Button
          onClick={submit}
          className="w-72 h-14"
          isSubmitting={isSubmitting}
        >
          {person.name}
        </Button>
      </div>
    </>
  );
};

export default PersonCard;
