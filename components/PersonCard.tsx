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
      <div className="flex flex-col items-center gap-8 group">
        <Image
          src={imageError ? FALLBACK_IMAGE : person.image}
          alt={person.name}
          layout="intrinsic"
          width="256"
          height="256"
          className="aspect-square object-cover rounded-xl cursor-pointer group-hover:scale-95 transition-all"
          onClick={saveVote}
          onError={() => setImageError(true)}
        />
        <Button onClick={saveVote}>{person.name}</Button>
      </div>
    </>
  );
};

export default PersonCard;
