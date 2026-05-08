import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "skillsphere";

const baseUri =
  uri ||
  (process.env.NODE_ENV === "production"
    ? undefined
    : "mongodb://127.0.0.1:27017");

if (!baseUri) {
  throw new Error("MONGODB_URI is required.");
}

// Append Atlas defaults if not present
const mongoUri = baseUri.includes("?")
  ? baseUri + "&retryWrites=true&w=majority"
  : baseUri + "?retryWrites=true&w=majority";

if (!global._mongoClientPromise) {
  const client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    tls: true,
  });
  global._mongoClientPromise = client.connect().catch((err) => {
    // clear cache so next request retries
    global._mongoClientPromise = undefined;
    throw err;
  });
}

export const getDb = async () => {
  const client = await global._mongoClientPromise;
  return client.db(dbName);
};
export default global._mongoClientPromise;
