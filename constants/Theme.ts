import { Platform } from 'react-native';

export const fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export const typography = {
  heading1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
  },
  heading2: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  heading3: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 30,
  },
  heading4: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    lineHeight: 24,
  },
  heading5: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 22,
  },
  subtitle1: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 20,
  },
  subtitle2: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
  },
  body1: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonSmall: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
    web: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
    web: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    }
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
    web: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 8,
    }
  }),
};