import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { MapPin, Phone, CreditCard, Truck, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';
import Button from '@/components/Button';
import { useCart } from '@/hooks/useCart';

export default function CheckoutScreen() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [error, setError] = useState<string | null>(null);
  const { getCartTotal, clearCart } = useCart();
  const colors = Colors.light;

  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    try {
      setError(null);
      
      if (!address || !phone) {
        setError('Please fill in all required fields');
        return;
      }

      // TODO: Process payment and create order
      clearCart();
      router.push('/cart/success');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.header}
        >
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.subtitle}>Complete your order details</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(200).duration(300)}
          style={styles.content}
        >
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color={colors.textTertiary} />
              <TextInput
                style={styles.input}
                placeholder="Enter your delivery address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={2}
                placeholderTextColor={colors.textTertiary}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Number</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color={colors.textTertiary} />
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor={colors.textTertiary}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentOptions}>
              <Button
                title="Credit Card"
                onPress={() => setPaymentMethod('card')}
                variant={paymentMethod === 'card' ? 'primary' : 'outlined'}
                leftIcon={<CreditCard size={20} color={paymentMethod === 'card' ? colors.background : colors.primary} />}
                style={styles.paymentButton}
              />
              <Button
                title="Cash on Delivery"
                onPress={() => setPaymentMethod('cash')}
                variant={paymentMethod === 'cash' ? 'primary' : 'outlined'}
                leftIcon={<Truck size={20} color={paymentMethod === 'cash' ? colors.background : colors.primary} />}
                style={styles.paymentButton}
              />
            </View>
          </View>

          <View style={styles.summary}>
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
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          variant="primary"
          size="large"
          fullWidth
          rightIcon={<ArrowRight size={20} color={colors.background} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    backgroundColor: Colors.light.primary,
  },
  title: {
    ...typography.heading3,
    color: Colors.light.background,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body1,
    color: Colors.light.backgroundSecondary,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  errorContainer: {
    backgroundColor: Colors.light.errorLight,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  errorText: {
    ...typography.body2,
    color: Colors.light.error,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.subtitle1,
    color: Colors.light.text,
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundTertiary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    minHeight: 56,
  },
  input: {
    flex: 1,
    marginLeft: spacing.md,
    ...typography.body1,
    color: Colors.light.text,
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  paymentButton: {
    flex: 1,
  },
  summary: {
    backgroundColor: Colors.light.backgroundSecondary,
    padding: spacing.lg,
    borderRadius: 16,
    marginTop: spacing.xl,
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
  },
  totalLabel: {
    ...typography.subtitle1,
    color: Colors.light.text,
  },
  totalValue: {
    ...typography.heading4,
    color: Colors.light.text,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    ...shadows.md,
  },
});