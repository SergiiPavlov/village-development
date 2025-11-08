
export type Locale = 'uk'|'en'|'ru'

export type LString = {
  uk: string
  en: string
  ru: string
}

export type Place = {
  slug: string
  title: LString
  excerpt: LString
  cover: string
  lat?: number
  lng?: number
  tags?: string[]
}

export type NewsItem = {
  id: string
  date: string // ISO
  title: LString
  summary: LString
  cover: string
  tags?: string[]
}
