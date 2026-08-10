export default function DocumentsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Documents</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Documents officiels</h1>
          <p className="mt-4 text-neutral-700 leading-8">Consultez les rapports, archives et documents partagés par la chefferie.</p>
        </div>
        <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-neutral-950">Archives en préparation</h2>
          <p className="mt-4 text-neutral-700 leading-8">Cette section sera bientôt enrichie avec les documents officiels, rapports et archives de la chefferie.</p>
        </div>
      </section>
    </main>
  );
}
