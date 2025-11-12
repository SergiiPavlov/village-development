import Image from 'next/image'
import Link from 'next/link'
import { events } from '@/content/events'
import { isLocale, type Locale } from '@/lib/i18n/config'

export default function EventsPage({ params }: { params: { locale: string } }) {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const now = new Date()
  const toDate = (iso:string)=> new Date(iso)

  const upcoming = events.filter(e => toDate(e.dateStart) >= now).sort((a,b)=> a.dateStart.localeCompare(b.dateStart))
  const past = events.filter(e => toDate(e.dateStart) < now).sort((a,b)=> b.dateStart.localeCompare(a.dateStart))

  const fmt = (iso: string) => {
    try { return new Date(iso).toLocaleString(l, { dateStyle: 'medium', timeStyle: 'short' }) }
    catch { return iso }
  }

  const t = (uk:string, ru:string, en:string)=> (l==='uk'?uk: l==='ru'?ru:en)

  const Section = ({items, title}:{items: typeof events, title: string}) => (
    items.length ? (
      <>
        <h2 className="text-xl font-semibold mt-6 mb-3">{title}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map(ev => (
            <Link key={ev.id} href={`/${l}/events/${ev.id}`} className="block border rounded-xl overflow-hidden hover:shadow">
              <div className="aspect-video bg-gray-100">
                <Image width={1200} height={675} src={ev.cover} alt={ev.i18n[l].title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="text-sm opacity-70">{fmt(ev.dateStart)}</div>
                <div className="mt-1 font-medium">{ev.i18n[l].title}</div>
                <p className="mt-1 text-sm opacity-80">{ev.i18n[l].excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    ) : null
  )

  return (
    <section className="py-10">
      <h1 className="text-3xl font-semibold mb-2">{t('Події','События','Events')}</h1>
      <p className="opacity-70 mb-4">{t('Актуальні події — зверху; минулі — нижче.','Актуальные события — сверху; прошедшие — ниже.','Upcoming first, past below.')}</p>
      <Section items={upcoming} title={t('Найближчі','Ближайшие','Upcoming')} />
      <Section items={past} title={t('Минулі','Прошедшие','Past')} />
    </section>
  )
}
