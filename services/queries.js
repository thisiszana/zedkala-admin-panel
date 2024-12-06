import api from "@/config/api";

export const fetchSession = async () => {
  return api
    .get("/api/session")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching users data:", error);
      return null;
    });
};

export const fetchTask = async ({ queryKey }) => {
  return api
    .get(`/api/tasks/${queryKey[1]}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching task data:", error);
      return null;
    });
};

export const fetchTasksComments = async ({
  queryKey,
  pageParam = 1,
  sortOrder,
  sortTags,
}) => {
  const [, taskID] = queryKey;
  const limit = 5;

  try {
    const response = await api.get(`/api/tasks/${taskID}/comments`, {
      params: {
        page: pageParam,
        limit,
        sort: sortOrder,
        sortTags,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task comments:", error);
    return null;
  }
};

export const sendTaskComment = async ({ taskID, content, tags }) => {
  return api
    .post(`/api/tasks/${taskID}/comments`, { content, tags })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching details tasks comments data:", error);
      return null;
    });
};

export const sendReplyToComment = async ({ taskID, content, commentId }) => {
  return api
    .patch(`/api/tasks/${taskID}/comments`, { content, commentId })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching details tasks comments data:", error);
      return null;
    });
};

export const toggleLikeComment = async ({ taskID, commentId }) => {
  return api
    .patch(`/api/tasks/${taskID}/comments/${commentId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching details tasks comments data:", error);
      return null;
    });
};
