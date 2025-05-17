import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Chrome as Home, Search, ShoppingBag, Package, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { fonts } from '@/constants/Theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabel: ({ focused, color }) => {
          return (
            <View style={styles.labelContainer}>
              <Animated.Text 
                style={[
                  styles.label, 
                  { 
                    color,
                    fontFamily: focused ? 'Inter-Medium' : 'Inter-Regular',
                    opacity: focused ? 1 : 0.8,
                    transform: [{ scale: focused ? 1 : 0.95 }]
                  }
                ]}
              >
                {getLabelText(route.name)}
              </Animated.Text>
              {focused && (
                <View style={[styles.dot, { backgroundColor: color }]} />
              )}
            </View>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          return getTabIcon(route.name, color, size, focused);
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

function getTabIcon(routeName: string, color: string, size: number, focused: boolean) {
  const iconSize = focused ? size + 2 : size;
  const strokeWidth = focused ? 2.5 : 2;
  
  switch (routeName) {
    case 'index':
      return <Home color={color} size={iconSize} strokeWidth={strokeWidth} />;
    case 'search':
      return <Search color={color} size={iconSize} strokeWidth={strokeWidth} />;
    case 'cart':
      return <ShoppingBag color={color} size={iconSize} strokeWidth={strokeWidth} />;
    case 'orders':
      return <Package color={color} size={iconSize} strokeWidth={strokeWidth} />;
    case 'profile':
      return <User color={color} size={iconSize} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
}

function getLabelText(routeName: string) {
  switch (routeName) {
    case 'index':
      return 'Home';
    case 'search':
      return 'Search';
    case 'cart':
      return 'Cart';
    case 'orders':
      return 'Orders';
    case 'profile':
      return 'Profile';
    default:
      return routeName;
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    height: 60,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  labelContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});