import React, { useState } from 'react';
import './FilterButton.css';

const FilterButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Función para manejar el despliegue del menú.
  const toggleMenu = () => {

    console.log("Antes:", showMenu);
    setShowMenu((prevShowMenu) => !prevShowMenu);
    console.log("Después:", !showMenu);
  };


  return (
    <div className="filter-button-container">
      <button className="filter-button" onClick={toggleMenu}>
        <span>Filtro</span> <span className="filter-icon">⚙️</span>
      </button>
      {showMenu && (
        <div className="filter-menu">
          <ul>
            <li>Por categoría</li>
            <li>Por orden alfabético</li>
            <li>Por precio (menor a mayor)</li>
            <li>Por precio (mayor a menor)</li>
            <li>Descuentos</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
