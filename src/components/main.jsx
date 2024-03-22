import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './main.css';

function App(props) {
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setUserLocation({ lat: latitude, lng: longitude });
        },
        error => {
          console.error('Erro ao obter localização:', error);
        }
      );
    } else {
      console.error('Geolocalização não suportada.');
    }
  }, []);

  const handleSearch = () => {
    const service = new props.google.maps.places.PlacesService(document.createElement('div'));
    const allowedTypes = ['restaurant', 'bar', 'cafe'];
    const inputType = 'bar';
    
    const isValidType = allowedTypes.includes(inputType);
    
    if (!isValidType) {
        console.log('Busca não encontrada');
        return;
    }
    
    const request = {
        location: mapCenter,
        radius: '5000',
        type: [inputType]
    };

    setPlaces([]);

    service.nearbySearch(request, (results, status) => {
      if (status === props.google.maps.places.PlacesServiceStatus.OK) {
        const updatedResults = results.map(place => {
          const distance = userLocation ? calculateDistance(userLocation, { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }) : 'Não disponível';
          return { ...place, distance };
        });
        const sortedResults = updatedResults.sort((a, b) => a.distance - b.distance);
        setPlaces(sortedResults);
      } else {
        console.error('Erro ao buscar estabelecimentos:', status);
      }
    });
  };

  const handleMapClick = (mapProps, map, clickEvent) => {
    setMapCenter({ lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() });
  };

  const calculateDistance = (point1, point2) => {
    const R = 6371e3;
    const φ1 = point1.lat * Math.PI / 180;
    const φ2 = point2.lat * Math.PI / 180;
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
    const Δλ = (point2.lng - point1.lng) * Math.PI / 180;
    
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c / 1000;
    
    return distance.toFixed(2);
  };

  function formatOpeningHours(opening_hours) {
    if (!opening_hours || !opening_hours.periods) {
      return 'Horário não informado';
    }

    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours() * 100 + now.getMinutes();

    const currentPeriod = opening_hours.periods.find(period => period.open && period.open.day === currentDay);
    if (!currentPeriod) {
      return 'Fechado';
    }

    const openTime = currentPeriod.open.time;
    const closeTime = currentPeriod.close.time;

    if (currentHour >= openTime && currentHour < closeTime) {
      return 'Aberto agora';
    } else {
      return 'Fechado';
    }
  }

  return (
    <div className="App">
      <h1>👇 Pesquise AQUI 👇 </h1>
      <div className="search-bar">
        <input type="text" placeholder="Buscar estabelecimentos..." />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="map-container">
        <Map
          google={props.google}
          zoom={14}
          center={mapCenter}
          onClick={handleMapClick}
          style={{ width: '100%', height: '300px' }}
        >
          {places.map(place => (
            <Marker
              key={place.id}
              name={place.name}
              position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
            />
          ))}
        </Map>
      </div>
      <div className="place-cards">
        {places.map(place => (
          <div key={place.id} className="place-card">
            {place.photos && place.photos.length > 0 && (
              <img src={place.photos[0].getUrl()} alt="Estabelecimento" />
            )}
            <div className="place-details">
              <h2>{place.name}</h2>
              <p>Ranking de Estrelas: {place.rating}</p>
              <p>Horário de Funcionamento: {place.opening_hours ? formatOpeningHours(place.opening_hours) : 'Horário não informado'}</p>
              <p>Distância: {place.distance} km</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAR2Gxmx2jcWYWtDgdjSz9SQ5Z8du_0_vY'
})(App);
