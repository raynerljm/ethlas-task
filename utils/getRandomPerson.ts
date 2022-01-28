import { MAX_PERSON_ID, MIN_PERSON_ID, INVALID_PERSON_ID } from "../constants";

export const getRandomId = (invalidIds?: number[]): number => {
  const personId = Math.floor(
    Math.random() * (MAX_PERSON_ID - MIN_PERSON_ID) + MIN_PERSON_ID
  );

  if (invalidIds?.includes(personId)) {
    return getRandomId(invalidIds);
  } else {
    return personId;
  }
};

export const getTwoIds = (): { first: number; second: number } => {
  const first = getRandomId(INVALID_PERSON_ID);
  const second = getRandomId([...INVALID_PERSON_ID, first]);
  return {
    first,
    second,
  };
};
