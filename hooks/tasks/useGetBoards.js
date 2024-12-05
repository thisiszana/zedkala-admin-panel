"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/services/queriesKey";
import { fetchBoard } from "@/services/queries";

const useGetBoards = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.boards],
    queryFn: fetchBoard,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return {
    data,
    isError,
    refetch,
    isLoading,
  };
};

export default useGetBoards;
