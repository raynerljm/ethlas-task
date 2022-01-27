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

export const GetTwoPersons = () => {
  const { first, second } = getTwoIds();

  const { data: dataFirst, error: errorFirst } = <
    { data: Person; error: unknown }
  >useSWR(`${STARWARS_API}people/${first}`, fetcher);
  const { data: dataSecond, error: errorSecond } = <
    { data: Person; error: unknown }
  >useSWR(`${STARWARS_API}people/${second}`, fetcher);

  const loadingFirst = !errorFirst && !dataFirst;
  const loadingSecond = !errorSecond && !dataSecond;
  const loading = loadingFirst || loadingSecond;
  const error = errorFirst || errorSecond;

  return { loading, first: dataFirst, second: dataSecond, error };
};
