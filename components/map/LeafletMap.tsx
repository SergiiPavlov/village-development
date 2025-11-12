'use client'
import { useEffect, useRef } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import Link from 'next/link'
import { places } from '@/content/places'
import { Locale } from '@/lib/i18n/config'

type Props = { locale: Locale }

export default function LeafletMap({ locale }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return
    if (mapRef.current) return
    const map = L.map(ref.current, { center: [49.6407, 36.3526], zoom: 12, scrollWheelZoom: true })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map)

    const clusterGroup = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount()
        return L.divIcon({
          html: `<div class="z-cluster">${count}</div>`,
          className: 'z-cluster-icon',
          iconSize: [36, 36]
        })
      }
    })

    const bounds: L.LatLngExpression[] = []
    const pin = (lat: number, lng: number) => L.divIcon({ className: 'z-pin', html: '', iconSize: [12, 12] })

    places.forEach(p => {
      const anyP = p as any
      if (typeof anyP.lat === 'number' && typeof anyP.lng === 'number') {
        const name = (p.title as any)?.[locale] || (p.title as any)?.uk || p.slug
        const url = `/${locale}/places/${p.slug}`
        const marker = L.marker([anyP.lat, anyP.lng], { icon: pin(anyP.lat, anyP.lng) })
        marker.bindPopup(`<div style=\"min-width:220px\"><strong>${anyP.title?.[locale]||anyP.title?.uk}</strong><br/>`+
  (anyP.link ? `<a href='${anyP.link}' target='_blank' rel='noopener' class='underline'>${locale==='uk'?'Сайт':locale==='ru'?'Сайт':'Website'}</a> · ` : '')+
  `<a href='/${locale}/places/${anyP.slug}' class='underline'>${locale==='uk'?'Детальніше':locale==='ru'?'Подробнее':'Details'}</a></div>`)
        clusterGroup.addLayer(marker as any)
        bounds.push([anyP.lat, anyP.lng])
      }
    })

    map.addLayer(clusterGroup as any)

    if (bounds.length > 0) {
      const b = L.latLngBounds(bounds as any)
      map.fitBounds(b.pad(0.15))
    }

    return () => { map.remove(); mapRef.current = null }
  }, [locale])

  return (
    <div className="rounded-xl border overflow-hidden">
      <style jsx global>{`
        .z-pin { 
          background: #2563eb; border: 2px solid #eff6ff; width: 12px; height: 12px; 
          border-radius: 9999px; box-shadow: 0 0 0 2px rgba(37,99,235,.15);
        }
        .z-cluster-icon { background: transparent; }
        .z-cluster { 
          display: grid; place-items: center; width: 36px; height: 36px; 
          border-radius: 9999px; color: #0b2559; font-weight: 700; 
          background: radial-gradient(ellipse at center, #93c5fd 0%, #60a5fa 60%, #3b82f6 100%);
          border: 2px solid #eff6ff; box-shadow: 0 2px 6px rgba(0,0,0,.15);
        }
      `}</style>
      <div ref={ref} className="w-full min-h-[60vh]" />
    </div>
  )
}
