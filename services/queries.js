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
