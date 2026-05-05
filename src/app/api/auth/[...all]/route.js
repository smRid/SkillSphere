import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

const handler = async (req) => {
  const auth = await getAuth();
  const { GET, POST } = toNextJsHandler(auth);
  return req.method === "GET" ? GET(req) : POST(req);
};

export const GET = handler;
export const POST = handler;
