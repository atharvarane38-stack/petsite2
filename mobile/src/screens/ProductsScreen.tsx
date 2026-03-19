import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const ProductsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products] = useState([
    { id: 1, name: 'Premium Dog Food', price: 899, category: 'food', emoji: '🍖', rating: 4.8 },
    { id: 2, name: 'Interactive Cat Toys', price: 499, category: 'toys', emoji: '🎾', rating: 4.6 },
    { id: 3, name: 'Pet Grooming Kit', price: 1299, category: 'grooming', emoji: '🛁', rating: 4.7 },
    { id: 4, name: 'Dog Collar & Leash', price: 399, category: 'accessories', emoji: '🎀', rating: 4.5 },
    { id: 5, name: 'Pet Health Vitamins', price: 599, category: 'health', emoji: '💊', rating: 4.9 },
    { id: 6, name: 'Bird Cage Adventure', price: 2499, category: 'accessories', emoji: '🐦', rating: 4.4 },
  ]);

  const categories = ['all', 'food', 'toys', 'grooming', 'accessories', 'health'];
  const categoryEmojis = { food: '🍖', toys: '🎾', grooming: '🛁', accessories: '🎀', health: '💊', all: '🛍️' };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Pet Shop</Text>
        <Text style={styles.headerSubtitle}>Find everything your pet needs</Text>
      </View>

      {/* Filter Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterBtn,
              selectedCategory === cat && styles.filterBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={styles.filterEmoji}>{categoryEmojis[cat]}</Text>
            <Text style={[
              styles.filterText,
              selectedCategory === cat && styles.filterTextActive,
            ]}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productImageArea}>
              <Text style={styles.productEmoji}>{item.emoji}</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
              </View>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.oldPrice}>₹{Math.round(item.price * 1.2)}</Text>
                <Text style={styles.discount}>-16%</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.favoriteBtn}>
                  <Text style={styles.favoriteBtnText}>🤍</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBtn}>
                  <Text style={styles.addBtnText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        contentContainerStyle={styles.productsList}
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
  filterScroll: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterContent: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  filterBtnActive: {
    backgroundColor: '#667eea',
  },
  filterEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  productsList: {
    padding: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  productImageArea: {
    width: 100,
    height: 120,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productEmoji: {
    fontSize: 50,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#667eea',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 11,
    color: '#ccc',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  favoriteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteBtnText: {
    fontSize: 16,
  },
  addBtn: {
    flex: 1,
    backgroundColor: '#667eea',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default ProductsScreen;
