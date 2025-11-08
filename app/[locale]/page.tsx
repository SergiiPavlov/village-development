import {isLocale,Locale} from '@/lib/i18n/config';import {getMessages} from '@/lib/i18n/getMessages'
import Button from '@/components/Button';import Link from 'next/link'
export const dynamic='force-static'
export default async function Page({params}:{params:{locale:string}}){
  const locale:Locale=(isLocale(params.locale)?params.locale:'uk') as any;const m=await getMessages(locale);const t=(k:string)=>k.split('.').reduce((a:any,p)=>a?.[p],m)??k
  return (<section className="mt-6 md:mt-8">
    <div className="hero-surface mb-10">
      <div className="hero-content">
        <div>
          <span className="badge">{t('hero.badge')}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl opacity-80 mt-2">{t('hero.subtitle')}</p>
          <div className="flex gap-3 mt-4">
            <Link href={`/${locale}/about`}><Button>{t('hero.ctaExplore')}</Button></Link>
            <Link href={`/${locale}/places`}><Button className="btn" variant="ghost">{t('hero.ctaVisit')}</Button></Link>
          </div>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="card p-5"><h3 className="font-semibold mb-2">{t('homeCards.newsTitle')}</h3><p>{t('homeCards.newsText')}</p></div>
      <div className="card p-5"><h3 className="font-semibold mb-2">{t('homeCards.eventsTitle')}</h3><p>{t('homeCards.eventsText')}</p></div>
      <div className="card p-5"><h3 className="font-semibold mb-2">{t('homeCards.placesTitle')}</h3><p>{t('homeCards.placesText')}</p></div>
    </div>
  </section>)}
