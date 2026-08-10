import { AnghalMapClient } from '@/components/anghal/AnghalMapClient';

export default function AnghalMapPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Carte</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Plan d’Anghal</h1>
          <p className="mt-4 text-neutral-700 leading-8">Navigate through the Chiefdom territory with an OpenStreetMap-based map view centered on Mahagi.</p>
        </div>
        <div className="rounded-[2rem] overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm">
          <AnghalMapClient />
        </div>
      </section>
    </main>
  );
}
