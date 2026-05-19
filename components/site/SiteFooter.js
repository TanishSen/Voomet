import Link from 'next/link'
import { COMPANY, CLIENTS } from '@/lib/voomet-data'

// Select featured clients for footer
const FOOTER_CLIENTS = CLIENTS.slice(0, 8)

export default function SiteFooter() {
  return (
    <footer className="px-4 md:px-8 pb-12 pt-4">
      {/* Map Section */}
      <div className="max-w-[1400px] mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Map - Clickable map placeholder with visual design */}
          <a 
            href="https://maps.google.com/?q=No.+166,+Obandehalli+Industrial+Area,+Doddaballapura,+Bangalore,+Karnataka"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-neutral-200/70 h-[280px] lg:h-[320px] relative group bg-neutral-100"
          >
            {/* Stylized map background */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4d4d4" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Roads */}
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#a3a3a3" strokeWidth="3"/>
                <line x1="30%" y1="0" x2="70%" y2="100%" stroke="#a3a3a3" strokeWidth="2"/>
                <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#a3a3a3" strokeWidth="2"/>
              </svg>
            </div>
            
            {/* Location pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center shadow-xl">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-900 rotate-45 -z-10"></div>
              </div>
            </div>

            {/* Location label */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white rounded-xl px-4 py-3 shadow-lg inline-flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-medium text-neutral-900">Doddaballapura, Bangalore</span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors flex items-end justify-end p-6">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white rounded-full px-4 py-2 text-sm font-medium">
                View on Maps →
              </span>
            </div>
          </a>
          
          {/* Location Info Card */}
          <div className="lg:col-span-2 rounded-2xl bg-neutral-900 text-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Visit Our Facility</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-tight mb-4">
                40,000 Sq.Ft. Factory<br />in Bangalore
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {COMPANY.address}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=No.+166,+Obandehalli+Industrial+Area,+Doddaballapura,+Bangalore,+Karnataka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition-colors group"
            >
              Get Directions
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <div className="max-w-[1400px] mx-auto mb-12 pt-8 border-t border-neutral-200/70">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">Trusted By</p>
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          {FOOTER_CLIENTS.map((c) => (
            <div key={c.name} className="h-8 md:h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img 
                src={c.logo} 
                alt={c.name} 
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h5 className="font-semibold mb-3">About</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/about" className="hover:text-neutral-900">Our Story</Link></li>
            <li><Link href="/portfolio" className="hover:text-neutral-900">Portfolio</Link></li>
            <li><Link href="/#contact" className="hover:text-neutral-900">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Office Interiors</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/services/office-interiors" className="hover:text-neutral-900">Office Fit-Outs</Link></li>
            <li><Link href="/services/office-interiors" className="hover:text-neutral-900">Space Planning</Link></li>
            <li><Link href="/services/office-interiors" className="hover:text-neutral-900">Modular Furniture</Link></li>
            <li><Link href="/services/office-interiors" className="hover:text-neutral-900">MEP Coordination</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Our Capabilities</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/about" className="hover:text-neutral-900">In-House Factory</Link></li>
            <li><Link href="/about" className="hover:text-neutral-900">40,000 Sq.Ft. Facility</Link></li>
            <li><Link href="/about" className="hover:text-neutral-900">German Machinery</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Contact</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><a href={`tel:${COMPANY.phoneDigits}`} className="hover:text-neutral-900">{COMPANY.phone}</a></li>
            <li><a href={`tel:${COMPANY.phoneSecondaryDigits}`} className="hover:text-neutral-900">{COMPANY.phoneSecondary}</a></li>
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-neutral-900">{COMPANY.email}</a></li>
            <li className="text-neutral-600 leading-snug">{COMPANY.address}</li>
          </ul>
        </div>
      </div>

      {/* Social + Bottom */}
      <div className="max-w-[1400px] mx-auto mt-10 pt-8 border-t border-neutral-200/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/voomet"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
              title="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="https://twitter.com/voometinteriors"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
              title="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/voometinteriors/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UC97o58bM0ixz6uJC6YEmIIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
              title="YouTube"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/voomet_india/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
              title="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="https://in.pinterest.com/voometinteriors/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
              title="Pinterest"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Voomet Interiors & Manufacturing. All rights reserved.</p>
            <p className="hidden md:block">·</p>
            <p>Bangalore · Built by engineers, designed for business.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
