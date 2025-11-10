import Link from 'next/link'
import Image from 'next/image'
import { news } from '@/content/news'
import { Locale } from '@/types/content'

export default function NewsTeaser({ locale, t }: { locale: Locale, t: (k:string)=>string }) {
  const items = [...news].sort((a,b)=> (a.date < b.date ? 1 : -1)).slice(0,3)
  return (
    <section className="py-10 md:py-14">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-semibold">{t('home.news.title')}</h2>
        <Link href={`/${locale}/news`} className="text-sm underline">{t('home.news.all')}</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <article key={item.id} className="rounded-xl border overflow-hidden bg-white/60 dark:bg-black/30">
            <div className="relative aspect-[16/9]">
              <Image src={item.cover} alt="" fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
            </div>
            <div className="p-4">
              <div className="text-xs opacity-70">{new Date(item.date).toLocaleDateString(locale)}</div>
              <h3 className="mt-1 font-medium">{item.title[locale]}</h3>
              <p className="mt-1 text-sm opacity-80">{item.summary[locale]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
