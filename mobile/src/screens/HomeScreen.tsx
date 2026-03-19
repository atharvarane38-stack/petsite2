import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const HomeScreen = () => {
  const [featured] = useState([
    { id: 1, name: 'Premium Dog Food', price: '₹899', emoji: '🍖' },
    { id: 2, name: 'Cat Toys Set', price: '₹499', emoji: '🎾' },
    { id: 3, name: 'Grooming Kit', price: '₹1299', emoji: '🛁' },
    { id: 4, name: 'Pet Collar', price: '₹399', emoji: '🎀' },
  ]);

  const categories = [
    { name: 'Products', emoji: '🛍️' },
    { name: 'Vet Services', emoji: '👨‍⚕️' },
    { name: 'Pet Care', emoji: '👶' },
    { name: 'Medicines', emoji: '💊' },
  ];

  const stats = [
    { label: 'Fast Delivery', value: '25 mins', icon: '⚡' },
    { label: 'Products', value: '500+', icon: '📦' },
    { label: 'Customers', value: '10K+', icon: '❤️' },
    { label: 'Verified', value: '100%', icon: '✓' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>🐾 PetSite</Text>
        <Text style={styles.heroSubtitle}>Your pet's perfect paradise</Text>
        <Text style={styles.heroDesc}>Shop • Services • Medicines • Delivery</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        {stats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.categoryGrid}>
          {categories.map((cat, idx) => (
            <TouchableOpacity key={idx} style={styles.categoryCard}>
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured This Week ⭐</Text>
        <FlatList
          data={featured}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productEmoji}>{item.emoji}</View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* CTA Section */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>🛒 Start Shopping</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#667eea',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginTop: -25,
    marginHorizontal: 5,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#667eea',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#667eea',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontWeight: '600',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#667eea',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  productEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#667eea',
  },
  ctaButton: {
    backgroundColor: '#667eea',
    marginHorizontal: 15,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#667eea',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default HomeScreen;
