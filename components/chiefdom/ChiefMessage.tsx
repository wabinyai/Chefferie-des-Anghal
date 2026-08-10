import Image from 'next/image';
import Link from 'next/link';

interface ChiefMessageProps {
  portrait: string;
  fullName: string;
  customaryTitle: string;
  message: string;
}

export function ChiefMessage({ portrait, fullName, customaryTitle, message }: ChiefMessageProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:px-10">
        <div className="rounded-[2rem] bg-neutral-100 p-6 shadow-soft">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-neutral-950">
            <Image src={portrait} width={440} height={560} alt={`${fullName} portrait`} className="h-auto w-full object-cover" />
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-base font-semibold text-neutral-950">{fullName}</p>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-700">{customaryTitle}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 shadow-soft">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Message du Chef</p>
            <p className="text-xl font-serif font-semibold text-neutral-950">Un appel à l&apos;unité, au souvenir et au progrès des jeunes générations.</p>
            <p className="text-base leading-8 text-neutral-700">{message}</p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/chiefdom/chiefs" className="rounded-full border border-neutral-900 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100">
              Biographie complète
            </Link>
            <Link href="/news" className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
              Actualités officielles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
