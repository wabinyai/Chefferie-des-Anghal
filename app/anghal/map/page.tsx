'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false
});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false
});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false
});

export default function AnghalMapPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const position: [number, number] = [2.4833, 30.8333];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-700">Carte</p>
          <h1 className="text-4xl font-serif font-semibold text-neutral-950">Plan d’Anghal</h1>
          <p className="mt-4 text-neutral-700 leading-8">Navigate through the Chiefdom territory with an OpenStreetMap-based map view centered on Mahagi.</p>
        </div>
        <div className="rounded-[2rem] overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm">
          {isClient ? (
            <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="h-[520px] w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              <Marker position={position}>
                <Popup>Chefferie des Anghal - Mahagi</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="flex h-[520px] items-center justify-center bg-neutral-100 text-neutral-600">Chargement de la carte…</div>
          )}
        </div>
      </section>
    </main>
  );
}
