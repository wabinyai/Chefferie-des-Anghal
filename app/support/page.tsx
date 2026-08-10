export default function SupportPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Soutien</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Soutenir la Chefferie des Anghal</h1>
          <p className="mt-4 text-neutral-700 leading-8">Découvrez comment participer, contribuer et renforcer les projets de la communauté.</p>
        </div>
        <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-neutral-950">Partenariats et donations</h2>
          <p className="mt-4 text-neutral-700 leading-8">Notre équipe travaille avec des partenaires locaux et internationaux pour soutenir les initiatives sociales et culturelles.</p>
        </div>
      </section>
    </main>
  );
}
