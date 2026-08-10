'use client';

import L from 'leaflet';
import { useEffect, useRef } from 'react';

const ANGHAL_POSITION: L.LatLngExpression = [2.4833, 30.8333];

export default function LeafletMap() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Leaflet marks its container as initialized. Giving every effect run its
    // own DOM node avoids reusing that marker during Strict Mode and hot reloads.
    const container = document.createElement('div');
    container.className = 'h-full w-full';
    host.replaceChildren(container);

    const map = L.map(container, {
      center: ANGHAL_POSITION,
      zoom: 10,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    L.circleMarker(ANGHAL_POSITION, {
      radius: 9,
      color: '#713f2a',
      fillColor: '#9b5e3f',
      fillOpacity: 0.9
    })
      .addTo(map)
      .bindPopup('Chefferie des Anghal — Mahagi');

    return () => {
      map.remove();
      container.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="h-[520px] w-full"
      aria-label="Carte de la Chefferie des Anghal centrée sur Mahagi"
    />
  );
}
