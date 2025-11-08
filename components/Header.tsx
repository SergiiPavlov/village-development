import Link from 'next/link';import LanguageSwitcher from './LanguageSwitcher';import MobileNav from './MobileNav';import {Locale} from '@/lib/i18n/config'
export default function Header({t,locale}:{t:(k:string)=>string,locale:Locale}){
  const labels={
    home:t('nav.home'),about:t('nav.about'),places:t('nav.places'),
    events:t('nav.events'),news:t('nav.news'),gallery:t('nav.gallery'),contacts:t('nav.contacts')
  }
  return (<header className="header-sticky border-b" role="banner">
    <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
      <Link href={`/${locale}`} className="font-bold text-lg no-underline">Zadonetske</Link>
      <nav className="ml-auto hidden md:flex gap-4" aria-label="Primary">
        <Link href={`/${locale}`} className="hover:underline">{labels.home}</Link>
        <Link href={`/${locale}/about`} className="hover:underline">{labels.about}</Link>
        <Link href={`/${locale}/places`} className="hover:underline">{labels.places}</Link>
        <Link href={`/${locale}/events`} className="hover:underline">{labels.events}</Link>
        <Link href={`/${locale}/news`} className="hover:underline">{labels.news}</Link>
        <Link href={`/${locale}/gallery`} className="hover:underline">{labels.gallery}</Link>
        <Link href={`/${locale}/contacts`} className="hover:underline">{labels.contacts}</Link>
      </nav>
      <div className="ml-auto md:ml-0"><LanguageSwitcher current={locale}/></div>
      <MobileNav labels={labels} locale={locale}/>
    </div>
  </header>)}
