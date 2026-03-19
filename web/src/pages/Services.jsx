import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, List, Empty, Divider, Input, Select, Spin } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { serviceService } from '../services/api';
import './Services.css';

const { Option } = Select;

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    serviceType: '',
    city: 'Mumbai',
    page: 1,
  });
  const [selectedService, setSelectedService] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    duration: 1,
    petName: '',
  });

  useEffect(() => {
    fetchServices();
  }, [filters]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await serviceService.getAll(filters);
      setServices(response.data.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (service) => {
    const user = localStorage.getItem('token');
    if (!user) {
      alert('Please login to book a service');
      return;
    }
    setSelectedService(service);
  };

  const handleConfirmBooking = async () => {
    if (!bookingForm.date || !bookingForm.petName) {
      alert('Please fill all fields');
      return;
    }

    try {
      await serviceService.bookService({
        serviceId: selectedService.id,
        bookingDate: bookingForm.date,
        duration: bookingForm.duration,
        petName: bookingForm.petName,
      });
      alert('Service booked successfully!');
      setSelectedService(null);
      setBookingForm({ date: '', duration: 1, petName: '' });
    } catch (error) {
      alert('Failed to book service');
    }
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>🏥 Pet Services</h1>
        <p>Professional care for your beloved pets</p>
      </div>

      <div className="filters-section">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Service Type"
              value={filters.serviceType}
              onChange={(val) => setFilters({ ...filters, serviceType: val, page: 1 })}
              style={{ width: '100%' }}
            >
              <Option value="">All Services</Option>
              <Option value="veterinary">👨‍⚕️ Veterinary</Option>
              <Option value="babysitting">👶 Babysitting</Option>
              <Option value="grooming">🛁 Grooming</Option>
              <Option value="training">🎓 Training</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Input placeholder="Search services..." />
          </Col>
        </Row>
      </div>

      <Spin spinning={loading}>
        {services.length > 0 ? (
          <Row gutter={[20, 20]} className="services-grid">
            {services.map((service) => (
              <Col xs={24} sm={12} md={8} key={service.id}>
                <Card className="service-card" hoverable>
                  <div className="service-header">
                    <h3>{service.name}</h3>
                    <div className="service-rating">⭐ {service.rating}</div>
                  </div>

                  <p className="service-type">
                    {service.serviceType === 'veterinary' && '👨‍⚕️ Veterinary'}
                    {service.serviceType === 'babysitting' && '👶 Babysitting'}
                    {service.serviceType === 'grooming' && '🛁 Grooming'}
                    {service.serviceType === 'training' && '🎓 Training'}
                  </p>

                  <p className="service-desc">{service.description}</p>

                  <Divider style={{ margin: '15px 0' }} />

                  <div className="service-vendor">
                    <p><strong>{service.vendorName}</strong></p>
                    <p>📍 {service.city}</p>
                    <p>📞 {service.vendorPhone}</p>
                  </div>

                  <Divider style={{ margin: '15px 0' }} />

                  <div className="service-price">₹{service.price}/hour</div>

                  <Button
                    type="primary"
                    block
                    onClick={() => handleBook(service)}
                    style={{ marginTop: 15 }}
                  >
                    Book Now
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No services found" style={{ marginTop: 50 }} />
        )}
      </Spin>

      {selectedService && (
        <div className="booking-modal-overlay" onClick={() => setSelectedService(null)}>
          <Card className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <h2>📅 Book {selectedService.name}</h2>
            <Divider />

            <div className="form-group">
              <label>Pet Name *</label>
              <Input
                placeholder="Your pet's name"
                value={bookingForm.petName}
                onChange={(e) => setBookingForm({ ...bookingForm, petName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Preferred Date *</label>
              <Input
                type="datetime-local"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Duration (hours)</label>
              <Input
                type="number"
                min="1"
                value={bookingForm.duration}
                onChange={(e) => setBookingForm({ ...bookingForm, duration: parseInt(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <p className="total-price">
                Total: ₹{(selectedService.price * bookingForm.duration).toFixed(2)}
              </p>
            </div>

            <div className="modal-buttons">
              <Button onClick={() => setSelectedService(null)}>Cancel</Button>
              <Button type="primary" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Services;
