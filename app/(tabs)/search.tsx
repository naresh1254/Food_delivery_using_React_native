import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronDown, Clock, Tag } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { fonts, typography, spacing } from '@/constants/Theme';
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/data/mockData';
import { Restaurant } from '@/types/Restaurant';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const colors = Colors.light;
  
  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (searchQuery.trim() === '') return true;
    
    const query = searchQuery.toLowerCase();
    const matchesName = restaurant.name.toLowerCase().includes(query);
    const matchesCuisine = restaurant.cuisines.some(cuisine => 
      cuisine.toLowerCase().includes(query)
    );
    
    return matchesName || matchesCuisine;
  });
  
  const handleFilterPress = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);
  
  const togglePriceRange = useCallback((range: string) => {
    setPriceRange(prev => {
      if (prev.includes(range)) {
        return prev.filter(r => r !== range);
      } else {
        return [...prev, range];
      }
    });
  }, []);
  
  const setDeliveryTimeFilter = useCallback((time: string) => {
    setDeliveryTime(prev => prev === time ? '' : time);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          onFilterPress={handleFilterPress}
          placeholder="Search for restaurants, cuisines, dishes..." 
        />
      </View>
      
      {showFilters && (
        <Animated.View 
          style={styles.filtersContainer}
          entering={FadeIn.duration(200)}
        >
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Sort By</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  sortBy === 'relevance' && styles.filterOptionSelected
                ]}
                onPress={() => setSortBy('relevance')}
              >
                <Text style={[
                  styles.filterOptionText,
                  sortBy === 'relevance' && styles.filterOptionTextSelected
                ]}>Relevance</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  sortBy === 'rating' && styles.filterOptionSelected
                ]}
                onPress={() => setSortBy('rating')}
              >
                <Text style={[
                  styles.filterOptionText,
                  sortBy === 'rating' && styles.filterOptionTextSelected
                ]}>Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  sortBy === 'delivery' && styles.filterOptionSelected
                ]}
                onPress={() => setSortBy('delivery')}
              >
                <Text style={[
                  styles.filterOptionText,
                  sortBy === 'delivery' && styles.filterOptionTextSelected
                ]}>Delivery Time</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Price Range</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  priceRange.includes('$') && styles.filterOptionSelected
                ]}
                onPress={() => togglePriceRange('$')}
              >
                <Text style={[
                  styles.filterOptionText,
                  priceRange.includes('$') && styles.filterOptionTextSelected
                ]}>$</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  priceRange.includes('$$') && styles.filterOptionSelected
                ]}
                onPress={() => togglePriceRange('$$')}
              >
                <Text style={[
                  styles.filterOptionText,
                  priceRange.includes('$$') && styles.filterOptionTextSelected
                ]}>$$</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  priceRange.includes('$$$') && styles.filterOptionSelected
                ]}
                onPress={() => togglePriceRange('$$$')}
              >
                <Text style={[
                  styles.filterOptionText,
                  priceRange.includes('$$$') && styles.filterOptionTextSelected
                ]}>$$$</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Delivery Time</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  deliveryTime === '30' && styles.filterOptionSelected
                ]}
                onPress={() => setDeliveryTimeFilter('30')}
              >
                <Text style={[
                  styles.filterOptionText,
                  deliveryTime === '30' && styles.filterOptionTextSelected
                ]}>Under 30 min</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterOption, 
                  deliveryTime === '45' && styles.filterOptionSelected
                ]}
                onPress={() => setDeliveryTimeFilter('45')}
              >
                <Text style={[
                  styles.filterOptionText,
                  deliveryTime === '45' && styles.filterOptionTextSelected
                ]}>Under 45 min</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery.trim() !== '' && (
          <View style={styles.resultHeader}>
            <Text style={styles.resultText}>
              {filteredRestaurants.length} results for "{searchQuery}"
            </Text>
          </View>
        )}
        
        {filteredRestaurants.length > 0 ? (
          <View style={styles.restaurantList}>
            {filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant} 
                index={index} 
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No results found</Text>
            <Text style={styles.emptyStateDescription}>
              Try different keywords or browse by category
            </Text>
          </View>
        )}
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
    paddingBottom: spacing.md,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  filtersContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  filterSection: {
    marginBottom: spacing.md,
  },
  filterTitle: {
    ...typography.subtitle1,
    marginBottom: spacing.sm,
    color: Colors.light.text,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  filterOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.light.backgroundTertiary,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterOptionSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterOptionText: {
    ...typography.body2,
    color: Colors.light.textSecondary,
  },
  filterOptionTextSelected: {
    color: Colors.light.background,
    fontFamily: fonts.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  resultHeader: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  resultText: {
    ...typography.body2,
    color: Colors.light.textSecondary,
  },
  restaurantList: {
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyStateTitle: {
    ...typography.heading4,
    color: Colors.light.text,
    marginBottom: spacing.sm,
  },
  emptyStateDescription: {
    ...typography.body1,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
});