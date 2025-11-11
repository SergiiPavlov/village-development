import Image from 'next/image';
import Link from 'next/link';
import {Locale, isLocale} from '@/lib/i18n/config';

export default async function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'uk') as Locale;

  // Статический список подготовленных изображений
  const images = [
  { src: "/photos/gallery/g01.jpg", w: 1600, h: 900, alt: "g01.jpg" },
  { src: "/photos/gallery/g02.jpg", w: 1600, h: 900, alt: "g02.jpg" },
  { src: "/photos/gallery/g03.jpg", w: 1600, h: 900, alt: "g03.jpg" },
  { src: "/photos/gallery/g04.jpg", w: 1600, h: 900, alt: "g04.jpg" },
  { src: "/photos/gallery/g05.jpg", w: 1600, h: 900, alt: "g05.jpg" },
  { src: "/photos/gallery/g06.jpg", w: 1600, h: 900, alt: "g06.jpg" },
  { src: "/photos/gallery/g07.jpg", w: 1600, h: 900, alt: "g07.jpg" },
  { src: "/photos/gallery/g08.jpg", w: 1600, h: 900, alt: "g08.jpg" },
  { src: "/photos/gallery/g09.jpg", w: 1600, h: 900, alt: "g09.jpg" },
  { src: "/photos/gallery/g10.jpg", w: 1600, h: 900, alt: "g10.jpg" },
  { src: "/photos/gallery/g11.jpg", w: 1600, h: 900, alt: "g11.jpg" },
  { src: "/photos/gallery/g12.jpg", w: 1600, h: 900, alt: "g12.jpg" },
  { src: "/photos/gallery/g13.jpg", w: 1600, h: 900, alt: "g13.jpg" },
  { src: "/photos/gallery/g14.jpg", w: 1600, h: 900, alt: "g14.jpg" },
  { src: "/photos/gallery/g15.jpg", w: 1600, h: 900, alt: "g15.jpg" },
  { src: "/photos/gallery/g16.jpg", w: 1600, h: 900, alt: "g16.jpg" },
  { src: "/photos/gallery/g17.jpg", w: 1600, h: 900, alt: "g17.jpg" },
  { src: "/photos/gallery/g18.jpg", w: 1600, h: 900, alt: "g18.jpg" },
  { src: "/photos/gallery/g19.jpg", w: 1600, h: 900, alt: "g19.jpg" },
  { src: "/photos/gallery/g20.jpg", w: 1600, h: 900, alt: "g20.jpg" },
  { src: "/photos/gallery/g21.jpg", w: 1600, h: 900, alt: "g21.jpg" },
  { src: "/photos/gallery/g22.jpg", w: 1600, h: 900, alt: "g22.jpg" },
  { src: "/photos/gallery/g23.jpg", w: 1600, h: 900, alt: "g23.jpg" },
  { src: "/photos/gallery/g24.jpg", w: 1600, h: 900, alt: "g24.jpg" }
];
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
