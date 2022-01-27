import { MAX_PERSON_ID, MIN_PERSON_ID } from "../constants";

export const getRandomId = (notThisOne?: number): number => {
  const personId = Math.floor(
    Math.random() * (MAX_PERSON_ID - MIN_PERSON_ID) + MIN_PERSON_ID
  );

  if (notThisOne === personId) {
    return getRandomId(notThisOne);
  } else {
    return personId;
  }
};

export const getTwoIds = (): { first: number; second: number } => {
  const first = getRandomId();
  const second = getRandomId(first);
  return {
    first,
    second,
  };
};
