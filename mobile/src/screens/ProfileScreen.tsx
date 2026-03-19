import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    address: 'Mumbai, India',
  });

  const orders = [
    { id: 1, date: 'Mar 19, 2026', total: 1899, status: 'Delivered', items: 2 },
    { id: 2, date: 'Mar 18, 2026', total: 499, status: 'In Transit', items: 1 },
  ];

  const menuItems = [
    { icon: '👤', label: 'My Profile', value: user.name },
    { icon: '📧', label: 'Email', value: user.email },
    { icon: '📱', label: 'Phone', value: user.phone },
    { icon: '📍', label: 'Address', value: user.address },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* User Header */}
      <View style={styles.userCard}>
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>
      </View>

      {/* User Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        {menuItems.map((item, idx) => (
          <View key={idx} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Orders Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={[styles.orderStatus, order.status === 'Delivered' ? styles.delivered : styles.transit]}>
                {order.status}
              </Text>
            </View>
            <View style={styles.orderDetails}>
              <View style={styles.orderDetail}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{order.date}</Text>
              </View>
              <View style={styles.orderDetail}>
                <Text style={styles.detailLabel}>Items</Text>
                <Text style={styles.detailValue}>{order.items}</Text>
              </View>
              <View style={styles.orderDetail}>
                <Text style={styles.detailLabel}>Total</Text>
                <Text style={styles.detailValue}>₹{order.total}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>

      <View style={styles.spacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  userCard: {
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  userPhone: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  menuValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginTop: 4,
  },
  orderCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  orderStatus: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  delivered: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  transit: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
    marginTop: 4,
  },
  logoutBtn: {
    backgroundColor: '#ff6b6b',
    marginHorizontal: 12,
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  spacing: {
    height: 20,
  },
});

export default ProfileScreen;
