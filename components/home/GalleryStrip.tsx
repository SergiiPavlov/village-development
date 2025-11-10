import Image from 'next/image'
import Link from 'next/link'

const thumbs = Array.from({length: 12}, (_,i)=>`/photos/gallery/g${String(i+1).padStart(2,'0')}.jpg`)

export default function GalleryStrip({ locale, t }: { locale: string, t: (k:string)=>string }) {
  return (
    <section className="py-10 md:py-14">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-semibold">{t('home.gallery.title')}</h2>
        <Link href={`/${locale}/gallery`} className="text-sm underline">{t('home.gallery.all')}</Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {thumbs.map((src,idx)=>(
          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="(min-width:1024px) 16vw, (min-width:640px) 16vw, 33vw" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
