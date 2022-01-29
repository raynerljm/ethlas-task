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

export const getTwoIds = (): { firstId: number; secondId: number } => {
  const firstId = getRandomId(INVALID_PERSON_ID);
  const secondId = getRandomId([...INVALID_PERSON_ID, firstId]);
  return {
    firstId,
    secondId,
  };
};
