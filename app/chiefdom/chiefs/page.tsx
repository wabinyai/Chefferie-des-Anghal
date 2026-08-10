import dbConnect from '@/lib/db/mongoose';
import Chief from '@/models/Chief';
import Image from 'next/image';
import { serializeChief, type ChiefRecord } from '@/lib/chiefs';

const PORTRAIT_PLACEHOLDER = '/images/chief-portrait-placeholder.svg';

export const dynamic = 'force-dynamic';

function getPortraitSource(portrait?: string) {
  if (!portrait || portrait.startsWith('/')) {
    return portrait || PORTRAIT_PLACEHOLDER;
  }

  try {
    return new URL(portrait).hostname.endsWith('.cloudinary.com')
      ? portrait
      : PORTRAIT_PLACEHOLDER;
  } catch {
    return PORTRAIT_PLACEHOLDER;
  }
}

async function getChiefs() {
  await dbConnect();
  const chiefs = await Chief.find({ status: 'published' })
    .select('order fullName customaryName portrait reignStart reignEnd predecessor successor biography status')
    .sort('order')
    .populate('predecessor successor', 'fullName')
    .lean<ChiefRecord[]>();

  return chiefs.map(serializeChief);
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
                    <Image
                      src={getPortraitSource(chief.portrait)}
                      alt={chief.fullName}
                      width={440}
                      height={560}
                      sizes="(min-width: 1024px) 220px, 100vw"
                      className="aspect-[11/14] h-auto w-full object-cover"
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
