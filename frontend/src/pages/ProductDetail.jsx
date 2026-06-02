import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import * as THREE from 'three';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && canvasRef.current) {
      initThreeJS();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch product details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const initThreeJS = () => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x667eea,
      shininess: 100
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">← Back to Products</Link>
      
      <div className="detail-content">
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <div className="info-card">
            <p className="info-item">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="info-item">
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p className="info-item">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="info-item">
              <strong>Created:</strong> {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="threejs-container">
          <h2>3D Visualization</h2>
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="threejs-canvas" />
          </div>
          <p className="canvas-note">Interactive 3D cube with continuous rotation</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
