import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { fonts } from '@/constants/Theme';
import { MenuItem as MenuItemType } from '@/types/MenuItem';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
  index?: number;
}

export default function MenuItem({ item, onAddToCart, index = 0 }: MenuItemProps) {
  const colors = Colors.light;
  const delay = index * 50;

  return (
    <Animated.View 
      entering={FadeInRight.delay(delay).duration(300)}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          
          <Text 
            style={styles.description} 
            numberOfLines={2}
          >
            {item.description}
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            
            {item.discountedPrice && (
              <Text style={styles.discountedPrice}>
                ${item.discountedPrice.toFixed(2)}
              </Text>
            )}
          </View>
          
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagContainer}>
              {item.tags.map((tag, idx) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.imageSection}>
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(item)}
            activeOpacity={0.8}
          >
            <Plus size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </View>
      
      {index > 0 && <View style={styles.divider} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    paddingRight: 16,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: Colors.light.text,
  },
  discountedPrice: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.light.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.light.backgroundTertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  imageSection: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.light.backgroundTertiary,
  },
  addButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: Colors.light.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginTop: 12,
  },
});