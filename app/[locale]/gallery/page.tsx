'use client'
import Image from 'next/image'
import Link from 'next/link'
import {Locale, isLocale} from '@/lib/i18n/config'
import { gallery } from '@/content/gallery'
import { useState, useEffect, useCallback } from 'react'

export default function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const onKey = useCallback((e: KeyboardEvent) => {
    if (openIdx === null) return
    if (e.key === 'Escape') setOpenIdx(null)
    if (e.key === 'ArrowRight') setOpenIdx(i => (i===null?0: Math.min(gallery.length-1, i+1)))
    if (e.key === 'ArrowLeft') setOpenIdx(i => (i===null?0: Math.max(0, i-1)))
  }, [openIdx])

  useEffect(()=>{
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [onKey])

  const t = (uk:string, ru:string, en:string)=> (locale==='uk'?uk: locale==='ru'?ru:en)

  return (
    <section className="py-6">
      <h1 className="text-2xl font-semibold mb-4">{t('Галерея','Галерея','Gallery')}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((img, idx) => (
          <button key={img.src} onClick={()=>setOpenIdx(idx)} className="overflow-hidden rounded-xl border bg-white/50 focus:outline-none focus:ring">
            <Image
              src={img.src}
              alt={img.caption || img.src.split('/').pop() || ''}
              width={img.w}
              height={img.h}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={false}
            />
          </button>
        ))}
      </div>
      <div className="mt-6 opacity-70 text-sm">
        <Link href={`/${locale}`}>← {t('На головну','На главную','Home')}</Link>
      </div>

      {openIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={()=>setOpenIdx(null)} role="dialog" aria-modal="true">
          <div className="max-w-5xl w-[92vw] max-h-[86vh]" onClick={(e)=>e.stopPropagation()}>
            <Image
              src={gallery[openIdx].src}
              alt={gallery[openIdx].caption || ''}
              width={gallery[openIdx].w}
              height={gallery[openIdx].h}
              className="w-full h-auto object-contain rounded-xl"
              sizes="100vw"
              priority
            />
            {(gallery[openIdx].caption || gallery[openIdx].credit) && (
              <div className="mt-3 text-sm text-white/90">
                {gallery[openIdx].caption}{' '}
                {gallery[openIdx].credit ? <em>© {gallery[openIdx].credit}</em> : null}
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <button className="btn" onClick={()=>setOpenIdx(Math.max(0, (openIdx as number) - 1))} disabled={openIdx<=0}>←</button>
              <button className="btn btn-primary" onClick={()=>setOpenIdx(null)}>{t('Закрити','Закрыть','Close')}</button>
              <button className="btn" onClick={()=>setOpenIdx(Math.min(gallery.length-1, (openIdx as number) + 1))} disabled={openIdx>=gallery.length-1}>→</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
