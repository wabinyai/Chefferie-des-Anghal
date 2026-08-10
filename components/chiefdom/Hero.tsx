import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  motto: string;
}

export function Hero({ title, subtitle, motto }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_32%)]" />
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-24 sm:px-10">
        <div className="max-w-4xl space-y-8">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-300">{title}</p>
          <h1 className="text-5xl font-serif font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            {subtitle}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-brand-100">{motto}</p>
          <div className="flex flex-wrap gap-4 pt-6">
            <Link href="/heritage/history" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600">
              Découvrir Anghal
            </Link>
            <Link href="/chiefdom/chiefs" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Notre histoire
            </Link>
            <Link href="/projects" className="rounded-full border border-brand-300 bg-brand-50 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-brand-100">
              Projets de développement
            </Link>
            <Link href="/support" className="rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200">
              Soutenir un projet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
