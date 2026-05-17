// Backend: Leads controller
import { v4 as uuidv4 } from 'uuid'
import { getDb } from './db.js'

export async function createLead(payload) {
  const { name, phone, email, requirement, area, message, source } = payload || {}
  if (!name || !phone) {
    return { ok: false, status: 400, error: 'Name and phone are required' }
  }
  const lead = {
    id: uuidv4(),
    name: String(name).slice(0, 120),
    phone: String(phone).slice(0, 40),
    email: email ? String(email).slice(0, 160) : '',
    requirement: requirement || 'General Enquiry',
    area: area || '',
    message: message ? String(message).slice(0, 2000) : '',
    source: source || 'website',
    createdAt: new Date().toISOString(),
  }
  const database = await getDb()
  await database.collection('leads').insertOne({ ...lead })
  return { ok: true, status: 201, lead }
}

export async function listLeads(limit = 100) {
  const database = await getDb()
  const leads = await database
    .collection('leads')
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()
  return leads
}
