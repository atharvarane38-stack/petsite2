import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Select, Spin, Empty, Pagination } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

const { Option } = Select;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    petType: 'all',
    page: 1,
    limit: 12,
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [filters]); // fetchProducts is defined outside useEffect, so not needed as dependency

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll(filters);
      setProducts(response.data.data.products);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category, page: 1 });
  };

  const handlePetTypeChange = (petType) => {
    setFilters({ ...filters, petType, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>🛍️ Pet Shop</h1>
        <p>Find everything your pet needs</p>
      </div>

      <div className="filters-section">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="All Categories"
              value={filters.category}
              onChange={handleCategoryChange}
              style={{ width: '100%' }}
            >
              <Option value="">All Categories</Option>
              <Option value="food">🍖 Food</Option>
              <Option value="toys">🎾 Toys</Option>
              <Option value="accessories">🎀 Accessories</Option>
              <Option value="grooming">🛁 Grooming</Option>
              <Option value="health">💊 Health</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Pet Type"
              value={filters.petType}
              onChange={handlePetTypeChange}
              style={{ width: '100%' }}
            >
              <Option value="all">All Pets</Option>
              <Option value="dog">🐕 Dogs</Option>
              <Option value="cat">🐱 Cats</Option>
              <Option value="bird">🦜 Birds</Option>
              <Option value="fish">🐠 Fish</Option>
              <Option value="exotic">🦎 Exotic</Option>
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Button
              type="primary"
              block
              icon={<ShoppingCartOutlined />}
              size="large"
            >
              View Cart
            </Button>
          </Col>
        </Row>
      </div>

      <Spin spinning={loading}>
        {products.length > 0 ? (
          <>
            <Row gutter={[20, 20]} className="products-grid">
              {products.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            <div className="pagination-section">
              <Pagination
                current={filters.page}
                total={pagination.total}
                pageSize={filters.limit}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <Empty description="No products found" style={{ marginTop: 50 }} />
        )}
      </Spin>
    </div>
  );
}

export default Products;
