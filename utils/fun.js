import { hash } from "bcryptjs";

export const hashedPassword = async (Password) => await hash(Password, 12);
