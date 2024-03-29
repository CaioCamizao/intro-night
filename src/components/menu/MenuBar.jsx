import React from 'react';
import './MenuBar.css';
import Logo from './LocalizaAi.png'; // Importe a imagem do logo

function MenuBar({ onSearch, searchQuery, onSearchQueryChange }) {
  return (
    <div className="menu-bar">
      <div className="menu-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="menu-links">
        {/* Adicione seus links aqui, se necessário */}
        {/* Por exemplo: */}
        {/* <a href="#">Link 1</a>
        <a href="#">Link 2</a> */}
      </div>
      <div className="menu-actions">
        <input type="text" placeholder="Buscar estabelecimentos..." value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} />
        <button className="buscar-button" onClick={onSearch}>Buscar</button>
        <button className="login-button">Login</button> {/* Botão de login */}
        <button className="senha-button">Senha</button> {/* Botão de senha */}
      </div>
    </div>
  );
}

export default MenuBar;