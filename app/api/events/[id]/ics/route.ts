import { NextRequest, NextResponse } from 'next/server'
import { events } from '@/content/events'
import { locales, type Locale, isLocale } from '@/lib/i18n/config'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ev = events.find(e => e.id === params.id)
  if (!ev) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Try to infer locale from URL: /uk/api/events/{id}/ics
  const pathname = req.nextUrl.pathname
  const seg = pathname.split('/').filter(Boolean)[0]
  const l: Locale = (isLocale(seg) ? seg as Locale : 'uk') as Locale

  const dt = (iso: string) => iso.replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')
  const uid = `zadonetske-${ev.id}@local`
  const dtStart = dt(ev.dateStart)
  const dtEnd = dt(ev.dateEnd || ev.dateStart)
  const summary = ev.i18n[l].title
  const desc = ev.i18n[l].excerpt || ''
  const loc = [ev.i18n[l].placeName, ev.i18n[l].address].filter(Boolean).join(', ')
  const url = `${req.nextUrl.origin}/${l}/events/${ev.id}`

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zadonetske//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dt(new Date().toISOString())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeText(summary)}`,
    desc ? `DESCRIPTION:${escapeText(desc)}` : '',
    loc ? `LOCATION:${escapeText(loc)}` : '',
    `URL:${escapeText(url)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean)

  const ics = icsLines.join('\r\n')

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${ev.id}.ics"`
    }
  })
}

function escapeText(input: string) {
  return input.replace(/\\/g, '\\\\')
              .replace(/\n/g, '\\n')
              .replace(/,/g, '\\,')
              .replace(/;/g, '\\;')
}
