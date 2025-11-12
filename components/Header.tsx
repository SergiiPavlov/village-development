
'use client'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
import MobileNav from './MobileNav'
import { Locale } from '@/lib/i18n/config'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

type Labels = { home:string; about:string; places:string; map:string; routes:string; news:string; gallery:string; contacts:string; events?:string }

export default function Header({ labels, locale }: { labels: Labels; locale: any }) {
  const pathname = usePathname() || `/${locale}`
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (slug: string) => {
    const parts = pathname.split('/').filter(Boolean)
    const section = parts[1] || ''
    if (!slug) return parts.length === 1 || section === ''
    return section === slug
  }

  const item = (href: string, label: string, slug: string) => (
    <Link
      href={href}
      className={clsx('hover:underline px-1', isActive(slug) && 'font-semibold underline')}
      aria-current={isActive(slug) ? 'page' : undefined}
    >
      {label}
    </Link>
  )

  return (
    <header className={clsx('header-sticky transition-shadow', scrolled && 'header-scrolled')} role="banner">
      <div className="header-inner mx-auto max-w-6xl px-4 py-3 flex items-center gap-4 rounded-xl">
        <Link href={`/${locale}`} className="font-bold text-lg no-underline"><Image src="/brand/crest-32.png" alt="Герб Задонецьке" width={24} height={24} className="inline-block mr-2 align-[-4px]" /><span>Zadonetske</span></Link>

        <nav className="ml-auto hidden min-[850px]:flex gap-4" aria-label="Primary">
          {item(`/${locale}`, labels.home, '')}
          {item(`/${locale}/about`, labels.about, 'about')}
          {item(`/${locale}/places`, labels.places, 'places')}
          {item(`/${locale}/map`, (labels as any).map ?? 'Map', 'map')}
          {item(`/${locale}/routes`, (labels as any).routes ?? 'Routes', 'routes')}          {item(`/${locale}/gallery`, labels.gallery, 'gallery')}
          {item(`/${locale}/contacts`, labels.contacts, 'contacts')}
        </nav>

        <div className="ml-auto min-[850px]:ml-0"><LanguageSwitcher current={locale}/></div>
        <MobileNav labels={labels} locale={locale}/>
      </div>
    </header>
  )
}
