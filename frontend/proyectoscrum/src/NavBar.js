import React, { useState } from 'react';
import './NavBar.css';
import logo from './images/logo.png'; // Logo de tu tienda
import cartIcon from './images/carrito.png'; // Ícono de carrito
import userIcon from './images/user.png'; // Ícono de usuario
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-home-link">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Tienda Virtual</h1>
        </Link>
      </div>

      {/* Íconos */}
      <div className="navbar-right">
        {/* Carrito */}
        <div className={`navbar-icon-wrapper ${!isAuthenticated ? 'disabled' : ''}`}>
          <Link
            to={isAuthenticated ? '/cart' : '#'}
            className="navbar-icon"
            onClick={(e) => {
              if (!isAuthenticated) e.preventDefault();
            }}
          >
            <img src={cartIcon} alt="Carrito" className="navbar-icon" />
          </Link>
          {!isAuthenticated && <div className="tooltip">Primero debes iniciar sesión</div>}
        </div>

        {/* Usuario */}
        <div className="navbar-user">
          <img
            src={userIcon}
            alt="Usuario"
            className="navbar-icon"
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <div className="user-menu">
              {isAuthenticated ? (
                <button className="user-menu-item" onClick={onLogout}>
                  Cerrar sesión
                </button>
              ) : (
                <Link to="/login" className="user-menu-item">
                  Iniciar sesión
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
