import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, MapPin, Star } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { fonts, shadows } from '@/constants/Theme';
import { Restaurant } from '@/types/Restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

export default function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  const router = useRouter();
  const colors = Colors.light;
  const delay = index * 100;

  const handlePress = () => {
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(300)}
      style={[styles.container, shadows.md]}
    >
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={handlePress}
        style={styles.touchable}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: restaurant.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {restaurant.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={colors.warning} fill={colors.warning} />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
              <Text style={styles.reviewCount}>({restaurant.reviewCount})</Text>
            </View>
          </View>

          <View style={styles.cuisineList}>
            {restaurant.cuisines.map((cuisine, idx) => (
              <View key={idx} style={styles.cuisineTag}>
                <Text style={styles.cuisineText}>{cuisine}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.footer}>
            <View style={styles.infoItem}>
              <MapPin size={14} color={colors.textTertiary} />
              <Text style={styles.infoText}>{restaurant.distance} km</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Clock size={14} color={colors.textTertiary} />
              <Text style={styles.infoText}>{restaurant.deliveryTime} min</Text>
            </View>
            
            {restaurant.freeDelivery && (
              <View style={styles.freeDeliveryTag}>
                <Text style={styles.freeDeliveryText}>Free Delivery</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: Colors.light.card,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: Colors.light.border,
  },
  touchable: {
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.light.backgroundTertiary,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: Colors.light.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: Colors.light.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: Colors.light.textTertiary,
    marginLeft: 2,
  },
  cuisineList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  cuisineTag: {
    backgroundColor: Colors.light.backgroundTertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cuisineText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: Colors.light.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: Colors.light.textTertiary,
  },
  freeDeliveryTag: {
    backgroundColor: Colors.light.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freeDeliveryText: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#FFF',
  },
});