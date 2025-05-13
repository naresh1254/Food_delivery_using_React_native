import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, SlideInRight } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { fonts } from '@/constants/Theme';
import { CartItem as CartItemType } from '@/types/CartItem';

interface CartItemProps {
  item: CartItemType;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ 
  item, 
  onIncrement, 
  onDecrement, 
  onRemove 
}: CartItemProps) {
  const colors = Colors.light;
  const totalPrice = item.price * item.quantity;

  return (
    <Animated.View 
      entering={SlideInRight.duration(300)} 
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Trash2 size={18} color={colors.error} />
          </TouchableOpacity>
        </View>
        
        {item.options && item.options.length > 0 && (
          <Text style={styles.options}>
            {item.options.join(', ')}
          </Text>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
          
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
              onPress={() => onDecrement(item.id)}
              disabled={item.quantity <= 1}
            >
              <Minus 
                size={16} 
                color={item.quantity <= 1 ? colors.textTertiary : colors.text}
              />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onIncrement(item.id)}
            >
              <Plus size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.light.backgroundTertiary,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: Colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  options: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: Colors.light.text,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: Colors.light.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantity: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: Colors.light.text,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
});