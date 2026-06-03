import { Inter, Bricolage_Grotesque } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import SmoothScroll from '@/components/site/SmoothScroll'

const GA_MEASUREMENT_ID = 'G-YYMYRKT4JE'
const GTM_ID = 'GTM-NVT7FDPH'

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
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="antialiased bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
