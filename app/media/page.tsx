export default function MediaPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Média</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Galerie et ressources multimédias</h1>
          <p className="mt-4 text-neutral-700 leading-8">Images, vidéos et documents officiels présentant la vie et les actions de la chefferie.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Collections visuelles</h2>
            <p className="mt-3 text-neutral-700">Présentez des photographies de cérémonies, rencontres et paysages du territoire.</p>
          </article>
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Documents officiels</h2>
            <p className="mt-3 text-neutral-700">Rassemblez les rapports, notes et ressources partagées par la chefferie.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
