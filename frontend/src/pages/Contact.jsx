import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contacto</h1>
      <p>Somos estudiantes de la Escuela Politécnica Nacional, de la Facultad de Sistemas, carrera de Computación.</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Creadores</h2>
      <ul className="list-disc list-inside ml-4">
        <li>Paul Zurita</li>
        <li>Andres Carrillo</li>
        <li>Wilson García</li>
        <li>Danna Zaldumbide</li>
        <li>Jorge Martínez</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Información de Contacto</h2>
      <p><strong>Correo Electrónico:</strong> <a href="mailto:wladimir.carrillo01@epn.edu.ec" className="text-blue-600 underline">wladimir.carrillo01@epn.edu.ec</a></p>
      <p><strong>Teléfono:</strong> <a href="tel:+593983250005" className="text-blue-600 underline">0983250005</a></p>
    </div>
  );
};

export default Contact;