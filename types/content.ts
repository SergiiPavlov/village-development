
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


export interface EventI18n {
  title: string;
  excerpt: string;
  body?: string;
  placeName?: string;
  address?: string;
}

export interface EventItem {
  id: string;              // slug/id
  dateStart: string;       // ISO
  dateEnd?: string;        // ISO
  cover: string;           // /photos/... path
  i18n: {
    uk: EventI18n;
    ru: EventI18n;
    en: EventI18n;
  };
  location?: {
    lat?: number;
    lng?: number;
  };
}
