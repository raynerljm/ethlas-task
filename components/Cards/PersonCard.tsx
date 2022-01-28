import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Person } from "../../types";
import Button from "../Button";
import { FALLBACK_IMAGE } from "../../constants";
import Body from "../Layout/Body";

type Props = {
  person: Person;
  saveVote: () => void;
};

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
      <div className="flex flex-col items-center gap-2 sm:gap-8 group">
        <div className="w-48 sm:w-64 md:w-72 relative">
          <Image
            src={isImageError ? FALLBACK_IMAGE : person.image}
            alt={person.name}
            width="288"
            height="288"
            className="aspect-square object-cover rounded-xl cursor-pointer group-hover:scale-95 transition-all"
            onClick={submit}
            onError={() => setImageError(true)}
          />
        </div>
        <Button
          onClick={submit}
          className="h-14 w-72"
          isSubmitting={isSubmitting}
        >
          {person.name}
        </Button>
      </div>
    </>
  );
};

export default PersonCard;
