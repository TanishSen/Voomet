// Backend: MongoDB connection (separated from API routes for cleaner production structure)
import { MongoClient } from 'mongodb'

let client
let db

export async function getDb() {
  if (db) return db

  const mongoUrl = process.env.MONGO_URL
  if (!mongoUrl) {
    throw new Error(
      'MONGO_URL environment variable is not set. ' +
      'Create a .env.local file with MONGO_URL=<your MongoDB connection string>.'
    )
  }

  if (!client) {
    client = new MongoClient(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    })
    await client.connect()
  }
  const dbName = process.env.DB_NAME || 'voomet'
  db = client.db(dbName)
  return db
}
