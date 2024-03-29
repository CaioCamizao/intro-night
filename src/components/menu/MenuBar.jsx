import React from 'react';
import './MenuBar.css';
import Logo from './LocalizaAi.png';

function MenuBar({ onSearch, searchQuery, onSearchQueryChange }) {
  return (
    <div className="menu-bar">
      <div className="menu-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="menu-actions">
        <input type="text" placeholder="Buscar estabelecimentos..." value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} />
        <button className="buscar-button" onClick={onSearch}>Buscar</button>
        <button className="login-button">Login</button>
        <button className="criar-button">Criar Conta</button>
      </div>
    </div>
  );
}

export default MenuBar;