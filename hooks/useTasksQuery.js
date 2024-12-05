"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/services/queriesKey";
import { fetchTask, fetchTasksComments } from "@/services/queries";

export const useGetTaskDetails = (taskID) => {
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.task_ID, taskID],
    queryFn: fetchTask,
    enabled: !!taskID,
  });

  return {
    data,
    refetch,
    isError,
    isFetching,
  };
};

export const useGetTaskComments = (taskID, sortOrder = "createdAt_desc") => {
  const {
    data: commentsData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.tasks_comments, taskID, sortOrder],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      fetchTasksComments({ queryKey, pageParam, sortOrder }),
    enabled: !!taskID,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : false,
  });

  const uniqueComments =
    commentsData?.pages
      ?.flatMap((page) => page.comments)
      ?.reduce((acc, comment) => {
        if (!acc.find((item) => item._id === comment._id)) {
          acc.push(comment);
        }
        return acc;
      }, []) || [];

  return {
    comments: uniqueComments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};