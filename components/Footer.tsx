import Image from 'next/image'

export default function Footer(){
  return (
    <footer className="site-footer text-white mt-0 align-middle">
      <div className="site-footer__wrap mx-auto max-w-6xl px-0 align-middle">
        <div className="site-footer__panel rounded-2xl bg-slate-900/95 text-white shadow-sm ring-1 ring-white/10 px-4 md:px-6 py-6 md:py-7 flex items-center justify-between gap-4 flex-wrap align-middle">
          <div className="flex items-center gap-3 align-middle">
            <Image src="/brand/crest-48.png" width={20} height={20} alt="" className="opacity-90 align-middle" />
            <span className="text-sm align-middle">
              © 2025 Задонецьке · <a href="mailto:zadonetske@gmail.com" className="underline decoration-white/40 underline-offset-4 hover:decoration-white align-middle">zadonetske@gmail.com</a>
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3 md:gap-4 align-middle"><a href="https://www.facebook.com/groups/439838963963945" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur ring-1 ring-white/20 align-middle">
              <svg viewBox="0 0 24 24" className="w-5 h-5 align-middle" aria-hidden>
                <path fill="#1877F2" d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.86 6.48 1.86 12.07c0 4.98 3.65 9.11 8.43 9.93v-7.03H7.96v-2.9h2.33v-2.2c0-2.3 1.37-3.57 3.46-3.57.99 0 2.04.18 2.04.18v2.25h-1.15c-1.14 0-1.5.71-1.5 1.44v1.9h2.55l-.41 2.9h-2.14V22c4.78-.82 8.43-4.95 8.43-9.93z"/>
              </svg>
            </a>
            <span className="hidden sm:inline-block h-7 w-px bg-white/15 mx-1 md:mx-2 align-middle" aria-hidden></span>
            <span className="hidden sm:inline-flex items-center align-middle">
              <a href="https://www.linkedin.com/in/sergii-pavlov/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn — Sergii Pavlov">
<Image src="/brand/sp-logo.svg" width={160} height={48} alt="Sergii Pavlov — Full‑Stack Developer" className="h-11 md:h-12 w-auto opacity-95 align-middle align-middle" />
</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
