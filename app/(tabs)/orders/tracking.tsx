import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';

const mockOrderData = {
  id: '1',
  status: 'In Progress',
  restaurant: {
    name: 'Burger Palace',
    address: '123 Main St, Anytown, USA',
  },
  delivery: {
    partner: {
      name: 'John Smith',
      photo: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      phone: '+1234567890',
    },
    eta: '12:45 PM',
    status: [
      { id: 1, title: 'Order Confirmed', completed: true },
      { id: 2, title: 'Preparing', completed: true },
      { id: 3, title: 'Out for Delivery', completed: true },
      { id: 4, title: 'Delivered', completed: false },
    ],
  },
};

export default function TrackingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colors = Colors.light;
  const [activeStep, setActiveStep] = useState(2);

  const handleBack = () => {
    router.back();
  };

  const handleCall = () => {
    if (Platform.OS === 'web') {
      window.location.href = `tel:${mockOrderData.delivery.partner.phone}`;
    }
  };

  const handleMessage = () => {
    if (Platform.OS === 'web') {
      window.location.href = `sms:${mockOrderData.delivery.partner.phone}`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.header}
      >
        <TouchableOpacity 
          onPress={handleBack}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Track Order</Text>
      </Animated.View>

      <View style={styles.content}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubtext}>
            (Map integration available in mobile apps)
          </Text>
        </View>

        <View style={styles.deliveryInfo}>
          <Text style={styles.eta}>
            Estimated Delivery: {mockOrderData.delivery.eta}
          </Text>
          
          <View style={styles.timeline}>
            {mockOrderData.delivery.status.map((step, index) => (
              <View key={step.id} style={styles.timelineStep}>
                <View style={[
                  styles.timelineDot,
                  { backgroundColor: index <= activeStep ? colors.primary : colors.backgroundTertiary }
                ]} />
                <Text style={[
                  styles.timelineText,
                  { color: index <= activeStep ? colors.text : colors.textTertiary }
                ]}>
                  {step.title}
                </Text>
                {index < mockOrderData.delivery.status.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    { backgroundColor: index < activeStep ? colors.primary : colors.backgroundTertiary }
                  ]} />
                )}
              </View>
            ))}
          </View>

          <View style={styles.partnerCard}>
            <View style={styles.partnerInfo}>
              <View style={styles.partnerDetails}>
                <Text style={styles.partnerName}>
                  {mockOrderData.delivery.partner.name}
                </Text>
                <Text style={styles.partnerRole}>Delivery Partner</Text>
              </View>
              
              <View style={styles.contactButtons}>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={handleCall}
                >
                  <Phone size={20} color={colors.primary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={handleMessage}
                >
                  <MessageCircle size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.heading4,
    color: Colors.light.text,
  },
  content: {
    flex: 1,
  },
  mapPlaceholder: {
    height: '40%',
    backgroundColor: Colors.light.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    ...typography.heading4,
    color: Colors.light.textSecondary,
  },
  mapSubtext: {
    ...typography.caption,
    color: Colors.light.textTertiary,
    marginTop: spacing.sm,
  },
  deliveryInfo: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    ...shadows.lg,
  },
  eta: {
    ...typography.heading4,
    color: Colors.light.text,
    marginBottom: spacing.xl,
  },
  timeline: {
    marginBottom: spacing.xl,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  timelineText: {
    ...typography.body1,
    flex: 1,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 12,
    width: 2,
    height: 30,
  },
  partnerCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: spacing.md,
    ...shadows.sm,
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  partnerDetails: {
    flex: 1,
  },
  partnerName: {
    ...typography.subtitle1,
    color: Colors.light.text,
  },
  partnerRole: {
    ...typography.body2,
    color: Colors.light.textSecondary,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});