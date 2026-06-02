// Backend: Database connection with JSON file fallback
import { MongoClient } from 'mongodb'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

let client
let db

// JSON file storage fallback when MongoDB is not configured
const DATA_DIR = process.cwd()
const LEADS_FILE = join(DATA_DIR, 'data', 'leads.json')

function ensureDataDir() {
  const dataDir = join(DATA_DIR, 'data')
  if (!existsSync(dataDir)) {
    const { mkdirSync } = require('fs')
    mkdirSync(dataDir, { recursive: true })
  }
}

function readJsonFile(filePath) {
  if (!existsSync(filePath)) return []
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'))
  } catch {
    return []
  }
}

function writeJsonFile(filePath, data) {
  ensureDataDir()
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Simple file-based collection that mimics MongoDB API
class FileCollection {
  constructor(filePath) {
    this.filePath = filePath
  }
  
  async insertOne(doc) {
    const data = readJsonFile(this.filePath)
    data.push(doc)
    writeJsonFile(this.filePath, data)
    return { insertedId: doc.id }
  }
  
  find(query, options) {
    const data = readJsonFile(this.filePath)
    return {
      sort: () => this,
      limit: (n) => ({ toArray: async () => data.slice(0, n) }),
      toArray: async () => data
    }
  }
}

class FileDb {
  collection(name) {
    const filePath = join(DATA_DIR, 'data', `${name}.json`)
    return new FileCollection(filePath)
  }
}

export async function getDb() {
  const mongoUrl = process.env.MONGO_URL
  
  // If no MongoDB URL, use file-based storage
  if (!mongoUrl) {
    console.log('Using file-based storage (no MONGO_URL configured)')
    return new FileDb()
  }

  if (db) return db

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
