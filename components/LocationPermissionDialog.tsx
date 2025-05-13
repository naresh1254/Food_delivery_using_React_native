import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';
import Button from '@/components/Button';

interface LocationPermissionDialogProps {
  onAllow: () => void;
  onDeny: () => void;
}

export default function LocationPermissionDialog({ onAllow, onDeny }: LocationPermissionDialogProps) {
  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.overlay}
      />
      
      <Animated.View 
        entering={SlideInUp.springify().damping(15)}
        style={styles.dialog}
      >
        <View style={styles.iconContainer}>
          <MapPin size={32} color={Colors.light.primary} />
        </View>
        
        <Text style={styles.title}>Enable Location Services</Text>
        
        <Text style={styles.description}>
          We need your location to show you nearby restaurants and provide accurate delivery estimates.
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Not Now"
            onPress={onDeny}
            variant="outlined"
            style={styles.button}
          />
          <Button
            title="Enable Location"
            onPress={onAllow}
            variant="primary"
            style={styles.button}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: Colors.light.background,
    borderRadius: 24,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    ...shadows.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading4,
    color: Colors.light.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    ...typography.body1,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});