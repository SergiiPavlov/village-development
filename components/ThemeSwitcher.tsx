'use client'
import {useEffect,useState} from 'react'
const THEMES = ['ethno','river','forest','minimal'] as const
export default function ThemeSwitcher(){
  const [t,setT] = useState<string>('ethno')
  useEffect(()=>{
    const saved = typeof window!=='undefined' ? localStorage.getItem('theme') : null
    const initial = saved || 'ethno'
    setT(initial)
    document.documentElement.setAttribute('data-theme', initial)
  },[])
  useEffect(()=>{
    if(typeof window==='undefined') return
    document.documentElement.classList.add('theme-switching')
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
    const id = setTimeout(()=>document.documentElement.classList.remove('theme-switching'), 350)
    return ()=>clearTimeout(id)
  },[t])
  return (<div className="fixed right-3 bottom-3 card px-3 py-2 shadow-lg border hidden sm:block">
    <div className="text-xs mb-1 opacity-70">Theme</div>
    <div className="flex gap-2">{THEMES.map(x=><button key={x} onClick={()=>setT(x)} className="btn btn-ghost text-sm" aria-pressed={t===x}>{x}</button>)}</div>
  </div>)}
