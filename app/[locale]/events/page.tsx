import {isLocale,Locale} from '@/lib/i18n/config';import {getMessages} from '@/lib/i18n/getMessages'
export const dynamic='force-static'
export default async function EventsPage({params}:{params:{locale:string}}){
  const l:Locale=(isLocale(params.locale)?params.locale:'uk') as any;const m=await getMessages(l);const t=(k:string)=>k.split('.').reduce((a:any,p)=>a?.[p],m)??k
  return (<div className="py-8"><h1 className="text-3xl font-bold mb-2">{t('pages.events.title')}</h1><p>{t('pages.events.stub')}</p></div>)
}
