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
