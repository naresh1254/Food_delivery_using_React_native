import { useState, useCallback } from 'react';
import { CartItem } from '@/types/CartItem';
import { MenuItem } from '@/types/MenuItem';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const addToCart = useCallback((item: MenuItem, quantity: number = 1) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + quantity } 
            : cartItem
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: quantity,
          imageUrl: item.imageUrl,
          options: item.tags, // Using tags as options for simplicity
        };
        return [...prevItems, newItem];
      }
    });
  }, []);
  
  const removeFromCart = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);
  
  const incrementQuantity = useCallback((id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  }, []);
  
  const decrementQuantity = useCallback((id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  }, []);
  
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);
  
  const getItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);
  
  return {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getCartTotal,
    getItemCount
  };
}