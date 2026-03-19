import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const CartScreen = () => {
  const [cartItems] = useState([
    { id: 1, name: 'Premium Dog Food', price: 899, qty: 1, emoji: '🍖' },
    { id: 2, name: 'Pet Grooming Kit', price: 1299, qty: 1, emoji: '🛁' },
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const isEmpty = cartItems.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Shopping Cart</Text>
      </View>

      {isEmpty ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Add some items to get started!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemEmoji}>{item.emoji}</Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                <View style={styles.itemQty}>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                </View>
                <View style={styles.itemTotal}>
                  <Text style={styles.totalText}>₹{item.price * item.qty}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>₹{total}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery:</Text>
              <Text style={styles.summaryValue}>FREE</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>₹{total}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  cartList: {
    padding: 12,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  itemPrice: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '700',
    marginTop: 4,
  },
  itemQty: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  itemTotal: {
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#667eea',
  },
  summary: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '800',
  },
  totalAmount: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '800',
  },
  checkoutBtn: {
    backgroundColor: '#667eea',
    marginHorizontal: 15,
    marginVertical: 15,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});

export default CartScreen;
