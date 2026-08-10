import dbConnect from '@/lib/db/mongoose';
import Chief from '@/models/Chief';
import Link from 'next/link';

async function getChiefs() {
  await dbConnect();
  return Chief.find({ status: 'published' })
    .sort('order')
    .populate('predecessor successor')
    .lean();
}

export default async function ChiefsPage() {
  const chiefs = await getChiefs();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-8">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Royaume</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Les Chefs de la Chefferie des Anghal</h1>
          <p className="mt-4 text-neutral-700 leading-8">Explorez la succession royale des dirigeants d’Anghal, leurs biographies, leurs années de règne et l’héritage qu’ils ont construit.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/admin/chiefs" className="rounded-full border border-brand-700 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100">
              Voir le CMS des chefs
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {chiefs.length === 0 ? (
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-10 text-neutral-700 shadow-sm">
              <p>Aucun chef publié pour le moment. Rendez-vous dans l’administration pour ajouter la lignée royale.</p>
            </div>
          ) : (
            chiefs.map((chief) => (
              <article key={chief._id.toString()} className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
                <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                  <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
                    <img
                      src={chief.portrait || '/images/chief-portrait-placeholder.svg'}
                      alt={chief.fullName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-brand-100 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-brand-700">Règne {chief.reignStart || 'N/A'} – {chief.reignEnd || 'Présent'}</span>
                      <span className="text-sm text-neutral-500">Ordre {chief.order}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-neutral-950">{chief.fullName}</h2>
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-neutral-500">{chief.customaryName}</p>
                    <p className="mt-5 text-neutral-700 leading-7">{chief.biography || 'Une biographie sera bientôt ajoutée pour ce chef.'}</p>
                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-600">
                      {chief.predecessor ? <span>Prédécesseur : {chief.predecessor.fullName}</span> : null}
                      {chief.successor ? <span>Successeur : {chief.successor.fullName}</span> : null}
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
