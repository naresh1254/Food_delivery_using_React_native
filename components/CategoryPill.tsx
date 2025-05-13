import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { fonts } from '@/constants/Theme';
import { Category } from '@/types/Category';

interface CategoryPillProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function CategoryPill({ 
  category, 
  isSelected, 
  onPress, 
  style 
}: CategoryPillProps) {
  const colors = Colors.light;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected ? colors.primary : colors.backgroundTertiary,
        { duration: 200 }
      ),
      borderColor: withTiming(
        isSelected ? colors.primary : colors.border,
        { duration: 200 }
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(
        isSelected ? colors.background : colors.text,
        { duration: 200 }
      ),
      fontFamily: isSelected ? fonts.semiBold : fonts.medium,
    };
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Animated.View style={[styles.container, animatedStyle, style]}>
        {category.iconUrl && (
          <Image 
            source={{ uri: category.iconUrl }} 
            style={styles.icon}
          />
        )}
        <Animated.Text style={[styles.text, textStyle]}>
          {category.name}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
  },
});