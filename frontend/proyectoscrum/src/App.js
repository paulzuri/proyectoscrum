import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductCatalog from './ProductCatalog';
import NavBar from './NavBar';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import Footer from './Footer';
import ShoppingCart from './ShoppingCart';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProductDetail from './ProductDetail';  // Importamos el componente de detalles del producto

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [products, setProducts] = useState([]);  // Estado para almacenar los productos

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5555/products');
        const data = await response.json();
        setProducts(data);  // Guarda los productos en el estado
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<><SearchBar /><FilterButton /><ProductCatalog products={products} /></>} />
          <Route path="/cart" element={isAuthenticated ? <ShoppingCart /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetail products={products} />} /> {/* Asegúrate de pasar los productos aquí */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
