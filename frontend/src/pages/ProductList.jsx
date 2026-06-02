import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>Product List</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          {searchTerm ? 'No products found matching your search.' : 'No products available. Add some products!'}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category"><strong>Category:</strong> {product.category}</p>
              <p className="product-price"><strong>Price:</strong> ₹{product.price}</p>
              <Link to={`/product/${product._id}`} className="view-details-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
