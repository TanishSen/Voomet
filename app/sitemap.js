import { SERVICES } from '@/lib/voomet-data'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://voomet.com'

export default function sitemap() {
  const staticRoutes = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/portfolio`, priority: 0.8, changeFrequency: 'monthly' },
  ]

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly',
  }))

  return [...staticRoutes, ...serviceRoutes]
}
