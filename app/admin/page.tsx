import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCmsSession } from '@/lib/auth/session';

export default async function AdminDashboardPage() {
  const session = await getCmsSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Administration</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Tableau de bord CMS</h1>
          <p className="mt-4 text-neutral-700 leading-8">Gérez les rois d’Anghal, l’histoire, les médias et les contenus du site depuis cet espace sécurisé.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/admin/chiefs" className="rounded-full border border-brand-700 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100">
              Gérer les souverains
            </Link>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-5 py-3 text-sm text-neutral-700">
              Connecté : {session.user.name || session.user.email}
            </span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Gestion des souverains</h2>
            <p className="mt-3 text-neutral-700">Ajouter, éditer et organiser les biographies, images et successeurs des rois.</p>
          </article>
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-950">Contenu du site</h2>
            <p className="mt-3 text-neutral-700">Contrôlez les pages publiques, les sections d’histoire, les actualités et les médias.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
