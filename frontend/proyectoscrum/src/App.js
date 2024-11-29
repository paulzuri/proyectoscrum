import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react"; // Importa React y los hooks
import ProductCatalog from './ProductCatalog';
import NavBar from './NavBar';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';  // Importa el componente SearchBar
import Footer from './Footer'; // Importa el Footer
const API_URL = "http://localhost:5555";

function App() {
  const [message, setMessage] = useState(""); // Estado para almacenar la respuesta del backend

  return (
    <div className="App">
      <NavBar/>
      <SearchBar/>
      <FilterButton/>
      <ProductCatalog/>
      <Footer/>
    </div>
  );
}

export default App;
