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
};
