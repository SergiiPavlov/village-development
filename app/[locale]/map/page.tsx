import { Locale, isLocale } from '@/lib/i18n/config'
import { places } from '@/content/places'
import Link from 'next/link'
import NextDynamic from 'next/dynamic'

export const dynamic = 'force-static'

const LeafletMap = NextDynamic(() => import('@/components/map/LeafletMap'), { ssr: false })

export default async function MapPage({ params }: { params: { locale: string } }) {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const title = l === 'uk' ? 'Карта місць' : l === 'ru' ? 'Карта мест' : 'Map of Places'

  return (
    <section className="py-6 space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <LeafletMap locale={l} />

      <div className="grid gap-3">
        {places.map((p) => {
          const name = (p as any).title?.[l] || (p as any).title?.uk || p.slug
          const hasGeo = typeof (p as any).lat === 'number' && typeof (p as any).lng === 'number'
          const osm = hasGeo ? `https://www.openstreetmap.org/?mlat=${(p as any).lat}&mlon=${(p as any).lng}#map=15/${(p as any).lat}/${(p as any).lng}` : null
          const gmaps = hasGeo ? `https://maps.google.com/?q=${(p as any).lat},${(p as any).lng}` : null
          return (
            <div key={p.slug} className="p-3 rounded-lg border flex items-center justify-between gap-3">
              <Link href={`/${l}/places/${p.slug}`} className="font-medium hover:underline">{name}</Link>
              <div className="flex gap-2">
                {osm && <a href={osm} target="_blank" rel="noopener noreferrer" className="btn btn-sm">OSM</a>}
                {gmaps && <a href={gmaps} target="_blank" rel="noopener noreferrer" className="btn btn-sm">Google</a>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
