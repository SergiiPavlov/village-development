
import Image from 'next/image'
import Link from 'next/link'
import { isLocale, Locale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/getMessages'
import { news } from '@/content/news'
import { blurs } from '@/content/blurs'
import { pick } from '@/lib/i18n/pick'

export const dynamic = 'force-static'

export default async function NewsPage({ params }: { params: { locale: string } }) {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const m = await getMessages(l)

  return (
    <section className="py-10">
      <h1 className="text-3xl font-bold mb-6">{m?.nav?.news ?? 'News'}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(n => (
          <article key={n.id} className="rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-[16/9]">
              <Image src={n.cover} alt={pick(n.title, l)} fill sizes="(max-width: 1024px) 100vw, 33vw" placeholder="blur" blurDataURL={blurs[n.cover]} />
            </div>
            <div className="p-4">
              <time className="block text-xs opacity-60">{new Date(n.date).toLocaleDateString(l)}</time>
              <h2 className="text-xl font-semibold mb-1"><Link href={`/${l}/news/${n.id}`}>{pick(n.title, l)}</Link></h2>
              <p className="text-sm opacity-80">{pick(n.summary, l)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
