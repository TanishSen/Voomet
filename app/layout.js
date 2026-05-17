import { Inter, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/site/SmoothScroll'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata = {
  title: 'Voomet — Premium Interior Design & Furniture Manufacturing in Bangalore',
  description:
    'Voomet crafts premium interiors with 20+ years of expertise, 500+ projects and 25 lakh sq.ft. commissioned. Office, residential, hotel, hospital, retail interiors and bulk furniture & door manufacturing.',
  keywords: [
    'interior design Bangalore',
    'office interiors',
    'residential interiors',
    'hotel interiors',
    'hospital interiors',
    'retail interiors',
    'furniture manufacturing',
    'door manufacturing',
    'Voomet',
  ],
  openGraph: {
    title: 'Voomet — Premium Interior Design & Furniture Manufacturing',
    description:
      'Crafting spaces that harmonize modern aesthetics with timeless elegance.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="antialiased bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
