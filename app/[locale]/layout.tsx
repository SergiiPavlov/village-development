import {ReactNode} from 'react';import {isLocale,Locale} from '@/lib/i18n/config';import {getMessages} from '@/lib/i18n/getMessages'
import Header from '@/components/Header';import Footer from '@/components/Footer';import ThemeSwitcher from '@/components/ThemeSwitcher'
export const dynamic='force-static'
export default async function LocaleLayout({children,params}:{children:ReactNode,params:{locale:string}}){
  const l=(isLocale(params.locale)?params.locale:'uk') as Locale;const m=await getMessages(l)
  const t=(key:string,p?:Record<string,any>)=>{const parts=key.split('.');let cur:any=m;for(const part of parts){cur=cur?.[part]}if(typeof cur==='string'&&p){return cur.replace(/\{(\w+)\}/g,(_,k)=>String(p[k]??''))}return typeof cur==='string'?cur:key}
  return (<html lang={l} suppressHydrationWarning><body><Header t={t} locale={l}/><main className="mx-auto max-w-6xl px-4">{children}</main><Footer t={t}/><ThemeSwitcher/></body></html>)}
