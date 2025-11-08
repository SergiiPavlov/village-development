
import { NewsItem } from '@/types/content'

export const news: NewsItem[] = [
  {
    id: '2025-11-fair',
    date: '2025-11-15',
    title: { uk: 'Сільський ярмарок', en: 'Village Fair', ru: 'Сельская ярмарка' },
    summary: {
      uk: 'Запрошуємо на ярмарок із ремеслами та частуванням.',
      en: 'Join the fair with crafts and local treats.',
      ru: 'Приглашаем на ярмарку с ремёслами и угощениями.'
    },
    cover: '/photos/news/fair.jpg',
    tags: ['community']
  },
  {
    id: '2025-12-winter-trail',
    date: '2025-12-10',
    title: { uk: 'Зимова стежка', en: 'Winter Trail', ru: 'Зимняя тропа' },
    summary: {
      uk: 'Готуємо промарковану туристичну стежку для прогулянок.',
      en: 'Preparing a marked walking trail for winter.',
      ru: 'Готовим размеченную прогулочную тропу на зиму.'
    },
    cover: '/photos/news/trail.jpg',
    tags: ['tourism']
  },
  {
    id: '2025-10-cleanup',
    date: '2025-10-20',
    title: { uk: 'Суботник на березі', en: 'Riverside Cleanup', ru: 'Субботник на берегу' },
    summary: {
      uk: 'Приєднуйтесь до прибирання — рукавички та мішки будуть!',
      en: 'Join the cleanup — gloves and bags provided!',
      ru: 'Присоединяйтесь к уборке — перчатки и мешки будут!'
    },
    cover: '/photos/news/cleanup.jpg',
    tags: ['community','river']
  },
  {
    id: '2025-09-heritage-day',
    date: '2025-09-12',
    title: { uk: 'День спадщини: фотосесія', en: 'Heritage Day: Photo Session', ru: 'День наследия: фотосессия' },
    summary: {
      uk: 'Збір сімейних фото для цифрового архіву села.',
      en: 'Collecting family photos for the village digital archive.',
      ru: 'Собираем семейные фото для цифрового архива села.'
    },
    cover: '/photos/news/heritage.jpg',
    tags: ['heritage','archive']
  }
]
