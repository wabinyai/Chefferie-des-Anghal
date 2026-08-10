'use client';

import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';

const ANGHAL_POSITION: [number, number] = [2.4833, 30.8333];

export default function LeafletMap() {
  return (
    <MapContainer
      center={ANGHAL_POSITION}
      zoom={10}
      scrollWheelZoom={false}
      className="h-[520px] w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <CircleMarker
        center={ANGHAL_POSITION}
        radius={9}
        pathOptions={{ color: '#713f2a', fillColor: '#9b5e3f', fillOpacity: 0.9 }}
      >
        <Popup>Chefferie des Anghal — Mahagi</Popup>
      </CircleMarker>
    </MapContainer>
  );
}
