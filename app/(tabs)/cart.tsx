import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { typography, spacing } from '@/constants/Theme';
import Button from '@/components/Button';
import CartItem from '@/components/CartItem';
import { useCart } from '@/hooks/useCart';

export default function CartScreen() {
  const [promoCode, setPromoCode] = useState('');
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartTotal,
    clearCart
  } = useCart();
  const colors = Colors.light;
  
  const deliveryFee = 2.99;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;
  
  const handleCheckout = () => {
    // Navigate to checkout
    alert('Proceeding to checkout...');
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={styles.emptyContainer}
          entering={FadeIn.duration(300)}
        >
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyDescription}>
            Looks like you haven't added any items to your cart yet.
          </Text>
          <Button
            title="Browse Restaurants"
            onPress={() => {}}
            variant="primary"
            style={styles.browseButton}
          />
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={styles.header}
        entering={FadeIn.duration(300)}
      >
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onRemove={removeFromCart}
          />
        )}
        style={styles.itemList}
        showsVerticalScrollIndicator={false}
      />
      
      <Animated.View 
        style={styles.summaryContainer}
        entering={FadeIn.delay(100).duration(300)}
      >
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          variant="primary"
          size="large"
          fullWidth
          rightIcon={<ArrowRight size={20} color={colors.background} />}
          style={styles.checkoutButton}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.heading3,
    color: Colors.light.text,
  },
  clearText: {
    ...typography.body2,
    color: Colors.light.primary,
  },
  itemList: {
    flex: 1,
  },
  summaryContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: Colors.light.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.body1,
    color: Colors.light.textSecondary,
  },
  summaryValue: {
    ...typography.body1,
    color: Colors.light.text,
  },
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    marginBottom: spacing.md,
  },
  totalLabel: {
    ...typography.subtitle1,
    color: Colors.light.text,
  },
  totalValue: {
    ...typography.heading4,
    color: Colors.light.text,
  },
  checkoutButton: {
    marginTop: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.heading3,
    color: Colors.light.text,
    marginBottom: spacing.md,
  },
  emptyDescription: {
    ...typography.body1,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  browseButton: {
    marginTop: spacing.md,
  },
});