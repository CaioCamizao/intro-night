import React, { useState, useEffect } from 'react';
import './style.css';

function Main() {
  const [term, setTerm] = useState('');
  const [estabelecimentos, setEstabelecimentos] = useState([]);

  useEffect(() => {
    // Simulação de estabelecimentos
    const simulatedData = [
      { 
        place_id: 1, 
        name: 'Restaurante A', 
        vicinity: 'Rua A, 123', 
        rating: 4.5, 
        image: 'https://via.placeholder.com/100', 
        distance: '500m', // Simulação de distância
        opening_hours: '08:00', // Simulação de horário de abertura
        closing_hours: '20:00' // Simulação de horário de fechamento
      },
      // Outros estabelecimentos...
    ];
    setEstabelecimentos(simulatedData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Aqui você pode chamar a função para buscar os estabelecimentos reais
    // searchNearbyPlaces(term);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Buscar Estabelecimentos Próximos</h1>
      </div>
      {/* Formulário de busca (simulado) */}
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Termo de Busca:</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
        </div>
        <button className="btn-submit" type="submit">Buscar Estabelecimentos</button>
      </form>
      
      {/* Lista de estabelecimentos */}
      <div className="estabelecimentos">
        <h2>Estabelecimentos Encontrados:</h2>
        <div className="cards-container">
          {estabelecimentos.map(estabelecimento => (
            <div key={estabelecimento.place_id} className="card">
              <img src={estabelecimento.image} alt="Imagem do Estabelecimento" className="card-image" />
              <div className="card-info">
                <h3 className="card-title">{estabelecimento.name}</h3>
                <p className="card-address">{estabelecimento.vicinity}</p>
                <p className="card-distance">Distância: {estabelecimento.distance}</p>
                <p className="card-opening-hours">Aberto: {estabelecimento.opening_hours} - {estabelecimento.closing_hours}</p>
                <p className="card-rating">Avaliação: {estabelecimento.rating || 'Não disponível'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
