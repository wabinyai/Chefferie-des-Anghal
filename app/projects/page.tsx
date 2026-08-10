export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Projets</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Initiatives pour le développement d’Anghal</h1>
          <p className="mt-4 text-neutral-700 leading-8">Suivez les actions et les projets communautaires qui soutiennent l’éducation, l’agriculture et l’infrastructure locale.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Agriculture durable</h2>
            <p className="mt-3 text-neutral-700">Des programmes d’accompagnement pour les familles, les champs et les cultures vivrières.</p>
          </article>
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Éducation</h2>
            <p className="mt-3 text-neutral-700">Construire des écoles, former des enseignants, et donner accès à l’apprentissage pour tous.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
