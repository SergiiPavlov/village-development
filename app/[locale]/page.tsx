import { isLocale, Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/getMessages';
import Link from 'next/link';
import Image from 'next/image';
import HeroXfadeAuto from '@/components/HeroXfadeAuto';
import AboutTeaser from '@/components/home/AboutTeaser'
import NewsTeaser from '@/components/home/NewsTeaser'
import PlacesStrip from '@/components/home/PlacesStrip'
import GalleryStrip from '@/components/home/GalleryStrip'
import HowToGetHere from '@/components/home/HowToGetHere'
import ContributeBanner from '@/components/home/ContributeBanner'

export const dynamic = 'force-static';

export default async function Page({ params }: { params: { locale: string } }) {
  const l = (isLocale(params.locale) ? params.locale : 'uk') as Locale;
  const m = await getMessages(l);
  const t = (key: string, p?: Record<string, any>) => {
    const parts = key.split('.');
    let cur: any = m;
    for (const part of parts) cur = cur?.[part];
    if (typeof cur === 'string' && p) {
      return cur.replace(/\{(\w+)\}/g, (_, k) => String(p[k] ?? ''));
    }
    return typeof cur === 'string' ? cur : key;
  };

  return (
    <>
<section className="-mx-4 relative overflow-hidden rounded-2xl">
  <div className="relative w-full min-h-[360px] md:min-h-[480px]">
    <HeroXfadeAuto />
    <Image
      src="/photos/places/donets.jpg"
      alt={t('home.hero.alt') || 'Сіверський Донець'}
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
    <div
      className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/30"
      aria-hidden
    />
    <div className="absolute inset-0 z-10 flex items-center justify-center text-center p-8 md:p-12">
      <div className="max-w-3xl text-white">
        <span className="inline-block rounded-full bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm">
          {t('home.hero.badge') || 'Офіційний сайт-візитка'}
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold drop-shadow">
          {t('home.hero.title') || 'Задонецьке'}
        </h1>
        <p className="mt-3 text-base md:text-lg text-white/90 drop-shadow-sm">
          {t('home.hero.subtitle') || 'Ріка, ліси та історія Слобожанщини'}
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center">
          <Link href={`/${l}/about`} className="btn btn-primary">
            {t('home.hero.ctaMore') || 'Дізнатися більше'}
          </Link>
          <Link href={`/${l}/contacts`} className="btn">
            {t('home.hero.ctaVisit') || 'Спланувати візит'}
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Home sections */}
      <AboutTeaser locale={l} t={t} />
      <NewsTeaser locale={l} t={t} />
      <PlacesStrip locale={l} t={t} />
      <GalleryStrip locale={l} t={t} />
      <HowToGetHere t={t} />
      <ContributeBanner locale={l} t={t} />
</>);
}