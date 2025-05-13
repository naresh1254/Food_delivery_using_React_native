import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ChevronRight, CreditCard, Heart, History, CircleHelp as HelpCircle, LogOut, MapPin, Settings, Bell } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { typography, spacing, shadows } from '@/constants/Theme';

const PROFILE_IMAGE = 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export default function ProfileScreen() {
  const colors = Colors.light;

  const ProfileOption = ({ 
    icon, 
    title, 
    description,
    onPress
  }: { 
    icon: React.ReactNode;
    title: string;
    description?: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity 
      style={styles.profileOption}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionIcon}>
        {icon}
      </View>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        {description && (
          <Text style={styles.optionDescription}>{description}</Text>
        )}
      </View>
      <ChevronRight size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={styles.header}
          entering={FadeIn.duration(300)}
        >
          <Text style={styles.headerTitle}>Profile</Text>
        </Animated.View>
        
        <Animated.View 
          style={styles.profileCard}
          entering={FadeInDown.delay(100).duration(300)}
        >
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: PROFILE_IMAGE }} 
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View 
          style={styles.optionsSection}
          entering={FadeInDown.delay(200).duration(300)}
        >
          <Text style={styles.sectionTitle}>Account</Text>
          
          <ProfileOption
            icon={<Heart size={24} color={colors.primary} />}
            title="Favorites"
            description="Your favorite restaurants"
            onPress={() => {}}
          />
          
          <ProfileOption
            icon={<History size={24} color={colors.primary} />}
            title="Order History"
            description="View past orders"
            onPress={() => {}}
          />
          
          <ProfileOption
            icon={<MapPin size={24} color={colors.primary} />}
            title="Addresses"
            description="Manage delivery addresses"
            onPress={() => {}}
          />
          
          <ProfileOption
            icon={<CreditCard size={24} color={colors.primary} />}
            title="Payment Methods"
            description="Manage payment options"
            onPress={() => {}}
          />
        </Animated.View>
        
        <Animated.View 
          style={styles.optionsSection}
          entering={FadeInDown.delay(300).duration(300)}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <ProfileOption
            icon={<Bell size={24} color={colors.secondary} />}
            title="Notifications"
            description="Manage notification settings"
            onPress={() => {}}
          />
          
          <ProfileOption
            icon={<Settings size={24} color={colors.secondary} />}
            title="App Settings"
            description="Theme, language, etc."
            onPress={() => {}}
          />
        </Animated.View>
        
        <Animated.View 
          style={styles.optionsSection}
          entering={FadeInDown.delay(400).duration(300)}
        >
          <Text style={styles.sectionTitle}>Support</Text>
          
          <ProfileOption
            icon={<HelpCircle size={24} color={colors.accent} />}
            title="Help Center"
            description="FAQs and customer support"
            onPress={() => {}}
          />
          
          <ProfileOption
            icon={<LogOut size={24} color={colors.error} />}
            title="Sign Out"
            onPress={() => {}}
          />
        </Animated.View>
        
        <View style={styles.version}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.heading3,
    color: Colors.light.text,
  },
  profileCard: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    ...shadows.md,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.md,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    ...typography.heading5,
    color: Colors.light.text,
  },
  profileEmail: {
    ...typography.body2,
    color: Colors.light.textSecondary,
    marginBottom: spacing.sm,
  },
  editButton: {
    backgroundColor: Colors.light.backgroundTertiary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    ...typography.buttonSmall,
    color: Colors.light.textSecondary,
  },
  optionsSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle1,
    color: Colors.light.textSecondary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: Colors.light.card,
    marginBottom: 1,
  },
  optionIcon: {
    width: 40,
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  optionTitle: {
    ...typography.subtitle1,
    color: Colors.light.text,
  },
  optionDescription: {
    ...typography.body2,
    color: Colors.light.textTertiary,
  },
  version: {
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  versionText: {
    ...typography.caption,
    color: Colors.light.textTertiary,
  },
});