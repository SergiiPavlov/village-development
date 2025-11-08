'use client'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {Locale} from '@/lib/i18n/config'
import Portal from './Portal'
type Labels={home:string;about:string;places:string;events:string;news:string;gallery:string;contacts:string}
export default function MobileNav({labels,locale}:{labels:Labels,locale:Locale}){
  const [open,setOpen]=useState(false)
  useEffect(()=>{
    if(!open) return
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false) }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow='hidden'
    window.addEventListener('keydown', onKey)
    return ()=>{ window.removeEventListener('keydown', onKey); document.body.style.overflow=prevOverflow }
  },[open])
  return (
    <div className="md:hidden">
      <button aria-label="Menu" className="btn btn-ghost" onClick={()=>setOpen(true)}>☰</button>
      {open && (
        <Portal>
          <div role="dialog" aria-modal="true" className="mobile-sheet" data-opaque="true">
            <div className="flex items-center justify-between mb-6">
              <strong>Zadonetske</strong>
              <button className="btn btn-ghost" onClick={()=>setOpen(false)} aria-label="Close">✕</button>
            </div>
            <nav className="grid gap-4 text-lg" aria-label="Mobile Primary">
              <Link href={`/${locale}`} onClick={()=>setOpen(false)}>{labels.home}</Link>
              <Link href={`/${locale}/about`} onClick={()=>setOpen(false)}>{labels.about}</Link>
              <Link href={`/${locale}/places`} onClick={()=>setOpen(false)}>{labels.places}</Link>
              <Link href={`/${locale}/events`} onClick={()=>setOpen(false)}>{labels.events}</Link>
              <Link href={`/${locale}/news`} onClick={()=>setOpen(false)}>{labels.news}</Link>
              <Link href={`/${locale}/gallery`} onClick={()=>setOpen(false)}>{labels.gallery}</Link>
              <Link href={`/${locale}/contacts`} onClick={()=>setOpen(false)}>{labels.contacts}</Link>
            </nav>
            <div className="mt-auto text-xs opacity-60">© {new Date().getFullYear()} Zadonetske</div>
          </div>
        </Portal>
      )}
    </div>
  )
}
