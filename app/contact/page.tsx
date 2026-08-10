export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Contact</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Entrer en contact avec la Chefferie</h1>
          <p className="mt-4 text-neutral-700 leading-8">Utilisez ce canal pour joindre les responsables, proposer des partenariats ou demander des informations.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Adresse</h2>
            <p className="mt-3 text-neutral-700">Mahagi, Territoire de Mahagi, Province de l’Ituri, République Démocratique du Congo.</p>
          </div>
          <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Demande officielle</h2>
            <p className="mt-3 text-neutral-700">Envoyez un message via les canaux de contact officiels pour toute demande liée à la chefferie.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
