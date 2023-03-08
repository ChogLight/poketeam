// @ts-nocheck
import { MongoClient } from "mongodb";
import { DB_URL } from "$env/static/private";

const client = new MongoClient(DB_URL)
await client.connect()

export default client.db('pokemon')