import Link from 'next/link'
import Image from 'next/image'
import { places } from '@/content/places'
import { Locale } from '@/types/content'

export default function PlacesStrip({ locale, t }: { locale: Locale, t: (k:string)=>string }) {
  const items = places.slice(0,10)
  return (
    <section className="py-10 md:py-14">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-semibold">{t('home.places.title')}</h2>
        <Link href={`/${locale}/places`} className="text-sm underline">{t('home.places.all')}</Link>
      </div>
      <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
        {items.map(p => (
          <Link key={p.slug} href={`/${locale}/places`} className="min-w-[240px] snap-start rounded-xl border overflow-hidden bg-white/60 dark:bg-black/30">
            <div className="relative aspect-[16/9]">
              <Image src={p.cover} alt="" fill className="object-cover" sizes="240px" />
            </div>
            <div className="p-3">
              <div className="font-medium">{p.title[locale]}</div>
              <div className="text-sm opacity-80 line-clamp-2">{p.excerpt[locale]}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
