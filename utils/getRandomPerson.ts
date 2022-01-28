import { MAX_PERSON_ID, MIN_PERSON_ID, INVALID_PERSON_ID } from "../constants";

/**
 * Returns a random ID between (and inclusive) of MIN to MAX person ID.
 * If the result generated is an invalidId, the ID is re-generated.
 *
 * @param invalidIds
 * @returns {number}
 */

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

/**
 * Generates two non-duplicated person IDs.
 *
 * @returns {first: number, second:number}
 */

export const getTwoIds = (): { first: number; second: number } => {
  const first = getRandomId(INVALID_PERSON_ID);
  const second = getRandomId([...INVALID_PERSON_ID, first]);
  return {
    first,
    second,
  };
};
