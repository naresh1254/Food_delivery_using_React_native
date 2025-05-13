import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, MapPin, Star } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';
import Button from '@/components/Button';
import MenuItem from '@/components/MenuItem';
import { restaurants, menuItems } from '@/data/mockData';
import { Restaurant } from '@/types/Restaurant';
import { MenuItem as MenuItemType } from '@/types/MenuItem';
import { useCart } from '@/hooks/useCart';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const router = useRouter();
  const { addToCart, getItemCount } = useCart();
  const colors = Colors.light;
  const itemCount = getItemCount();
  
  useEffect(() => {
    // Find restaurant by id
    const foundRestaurant = restaurants.find(r => r.id === id);
    setRestaurant(foundRestaurant || null);
    
    // Get menu items for this restaurant
    const restaurantMenu = menuItems[id as string] || [];
    setMenu(restaurantMenu);
  }, [id]);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleAddToCart = (item: MenuItemType) => {
    addToCart(item);
  };
  
  if (!restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading restaurant details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        style={styles.header}
        entering={FadeIn.duration(300)}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <ArrowLeft size={24} color={colors.background} />
        </TouchableOpacity>
      </Animated.View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: restaurant.imageUrl }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>
        
        <Animated.View 
          style={styles.restaurantInfo}
          entering={FadeInDown.delay(100).duration(300)}
        >
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          
          <View style={styles.cuisineList}>
            {restaurant.cuisines.map((cuisine, index) => (
              <View key={index} style={styles.cuisineTag}>
                <Text style={styles.cuisineText}>{cuisine}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingItem}>
              <Star size={16} color={colors.warning} fill={colors.warning} />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
              <Text style={styles.reviewCount}>({restaurant.reviewCount})</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Clock size={16} color={colors.textTertiary} />
              <Text style={styles.infoText}>{restaurant.deliveryTime} min</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MapPin size={16} color={colors.textTertiary} />
              <Text style={styles.infoText}>{restaurant.distance} km</Text>
            </View>
          </View>
          
          {restaurant.freeDelivery && (
            <View style={styles.freeDeliveryTag}>
              <Text style={styles.freeDeliveryText}>Free Delivery</Text>
            </View>
          )}
          
          {restaurant.description && (
            <Text style={styles.description}>{restaurant.description}</Text>
          )}
          
          {restaurant.address && (
            <View style={styles.addressContainer}>
              <MapPin size={18} color={colors.textSecondary} />
              <Text style={styles.address}>{restaurant.address}</Text>
            </View>
          )}
        </Animated.View>
        
        <Animated.View 
          style={styles.menuContainer}
          entering={FadeInDown.delay(200).duration(300)}
        >
          <Text style={styles.menuTitle}>Menu</Text>
          
          {menu.length > 0 ? (
            menu.map((item, index) => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToCart={handleAddToCart}
                index={index}
              />
            ))
          ) : (
            <Text style={styles.emptyMenuText}>
              No menu items available at the moment.
            </Text>
          )}
        </Animated.View>
      </ScrollView>
      
      {itemCount > 0 && (
        <Animated.View 
          style={styles.cartButton}
          entering={FadeIn.duration(300)}
        >
          <Button
            title={`View Cart (${itemCount} items)`}
            onPress={() => router.push('/cart')}
            variant="primary"
            size="large"
            fullWidth
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    width: '100%',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  restaurantInfo: {
    padding: spacing.md,
    backgroundColor: Colors.light.background,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...shadows.md,
  },
  restaurantName: {
    ...typography.heading3,
    color: Colors.light.text,
    marginBottom: spacing.sm,
  },
  cuisineList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
    gap: 8,
  },
  cuisineTag: {
    backgroundColor: Colors.light.backgroundTertiary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cuisineText: {
    ...typography.caption,
    color: Colors.light.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.body2,
    color: Colors.light.text,
    marginLeft: 4,
  },
  reviewCount: {
    ...typography.caption,
    color: Colors.light.textTertiary,
    marginLeft: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    ...typography.body2,
    color: Colors.light.textTertiary,
    marginLeft: 4,
  },
  freeDeliveryTag: {
    backgroundColor: Colors.light.secondaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: spacing.md,
  },
  freeDeliveryText: {
    ...typography.caption,
    color: Colors.light.background,
    fontWeight: 'bold',
  },
  description: {
    ...typography.body1,
    color: Colors.light.textSecondary,
    marginBottom: spacing.md,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  address: {
    ...typography.body2,
    color: Colors.light.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  menuContainer: {
    padding: spacing.md,
    backgroundColor: Colors.light.background,
    paddingBottom: 100, // Extra padding for cart button
  },
  menuTitle: {
    ...typography.heading4,
    color: Colors.light.text,
    marginBottom: spacing.md,
  },
  emptyMenuText: {
    ...typography.body1,
    color: Colors.light.textTertiary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  cartButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    ...typography.body1,
    color: Colors.light.textSecondary,
  },
});