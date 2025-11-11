import fs from 'node:fs'
import path from 'node:path'
import { isLocale, type Locale } from '@/lib/i18n/config'

export const dynamic = 'force-static'

function mdToHtml(md: string): string {
  const esc = (s:string)=> s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  let html = esc(md)
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
             .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
             .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
             .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
             .replace(/\*(.+?)\*/g, '<em>$1</em>')
             .replace(/\[(.+?)\]\((https?:[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  html = html.replace(/(?:^|\n)-( .+(?:\n- .+)*)/g, (m)=>{
    const items = m.trim().split(/\n-/).map(s=>s.replace(/^-\s?/,''))
    return '<ul>'+items.map(i=>'<li>'+i+'</li>').join('')+'</ul>'
  })
  html = html.replace(/\n{2,}/g, '</p><p>')
  return '<p>'+html+'</p>'
}

export default function GuidePage({ params }:{ params:{ locale:string }}) {
  const l:Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const file = path.join(process.cwd(), 'content', 'i18n', l, 'guide.md')
  const md = fs.readFileSync(file, 'utf-8')
  const html = mdToHtml(md)
  return (
    <section className="prose max-w-none py-8">
      <div dangerouslySetInnerHTML={{__html: html}} />
    </section>
  )
}
