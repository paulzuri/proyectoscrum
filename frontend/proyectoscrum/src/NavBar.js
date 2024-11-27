import React from 'react';
import './NavBar.css';
import logo from './images/logo.png'; // Reemplaza con el logo de tu tienda
import cartIcon from './images/carrito.png'; // Reemplaza con el icono de carrito
import userIcon from './images/user.png'; // Reemplaza con el icono de usuario

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Logo y nombre */}
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">Tienda Virtual</h1>
      </div>

      {/* Íconos de carrito y usuario */}
      <div className="navbar-right">
        <img src={cartIcon} alt="Carrito" className="navbar-icon" />
        <img src={userIcon} alt="Usuario" className="navbar-icon" />
      </div>
    </nav>
  );
};

export default NavBar;
