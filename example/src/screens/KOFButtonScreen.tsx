import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KOFButton, KOFText } from '@porfidev/kofponents';

export function KOFButtonScreen() {
  const [lastPressed, setLastPressed] = useState('Ninguno');

  return (
    <>
      <KOFText>
        Pasa el cursor o mantén presionado para ver los estados de cada botón.
      </KOFText>
      <KOFText accessibilityLiveRegion="polite">
        Último botón presionado: {lastPressed}
      </KOFText>
      {(['primary', 'secondary'] as const).map((variant) => (
        <View key={variant} style={styles.group}>
          <KOFText weight="bold" accessibilityRole="header">
            {variant}
          </KOFText>
          {(['large', 'medium', 'small', 'x-small'] as const).map((size) => (
            <View key={size} style={styles.group}>
              <KOFButton
                label={`${variant} · ${size}`}
                variant={variant}
                size={size}
                accessibilityRole="button"
                onPress={() => setLastPressed(`${variant} · ${size}`)}
              />
              <KOFButton
                label={`${size} · deshabilitado`}
                variant={variant}
                size={size}
                disabled
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
              />
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 12,
    alignItems: 'flex-start',
  },
});
