
import { isLocale, Locale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/getMessages'
import { pick } from '@/lib/i18n/pick'
import type { NewsItem } from '@/types/content'

export const dynamic = 'force-static'

export default async function NewsPage({ params }: { params: { locale: string } }) {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as any
  const m = await getMessages(l)
  const t = (k: string) => k.split('.').reduce((a: any, p) => a?.[p], m) ?? k
  const list = (await import('@/content/news.json')).default as NewsItem[]
  const items = [...list].sort((a,b)=> a.date < b.date ? 1 : -1)

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-2">{t('pages.news.title')}</h1>
      <p className="mb-6">{t('pages.news.stub')}</p>
      <div className="grid gap-4">
        {items.map((n) => (
          <article key={n.id} className="card p-5">
            <div className="text-xs opacity-60 mb-1">{new Date(n.date).toLocaleDateString(l)}</div>
            <h3 className="font-semibold text-lg mb-1">{pick(n.title, l)}</h3>
            <p className="opacity-80">{pick(n.excerpt, l)}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
