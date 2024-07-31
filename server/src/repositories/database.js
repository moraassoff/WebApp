import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const MongoDB_URI = process.env.MongoDB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DEFAULT_DB_NAME || 'test';

export async function connect() {
    const client = new MongoClient(MongoDB_URI);
    await client.connect();
    return client;
}

export async function collection(collectionName) {
    const client = await connect();
    const db = client.db(DB_NAME);
    const collection = await db.collection(collectionName);
    return collection;
}