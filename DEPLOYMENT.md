# Voomet Website — Deployment Guide

Production-ready Next.js 14 project with separated backend/frontend architecture.

## Folder Structure

```
/
├── app/                        # Next.js routes (frontend pages + thin API wrapper)
│   ├── page.js                 # Home page
│   ├── layout.js               # Root layout (fonts, metadata)
│   ├── globals.css             # Tailwind + design tokens
│   ├── about/page.js           # About / Founder
│   ├── portfolio/page.js       # Portfolio gallery + lightbox
│   ├── thank-you/page.js       # Lead confirmation
│   ├── services/[slug]/page.js # Dynamic service pages (9 services)
│   └── api/[[...path]]/route.js  # Thin API wrapper (delegates to /backend)
│
├── backend/                    # Backend logic (INDEPENDENTLY DEPLOYABLE)
│   ├── package.json            # Own dependencies — deploy separately on GoDaddy
│   ├── server.js               # Standalone Express server (port 4000)
│   ├── db.js                   # MongoDB connection
│   ├── leads.js                # Leads controller (CRUD)
│   └── index.js                # Barrel exports (used by Next.js API wrapper)
│
├── components/
│   ├── ui/                     # shadcn primitives
│   └── site/                   # Voomet UI components
│       ├── SiteNav.js
│       ├── SiteFooter.js       # + Social media links
│       ├── StickyCTA.js
│       ├── ContactSection.js   # + Both phone numbers
│       └── FadeUp.js
│
├── lib/
│   ├── voomet-data.js          # All business content (services, clients, testimonials...)
│   └── utils.js                # Utility helpers
│
├── public/                     # Static assets
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── package.json
└── .env                        # MONGO_URL, DB_NAME, NEXT_PUBLIC_BASE_URL
```

## Environment Variables (`.env`)

```
# Frontend (Next.js)
MONGO_URL=mongodb://localhost:27017     # or MongoDB Atlas URI
DB_NAME=voomet
NEXT_PUBLIC_BASE_URL=https://voomet.com  # production URL

# Backend (standalone Express — only if deploying separately)
API_PORT=4000
ADMIN_SECRET=your-secure-secret-here
ALLOWED_ORIGINS=https://voomet.com,http://localhost:3000
```

---

## Deployment Options

### Option A — GoDaddy VPS (recommended, separated backend + frontend)

GoDaddy's shared cPanel hosting does NOT support Node.js. You need at minimum:
- **GoDaddy VPS** (Linux, root access), or
- **GoDaddy Dedicated Server**

#### Steps on GoDaddy VPS (Ubuntu):

1. SSH into your VPS and install Node 20 + PM2 + nginx:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs nginx
   sudo npm i -g pm2
   ```
2. Upload this project to `/var/www/voomet`.
3. Install frontend + build:
   ```bash
   cd /var/www/voomet
   npm install
   npm run build
   ```
4. Install backend dependencies:
   ```bash
   cd /var/www/voomet/backend
   npm install
   ```
5. Start both processes with PM2:
   ```bash
   # Frontend (port 3000)
   cd /var/www/voomet
   pm2 start "npm start" --name voomet-frontend

   # Backend API (port 4000)
   cd /var/www/voomet/backend
   pm2 start server.js --name voomet-backend

   pm2 save && pm2 startup
   ```
6. nginx reverse proxy `/etc/nginx/sites-available/voomet`:
   ```nginx
   server {
     listen 80;
     server_name voomet.com www.voomet.com;

     # Frontend
     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }

     # Backend API (optional — used when frontend API is separated)
     location /backend-api/ {
       proxy_pass http://127.0.0.1:4000/api/;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
     }
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/voomet /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
7. Install certbot for HTTPS:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d voomet.com -d www.voomet.com
   ```
8. Point GoDaddy DNS A-records to your VPS IP.

### Option B — Static Export (GoDaddy Shared Hosting)

If you're stuck on shared cPanel hosting, you can deploy a **static HTML build** (no API/contact form unless you build it separately).

1. Add to `next.config.js`:
   ```js
   module.exports = { output: 'export', images: { unoptimized: true } }
   ```
2. Build:
   ```bash
   yarn build
   ```
3. Upload the `out/` folder contents to GoDaddy `public_html/` via FTP.
4. For the contact form, host the API separately (e.g., Vercel free tier, Render free tier, or Railway) and point `fetch('/api/leads')` to that absolute URL.

### Option C — Vercel (zero-config, free for marketing sites)

Fastest option:
1. Push to GitHub.
2. Connect repo to [vercel.com](https://vercel.com).
3. Set env vars `MONGO_URL`, `DB_NAME`.
4. Use MongoDB Atlas free tier for DB.
5. Point GoDaddy DNS CNAME `www` → `cname.vercel-dns.com` and A `@` → `76.76.21.21`.

---

## Local Development

```bash
yarn install
yarn dev        # http://localhost:3000
```

## Build & Run Production Locally

```bash
yarn build
yarn start      # http://localhost:3000
```

## Updating Content

All Voomet content (services, prices, testimonials, stats, clients, portfolio) lives in **one file**:

`/lib/voomet-data.js`

Edit that file → save → page hot-reloads. No code changes needed for routine content updates.
