import { cookies } from "next/headers";

import { verify } from "jsonwebtoken";

import { SECRET_KEY } from "./var";

export const getServerSession = () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken").value;

    const session = verify(accessToken, SECRET_KEY);
    return session;
  } catch (error) {
    return null;
  }
};
