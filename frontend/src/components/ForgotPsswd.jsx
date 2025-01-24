import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Usa el hook para acceder al contexto

function ForgotPsswd() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Nuevo estado para el tipo de mensaje (éxito o error)
  const { resetPassword } = useAuth(); // Obtén la función resetPassword del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(email);
      setMessage(response); // Mensaje amigable del éxito
      setMessageType("success"); // Tipo de mensaje: éxito
    } catch (error) {
      // Mensaje amigable en caso de error de Firebase
      let errorMessage = "Algo salió mal. Inténtalo nuevamente.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No se encontró una cuenta con ese correo.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Por favor, ingresa un correo válido.";
      }
      setMessage(errorMessage); // Mensaje de error amigable
      setMessageType("error"); // Tipo de mensaje: error
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap space-y-2.5 items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Enviar enlace
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              messageType === "success"
                ? "text-green-500" // Estilo verde para éxitos
                : "text-red-500" // Estilo rojo para errores
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPsswd;
