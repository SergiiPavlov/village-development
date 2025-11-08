
'use client'
import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

type Props = { current: string }

const LOCALES = ['uk','en','ru'] as const
const LABELS: Record<string,string> = { uk: 'UA', en: 'EN', ru: 'RU' }

function swapLocaleInPath(pathname: string, target: string){
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return `/${target}`
  if (LOCALES.includes(parts[0] as any)) {
    parts[0] = target
  } else {
    parts.unshift(target)
  }
  return '/' + parts.join('/')
}

export default function LanguageSwitcher({ current }: Props){
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement|null>(null)
  const menuRef = useRef<HTMLDivElement|null>(null)

  useEffect(()=>{
    if(!open) return
    const onKey = (e: KeyboardEvent) => {
      if(e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if(!menuRef.current || !btnRef.current) return
      if (!menuRef.current.contains(t) && !btnRef.current.contains(t)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const currentLabel = LABELS[current] ?? current.toUpperCase()

  return (
    <div className="relative lang-dropdown">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[var(--card-border)]"
        onClick={()=>setOpen(v=>!v)}
        title="Language"
      >
        <span className="font-medium">{currentLabel}</span>
        <span aria-hidden>▾</span>
      </button>

      {open && (
        <div ref={menuRef} role="listbox" aria-label="Select language" className="lang-menu absolute right-0 mt-2 w-28 rounded-md shadow-lg border border-[var(--card-border)]">
          <ul className="py-1">
            {LOCALES.map(code => {
              const href = swapLocaleInPath(pathname, code)
              const label = LABELS[code] ?? code.toUpperCase()
              const isActive = code === current
              return (
                <li key={code}>
                  <Link
                    href={href}
                    role="option"
                    aria-selected={isActive}
                    className={"block px-3 py-2 text-sm " + (isActive ? "font-semibold underline" : "")}
                    onClick={()=>setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
