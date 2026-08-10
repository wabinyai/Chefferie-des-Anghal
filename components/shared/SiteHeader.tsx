'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { href: '/', label: 'Accueil' },
  { href: '/chiefdom/chiefs', label: 'Chefs' },
  { href: '/heritage/history', label: 'Histoire' },
  { href: '/anghal/map', label: 'Carte' },
  { href: '/projects', label: 'Projets' },
  { href: '/support', label: 'Soutien' },
  { href: '/news', label: 'Actualités' },
  { href: '/media', label: 'Média' }
] as const;

function isActiveRoute(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-xl font-semibold tracking-tight text-neutral-950">
            Chefferie des Anghal
          </Link>
          <span className="hidden text-sm text-neutral-500 lg:block">Territoire de Mahagi • Ituri</span>
        </div>
        <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-1 text-sm">
          {navigation.map(({ href, label }) => {
            const active = isActiveRoute(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={active
                  ? 'rounded-full bg-brand-100 px-3 py-2 font-semibold text-brand-800'
                  : 'rounded-full px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950'}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/admin"
            aria-current={pathname.startsWith('/admin') ? 'page' : undefined}
            className={pathname.startsWith('/admin')
              ? 'rounded-full border border-brand-700 bg-brand-700 px-4 py-2 font-semibold text-white'
              : 'rounded-full border border-brand-700 px-4 py-2 font-semibold text-brand-700 transition hover:bg-brand-50'}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
