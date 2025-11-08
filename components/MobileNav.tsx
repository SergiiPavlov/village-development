
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale } from '@/lib/i18n/config'
import Portal from './Portal'
import clsx from 'clsx'

type Labels = {
  home: string
  about: string
  places: string
  events: string
  news: string
  gallery: string
  contacts: string
}

export default function MobileNav({ labels, locale }: { labels: Labels; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname() || `/${locale}`

  const isActive = (slug: string) => {
    const parts = pathname.split('/').filter(Boolean)
    const section = parts[1] || ''
    if (!slug) return parts.length === 1 || section === ''
    return section === slug
  }

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab') {
        const root = panelRef.current
        if (!root) return
        const focusables = Array.from(
          root.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (active === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      clearTimeout(t)
    }
  }, [open])

  const NavLink = ({ href, label, slug }: { href: string; label: string; slug: string }) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={clsx('block py-2 text-lg', isActive(slug) && 'font-semibold underline')}
      aria-current={isActive(slug) ? 'page' : undefined}
    >
      {label}
    </Link>
  )

  return (
    <div className="min-[850px]:hidden">
      <button aria-label="Menu" className="btn btn-ghost" onClick={() => setOpen(true)}>
        ☰
      </button>

      {open && (
        <Portal>
          <div className="mobile-overlay" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            className="mobile-panel slide-in"
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <strong>Zadonetske</strong>
              <button
                className="btn btn-ghost"
                onClick={() => setOpen(false)}
                aria-label="Close"
                ref={closeBtnRef}
              >
                ✕
              </button>
            </div>

            <nav aria-label="Mobile Primary" className="grid gap-1">
              <NavLink href={`/${locale}`} label={labels.home} slug="" />
              <NavLink href={`/${locale}/about`} label={labels.about} slug="about" />
              <NavLink href={`/${locale}/places`} label={labels.places} slug="places" />
              <NavLink href={`/${locale}/events`} label={labels.events} slug="events" />
              <NavLink href={`/${locale}/news`} label={labels.news} slug="news" />
              <NavLink href={`/${locale}/gallery`} label={labels.gallery} slug="gallery" />
              <NavLink href={`/${locale}/contacts`} label={labels.contacts} slug="contacts" />
            </nav>

            <div className="mt-auto text-xs opacity-60">© {new Date().getFullYear()} Zadonetske</div>
          </div>
        </Portal>
      )}
    </div>
  )
}
