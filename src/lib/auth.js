import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "./mongo";

let _authInstance = null;

const createAuth = async () => {
  const db = await getDb();
  return betterAuth({
    appName: "SkillSphere",
    database: mongodbAdapter(db),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 6 },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    session: { expiresIn: 60 * 60 * 24 * 7 },
    plugins: [nextCookies()],
  });
};

export const getAuth = async () => {
  if (!_authInstance) _authInstance = await createAuth();
  return _authInstance;
};
