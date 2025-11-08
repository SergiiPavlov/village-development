
import { Locale } from './config'

export function pick<T = string | Record<string, string>>(val: any, locale: Locale): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'object') {
    if (val[locale]) return String(val[locale])
    return String(val.uk || val.en || val.ru || '')
  }
  return String(val)
}
