import { NextResponse } from 'next/server'
import { events } from '@/content/events'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const ev = events.find(e => e.id === params.id)
  if (!ev) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const dt = (iso: string) => iso.replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')
  const uid = `zadonetske-${ev.id}@local`
  const dtStart = dt(ev.dateStart)
  const dtEnd = dt(ev.dateEnd || ev.dateStart)

  const summary = ev.i18n.uk.title
  const desc = ev.i18n.uk.excerpt
  const loc = [ev.i18n.uk.placeName, ev.i18n.uk.address].filter(Boolean).join(', ')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zadonetske//Events//UA',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dt(new Date().toISOString())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${desc}`,
    loc ? `LOCATION:${loc}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n')

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${ev.id}.ics"`
    }
  })
}
