import useSWR from "swr";
import { STARWARS_API } from "../../constants";
import type { Person } from "../../types";
import { getTwoIds } from "../../utils/getRandomPerson";

const fetcher = (url: string): Promise<unknown> =>
  fetch(url).then((res) => res.json());

export const GetPerson = (id: number) => {
  const { data, error } = <{ data: Person; error: unknown }>(
    useSWR(`${STARWARS_API}people/${id}`, fetcher)
  );
  return {
    loading: !data && !error,
    error,
    person: data,
  };
};
