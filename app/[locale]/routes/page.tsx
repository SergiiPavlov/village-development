import { isLocale, Locale } from '@/lib/i18n/config'
import Link from 'next/link'
import { routes } from '@/content/routes'

export const dynamic = 'force-static'

export default async function RoutesPage({ params }:{ params:{ locale:string }}) {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const title = l==='uk' ? 'Маршрути' : l==='ru' ? 'Маршруты' : 'Routes'
  return (
    <section className="py-6 space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="grid gap-3">
        {routes.map(r => {
          const name = r.title[l] || r.title.uk
          const km = r.lengthKm ? `${r.lengthKm.toFixed(1)} км` : ''
          const type = r.type==='hike' ? (l==='uk'?'пішохідний':l==='ru'?'пешеходный':'hike') :
                       r.type==='bike' ? (l==='uk'?'велосипедний':l==='ru'?'велосипедный':'bike') : (l==='uk'?'байдарки':l==='ru'?'байдарки':'kayak')
          return (
            <Link key={r.slug} href={`/${l}/routes/${r.slug}`} className="p-3 rounded-lg border hover:bg-muted/20">
              <div className="font-medium">{name}</div>
              <div className="text-sm text-muted-foreground">{[type, km].filter(Boolean).join(' • ')}</div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
