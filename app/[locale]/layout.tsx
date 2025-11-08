
import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/tokens.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ThemeSwitcher from '@/components/ThemeSwitcher'

import { getMessages } from '@/lib/i18n/getMessages'
import { isLocale, Locale } from '@/lib/i18n/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const m = await getMessages(l)
  const title = m?.meta?.title ?? 'Zadonetske'
  const description = m?.meta?.description ?? 'Village website'
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      languages: { uk: '/uk', en: '/en', ru: '/ru' }
    },
    openGraph: { title, description, images: ['/opengraph-image.png'], locale: l },
    twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image.png'] }
  }
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const m = await getMessages(l)

  const labels = {
    home: m?.nav?.home ?? 'Home',
    about: m?.nav?.about ?? 'About',
    places: m?.nav?.places ?? 'Places',
    events: m?.nav?.events ?? 'Events',
    news: m?.nav?.news ?? 'News',
    gallery: m?.nav?.gallery ?? 'Gallery',
    contacts: m?.nav?.contacts ?? 'Contacts',
  }

  const rights = (m?.footer?.rights ?? '© {year} Zadonetske').replace(/\{year\}/g, String(new Date().getFullYear()))

  const placeLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'Zadonetske / Задонецьке',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zadonetske',
      addressRegion: 'Kharkiv Oblast',
      addressCountry: 'UA'
    },
    geo: { '@type': 'GeoCoordinates', latitude: 49.947, longitude: 36.70 },
    url: `${SITE_URL}/${l}`
  }

  return (
    <html lang={l} suppressHydrationWarning>
      <body>
        <Header labels={labels} locale={l} />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer rights={rights} />
        <ThemeSwitcher />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }} />
      </body>
    </html>
  )
}
