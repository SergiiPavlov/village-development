import Link from 'next/link'

export default function ContributeBanner({ locale, t }: { locale: string, t: (k:string)=>string }) {
  return (
    <section className="py-12 md:py-16">
      <div className="rounded-2xl border p-6 md:p-10 text-center bg-white/70 dark:bg-black/40">
        <h3 className="text-xl md:text-2xl font-semibold">{t('home.contribute.title')}</h3>
        <p className="mt-2 opacity-80">{t('home.contribute.text')}</p>
        <div className="mt-6">
          <Link href={`/${locale}/contacts`} className="btn btn-primary">{t('home.contribute.cta')}</Link>
        </div>
      </div>
    </section>
  )
}
