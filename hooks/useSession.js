"use client";

import { fetchSession } from "@/services/queries";
import { QUERY_KEY } from "@/services/queriesKey";
import { useQuery } from "@tanstack/react-query";

const useSession = () => {
  const { data, isLoading, isError, Error } = useQuery({
    queryKey: [QUERY_KEY.user_session],
    queryFn: fetchSession,
    staleTime: 1 * 60 * 60,
    gcTime: 1 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    Error,
  };
};

export default useSession;
