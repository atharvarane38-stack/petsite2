import React, { useState } from 'react';
import { Card, Button, InputNumber, message } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import './ProductCard.css';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    message.success(`Added ${quantity} item(s) to cart`);
    setQuantity(1);
    setIsAdding(false);
  };

  const categoryEmoji = {
    food: '🍖',
    toys: '🎾',
    accessories: '🎀',
    grooming: '🛁',
    health: '💊',
  };

  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <div className="product-image">
          <div className="image-placeholder">
            {categoryEmoji[product.category] || '📦'}
          </div>
          {product.image && (
            <img src={product.image} alt={product.name} className="product-photo" />
          )}
          <div className="product-badge">
            <span className="badge-text">⭐ {(Math.random() * 2 + 3.5).toFixed(1)}</span>
          </div>
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            {isFavorite ? <HeartFilled /> : <HeartOutlined />}
          </button>
          <div className="product-overlay">
            <p className="quick-view">Quick View</p>
          </div>
        </div>
      }
    >
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">Category: {product.category}</p>
      <p className="product-pet-type">
        🐾 {product.petType === 'all' ? 'All Pets' : `For ${product.petType}s`}
      </p>
      <p className="product-description">{product.description}</p>

      <div className="product-pricing">
        <span className="product-price">₹{product.price.toFixed(0)}</span>
        <span className="old-price">₹{(product.price * 1.2).toFixed(0)}</span>
        <span className="discount-badge">-16%</span>
      </div>

      <div className="product-stock">
        {product.quantity > 0 ? (
          <span className="in-stock">✓ In Stock ({product.quantity})</span>
        ) : (
          <span className="out-stock">✗ Out of Stock</span>
        )}
      </div>

      <div className="product-actions">
        <div className="quantity-section">
          <span className="qty-label">Qty:</span>
          <InputNumber
            min={1}
            max={product.quantity}
            value={quantity}
            onChange={setQuantity}
            className="quantity-input"
            disabled={product.quantity === 0}
          />
        </div>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          block
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          loading={isAdding}
          className="add-cart-btn"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
