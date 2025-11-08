import Image from 'next/image';
import Link from 'next/link';
import {Locale, isLocale} from '@/lib/i18n/config';

export default async function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale;

  // Статический список подготовленных изображений
  const images = Array.from({length: 9}).map((_, i) => ({
    src: `/photos/gallery/g${String(i+1).padStart(2,'0')}.jpg`,
    w: 1600,
    h: 900,
    alt: `Gallery photo ${i+1}`
  }));

  return (
    <section className="py-6">
      <h1 className="text-2xl font-semibold mb-4">Галерея</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <div key={img.src} className="overflow-hidden rounded-xl border bg-white/50">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={false}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 opacity-70 text-sm">
        <Link href={`/${locale}`}>← На главную</Link>
      </div>
    </section>
  );
}
