import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(savedUser));
    form.setFieldsValue(JSON.parse(savedUser));
  }, [form, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <UserOutlined className="profile-icon" />
          <h1>My Profile</h1>
        </div>

        {user && (
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input value={user.name} disabled />
            </Form.Item>

            <Form.Item label="Email">
              <Input value={user.email} disabled />
            </Form.Item>

            <Form.Item label="Phone">
              <Input value={user.phone} disabled />
            </Form.Item>

            <Form.Item label="User Type">
              <Input value={user.userType} disabled />
            </Form.Item>

            <div className="profile-actions">
              <Button type="primary" block>
                Edit Profile
              </Button>
              <Button danger block onClick={handleLogout} icon={<LogoutOutlined />}>
                Logout
              </Button>
            </div>
          </Form>
        )}
      </Card>

      <Card className="orders-card">
        <h2>Recent Orders</h2>
        <p>No orders yet. <a href="/products">Start shopping!</a></p>
      </Card>
    </div>
  );
}

export default Profile;
