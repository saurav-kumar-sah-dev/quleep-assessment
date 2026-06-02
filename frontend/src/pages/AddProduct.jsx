import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import './AddProduct.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="form-card">
        <h2>Add New Product</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Enter category"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter product description"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
