
import { isLocale, Locale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/getMessages'
import { pick } from '@/lib/i18n/pick'
import type { Place } from '@/types/content'

export const dynamic = 'force-static'

export default async function PlacesPage({ params }: { params: { locale: string } }) {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as any
  const m = await getMessages(l)
  const t = (k: string) => k.split('.').reduce((a: any, p) => a?.[p], m) ?? k
  const places = (await import('@/content/places.json')).default as Place[]

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-2">{t('pages.places.title')}</h1>
      <p className="mb-6">{t('pages.places.stub')}</p>
      <div className="grid md:grid-cols-3 gap-6">
        {places.map((p) => (
          <article key={p.id} className="card p-5">
            <h3 className="font-semibold text-lg mb-1">{pick(p.title, l)}</h3>
            <p className="opacity-80 mb-2">{pick(p.summary, l)}</p>
            {p.coords && (<div className="text-xs opacity-60">lat: {p.coords.lat.toFixed(3)}, lng: {p.coords.lng.toFixed(3)}</div>)}
          </article>
        ))}
      </div>
    </div>
  )
}
