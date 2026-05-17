// Shared auth utilities — works in both Edge (middleware) and Node.js (API routes)

export async function createSessionToken(secret) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('voomet-admin-v1'))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// All image sections the admin can manage
export const IMAGE_SECTIONS = [
  { key: 'home',                    label: 'Home Page' },
  { key: 'office-interiors',        label: 'Office Interiors' },
  { key: 'residential-interiors',   label: 'Residential Interiors' },
  { key: 'hotel-interiors',         label: 'Hotel Interiors' },
  { key: 'hospital-interiors',      label: 'Hospital Interiors' },
  { key: 'retail-interiors',        label: 'Retail Interiors' },
  { key: 'educational-interiors',   label: 'Educational Interiors' },
  { key: 'bulk-manufacturing',      label: 'Bulk Manufacturing' },
  { key: 'doors-manufacturing',     label: 'Door Manufacturing' },
  { key: 'about',                   label: 'About / Founder' },
  { key: 'clients',                 label: 'Client Logos' },
  { key: 'portfolio',               label: 'Portfolio' },
]
