import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Card, Space, Carousel, Statistic } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, ThunderboltOutlined, HeartOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  const featuredProducts = [
    { image: 'https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=500', name: 'Premium Dog Food', price: '₹899' },
    { image: 'https://images.unsplash.com/photo-1530281335914-ffe53923c3a5?w=500', name: 'Interactive Cat Toys', price: '₹499' },
    { image: 'https://images.unsplash.com/photo-1576516927231-7a25138f73de?w=500', name: 'Grooming Kit', price: '₹1299' },
    { image: 'https://images.unsplash.com/photo-1587300411107-ec48506850e8?w=500', name: 'Luxury Pet Collar', price: '₹399' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundPosition: `0px ${scrollY * 0.5}px` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">🌟 Welcome to PetSite</div>
          <h1 className="hero-title">Your Pet's Perfect Paradise</h1>
          <p className="hero-subtitle">Everything your beloved pet needs - Premium Products, Expert Services & Instant Delivery</p>

          <div className="search-box">
            <Input
              size="large"
              placeholder="🔍 Search for pet products, services, medicines..."
              value={searchTerm}
              onChange={handleSearch}
              onPressEnter={handleSearchSubmit}
              className="search-input"
            />
            <Button
              type="primary"
              size="large"
              onClick={handleSearchSubmit}
              className="search-button"
            >
              Search
            </Button>
          </div>

          <div className="cta-buttons">
            <Link to="/products">
              <Button type="primary" size="large" className="btn-primary">🛒 Shop Now</Button>
            </Link>
            <Link to="/services">
              <Button size="large" className="btn-secondary">📞 Book Service</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <h2>Featured This Week ⭐</h2>
        <Carousel autoplay className="featured-carousel">
          {featuredProducts.map((product, idx) => (
            <div key={idx} className="carousel-item">
              <div className="carousel-content">
                <img src={product.image} alt={product.name} />
                <div className="carousel-info">
                  <h3>{product.name}</h3>
                  <p className="carousel-price">{product.price}</p>
                  <Button type="primary">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose PetSite?</h2>
        <Row gutter={[30, 30]} className="features-grid">
          <Col xs={24} sm={12} md={6}>
            <Card className="feature-card" hoverable>
              <div className="feature-icon">🛍️</div>
              <h3>Pet Products</h3>
              <p>Food, toys, accessories, and grooming supplies for all pet types</p>
              <Link to="/products">
                <Button type="primary" block className="feature-btn">
                  Shop Now
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="feature-card" hoverable>
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Vet Services</h3>
              <p>Professional veterinary consultations & medical care</p>
              <Link to="/services">
                <Button type="primary" block className="feature-btn">
                  Book Now
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="feature-card" hoverable>
              <div className="feature-icon">👶</div>
              <h3>Pet Babysitting</h3>
              <p>Trusted care for your pets while you're away</p>
              <Link to="/services">
                <Button type="primary" block className="feature-btn">
                  Book Now
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="feature-card" hoverable>
              <div className="feature-icon">💊</div>
              <h3>Pet Medicine</h3>
              <p>Prescribed veterinary medicines with instant delivery</p>
              <Link to="/products">
                <Button type="primary" block className="feature-btn">
                  Browse
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Row gutter={[40, 40]} className="stats-grid">
          <Col xs={24} sm={12} md={6}>
            <div className="stat-card">
              <ThunderboltOutlined className="stat-icon" />
              <Statistic title="Instant Delivery" value={25} suffix=" mins" className="stat-value" />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="stat-card">
              <ShoppingCartOutlined className="stat-icon" />
              <Statistic title="Products Available" value={500} suffix="+" className="stat-value" />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="stat-card">
              <HeartOutlined className="stat-icon" />
              <Statistic title="Happy Customers" value={10} suffix="K+" className="stat-value" />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="stat-card">
              <SafetyOutlined className="stat-icon" />
              <Statistic title="100% Verified" value="Vets & Vendors" className="stat-value" />
            </div>
          </Col>
        </Row>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <Row gutter={[20, 20]} className="categories-grid">
          <Col xs={12} sm={8} md={4}>
            <Link to="/products?category=food">
              <Card className="category-card" hoverable>
                <div className="category-emoji">🍖</div>
                <h3>Pet Food</h3>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Link to="/products?category=toys">
              <Card className="category-card" hoverable>
                <div className="category-emoji">🎾</div>
                <h3>Toys</h3>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Link to="/products?category=accessories">
              <Card className="category-card" hoverable>
                <div className="category-emoji">🎀</div>
                <h3>Accessories</h3>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Link to="/products?category=grooming">
              <Card className="category-card" hoverable>
                <div className="category-emoji">🛁</div>
                <h3>Grooming</h3>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Link to="/products?category=health">
              <Card className="category-card" hoverable>
                <div className="category-emoji">💊</div>
                <h3>Health</h3>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Link to="/products">
              <Card className="category-card" hoverable>
                <div className="category-emoji">🏪</div>
                <h3>All Products</h3>
              </Card>
            </Link>
          </Col>
        </Row>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Pamper Your Pet?</h2>
          <p>Join thousands of happy pet owners and get everything your pet needs delivered to your doorstep</p>
          <Link to="/products">
            <Button type="primary" size="large" className="cta-button">
              Start Shopping Now 🐾
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
