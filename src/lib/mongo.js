import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "skillsphere";

let client;
if (!global._mongoClientPromise) {
  client = new MongoClient(uri || "mongodb://127.0.0.1:27017");
  global._mongoClientPromise = client.connect();
}

export const getDb = async () => (await global._mongoClientPromise).db(dbName);
export default global._mongoClientPromise;
