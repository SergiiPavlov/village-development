
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, Locale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/getMessages'
import { news } from '@/content/news'
import { pick } from '@/lib/i18n/pick'
import { blurs } from '@/content/blurs'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const locales: Locale[] = ['uk','en','ru'] as const
  return locales.flatMap(l => news.map(n => ({ locale: l, id: n.id })))
}

export async function generateMetadata({ params }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const item = news.find(n => n.id === params.id)
  const title = item ? pick(item.title, l) : 'News'
  const description = item ? pick(item.summary, l) : 'News details'
  return { title, description, openGraph: { title, description }, twitter: { title, description } }
}

export default async function NewsDetails({ params }: { params: { locale: string; id: string } }) {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const m = await getMessages(l)
  const item = news.find(n => n.id === params.id)
  if (!item) return notFound()

  return (
    <section className="py-10">
      <Link href={`/${l}/news`} className="text-sm opacity-70 hover:underline">← {m?.nav?.news ?? 'News'}</Link>
      <h1 className="text-3xl font-bold mt-2 mb-4">{pick(item.title, l)}</h1>

      <div className="relative aspect-[16/9] rounded-xl overflow-hidden border">
        <Image src={item.cover} alt={pick(item.title, l)} fill sizes="100vw" priority placeholder="blur" blurDataURL={blurs[item.cover]} />
      </div>

      <time className="block mt-3 text-xs opacity-60">{new Date(item.date).toLocaleDateString(l)}</time>
      <p className="mt-2 text-lg opacity-90">{pick(item.summary, l)}</p>
    </section>
  )
}
