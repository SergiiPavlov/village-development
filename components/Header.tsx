import Link from 'next/link';import LanguageSwitcher from './LanguageSwitcher';import {Locale} from '@/lib/i18n/config'
export default function Header({t,locale}:{t:(k:string)=>string,locale:Locale}){
  return (<header className="header-sticky border-b" role="banner">
    <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
      <Link href={`/${locale}`} className="font-bold text-lg no-underline">Zadonetske</Link>
      <nav className="ml-auto hidden md:flex gap-4" aria-label="Primary">
        <Link href={`/${locale}`} className="hover:underline">{t('nav.home')}</Link>
        <Link href={`/${locale}/about`} className="hover:underline">{t('nav.about')}</Link>
        <Link href={`/${locale}/places`} className="hover:underline">{t('nav.places')}</Link>
        <Link href={`/${locale}/events`} className="hover:underline">{t('nav.events')}</Link>
        <Link href={`/${locale}/news`} className="hover:underline">{t('nav.news')}</Link>
        <Link href={`/${locale}/gallery`} className="hover:underline">{t('nav.gallery')}</Link>
        <Link href={`/${locale}/contacts`} className="hover:underline">{t('nav.contacts')}</Link>
      </nav>
      <div className="ml-auto md:ml-0"><LanguageSwitcher current={locale}/></div>
    </div>
  </header>)}
