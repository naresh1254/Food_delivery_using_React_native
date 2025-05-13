import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import { MapPin } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { fonts, typography, spacing } from '@/constants/Theme';
import SearchBar from '@/components/SearchBar';
import CategoryPill from '@/components/CategoryPill';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants, categories } from '@/data/mockData';
import { Restaurant } from '@/types/Restaurant';
import { Category } from '@/types/Category';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('1');
  const [refreshing, setRefreshing] = useState(false);
  const colors = Colors.light;
  
  const featuredRestaurants = restaurants.filter(r => r.featured);
  
  const filteredRestaurants = selectedCategoryId === '1' 
    ? restaurants 
    : restaurants.filter(restaurant => {
        const selectedCategory = categories.find(c => c.id === selectedCategoryId);
        return selectedCategory && restaurant.cuisines.includes(selectedCategory.name);
      });
  
  const handleCategoryPress = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
  }, []);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate loading
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View 
          style={styles.header}
          entering={FadeIn.duration(300)}
        >
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Delivery to</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.primary} />
              <Text style={styles.locationText}>123 Main Street</Text>
            </View>
          </View>
          
          <View style={styles.searchContainer}>
            <SearchBar 
              value={searchQuery} 
              onChangeText={setSearchQuery} 
              onFilterPress={() => {}} 
            />
          </View>
        </Animated.View>
        
        <Animated.View 
          style={styles.categoriesContainer}
          entering={FadeInDown.delay(100).duration(300)}
        >
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryPill
                category={item}
                isSelected={selectedCategoryId === item.id}
                onPress={() => handleCategoryPress(item.id)}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </Animated.View>
        
        {featuredRestaurants.length > 0 && (
          <Animated.View 
            style={styles.featuredSection}
            entering={FadeInDown.delay(200).duration(300)}
          >
            <Text style={styles.sectionTitle}>Featured Restaurants</Text>
            <FlatList
              data={featuredRestaurants}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={styles.featuredCardContainer}>
                  <RestaurantCard restaurant={item} index={index} />
                </View>
              )}
              contentContainerStyle={styles.featuredList}
            />
          </Animated.View>
        )}
        
        <Animated.View 
          style={styles.allRestaurantsSection}
          entering={FadeInDown.delay(300).duration(300)}
        >
          <Text style={styles.sectionTitle}>
            {selectedCategoryId === '1' ? 'All Restaurants' : `${categories.find(c => c.id === selectedCategoryId)?.name} Restaurants`}
          </Text>
          
          {filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              index={index} 
            />
          ))}
        </Animated.View>
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
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.md,
    backgroundColor: Colors.light.primary,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  locationContainer: {
    marginBottom: spacing.md,
  },
  locationLabel: {
    ...typography.caption,
    color: Colors.light.backgroundSecondary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...typography.subtitle1,
    color: Colors.light.background,
    marginLeft: 4,
    fontFamily: fonts.semiBold,
  },
  searchContainer: {
    marginTop: spacing.sm,
  },
  categoriesContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
  },
  featuredSection: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading4,
    color: Colors.light.text,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  featuredList: {
    paddingHorizontal: spacing.md,
  },
  featuredCardContainer: {
    width: 280,
    marginRight: spacing.md,
  },
  allRestaurantsSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
});