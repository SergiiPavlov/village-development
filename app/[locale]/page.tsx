import {isLocale,Locale} from '@/lib/i18n/config';import {getMessages} from '@/lib/i18n/getMessages'
import Button from '@/components/Button';import Image from 'next/image';import Link from 'next/link'
export const dynamic='force-static'
export default async function Page({params}:{params:{locale:string}}){
  const locale:Locale=(isLocale(params.locale)?params.locale:'uk') as any;const m=await getMessages(locale);const t=(k:string)=>k.split('.').reduce((a:any,p)=>a?.[p],m)??k
  return (<section className="mt-8">
    <div className="ethno-border rounded-[var(--r-base)] overflow-hidden relative aspect-[3/1] mb-8">
      <Image src="/og-hero.jpg" alt="Zadonetske" fill priority className="object-cover"/>
      <div className="absolute inset-0 flex items-end p-6 md:p-10" style={{background:'var(--hero-overlay)'}}>
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
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      <div className="card p-5"><h3 className="font-semibold mb-2">Новини / News</h3><p>Лента новин зʼявиться після підключення CMS.</p></div>
      <div className="card p-5"><h3 className="font-semibold mb-2">Події / Events</h3><p>Календар подій буде доступний у наступних спринтах.</p></div>
      <div className="card p-5"><h3 className="font-semibold mb-2">Місця / Places</h3><p>Карти та цікаві локації додамо найближчим часом.</p></div>
    </div>
  </section>)}
