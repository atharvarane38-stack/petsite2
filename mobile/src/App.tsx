import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ServicesScreen from './screens/ServicesScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarLabel: route.name,
          tabBarActiveTintColor: '#667eea',
          tabBarInactiveTintColor: '#999',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'PetSite' }}
        />
        <Tab.Screen 
          name="Products" 
          component={ProductsScreen}
          options={{ title: 'Shop' }}
        />
        <Tab.Screen 
          name="Services" 
          component={ServicesScreen}
          options={{ title: 'Services' }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ title: 'Cart' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
