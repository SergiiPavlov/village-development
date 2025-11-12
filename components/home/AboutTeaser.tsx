import Image from 'next/image'
import Link from 'next/link'

export default function AboutTeaser({ locale, t }: { locale: string, t: (k:string)=>string }) {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <Image src="/brand/crest-48.png" width={32} height={32} alt="" className="opacity-90" />
          <span className="text-sm uppercase tracking-wide opacity-70">{t('home.about.title')}</span>
        </div>
        <p className="text-lg md:text-xl opacity-90">{t('home.about.text')}</p>
        <div className="mt-6">
          <Link href={`/${locale}/about`} className="btn btn-primary">{t('home.about.cta')}</Link>
        </div>
      </div>
    </section>
  )
}
