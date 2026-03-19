import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const { Header } = Layout;

function Navigation() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const items = JSON.parse(cart);
      setCartCount(items.length);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="orders">
        <Link to="/orders">My Orders</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🐾 PetSite
        </Link>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className="navbar-menu"
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/products">
            <Link to="/products">Shop</Link>
          </Menu.Item>
          <Menu.Item key="/services">
            <Link to="/services">Services</Link>
          </Menu.Item>
        </Menu>

        <div className="navbar-actions">
          <Link to="/cart">
            <Badge count={cartCount}>
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                size="large"
                style={{ color: 'white' }}
              />
            </Badge>
          </Link>

          {user ? (
            <Dropdown menu={{ items: userMenu }}>
              <Space style={{ color: 'white', cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                {user.name}
              </Space>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">
                <Button type="text" style={{ color: 'white' }}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Header>
  );
}

export default Navigation;
