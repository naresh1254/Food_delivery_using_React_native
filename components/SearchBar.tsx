import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { fonts, shadows } from '@/constants/Theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search for restaurants or dishes',
  onFilterPress,
}: SearchBarProps) {
  const colors = Colors.light;

  return (
    <View style={[styles.container, shadows.sm]}>
      <View style={styles.searchIcon}>
        <Search size={20} color={colors.textTertiary} />
      </View>
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
      />
      
      {onFilterPress && (
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <Sliders size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
  },
});