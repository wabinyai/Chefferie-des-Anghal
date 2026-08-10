import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-300">Site officiel</p>
          <p className="mt-4 text-sm leading-7">Chefferie des Anghal • Territoire de Mahagi • Province de l’Ituri • RDC</p>
          <p className="mt-4 text-sm text-neutral-400">Une plateforme institutionnelle dédiée à l’histoire, la gouvernance, la communauté et le développement.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-300">Liens importants</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li><Link href="/heritage/history">Histoire</Link></li>
              <li><Link href="/chiefdom/chiefs">Les Chefs</Link></li>
              <li><Link href="/anghal/map">Carte</Link></li>
              <li><Link href="/support">Soutien</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-300">Ressources</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/media">Média</Link></li>
              <li><Link href="/news">Actualités</Link></li>
              <li><Link href="/documents">Documents</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 px-6 py-6 text-center text-xs text-neutral-500 lg:px-10">
        © 2026 Chefferie des Anghal. Tous droits réservés.
      </div>
    </footer>
  );
}
