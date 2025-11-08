'use client'
import Link from 'next/link';import {usePathname} from 'next/navigation';import {locales,Locale} from '@/lib/i18n/config';import clsx from 'clsx';
const LABELS:Record<Locale,string>={uk:'UA',en:'EN',ru:'RU'}
export default function LanguageSwitcher({current}:{current:Locale}){
  const pathname=usePathname()||'/';const rest=pathname.split('/').slice(2).join('/');
  const suffix = rest ? `/${rest}`.replace(/\/$/,'') : '';
  return (<nav aria-label="Language" className="lang-switch flex gap-1 items-center">
    {locales.map(l=>(<Link key={l} href={`/${l}${suffix}`} className={clsx('text-sm',l===current&&'font-semibold underline')}>{LABELS[l]}</Link>))}
  </nav>)}
