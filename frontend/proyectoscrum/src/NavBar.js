import React from 'react';
import './NavBar.css';
import logo from './images/logo.png'; // Reemplaza con el logo de tu tienda
import cartIcon from './images/carrito.png'; // Reemplaza con el icono de carrito
import userIcon from './images/user.png'; // Reemplaza con el icono de usuario
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Logo y nombre */}
      <div className="navbar-left">
        <Link to="/" className="navbar-home-link">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Tienda Virtual</h1>
        </Link>
      </div>

      {/* Íconos de carrito y usuario */}
      <div className="navbar-right">
        <Link to="/cart" className="navbar-icon">
          <img src={cartIcon} alt="Carrito" className="navbar-icon" />
        </Link>
        <Link to="/login" className="navbar-icon">
          <img src={userIcon} alt="Usuario" className="navbar-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
