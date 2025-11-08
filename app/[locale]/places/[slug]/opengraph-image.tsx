
import { ImageResponse } from 'next/og'
import { places } from '@/content/places'
import { pick } from '@/lib/i18n/pick'
import { isLocale, Locale } from '@/lib/i18n/config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG({ params }: { params: { locale: string; slug: string } }) {
  const l: Locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale
  const p = places.find(x => x.slug === params.slug)
  const title = p ? pick(p.title, l) : 'Zadonetske'
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg,#1e3a5f,#305a7f)',
          color: '#fff',
          padding: '48px',
          fontSize: 54,
          fontWeight: 700
        }}
      >
        <div style={{fontSize: 28, opacity: 0.8, marginBottom: 6}}>Zadonetske</div>
        <div>{title}</div>
      </div>
    ),
    { ...size }
  )
}
