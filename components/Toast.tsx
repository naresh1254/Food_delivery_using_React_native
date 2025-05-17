import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useSharedValue,
  runOnJS
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';

const { width } = Dimensions.get('window');

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  isVisible, 
  onHide, 
  duration = 3000 
}: ToastProps) {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { 
        damping: 15,
        stiffness: 100 
      });
      opacity.value = withSpring(1);

      const timer = setTimeout(() => {
        translateY.value = withSpring(100);
        opacity.value = withTiming(0, { duration: 300 }, () => {
          runOnJS(onHide)();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: Colors.light.text,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
    maxWidth: 500,
    alignSelf: 'center',
    zIndex: 1000,
  },
  message: {
    ...typography.body1,
    color: Colors.light.background,
    textAlign: 'center',
  },
});