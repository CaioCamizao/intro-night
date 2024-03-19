import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './style.css';

function App(props) {
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Solicitar a localização atual do usuário ao carregar o componente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
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
    const request = {
      location: mapCenter,
      radius: '5000',
      type: ['restaurant']
    };

    // Limpar os resultados antigos
    setPlaces([]);

    service.nearbySearch(request, (results, status) => {
      if (status === props.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      } else {
        console.error('Erro ao buscar estabelecimentos:', status);
      }
    });
  };

  const handleMapClick = (mapProps, map, clickEvent) => {
    // Atualizar o estado do centro do mapa com as coordenadas do local clicado pelo usuário
    setMapCenter({ lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() });
  };

  return (
    <div className="App">
      <h1>Localizador de Estabelecimentos</h1>
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
            <img src={place.icon} alt="Place Icon" />
            <div className="place-details">
              <h2>{place.name}</h2>
              <p>Ranking de Estrelas: {place.rating}</p>
              <p>Horário de Funcionamento: {place.opening_hours ? place.opening_hours.isOpen() ? 'Aberto agora' : 'Fechado' : 'Horário não informado'}</p>
              <p>Distância: Calculada a partir da sua localização</p>
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
