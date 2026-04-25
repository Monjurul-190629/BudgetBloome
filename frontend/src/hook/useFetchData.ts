import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

//INFO: this hook will wrapped over the useQuery hook of tanstack query to simplify data fetching
const useFetchData = <TData, TError>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>,
) => {
  const query = useQuery<TData, TError>({
    queryKey,
    queryFn,
    staleTime: 1000,
    ...options,
  });

  return query;
};

export default useFetchData;
