import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "skillsphere";
const mongoUri = uri || "mongodb://127.0.0.1:27017";

if (!uri && process.env.NODE_ENV === "production") {
  throw new Error("MONGODB_URI is required in production.");
}

if (!global._mongoClient) {
  global._mongoClient = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });
}

export const getDb = async () => global._mongoClient.db(dbName);
export default global._mongoClient;
