import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import './App.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Navigation />
        <Content className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Content>
        <Footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About PetSite</h4>
              <p>Your complete pet marketplace for all pet needs in Mumbai</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/products">Shop</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📞 +91-98765-43210</p>
              <p>📧 support@petsite.in</p>
              <p>📍 Mumbai, India</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 PetSite. All rights reserved.</p>
          </div>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
