'use client';

import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[520px] items-center justify-center bg-neutral-100 text-neutral-600"
      role="status"
    >
      Chargement de la carte…
    </div>
  )
});

export function AnghalMapClient() {
  return <LeafletMap />;
}
