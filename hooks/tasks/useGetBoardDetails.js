"use client";

import { fetchBoardDetails } from "@/services/queries";
import { QUERY_KEY } from "@/services/queriesKey";
import { useQuery } from "@tanstack/react-query";

export const useGetBoardDetails = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.board_details, id],
    queryFn:  fetchBoardDetails,
    enabled: !!id,
  });

  return {
    data,
    isLoading,
  };
};
