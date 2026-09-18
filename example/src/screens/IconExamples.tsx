import type { ComponentType } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { KOFText } from '@porfidev/kofponents';

export function IconExamples({ Icon }: { Icon: ComponentType<SvgProps> }) {
  return (
    <>
      <KOFText weight="bold" accessibilityRole="header">
        Tamaños
      </KOFText>
      {([12, 24, 48] as const).map((size) => (
        <View key={size} style={styles.row}>
          <Icon width={size} height={size} />
          <KOFText>
            {size} × {size}
          </KOFText>
        </View>
      ))}
      <KOFText weight="bold" accessibilityRole="header">
        Colores
      </KOFText>
      {['#222222', '#c62828', '#1565c0'].map((color) => (
        <View key={color} style={styles.row}>
          <Icon width={24} height={24} color={color} />
          <KOFText>{color}</KOFText>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
});
