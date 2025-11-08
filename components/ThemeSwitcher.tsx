'use client'
import {useEffect,useState} from 'react'
const THEMES = ['ethno','river','forest','minimal'] as const
export default function ThemeSwitcher(){
  const [t,setT] = useState<string>(typeof window!=='undefined'?(localStorage.getItem('theme')||'ethno'):'ethno')
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t)},[t])
  return (<div className="fixed right-3 bottom-3 card px-3 py-2 shadow-lg border">
    <div className="text-xs mb-1 opacity-70">Theme</div>
    <div className="flex gap-2">{THEMES.map(x=><button key={x} onClick={()=>setT(x)} className="btn btn-ghost text-sm">{x}</button>)}</div>
  </div>)}
