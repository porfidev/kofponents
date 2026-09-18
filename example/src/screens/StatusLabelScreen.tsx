import { StyleSheet, View } from 'react-native';
import {
  AlertTriangleIcon,
  ForbiddenIcon,
  KOFText,
  StatusLabel,
} from '@porfidev/kofponents';

export function StatusLabelScreen() {
  return (
    <>
      {(['warn', 'error'] as const).map((variant) => {
        const Icon = variant === 'warn' ? AlertTriangleIcon : ForbiddenIcon;
        const text =
          variant === 'warn' ? 'Mensaje de advertencia' : 'Mensaje de error';
        return (
          <View key={variant} style={styles.group}>
            <KOFText weight="bold" accessibilityRole="header">
              {variant}
            </KOFText>
            <KOFText>Con icono</KOFText>
            <StatusLabel text={text} variant={variant} icon={<Icon />} />
            <KOFText>Sin icono</KOFText>
            <StatusLabel text={text} variant={variant} />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  group: { gap: 12, alignItems: 'flex-start' },
});
