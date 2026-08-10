import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-xl font-semibold tracking-tight text-neutral-950">
            Chefferie des Anghal
          </Link>
          <span className="hidden text-sm text-neutral-500 lg:block">Territoire de Mahagi • Ituri</span>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-neutral-700">
          <Link href="/">Accueil</Link>
          <Link href="/chiefdom/chiefs">Chefs</Link>
          <Link href="/heritage/history">Histoire</Link>
          <Link href="/anghal/map">Carte</Link>
          <Link href="/projects">Projets</Link>
          <Link href="/support">Soutien</Link>
          <Link href="/news">Actualités</Link>
          <Link href="/media">Média</Link>
          <Link href="/admin" className="rounded-full border border-brand-700 px-4 py-2 text-brand-700 hover:bg-brand-50">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
