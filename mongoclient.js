import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const CONN_URI = process.env.MDB_CONN_URI;
const DB = "test";

async function getClient() {
  const cli = new MongoClient(CONN_URI);
  await cli.connect();

  return cli;
}

export const mongoClient = await getClient();
