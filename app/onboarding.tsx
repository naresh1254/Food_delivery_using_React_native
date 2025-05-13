import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight, 
  SlideOutLeft 
} from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { typography, spacing } from '@/constants/Theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Discover Local Flavors',
    description: 'Explore a world of delicious cuisines from top-rated restaurants in your area.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Fast & Fresh Delivery',
    description: 'Get your favorite meals delivered right to your doorstep, fresh and on time.',
    image: 'https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Exclusive Offers',
    description: 'Enjoy special discounts and rewards on your favorite restaurants.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function OnboardingScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.View 
        key={activeSlide}
        entering={SlideInRight} 
        exiting={SlideOutLeft}
        style={styles.slide}
      >
        <Image
          source={{ uri: slides[activeSlide].image }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Animated.Text 
            entering={FadeIn.duration(600)} 
            style={styles.title}
          >
            {slides[activeSlide].title}
          </Animated.Text>
          
          <Animated.Text 
            entering={FadeIn.duration(600).delay(200)} 
            style={styles.description}
          >
            {slides[activeSlide].description}
          </Animated.Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeSlide && styles.paginationDotActive
              ]}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {activeSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ArrowRight size={20} color={Colors.light.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: spacing.md,
    zIndex: 1,
  },
  skipText: {
    ...typography.subtitle2,
    color: Colors.light.textSecondary,
  },
  slide: {
    flex: 1,
  },
  image: {
    width: width,
    height: width,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.heading2,
    color: Colors.light.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    ...typography.body1,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.backgroundTertiary,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.light.primary,
    width: 20,
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  nextButtonText: {
    ...typography.button,
    color: Colors.light.background,
  },
});