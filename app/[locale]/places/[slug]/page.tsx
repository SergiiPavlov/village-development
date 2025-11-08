
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, Locale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/getMessages'
import { places } from '@/content/places'
import { pick } from '@/lib/i18n/pick'
import { blurs } from '@/content/blurs'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const locales: Locale[] = ['uk','en','ru'] as const
  return locales.flatMap(l => places.map(p => ({ locale: l, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const place = places.find(p => p.slug === params.slug)
  const title = place ? pick(place.title, l) : 'Place'
  const description = place ? pick(place.excerpt, l) : 'Place details'
  return { title, description, openGraph: { title, description }, twitter: { title, description } }
}

export default async function PlaceDetails({ params }: { params: { locale: string; slug: string } }) {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const m = await getMessages(l)
  const place = places.find(p => p.slug === params.slug)
  if (!place) return notFound()

  return (
    <section className="py-10">
      <Link href={`/${l}/places`} className="text-sm opacity-70 hover:underline">← {m?.nav?.places ?? 'Places'}</Link>
      <h1 className="text-3xl font-bold mt-2 mb-4">{pick(place.title, l)}</h1>

      <div className="relative aspect-[16/9] rounded-xl overflow-hidden border">
        <Image src={place.cover} alt={pick(place.title, l)} fill sizes="100vw" priority placeholder="blur" blurDataURL={blurs[place.cover]} />
      </div>

      <p className="mt-4 text-lg opacity-90">{pick(place.excerpt, l)}</p>

      {typeof place.lat === 'number' && typeof place.lng === 'number' && (
        <p className="mt-3 text-sm opacity-70">GPS: {place.lat}, {place.lng}</p>
      )}
    </section>
  )
}
