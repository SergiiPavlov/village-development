import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="footer-wrap mt-8">
      <div className="footer-inner mx-auto max-w-6xl px-4 py-6 rounded-t-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm opacity-90 flex items-center gap-2">
          <span className="font-semibold">Zadonetske</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4">
          <a className="footer-link" href="mailto:zadonetske@gmail.com" title="Email" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="hidden sm:inline">zadonetske@gmail.com</span>
          </a>
          <a className="footer-icon footer-icon--tg" href="#" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Telegram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9.04 15.27 8.9 18.7c.36 0 .52-.16.71-.36l1.7-1.64 3.52 2.58c.65.36 1.1.17 1.27-.6l2.3-10.77c.21-.95-.34-1.33-.97-1.1L3.6 9.87c-.93.36-.92.89-.16 1.13l3.83 1.2 8.89-5.61c.42-.26.81-.12.49.16"/>
            </svg>
          </a>
          <a className="footer-icon footer-icon--fb" href="#" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.01 3.66 9.17 8.44 9.93v-7.03H7.9V12.1h2.54V9.79c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.87h-2.33v7.03C18.34 21.24 22 17.08 22 12.07z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
