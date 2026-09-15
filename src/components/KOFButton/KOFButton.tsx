import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type TextStyle,
} from 'react-native';
import { KOFText } from '../KOFText';
import { useKOFTheme } from '../../theme';
import { useState } from 'react';

type KOFButtonVariant = 'primary' | 'secondary';
type KOFButtonSize = 'large' | 'medium' | 'small' | 'x-small';
type KOFButtonProps = PressableProps & {
  label: string;
  variant?: KOFButtonVariant;
  size?: KOFButtonSize;
  textStyle?: StyleProp<TextStyle>;
};

export function KOFButton({
  label,
  variant = 'primary',
  size = 'medium',
  textStyle,
  disabled,
  style,
  onHoverIn,
  onHoverOut,
  ...props
}: KOFButtonProps) {
  const theme = useKOFTheme();
  const [hovered, setHovered] = useState(false);
  const palette = theme.buttons[variant];

  const getColors = (pressed: boolean) => {
    if (disabled) return palette.disabled;
    if (pressed) return palette.pressed;
    if (hovered) return palette.hover;
    return palette.default;
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onHoverIn={(event) => {
        setHovered(true);
        onHoverIn?.(event);
      }}
      onHoverOut={(event) => {
        setHovered(false);
        onHoverOut?.(event);
      }}
      style={(state) => {
        const colors = getColors(state.pressed);

        return [
          styles.wrapper,
          containerSizes[size],
          {
            backgroundColor: colors.bgColor,
            borderColor: colors.borderColor ?? 'transparent',
          },
          typeof style === 'function' ? style(state) : style,
        ];
      }}
    >
      {({ pressed }) => (
        <KOFText
          weight="regular"
          color={getColors(pressed).textColor}
          style={[
            styles.label,
            labelSizes[size],
            { lineHeight: undefined },
            textStyle,
          ]}
        >
          {label}
        </KOFText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 64,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  label: {},
});

const containerSizes = StyleSheet.create({
  'large': {
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  'medium': {
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  'small': {
    minHeight: 36,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  'x-small': {
    minHeight: 28,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});

const labelSizes = StyleSheet.create({
  'large': {
    fontSize: 16,
  },
  'medium': {
    fontSize: 16,
  },
  'small': {
    fontSize: 12,
  },
  'x-small': {
    fontSize: 12,
  },
});
