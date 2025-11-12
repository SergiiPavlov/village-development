'use client'
import { useEffect, useRef } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function PlaceMiniMap({ lat, lng }: { lat:number; lng:number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!ref.current || typeof window==='undefined') return
    const map = L.map(ref.current, { center:[lat, lng], zoom: 14, zoomControl:false, attributionControl:false })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map)
    L.circleMarker([lat, lng], { radius:7, weight:2, color:'#2563eb', fillColor:'#60a5fa', fillOpacity:0.9 }).addTo(map)
    return () => { map.remove() }
  }, [lat,lng])
  return <div className="rounded-lg border overflow-hidden"><div ref={ref} className="w-full h-[240px]" /></div>
}
