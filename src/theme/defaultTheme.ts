import { Platform } from 'react-native';
import type { KOFTheme } from './types';

const fontFamily = {
  thin: Platform.select({
    ios: 'Inter18pt-Thin',
    android: 'Inter-Thin',
    default: 'Inter18pt-Thin',
  }),
  regular: Platform.select({
    ios: 'Inter18pt-Regular',
    android: 'Inter-Regular',
    default: 'Inter18pt-Regular',
  }),
  medium: Platform.select({
    ios: 'Inter18pt-Medium',
    android: 'Inter-Medium',
    default: 'Inter18pt-Medium',
  }),
  semibold: Platform.select({
    ios: 'Inter18pt-SemiBold',
    android: 'Inter-SemiBold',
    default: 'Inter18pt-SemiBold',
  }),
  bold: Platform.select({
    ios: 'Inter18pt-Bold',
    android: 'Inter-Bold',
    default: 'Inter18pt-Bold',
  }),
  extrabold: Platform.select({
    ios: 'Inter18pt-ExtraBold',
    android: 'Inter-ExtraBold',
    default: 'Inter18pt-ExtraBold',
  }),
};

export const defaultTheme: KOFTheme = {
  typography: {
    fontFamily,
    fontSize: 16,
    lineHeight: 18,
  },
  colors: {
    text: '#000000',
    background: '#666666',
  },
  labels: {
    bgSurfaceWarning: '#FFC01A',
    bgSurfaceError: '#E31F42',
    textWarning: '#222222',
    textError: '#FCFCFC',
  },
  buttons: {
    primary: {
      default: {
        bgColor: 'rgba(255, 59, 82, 1)',
        textColor: 'rgba(252, 252, 252, 1)',
      },
      hover: {
        bgColor: 'rgba(227, 31, 66, 1)',
        textColor: 'rgba(252, 252, 252, 1)',
      },
      pressed: {
        bgColor: 'rgba(189, 2, 28, 1)',
        textColor: 'rgba(252, 252, 252, 1)',
      },
      disabled: {
        bgColor: 'rgba(172, 172, 172, 1)',
        textColor: 'rgba(252, 252, 252, 1)',
      },
    },
    secondary: {
      default: {
        bgColor: 'rgba(252, 252, 252, 1)',
        textColor: 'rgba(255, 59, 82, 1)',
        borderColor: 'rgba(255, 59, 82, 1)',
      },
      hover: {
        bgColor: 'rgba(255, 229, 234, 1)',
        textColor: 'rgba(255, 59, 82, 1)',
        borderColor: 'rgba(255, 59, 82, 1)',
      },
      pressed: {
        bgColor: 'rgba(255, 178, 192, 1)',
        textColor: 'rgba(102, 0, 18, 1)',
        borderColor: 'rgba(102, 0, 18, 1)',
      },
      disabled: {
        bgColor: 'rgba(172, 172, 172, 1)',
        textColor: 'rgba(252, 252, 252, 1)',
        borderColor: 'rgba(172, 172, 172, 1)',
      },
    },
  },
};
