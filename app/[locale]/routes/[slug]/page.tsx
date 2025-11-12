import { notFound } from 'next/navigation'
import { isLocale, Locale } from '@/lib/i18n/config'
import { routes } from '@/content/routes'
import NextDynamic from 'next/dynamic'

export const dynamic = 'force-static'
const PlaceMiniMap = NextDynamic(() => import('@/components/map/PlaceMiniMap'), { ssr:false })

export default async function RoutePage({ params }:{ params:{ locale:string; slug:string }}) {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const r = routes.find(x => x.slug === params.slug)
  if (!r) return notFound()
  const title = r.title[l] || r.title.uk
  const gpx = r.gpx

  return (
    <section className="py-6 space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      {r.excerpt?.[l] && <p className="text-muted-foreground">{r.excerpt[l]}</p>}
      {/* Mini map (centered by first point if provided) */}
      {r.points?.length ? <PlaceMiniMap lat={r.points[0].lat} lng={r.points[0].lng} /> : null}
      {gpx ? <a className="btn" href={gpx} download>GPX</a> : null}
      <p className="text-sm text-muted-foreground">{l==='uk'?'Файл GPX можна відкрити у будь‑якому навігаторі чи додатку, або імпортувати на GPS‑пристрій.':l==='ru'?'Файл GPX можно открыть в любом навигаторе или приложении, либо импортировать на GPS‑устройство.':'You can open the GPX in any navigation app or device.'}</p>
    </section>
  )
}
