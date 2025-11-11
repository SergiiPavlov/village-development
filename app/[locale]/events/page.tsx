import Link from 'next/link'
import { events } from '@/content/events'
import { isLocale, type Locale } from '@/lib/i18n/config'

export default function EventsPage({ params }: { params: { locale: string } }) {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const sorted = [...events].sort((a,b)=> a.dateStart.localeCompare(b.dateStart))

  const fmt = (iso: string) => {
    try { return new Date(iso).toLocaleString(l, { dateStyle: 'medium', timeStyle: 'short' }) }
    catch { return iso }
  }

  return (
    <section className="py-10">
      <h1 className="text-3xl font-semibold mb-6">{
        l==='uk'?'Події': l==='ru'?'События':'Events'
      }</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map(ev => (
          <Link key={ev.id} href={`/${l}/events/${ev.id}`} className="block border rounded-xl overflow-hidden hover:shadow">
            <div className="aspect-video bg-gray-100">
              <img src={ev.cover} alt={ev.i18n[l].title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-4">
              <div className="text-sm opacity-70">{fmt(ev.dateStart)}</div>
              <div className="mt-1 font-medium">{ev.i18n[l].title}</div>
              <p className="mt-1 text-sm opacity-80">{ev.i18n[l].excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
