export default function Footer({t}:{t:(k:string,p?:Record<string,any>)=>string}){
  return (<footer className="mt-14 border-t" role="contentinfo">
    <div className="mx-auto max-w-6xl px-4 py-10 text-sm opacity-80 flex items-center justify-between">
      <span>{t('footer.rights',{year:new Date().getFullYear()})}</span>
      <span></span>
    </div>
  </footer>)}
