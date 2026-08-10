'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

type ChiefItem = {
  _id: string;
  order: number;
  fullName: string;
  customaryName: string;
  portrait?: string;
  reignStart?: string;
  reignEnd?: string;
  predecessor?: { _id: string; fullName: string } | null;
  successor?: { _id: string; fullName: string } | null;
  biography?: string;
};

type ChiefFormValues = {
  order: number;
  fullName: string;
  customaryName: string;
  portrait: string;
  reignStart: string;
  reignEnd: string;
  predecessor: string;
  successor: string;
  biography: string;
};

export default function AdminChiefsPage() {
  const [chiefs, setChiefs] = useState<ChiefItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<ChiefFormValues>({
    defaultValues: {
      order: 1,
      fullName: '',
      customaryName: '',
      portrait: '',
      reignStart: '',
      reignEnd: '',
      predecessor: '',
      successor: '',
      biography: ''
    }
  });

  useEffect(() => {
    loadChiefs();
  }, []);

  async function loadChiefs() {
    setLoading(true);
    try {
      const response = await fetch('/api/chiefs');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Impossible de charger les souverains.');
      }
      setChiefs(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Impossible de charger les souverains.');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: ChiefFormValues) {
    setLoading(true);
    setMessage(null);

    const payload = {
      order: Number(values.order),
      fullName: values.fullName,
      customaryName: values.customaryName,
      portrait: values.portrait || undefined,
      reignStart: values.reignStart || undefined,
      reignEnd: values.reignEnd || undefined,
      predecessor: values.predecessor || undefined,
      successor: values.successor || undefined,
      biography: values.biography || ''
    };

    try {
      const response = await fetch('/api/chiefs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error || 'Impossible d’ajouter le souverain.');
        return;
      }

      setMessage('Souverain ajouté avec succès.');
      reset({
        order: values.order + 1,
        fullName: '',
        customaryName: '',
        portrait: '',
        reignStart: '',
        reignEnd: '',
        predecessor: '',
        successor: '',
        biography: ''
      });
      await loadChiefs();
    } catch {
      setMessage('Une erreur réseau a empêché l’enregistrement.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce souverain ? Cette action est irréversible.')) {
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/chiefs/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error || 'Impossible de supprimer le souverain.');
        return;
      }
      setMessage('Souverain supprimé avec succès.');
      await loadChiefs();
    } catch {
      setMessage('Une erreur réseau a empêché la suppression.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Administration</p>
              <h1 className="mt-3 text-4xl font-serif font-semibold text-neutral-950">Gestion des rois d’Anghal</h1>
              <p className="mt-4 text-neutral-700 leading-8">Ajouter et organiser les souverains, leurs années de règne, leurs images et leurs successeurs.</p>
            </div>
            <Link href="/admin" className="rounded-full border border-neutral-900 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
              Retour au tableau de bord
            </Link>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-neutral-950">Ajouter un souverain</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Ordre</span>
                  <input type="number" min={1} required {...register('order', { valueAsNumber: true })} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
                </label>
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Nom du souverain</span>
                  <input type="text" required {...register('fullName')} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
                </label>
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Titre coutumier</span>
                  <input type="text" required {...register('customaryName')} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
                </label>
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Portrait (URL)</span>
                  <input type="url" {...register('portrait')} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
                </label>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Année de début de règne</span>
                  <input type="text" {...register('reignStart')} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
                </label>
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Année de fin de règne</span>
                  <input type="text" {...register('reignEnd')} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
                </label>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Prédécesseur</span>
                  <select {...register('predecessor')} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2">
                    <option value="">Aucun</option>
                    {chiefs.map((chief) => (
                      <option key={chief._id} value={chief._id}>{chief.fullName}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-neutral-700">
                  <span>Successeur</span>
                  <select {...register('successor')} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2">
                    <option value="">Aucun</option>
                    {chiefs.map((chief) => (
                      <option key={chief._id} value={chief._id}>{chief.fullName}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-sm text-neutral-700">
                <span>Biographie</span>
                <textarea {...register('biography')} rows={5} className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-200 transition focus:ring-2" />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60" disabled={loading}>
                  {loading ? 'Enregistrement...' : 'Ajouter le souverain'}
                </button>
                {message ? <p className="text-sm text-brand-700">{message}</p> : null}
              </div>
            </form>
          </section>

          <section className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-neutral-950">Souverains enregistrés</h2>
            {loading ? (
              <div className="mt-8 text-neutral-600">Chargement…</div>
            ) : chiefs.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-neutral-600">Aucun souverain n’a encore été ajouté.</div>
            ) : (
              <div className="mt-8 space-y-4">
                {chiefs.map((chief) => (
                  <div key={chief._id} className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">Ordre {chief.order}</p>
                        <h3 className="mt-2 text-xl font-semibold text-neutral-950">{chief.fullName}</h3>
                        <p className="text-sm text-neutral-600">{chief.customaryName}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={() => handleDelete(chief._id)} className="rounded-full border border-red-500 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <p className="text-sm text-neutral-700">Règne : {chief.reignStart || 'N/A'} – {chief.reignEnd || 'Présent'}</p>
                      <p className="text-sm text-neutral-700">Successeur : {chief.successor?.fullName || 'Aucun'}</p>
                      <p className="text-sm text-neutral-700">Prédécesseur : {chief.predecessor?.fullName || 'Aucun'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
