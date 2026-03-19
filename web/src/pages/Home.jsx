import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Card, Carousel, Statistic, Tag, Avatar, Tooltip, Space } from 'antd';
import { ShoppingCartOutlined, ThunderboltOutlined, HeartOutlined, SafetyOutlined, StarFilled, RiseOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
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
    { 
      id: 1,
      image: 'https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=500', 
      name: 'Premium Dog Food', 
      price: '₹899',
      oldPrice: '₹1299',
      rating: 4.8,
      reviews: 234
    },
    { 
      id: 2,
      image: 'https://images.unsplash.com/photo-1530281335914-ffe53923c3a5?w=500', 
      name: 'Interactive Cat Toys', 
      price: '₹499',
      oldPrice: '₹699',
      rating: 4.6,
      reviews: 156
    },
    { 
      id: 3,
      image: 'https://images.unsplash.com/photo-1576516927231-7a25138f73de?w=500', 
      name: 'Grooming Kit', 
      price: '₹1299',
      oldPrice: '₹1899',
      rating: 4.9,
      reviews: 312
    },
    { 
      id: 4,
      image: 'https://images.unsplash.com/photo-1587300411107-ec48506850e8?w=500', 
      name: 'Luxury Pet Collar', 
      price: '₹399',
      oldPrice: '₹599',
      rating: 4.7,
      reviews: 189
    },
  ];

  const categories = [
    { icon: '🦴', name: 'Food & Treats', count: '450+' },
    { icon: '🧸', name: 'Toys', count: '320+' },
    { icon: '💊', name: 'Medicines', count: '180+' },
    { icon: '✂️', name: 'Grooming', count: '95+' },
  ];

  const services = [
    { icon: '🏥', name: 'Veterinary', desc: 'Expert vets 24/7' },
    { icon: '👶', name: 'Pet Sitting', desc: 'Loving care' },
    { icon: '🛁', name: 'Grooming', desc: 'Professional styles' },
    { icon: '🚗', name: 'Delivery', desc: '25 min guarantee' },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Pets', icon: <HeartOutlined /> },
    { number: '2.5K+', label: 'Products', icon: <ShoppingCartOutlined /> },
    { number: '500+', label: 'Vets', icon: <SafetyOutlined /> },
    { number: '95%', label: 'Satisfaction', icon: <StarFilled /> },
  ];

  return (
    <div className="home-container">
      {/* Premium Hero Section */}
      <section className="hero-section premium-hero" style={{ backgroundPosition: `0px ${scrollY * 0.5}px` }}>
        <div className="hero-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">✨ Trusted by 50K+ Pet Parents</div>
          <h1 className="hero-title">Your Pet Deserves the Best</h1>
          <p className="hero-subtitle">Curated products, expert services & lightning-fast delivery for your furry friends</p>

          <div className="search-container">
            <div className="search-box">
              <Input
                size="large"
                placeholder="🔍 Search products, services, medicines..."
                value={searchTerm}
                onChange={handleSearch}
                onPressEnter={handleSearchSubmit}
                className="search-input premium-input"
              />
              <Button
                type="primary"
                size="large"
                onClick={handleSearchSubmit}
                className="search-button premium-button"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/products">
              <Button 
                type="primary" 
                size="large" 
                className="btn-primary premium-btn"
                icon={<ShoppingCartOutlined />}
              >
                Shop Now
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="large" 
                className="btn-secondary premium-btn"
                icon={<ThunderboltOutlined />}
              >
                Book Service
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <Row gutter={[32, 32]} justify="center">
            {stats.map((stat, idx) => (
              <Col xs={12} sm={6} key={idx} className="stat-col">
                <div className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <Statistic 
                    value={stat.number} 
                    suffix=""
                    valueStyle={{ color: '#667eea', fontSize: '28px', fontWeight: 'bold' }}
                  />
                  <p className="stat-label">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="carousel-section">
        <div className="container">
          <div className="section-header">
            <h2>⭐ Featured This Week</h2>
            <Link to="/products" className="view-all">View All →</Link>
          </div>
          
          <Carousel 
            autoplay={{ delay: 4000 }}
            className="featured-carousel"
            dots={{ className: 'carousel-dots' }}
          >
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="carousel-item-wrapper">
                <div className="carousel-item premium-carousel">
                  <div className="carousel-image-wrapper">
                    <img src={product.image} alt={product.name} className="carousel-image" />
                    <div className="carousel-overlay">
                      <Button type="primary" size="large">View Details</Button>
                    </div>
                  </div>
                  
                  <div className="carousel-info">
                    <div className="carousel-header">
                      <h3>{product.name}</h3>
                      <Tag color="red">-{Math.round((1 - parseInt(product.price.replace('₹', '')) / parseInt(product.oldPrice.replace('₹', ''))) * 100)}% OFF</Tag>
                    </div>
                    <div className="price-section">
                      <span className="current-price">{product.price}</span>
                      <span className="old-price">{product.oldPrice}</span>
                    </div>
                    <div className="rating-section">
                      <span className="stars">★★★★★ {product.rating}</span>
                      <span className="reviews">({product.reviews} reviews)</span>
                    </div>
                    <Button type="primary" block size="large" className="add-to-cart-btn">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <Row gutter={[24, 24]}>
            {categories.map((cat, idx) => (
              <Col xs={12} sm={6} key={idx}>
                <div 
                  className="category-card hover-lift"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="category-icon">{cat.icon}</div>
                  <h3>{cat.name}</h3>
                  <p>{cat.count} items</p>
                  <div className="category-arrow">→</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Premium Services</h2>
          <Row gutter={[24, 24]}>
            {services.map((service, idx) => (
              <Col xs={12} sm={6} key={idx}>
                <div className="service-card premium-service">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p>{service.desc}</p>
                  <Button type="link" className="service-btn">Book Now →</Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Treat Your Pet?</h2>
          <p>Join thousands of happy pet parents who trust PetSite</p>
          <Link to="/products">
            <Button type="primary" size="large" className="cta-button">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
