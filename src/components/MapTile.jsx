import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const MapUpdater = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.flyTo([lat, lon], 11);
    }
  }, [lat, lon, map]);

  return null;
};

const MapTile = ({ lat, lon, city }) => {
  if (!lat || !lon) return null;

  return (
    <div className="rounded-2xl shadow p-4 bg-white w-full h-[300px] mt-4 map-tile flex">
      <MapContainer center={[lat, lon]} zoom={11} scrollWheelZoom={false} style={{ height: "30rem", width: "30rem", borderRadius: "1rem"  }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        <Marker position={[lat, lon]}>
          <Popup>{city}</Popup>
        </Marker>
        <MapUpdater lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
};

export default MapTile;
