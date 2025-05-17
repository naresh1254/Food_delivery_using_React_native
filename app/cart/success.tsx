import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { CircleCheck as CheckCircle2, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { typography, spacing } from '@/constants/Theme';
import Button from '@/components/Button';

export default function OrderSuccessScreen() {
  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.content}
      >
        <View style={styles.iconContainer}>
          <CheckCircle2 size={64} color={Colors.light.success} />
        </View>

        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.message}>
          Your order has been successfully placed and will be delivered soon.
        </Text>

        <Text style={styles.orderInfo}>
          You will receive an email confirmation and updates about your order status.
        </Text>

        <Button
          title="Continue Shopping"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          rightIcon={<ArrowRight size={20} color={Colors.light.background} />}
          style={styles.button}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.heading2,
    color: Colors.light.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    ...typography.body1,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  orderInfo: {
    ...typography.body2,
    color: Colors.light.textTertiary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.xl,
  },
});