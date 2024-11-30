import React from 'react';
import './LoginButton.css';

const LoginButton = () => {
  const handleLoginClick = () => {
    // Abrir la página de inicio de sesión en una nueva ventana o pestaña
    window.open('/login', '_blank');
  };

  return (
    <button className="login-button" onClick={handleLoginClick}>
      Iniciar Sesión
    </button>
  );
};

export default LoginButton;
