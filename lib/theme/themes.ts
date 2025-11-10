export type Theme = 'ethno' | 'river' | 'forest' | 'minimal';
export const THEMES: Theme[] = ['ethno','river','forest','minimal'];
export const DEFAULT_THEME: Theme = 'ethno';
export const HERO_BY_THEME: Record<Theme, string> = {
  ethno:   '/hero/hero-ethno-2400.jpg',
  river:   '/hero/hero-river-2400.jpg',
  forest:  '/hero/hero-forest-2400.jpg',
  minimal: '/hero/hero-minimal-2400.jpg',
};
export const FALLBACK_HERO = '/hero/hero-river-2400.jpg';
