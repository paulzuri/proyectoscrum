import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react"; // Importa React y los hooks
import ProductCatalog from './ProductCatalog';
import NavBar from './NavBar';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';  // Importa el componente SearchBar
import Footer from './Footer'; // Importa el Footer
const API_URL = "http://localhost:5555";

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

/*<ProductCatalog apiUrl={API_URL} />

return (
    <div className="App">      
      <ProductCatalog />
    </div>
  );

*/
//Comprobar si funciona conexion

function App() {
  const [message, setMessage] = useState(""); // Estado para almacenar la respuesta del backend

  return (
    <div className="App">
      <NavBar/>
      <ProductCatalog/>
      <FilterButton/>
    </div>
  );
}

export default App;
