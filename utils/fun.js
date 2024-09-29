import { compare, hash } from "bcryptjs";

export const hashedPassword = async (Password) => await hash(Password, 12);

export const verifyPassword = async (Password, hashedPassword) =>
  await compare(Password, hashedPassword);
