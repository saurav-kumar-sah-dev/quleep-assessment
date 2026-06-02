import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Product Dashboard</h1>
          <div className="nav-links">
            <a href="/">Products</a>
            <a href="/add-product">Add Product</a>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
