import type { ReactNode } from 'react';
import { KOFText } from '../KOFText';
import { useKOFTheme } from '../../theme';
import {
  StyleSheet,
  type TextProps,
  type TextStyle,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

type StatusLabelVariant = 'error' | 'warn';
type StatusLabelProps = ViewProps & {
  variant?: StatusLabelVariant;
  text: string;
  icon?: ReactNode;
  textStyle?: TextStyle;
  textProps?: TextProps;
};

export function StatusLabel({
  variant = 'warn',
  text,
  style,
  icon,
  textStyle,
  textProps,
  ...props
}: StatusLabelProps) {
  const theme = useKOFTheme();

  const variantStyleWrapper: ViewStyle =
    variant === 'warn'
      ? {
          backgroundColor: theme.labels.bgSurfaceWarning,
        }
      : {
          backgroundColor: theme.labels.bgSurfaceError,
        };

  const variantStyleText: TextStyle =
    variant === 'warn'
      ? {
          color: theme.labels.textWarning,
        }
      : {
          color: theme.labels.textError,
        };

  return (
    <View {...props} style={[styles.wrapper, variantStyleWrapper, style]}>
      {icon ? <View style={[styles.iconWrapper]}>{icon}</View> : null}
      <KOFText
        weight={'bold'}
        style={[styles.base, variantStyleText, textStyle]}
        {...textProps}
      >
        {text}
      </KOFText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 8,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 104,
    paddingHorizontal: 8,
  },
  base: {
    fontSize: 10,
    lineHeight: 12,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
