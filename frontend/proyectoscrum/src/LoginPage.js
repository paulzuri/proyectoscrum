import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    // Aquí puedes manejar la lógica de autenticación
  };

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div className="login-links">
        <Link to="/forgot-password" className="login-link">
          ¿Olvidaste tu contraseña?
        </Link>
        <Link to="/signup" className="login-link">
          Crear cuenta
        </Link>
      </div>

    </div>
  );
};

export default LoginPage;
