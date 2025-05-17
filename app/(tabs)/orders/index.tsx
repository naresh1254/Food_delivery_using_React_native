import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Package } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';

const mockOrders = [
  {
    id: '1',
    restaurantName: 'Burger Palace',
    status: 'In Progress',
    items: ['Classic Cheeseburger', 'French Fries'],
    total: 15.98,
    orderTime: '2024-02-20T12:00:00Z',
    estimatedDelivery: '2024-02-20T12:45:00Z'
  },
  {
    id: '2',
    restaurantName: 'Pizza Heaven',
    status: 'Delivered',
    items: ['Margherita Pizza', 'Garlic Breadsticks'],
    total: 24.99,
    orderTime: '2024-02-19T18:30:00Z',
    estimatedDelivery: '2024-02-19T19:15:00Z'
  }
];

export default function OrdersScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const handleTrackOrder = (orderId: string) => {
    router.push(`/orders/tracking?id=${orderId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.header}
      >
        <Text style={styles.title}>Your Orders</Text>
      </Animated.View>

      <ScrollView style={styles.content}>
        {mockOrders.map((order, index) => (
          <Animated.View
            key={order.id}
            entering={FadeIn.delay(index * 100).duration(300)}
            style={styles.orderCard}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.restaurantName}>{order.restaurantName}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: order.status === 'In Progress' ? colors.primary : colors.success }
              ]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.itemsList}>
                {order.items.join(', ')}
              </Text>
              
              <View style={styles.orderInfo}>
                <View style={styles.infoItem}>
                  <Clock size={16} color={colors.textTertiary} />
                  <Text style={styles.infoText}>
                    {new Date(order.orderTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Text>
                </View>
                
                <Text style={styles.total}>
                  ${order.total.toFixed(2)}
                </Text>
              </View>
            </View>

            {order.status === 'In Progress' && (
              <TouchableOpacity
                style={styles.trackButton}
                onPress={() => handleTrackOrder(order.id)}
              >
                <Package size={20} color={colors.primary} />
                <Text style={styles.trackButtonText}>Track Order</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: spacing.xl,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    ...typography.heading3,
    color: Colors.light.text,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  orderCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  restaurantName: {
    ...typography.subtitle1,
    color: Colors.light.text,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    ...typography.caption,
    color: Colors.light.background,
    fontFamily: 'Inter-Medium',
  },
  orderDetails: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  itemsList: {
    ...typography.body2,
    color: Colors.light.textSecondary,
    marginBottom: spacing.sm,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    ...typography.caption,
    color: Colors.light.textTertiary,
  },
  total: {
    ...typography.subtitle1,
    color: Colors.light.text,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  trackButtonText: {
    ...typography.button,
    color: Colors.light.primary,
  },
});