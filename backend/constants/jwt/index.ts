// JWT
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
export const jwtCookieExpiresIn = parseInt(process.env.JWT_COOKIE_EXPIRES_IN);
export const jwtSecret = process.env.JWT_SECRET;