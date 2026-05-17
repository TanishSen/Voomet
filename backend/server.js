// Standalone Express API server for Voomet backend
// Can be deployed independently from Next.js (e.g., on GoDaddy VPS, cPanel Node.js app)

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createLead, listLeads } from './leads.js'

const app = express()
const PORT = process.env.API_PORT || 4000

// Security
app.use(helmet())
app.use(express.json({ limit: '100kb' }))

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://voomet.com')
  .split(',')
  .map(o => o.trim())

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-secret'],
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
})

// Admin auth middleware
function requireAdmin(req, res, next) {
  const secret = process.env.ADMIN_SECRET
  if (!secret || req.headers['x-admin-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorised' })
  }
  next()
}

// Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'voomet-api' })
})

app.get('/api/leads', requireAdmin, async (_req, res) => {
  try {
    const leads = await listLeads(100)
    res.json({ leads })
  } catch (err) {
    console.error('GET /api/leads error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/leads', limiter, async (req, res) => {
  try {
    const result = await createLead(req.body)
    if (!result.ok) {
      return res.status(result.status).json({ error: result.error })
    }
    res.status(result.status).json({ ok: true, lead: result.lead })
  } catch (err) {
    console.error('POST /api/leads error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`Voomet API running on port ${PORT}`)
})
