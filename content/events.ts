import { EventItem } from '@/types/content';

export const events: EventItem[] = [
  {
    id: 'river-cleanup',
    dateStart: '2025-11-25T10:00:00+02:00',
    cover: '/photos/places/blue-well.jpg',
    i18n: {
      uk: {
        title: 'Прибирання на березі Сіверського Дінця',
        excerpt: 'Суботник: очищаємо берег, встановлюємо таблички та урни.',
        body: 'Запрошуємо мешканців і гостей на прибирання берега. Готуємо рукавички та мішки, наприкінці — чай і печиво.',
        placeName: 'Берег річки',
        address: 'Задонецьке, Харківська обл.'
      },
      ru: {
        title: 'Уборка на берегу Северского Донца',
        excerpt: 'Субботник: чистим берег, ставим таблички и урны.',
        body: 'Приглашаем жителей и гостей на уборку берега. Перчатки и мешки подготовим, в конце — чай и печенье.',
        placeName: 'Берег реки',
        address: 'Задонецкое, Харьковская обл.'
      },
      en: {
        title: 'Siverskyi Donets Riverside Cleanup',
        excerpt: 'Community cleanup: shoreline, signs and bins.',
        body: 'Join locals for a riverside cleanup. Gloves and bags provided; tea and cookies afterwards.',
        placeName: 'River bank',
        address: 'Zadonetske, Kharkiv region'
      }
    }
  },
  {
    id: 'forest-trail-day',
    dateStart: '2025-12-09T10:00:00+02:00',
    cover: '/photos/places/bridge.jpg',
    i18n: {
      uk: {
        title: 'День лісових стежок',
        excerpt: 'Розмітка маршрутів та фотопрогулянка селом.',
        body: 'Оновлюємо розмітку лісових стежок, тестуємо нові маршрути для туристів, робимо спільні фото.',
        placeName: 'Ліс біля села',
        address: 'Задонецьке'
      },
      ru: {
        title: 'День лесных троп',
        excerpt: 'Разметка маршрутов и фотопрогулка по селу.',
        body: 'Обновляем разметку лесных троп, тестируем туристические маршруты и делаем общие фото.',
        placeName: 'Лес рядом с селом',
        address: 'Задонецкое'
      },
      en: {
        title: 'Forest Trail Day',
        excerpt: 'Waymarking session and photo walk.',
        body: 'We refresh trail markers, test tourist routes and take group photos.',
        placeName: 'Village forest',
        address: 'Zadonetske'
      }
    }
  },
  {
    id: 'local-fair',
    dateStart: '2025-12-26T10:00:00+02:00',
    cover: '/photos/places/church.jpg',
    i18n: {
      uk: {
        title: 'Задонецький ярмарок',
        excerpt: 'Місцеві страви, ремесла, музика.',
        body: 'Запрошуємо на ярмарок: мед, випічка, рукоділля, дитячі активності, невеликий концерт.',
        placeName: 'Центр села',
        address: 'Задонецьке'
      },
      ru: {
        title: 'Задонецкая ярмарка',
        excerpt: 'Местная еда, ремесла, музыка.',
        body: 'Приглашаем на ярмарку: мёд, выпечка, рукоделие, детские активности и небольшой концерт.',
        placeName: 'Центр села',
        address: 'Задонецкое'
      },
      en: {
        title: 'Zadonetske Fair',
        excerpt: 'Local food, crafts and music.',
        body: 'Join our fair: honey, bakery, crafts, kids activities and a small live show.',
        placeName: 'Village center',
        address: 'Zadonetske'
      }
    }
  }
];
