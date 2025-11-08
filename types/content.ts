
export type I18nText = { uk: string; ru: string; en: string }
export type Coords = { lat: number; lng: number }
export type Place = { id: string; title: I18nText; summary: I18nText; coords?: Coords }
export type NewsItem = { id: string; date: string; title: I18nText; excerpt: I18nText }
