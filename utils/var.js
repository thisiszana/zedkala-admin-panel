export const MONGO_URI = process.env.MONGO_URI;
export const SECRET_KEY = process.env.SESSION_SECRET_KEY;
export const REFRESH_SECRET_KEY = process.env.SESSION_REFRESH_SECRET_KEY;
export const SESSION_EXPIRATION = 24 * 60 * 60 * 1000;
export const REFRESH_TOKEN_EXPIRATION = 30 * 24 * 60 * 60 * 1000;