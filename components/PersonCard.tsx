import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Person } from "../types";
import Button from "./Button";
import { FALLBACK_IMAGE } from "../constants";

type Props = {
  person: Person;
  saveVote: () => void;
};

const PersonCard: FC<Props> = ({ person, saveVote }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (person.image === null) {
      setImageError(true);
    } else {
      setImageError(false);
    }
  }, [person]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 sm:gap-8 group">
        <div className="w-48 sm:w-64 md:w-72 relative">
          <Image
            src={imageError ? FALLBACK_IMAGE : person.image}
            alt={person.name}
            width="288"
            height="288"
            className="aspect-square object-cover rounded-xl cursor-pointer group-hover:scale-95 transition-all"
            onClick={saveVote}
            onError={() => setImageError(true)}
          />
        </div>
        <Button onClick={saveVote} className="h-14 w-72">
          {person.name}
        </Button>
      </div>
    </>
  );
};

export default PersonCard;
