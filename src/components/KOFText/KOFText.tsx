import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';
import { useKOFTheme } from '../../theme';

type KOFTextVariant = 'body' | 'title';
type KOFTextWeightName =
  'thin' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
type KOFTextWeightNumber = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type KOFTextWeight = KOFTextWeightName | KOFTextWeightNumber;
type KOFThemeColor = 'text' | 'background';

type KOFTextProps = TextProps & {
  variant?: KOFTextVariant;
  weight?: KOFTextWeight;
  color?: KOFThemeColor | (string & {});
};

function getFontFamilyKey(weight: KOFTextWeight): KOFTextWeightName {
  if (typeof weight !== 'number') {
    return weight;
  }

  if (weight <= 200) {
    return 'thin';
  }

  if (weight <= 400) {
    return 'regular';
  }

  if (weight === 500) {
    return 'medium';
  }

  if (weight === 600) {
    return 'semibold';
  }

  if (weight === 700) {
    return 'bold';
  }

  return 'extrabold';
}

export function KOFText({
  variant = 'body',
  weight = 'regular',
  color = 'text',
  style,
  children,
  ...props
}: KOFTextProps) {
  const theme = useKOFTheme();

  const variantStyle: TextStyle =
    variant === 'title'
      ? {
          fontSize: 24,
          lineHeight: 28,
        }
      : {
          fontSize: 14,
          lineHeight: 18,
        };

  const resolvedColor =
    color in theme.colors ? theme.colors[color as KOFThemeColor] : color;
  const fontFamilyKey = getFontFamilyKey(weight);

  return (
    <Text
      {...props}
      style={[
        styles.base,
        {
          color: resolvedColor,
          fontFamily: theme.typography.fontFamily[fontFamilyKey],
        },
        variantStyle,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
