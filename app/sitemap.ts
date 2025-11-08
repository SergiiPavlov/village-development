
import type { MetadataRoute } from 'next'
import { places } from '@/content/places'
import { news } from '@/content/news'

const PAGES = ['', 'about', 'places', 'events', 'news', 'gallery', 'contacts']
const LOCALES = ['uk','en','ru'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const now = new Date().toISOString()
  const items: MetadataRoute.Sitemap = []

  for (const l of LOCALES) {
    for (const p of PAGES) {
      const path = p ? `/${l}/${p}` : `/${l}`
      items.push({
        url: `${base}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: p ? 0.6 : 0.8,
        alternates: {
          languages: {
            uk: `${base}${p ? '/uk/'+p : '/uk'}`,
            en: `${base}${p ? '/en/'+p : '/en'}`,
            ru: `${base}${p ? '/ru/'+p : '/ru'}`,
          }
        }
      })
    }

    // details: places
    for (const place of places) {
      const path = `/${l}/places/${place.slug}`
      items.push({
        url: `${base}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            uk: `${base}/uk/places/${place.slug}`,
            en: `${base}/en/places/${place.slug}`,
            ru: `${base}/ru/places/${place.slug}`,
          }
        }
      })
    }

    // details: news
    for (const item of news) {
      const path = `/${l}/news/${item.id}`
      items.push({
        url: `${base}${path}`,
        lastModified: item.date || now,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            uk: `${base}/uk/news/${item.id}`,
            en: `${base}/en/news/${item.id}`,
            ru: `${base}/ru/news/${item.id}`,
          }
        }
      })
    }
  }

  return items
}
