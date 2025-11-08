'use client'
import Link from 'next/link';import {usePathname} from 'next/navigation';import {locales,Locale} from '@/lib/i18n/config';import clsx from 'clsx';
export default function LanguageSwitcher({current}:{current:Locale}){
  const pathname=usePathname()||'/';const rest=pathname.split('/').slice(2).join('/');
  return (<nav aria-label="Language" className="lang-switch flex gap-1 items-center">
    {locales.map(l=>(<Link key={l} href={`/${l}/${rest}`.replace(/\/$/,'')||`/${l}`} className={clsx('text-sm',l===current&&'font-semibold underline')}>{l.toUpperCase()}</Link>))}
  </nav>)}
