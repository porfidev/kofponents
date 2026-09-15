import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertTriangleIcon,
  defaultTheme,
  ForbiddenIcon,
  KOFButton,
  KOFProvider,
  KOFText,
  multiply,
  StatusLabel,
} from '@porfidev/kofponents';

const result = multiply(3, 7);

const theme = {
  ...defaultTheme,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <KOFProvider theme={theme}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            contentInsetAdjustmentBehavior="never"
          >
            <KOFText
              weight="bold"
              color="red"
              variant="title"
              testID="title-text"
            >
              KOFText Title
            </KOFText>
            <KOFText
              weight="regular"
              color="text"
              variant="body"
              testID="body-text"
            >
              KOFText Body
            </KOFText>

            <StatusLabel
              text={'Mensaje de advertencia'}
              variant={'warn'}
              icon={<AlertTriangleIcon />}
            />
            <StatusLabel
              text={'Mensaje de error'}
              variant={'error'}
              icon={<ForbiddenIcon />}
            />
            <Text>Result: {result}</Text>
            <KOFText variant="title" weight="bold">
              KOFButton
            </KOFText>
            <KOFText>
              Pasar el cursor o mantener presionado muestra cada estado.
            </KOFText>
            {(['primary', 'secondary'] as const).map((variant) => (
              <View key={variant} style={styles.buttonGroup}>
                <KOFText weight="semibold">{variant}</KOFText>
                {(['large', 'medium', 'small', 'x-small'] as const).map(
                  (size) => (
                    <KOFButton
                      key={size}
                      label={`${variant} · ${size}`}
                      variant={variant}
                      size={size}
                    />
                  )
                )}
                <KOFButton
                  label={`${variant} · deshabilitado`}
                  variant={variant}
                  size="medium"
                  disabled
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </KOFProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 12,
    alignItems: 'center',
  },
  buttonGroup: {
    gap: 12,
    alignItems: 'center',
    width: '100%',
  },
});
