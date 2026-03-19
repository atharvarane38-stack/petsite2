import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, Empty, Card, Divider, message } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const handleRemove = (productId) => {
    const updated = cart.filter(item => item.id !== productId);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    message.success('Item removed from cart');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove(productId);
      return;
    }
    const updated = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      message.warning('Your cart is empty');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      message.warning('Please login to checkout');
      return;
    }

    setLoading(true);
    try {
      // Simulate checkout
      message.success('Order placed successfully!');
      setCart([]);
      localStorage.setItem('cart', JSON.stringify([]));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(val) => handleQuantityChange(record.id, val)}
        />
      ),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (_, record) => `₹${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="cart-container">
      <h1>🛒 Shopping Cart</h1>

      {cart.length > 0 ? (
        <>
          <Table
            dataSource={cart}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="cart-table"
          />

          <Card className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>₹50.00</span>
            </div>
            <Divider />
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{(calculateTotal() + 50).toFixed(2)}</span>
            </div>

            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleCheckout}
              icon={<CheckOutlined />}
              style={{ marginTop: 20 }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </>
      ) : (
        <Empty description="Your cart is empty" style={{ marginTop: 50 }} />
      )}
    </div>
  );
}

export default Cart;
