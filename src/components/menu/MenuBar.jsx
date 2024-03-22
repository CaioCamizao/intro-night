import React, { Component } from 'react';
import './MenuBar.css'; // Importe seu arquivo CSS para estilização
import Image from './LocalizaAi.png'

function MenuBar() {
  return (
    <div className="menu-bar">
      <div className="menu-logo">
        <img src={Image} alt="Logo" />
      </div>
      <div className="menu-links">
        <a href="#">Explorar</a>
        <a href="#">Pedidos</a>
        <a href="#">Ofertas</a>
        <a href="#">Perfil</a>
        <a href="#">Ajuda</a>
      </div>
      <div className="menu-actions">
        <button>Faça login</button>
        <button>Se cadastre</button>
      </div>
    </div>
  );
}

export default MenuBar;