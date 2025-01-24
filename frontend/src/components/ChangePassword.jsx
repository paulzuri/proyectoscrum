import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Usa el hook para acceder al contexto

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // Nuevo estado para errores de validación
  const { changePassword } = useAuth(); // Obtén la función changePassword desde el contexto

  // Función de validación
  const validatePassword = (password) => {
    const hasNumber = /\d/; // Verifica si contiene al menos un número
    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!hasNumber.test(password)) {
      return "La contraseña debe incluir al menos un número.";
    }
    return null; // Contraseña válida
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword(newPassword); // Validar contraseña
    if (validationError) {
      setError(validationError);
      return; // Detener si no cumple los requisitos
    }

    try {
      const response = await changePassword(newPassword);
      setMessage(response);
      setError(""); // Borrar errores previos
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Nueva contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>} {/* Muestra errores */}
          </div>
          <div className="mt-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Cambiar contraseña
            </button>
          </div>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>} {/* Muestra mensajes */}
      </div>
    </div>
  );
};

export default ChangePassword;
