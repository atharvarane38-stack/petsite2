import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

const ServicesScreen = () => {
  const services = [
    { id: 1, name: 'Veterinary Consultation', emoji: '👨‍⚕️', price: 299, rating: 4.8, vendor: 'Dr. Raj Clinic' },
    { id: 2, name: 'Pet Babysitting', emoji: '👶', price: 199, rating: 4.7, vendor: 'Happy Paws Care' },
    { id: 3, name: 'Pet Grooming', emoji: '🛁', price: 399, rating: 4.6, vendor: 'Pawfect Grooming' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📞 Pet Services</Text>
        <Text style={styles.headerSubtitle}>Book professional care for your pet</Text>
      </View>

      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceEmoji}>{item.emoji}</Text>
              <View style={styles.serviceHeaderInfo}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.vendor}>by {item.vendor}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
              </View>
            </View>
            <View style={styles.servicePrice}>
              <Text style={styles.priceLabel}>Starting at</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>Book Service</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.servicesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#667eea',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  servicesList: {
    padding: 12,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  serviceHeaderInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  vendor: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  ratingBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  servicePrice: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#667eea',
  },
  bookBtn: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
});

export default ServicesScreen;
