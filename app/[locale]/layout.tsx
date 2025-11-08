
import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/tokens.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ThemeSwitcher from '@/components/ThemeSwitcher'

import { getMessages } from '@/lib/i18n/getMessages'
import { isLocale, Locale } from '@/lib/i18n/config'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const m = await getMessages(l)
  const title = m?.meta?.title ?? 'Zadonetske'
  const description = m?.meta?.description ?? 'Village website'
  return {
    title,
    description,
    openGraph: { title, description, images: ['/og-hero.png'], locale: l },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-hero.png'] }
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

  return (
    <html lang={l} suppressHydrationWarning>
      <body>
        <Header labels={labels} locale={l} />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer rights={rights} />
        <ThemeSwitcher />
      </body>
    </html>
  )
}
