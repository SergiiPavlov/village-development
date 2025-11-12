export type RouteItem = {
  slug: string
  title: { uk:string; ru:string; en:string }
  excerpt?: { uk?:string; ru?:string; en?:string }
  lengthKm?: number
  type: 'hike' | 'bike' | 'kayak'
  gpx?: string // public path to GPX file
  points?: { lat:number; lng:number; name?:string }[]
}

export const routes: RouteItem[] = [
  {
    slug: 'kozacha-hora-view',
    title: { uk:'Козача гора — оглядова петля', ru:'Казачья гора — обзорная петля', en:'Kozacha Hora — scenic loop' },
    excerpt: { uk:'Короткий підйом до панорами Сіверського Дінця та соснових борів.', ru:'Короткий подъём к панораме Северского Донца и сосновых боров.', en:'Short climb to a great Donets valley view.' },
    lengthKm: 4.2,
    type: 'hike',
    gpx: '/routes/kozacha-hora-view.gpx',
    points: []
  },
  {
    slug: 'blue-well-kayak',
    title: { uk:'Блакитне озеро — заплави Дінця (байдарки)', ru:'Голубое озеро — поймы Донца (байдарки)', en:'Blue Well — Donets backwaters (kayak)' },
    lengthKm: 8.5,
    type: 'kayak',
    gpx: '/routes/blue-well-kayak.gpx',
    points: []
  }
]
