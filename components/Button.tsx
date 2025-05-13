import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Colors from '@/constants/Colors';
import { fonts } from '@/constants/Theme';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const colors = Colors.light;
  
  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...(size === 'small' ? styles.buttonSmall : {}),
      ...(size === 'large' ? styles.buttonLarge : {}),
      ...(fullWidth ? styles.buttonFullWidth : {}),
      ...(disabled ? styles.buttonDisabled : {}),
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.primaryLight : colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.secondaryLight : colors.secondary,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.borderDark : colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle: TextStyle = {
      ...styles.buttonText,
      ...(size === 'small' ? styles.buttonTextSmall : {}),
      ...(size === 'large' ? styles.buttonTextLarge : {}),
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...baseStyle,
          color: colors.background,
        };
      case 'outlined':
        return {
          ...baseStyle,
          color: disabled ? colors.textTertiary : colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? colors.textTertiary : colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' ? colors.background : colors.primary}
        />
      ) : (
        <>
          {leftIcon && leftIcon}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {rightIcon && rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    gap: 8,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 80,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 120,
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
});