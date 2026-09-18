import { StyleSheet, View } from 'react-native';
import { defaultTheme, KOFText } from '@porfidev/kofponents';

export function KOFTextScreen() {
  return (
    <>
      {(['title', 'body'] as const).map((variant) => (
        <View key={variant} style={styles.group}>
          <KOFText weight="bold" accessibilityRole="header">
            Variante: {variant}
          </KOFText>
          {(
            [
              'thin',
              'regular',
              'medium',
              'semibold',
              'bold',
              'extrabold',
            ] as const
          ).map((weight) => (
            <KOFText key={weight} variant={variant} weight={weight}>
              {variant} · {weight}
            </KOFText>
          ))}
        </View>
      ))}
      <View style={styles.group}>
        <KOFText weight="bold" accessibilityRole="header">
          Pesos numéricos
        </KOFText>
        {([100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map(
          (weight) => (
            <KOFText key={weight} weight={weight}>
              Texto con peso {weight}
            </KOFText>
          )
        )}
      </View>
      <View style={styles.group}>
        <KOFText weight="bold" accessibilityRole="header">
          Colores
        </KOFText>
        <KOFText color="text">Color del tema: text</KOFText>
        <View style={styles.darkSurface}>
          <KOFText color="background">Color del tema: background</KOFText>
        </View>
        <KOFText color="#c62828">Color personalizado: #c62828</KOFText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  group: { gap: 12 },
  darkSurface: {
    backgroundColor: defaultTheme.colors.text,
    padding: 12,
    borderRadius: 8,
  },
});
