import Link from 'next/link'
import { SERVICES, COMPANY, SOCIAL_LINKS } from '@/lib/voomet-data'

export default function SiteFooter() {
  return (
    <footer className="px-4 md:px-8 pb-12 pt-4">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h5 className="font-semibold mb-3">About</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/about" className="hover:text-neutral-900">Our Story</Link></li>
            <li><Link href="/about#process" className="hover:text-neutral-900">Process</Link></li>
            <li><Link href="/portfolio" className="hover:text-neutral-900">Portfolio</Link></li>
            <li><Link href="/#contact" className="hover:text-neutral-900">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Interior Services</h5>
          <ul className="space-y-2 text-neutral-600">
            {SERVICES.filter(s => !s.slug.includes('manufacturing')).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-neutral-900">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Manufacturing</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/services/bulk-manufacturing" className="hover:text-neutral-900">Bulk Furniture</Link></li>
            <li><Link href="/services/doors-manufacturing" className="hover:text-neutral-900">Doors Manufacturing</Link></li>
            <li><Link href="/about" className="hover:text-neutral-900">Factory & Tech</Link></li>
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
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold hover:bg-neutral-700 transition-colors"
                title={s.name}
              >
                {s.name.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Voomet Interiors & Manufacturing. All rights reserved.</p>
            <p className="hidden md:block">·</p>
            <p>{COMPANY.city} · Made with care.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
