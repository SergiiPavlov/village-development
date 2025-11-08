
import { Locale } from './config'
import type { I18nText } from '@/types/content'
export function pick(t: I18nText, l: Locale): string { return t?.[l] ?? t?.uk ?? '' }
