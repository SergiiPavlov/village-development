import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { events } from '@/content/events'
import { isLocale, type Locale, locales as allLocales } from '@/lib/i18n/config'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return events.map(e => ({ id: e.id, locale: 'uk' }));
}

export function generateMetadata({ params }: { params: { locale: string, id: string } }): Metadata {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const ev = events.find(e => e.id === params.id)
  const title = ev?.i18n[l].title ?? 'Event'
  const description = ev?.i18n[l].excerpt ?? ''
  const images = ev ? [{ url: ev.cover, width: 1200, height: 630 }] : []
  const alternates: Record<string, string> = {}
  if (ev) {
    for (const loc of (allLocales as readonly string[])) {
      alternates[loc] = `/${loc}/events/${ev.id}`
    }
  }
  return {
    title, description,
    openGraph: { title, description, images },
    alternates: { languages: alternates }
  }
}

export default function EventPage({ params }: { params: { locale: string, id: string } }) {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const ev = events.find(e => e.id === params.id)
  if (!ev) return notFound()

  const fmt = (iso: string) => {
    try { return new Date(iso).toLocaleString(l, { dateStyle: 'long', timeStyle: 'short' }) }
    catch { return iso }
  }

  const t = (uk:string, ru:string, en:string)=> (l==='uk'?uk: l==='ru'?ru:en)

  const jsonLd: any = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": ev.i18n[l].title,
  startDate: ev.dateStart
};
if (ev.i18n[l].placeName) {
  jsonLd.location = { "@type": "Place", "name": ev.i18n[l].placeName, address: ev.i18n[l].address || "" };
}
if (ev.cover) jsonLd.image = [ev.cover];
if (ev.i18n[l].excerpt) jsonLd.description = ev.i18n[l].excerpt;

  return (
    <section className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <div className="mb-6">
        <Link href={`/${l}/events`} className="underline opacity-80 hover:opacity-100">
          {t('← До подій','← К событиям','← Back to events')}
        </Link>
      </div>

      <h1 className="text-3xl font-semibold">{ev.i18n[l].title}</h1>
      <div className="mt-2 text-sm opacity-80">{fmt(ev.dateStart)}</div>
      {ev.i18n[l].placeName && (
        <div className="mt-1 text-sm opacity-80">
          <strong>{t('Місце:','Место:','Place:')}</strong> {ev.i18n[l].placeName}{ev.i18n[l].address ? `, ${ev.i18n[l].address}` : ''}
        </div>
      )}

      <div className="mt-4 aspect-video bg-gray-100 rounded-xl overflow-hidden">
        <Image width={1200} height={800} src={ev.cover} alt={ev.i18n[l].title} className="w-full h-full object-cover"  />
      </div>

      <div className="mt-4 prose max-w-none">
        <p>{ev.i18n[l].body ?? ev.i18n[l].excerpt}</p>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <a className="btn btn-primary" href={`/${l}/api/events/${ev.id}/ics`}>
          {t('Додати в календар','Добавить в календарь','Add to calendar')}
        </a>
        <Link className="btn" href={`/${l}/events`}>
          {t('До списку подій','К списку событий','Back to list')}
        </Link>
      </div>
    </section>
  )
}
