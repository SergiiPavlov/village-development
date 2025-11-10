export default function HowToGetHere({ t }: { t: (k:string)=>string }) {
  return (
    <section className="py-10 md:py-14">
      <h2 className="text-2xl font-semibold mb-4">{t('home.getHere.title')}</h2>
      <ul className="grid gap-3 md:grid-cols-3">
        <li className="rounded-xl border p-4 bg-white/60 dark:bg-black/30">{t('home.getHere.byCar')}</li>
        <li className="rounded-xl border p-4 bg-white/60 dark:bg-black/30">{t('home.getHere.byTrain')}</li>
        <li className="rounded-xl border p-4 bg-white/60 dark:bg-black/30">{t('home.getHere.season')}</li>
      </ul>
    </section>
  )
}
