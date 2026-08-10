export default function NewsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Actualités</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Récits et nouvelles de la communauté</h1>
          <p className="mt-4 text-neutral-700 leading-8">Restez informé des événements, des rencontres et des mises à jour de la chefferie.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Événements locaux</h2>
            <p className="mt-3 text-neutral-700">Suivez les cérémonies traditionnelles, les rencontres communautaires et les journées de mobilisation.</p>
          </article>
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Projets en cours</h2>
            <p className="mt-3 text-neutral-700">Accédez aux mises à jour sur les actions en cours dans le territoire d’Anghal.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
