import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para validar los campos del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio.';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres.';
    }

    // Validación del apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio.';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres.';
    }

    // Validación del correo electrónico
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    // Validación de la contraseña
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(formData.password)) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
    }

    // Validación de confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Datos válidos:', formData);
      // Aquí puedes enviar los datos al backend
    } else {
      console.log('Errores en el formulario:', errors);
    }
  };

  return (
    <div className="register-page">
      <h1>Registro</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          className={errors.lastName ? 'error' : ''}
          required
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'error' : ''}
          required
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}

        <button type="submit">Registrarse</button>
        <button type="button" className="google-button">
          Registrarse con Google
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
