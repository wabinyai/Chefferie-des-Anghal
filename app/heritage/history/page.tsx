export default function HeritageHistoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Héritage</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Histoire et mémoire des Anghal</h1>
          <p className="mt-4 text-neutral-700 leading-8">Découvrez les moments, traditions et récits qui façonnent la communauté de la chefferie d’Anghal.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Chronologie</h2>
            <p className="mt-3 text-neutral-700">Ajoutez les principaux événements historiques, batailles, cérémonies et tournants de la chefferie.</p>
          </article>
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Mémoire collective</h2>
            <p className="mt-3 text-neutral-700">Présentez les récits oraux, les traditions vivantes et les figures charismatiques de la région.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
