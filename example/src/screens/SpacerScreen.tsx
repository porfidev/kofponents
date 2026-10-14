import { StyleSheet, View } from 'react-native';
import { KOFText, Spacer } from '@porfidev/kofponents';

export function SpacerScreen() {
  return (
    <>
      <KOFText>
        Spacer crea espacio vertical invisible. Observa la separación entre los
        textos y los bloques de cada ejemplo.
      </KOFText>

      <View style={styles.group}>
        <KOFText weight="bold" accessibilityRole="header">
          Altura predeterminada · 30
        </KOFText>
        <View style={styles.preview}>
          <View style={styles.topBlock}>
            <KOFText>
              Primer párrafo de ejemplo: aquí termina el contenido.
            </KOFText>
          </View>
          <Spacer />
          <View style={styles.bottomBlock}>
            <KOFText>
              Segundo párrafo: comienza después del espacio predeterminado.
            </KOFText>
          </View>
        </View>
      </View>

      <View style={styles.group}>
        <KOFText weight="bold" accessibilityRole="header">
          Comparación de alturas
        </KOFText>
        <KOFText>
          El fondo claro entre los bloques muestra el espacio que ocupa Spacer.
          Con altura 0, los bloques quedan juntos.
        </KOFText>
        {[0, 8, 16, 32, 64].map((height) => (
          <View key={height} style={styles.group}>
            <KOFText weight="semibold">Altura: {height}</KOFText>
            <View style={styles.preview}>
              <View style={styles.topBlock}>
                <KOFText>Bloque superior</KOFText>
              </View>
              <Spacer height={height} />
              <View style={styles.bottomBlock}>
                <KOFText>Bloque inferior</KOFText>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.group}>
        <KOFText weight="bold" accessibilityRole="header">
          Ejemplo en una tarjeta
        </KOFText>
        <KOFText>Espacio de 8 entre textos y de 24 antes del resumen.</KOFText>
        <View style={styles.card}>
          <KOFText weight="bold">Pedido de ejemplo</KOFText>
          <Spacer height={8} />
          <KOFText>
            Este texto simula la descripción de un pedido con tres productos.
          </KOFText>
          <Spacer height={24} />
          <View style={styles.bottomBlock}>
            <KOFText weight="semibold">Resumen del pedido</KOFText>
            <Spacer height={8} />
            <KOFText>3 productos · Entrega mañana</KOFText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 12,
  },
  preview: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  topBlock: {
    backgroundColor: '#DBEAFE',
    padding: 12,
  },
  bottomBlock: {
    backgroundColor: '#DCFCE7',
    padding: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 16,
  },
});
