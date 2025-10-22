import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map.css';

interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const locations: Location[] = [
  {
    lat: -12.008889,
    lng: -77.060278,
    name: "Dance Studio - Sede Principal",
    address: "Av. Alfredo Mendiola 5982"
  },
  {
    lat: -12.016389,
    lng: -77.065833,
    name: "Dance Studio - Los Olivos",
    address: "Av. Carlos Izaguirre 1235"
  },
  {
    lat: -12.001944,
    lng: -77.083333,
    name: "Dance Studio - San Martín",
    address: "Av. Antúnez de Mayolo 1532"
  }
];

const MapContainer = () => {
  useEffect(() => {
    // Prevenir múltiples inicializaciones del mapa
    if (typeof window !== "undefined") {
      // Crear el mapa centrado en la primera ubicación
      const map = L.map('map', {
        zoomControl: false, // Desactivamos el control de zoom por defecto
      }).setView([locations[0].lat, locations[0].lng], 13);

      // Añadir el tile layer por defecto de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.webp', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Añadir control de zoom en una posición personalizada
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      // Crear icono personalizado
      const customIcon = L.icon({
        iconUrl: '/img/map-marker.svg',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -42]
      });

      // Crear un grupo de marcadores para ajustar el zoom automáticamente
      const markers = L.featureGroup();

      // Añadir todos los marcadores
      locations.forEach((location) => {
        const marker = L.marker([location.lat, location.lng], { icon: customIcon });
        
        const popupContent = `
          <div class="text-center">
            <strong class="text-primary text-lg">${location.name}</strong>
            <p>${location.address}</p>
          </div>
        `;

        marker.bindPopup(popupContent, {
          className: 'custom-popup',
          maxWidth: 200,
          closeButton: false
        });

        markers.addLayer(marker);
      });

      // Añadir el grupo de marcadores al mapa
      markers.addTo(map);

      // Ajustar el zoom para mostrar todos los marcadores
      map.fitBounds(markers.getBounds().pad(0.1));

      // Cleanup al desmontar el componente
      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div className="relative">
      <div 
        id="map" 
        className="w-full h-[400px] md:h-[500px] rounded-lg shadow-2xl relative z-10"
      />
    </div>
  );
}

export default MapContainer
