import Image from 'next/image'
import Link from 'next/link'

export default function Footer({ rights }: { rights: string }) {
  const y = new Date().getFullYear()
  return (
    <footer className="mt-12 py-8 text-sm opacity-80">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Image src="/brand/crest-32.png" width={20} height={20} alt="" />
          <span>© {y} Задонецьке</span>
        </div>
        <div className="text-center">{rights}</div>
        <div className="flex items-center gap-4">
          <Link href="https://t.me/zadonetske" className="underline" target="_blank" rel="noreferrer">Telegram</Link>
          <Link href="https://instagram.com" className="underline" target="_blank" rel="noreferrer">Instagram</Link>
        </div>
      </div>
    </footer>
  )
}