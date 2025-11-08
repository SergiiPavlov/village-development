
import { Place } from '@/types/content'

export const places: Place[] = [
  {
    slug: 'siverskyi-donets-bank',
    title: { uk: 'Берег Сіверського Дінця', en: 'Siverskyi Donets Riverside', ru: 'Берег Северского Донца' },
    excerpt: {
      uk: 'Улюблене місце для відпочинку, риболовлі та прогулянок.',
      en: 'A favorite spot for leisure, fishing and walks.',
      ru: 'Любимое место для отдыха, рыбалки и прогулок.'
    },
    cover: '/photos/places/donets.jpg',
    lat: 49.947, lng: 36.700, tags: ['nature','river']
  },
  {
    slug: 'oak-grove',
    title: { uk: 'Дубовий гай', en: 'Oak Grove', ru: 'Дубовая роща' },
    excerpt: {
      uk: 'Невеликий лісовий масив із стежками та птахами.',
      en: 'A small woodland with trails and birds.',
      ru: 'Небольшой лесной массив с тропами и птицами.'
    },
    cover: '/photos/places/oak.jpg',
    tags: ['forest','walks']
  },
  {
    slug: 'old-church-foundation',
    title: { uk: 'Місце старої церкви', en: 'Old Church Site', ru: 'Место старой церкви' },
    excerpt: {
      uk: 'Історичне місце — зберігаємо спогади та фото.',
      en: 'Historic spot — preserving memories and photos.',
      ru: 'Историческое место — сохраняем воспоминания и фото.'
    },
    cover: '/photos/places/church.jpg',
    tags: ['history','heritage']
  },
  {
    slug: 'blue-well-spring',
    title: { uk: '“Синє джерело” (умовна назва)', en: '“Blue Well” Spring (local)', ru: '«Синий колодец» (условн.)' },
    excerpt: {
      uk: 'Чисте джерело з крижаної водою — популярне місце влітку.',
      en: 'A clear cold-water spring — a summer favorite.',
      ru: 'Чистый источник с ледяной водой — популярное место летом.'
    },
    cover: '/photos/places/blue-well.jpg',
    tags: ['nature','spring']
  },
  {
    slug: 'suspension-footbridge',
    title: { uk: 'Пішохідний підвісний міст', en: 'Suspension Footbridge', ru: 'Подвесной пешеходный мост' },
    excerpt: {
      uk: 'Невеликий міст через яр — гарні краєвиди і фото.',
      en: 'A small bridge over a ravine — great views and photos.',
      ru: 'Небольшой мост через овраг — красивые виды и фото.'
    },
    cover: '/photos/places/bridge.jpg',
    tags: ['viewpoint','photo']
  },
  {
    slug: 'sunflower-field',
    title: { uk: 'Соняшникове поле', en: 'Sunflower Field', ru: 'Подсолнуховое поле' },
    excerpt: {
      uk: 'У серпні — золоте море, ідеально для прогулянок та кадрів.',
      en: 'In August — a golden sea, perfect for walks and shots.',
      ru: 'В августе — золотое море, идеальное для прогулок и фото.'
    },
    cover: '/photos/places/sunflower.jpg',
    tags: ['nature','seasonal']
  },
  {
    slug: 'hill-viewpoint',
    title: { uk: 'Пагорб-оглядова точка', en: 'Hill Viewpoint', ru: 'Смотровая на холме' },
    excerpt: {
      uk: 'Місце для зустрічі світанків та заходів сонця.',
      en: 'A spot to meet sunrises and sunsets.',
      ru: 'Место для рассветов и закатов.'
    },
    cover: '/photos/places/hill.jpg',
    tags: ['viewpoint','sunset']
  }
]
