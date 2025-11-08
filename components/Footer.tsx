
export default function Footer({ rights }: { rights: string }) {
  return (
    <footer className="mt-14 border-t" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm opacity-80 flex items-center justify-between">
        <span>{rights}</span>
        <span></span>
      </div>
    </footer>
  )
}
