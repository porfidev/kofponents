import { useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  defaultTheme,
  KOFButton,
  KOFProvider,
  KOFText,
} from '@porfidev/kofponents';
import { KOFTextScreen } from './screens/KOFTextScreen';
import { KOFButtonScreen } from './screens/KOFButtonScreen';
import { StatusLabelScreen } from './screens/StatusLabelScreen';
import { AlertTriangleIconScreen } from './screens/AlertTriangleIconScreen';
import { ForbiddenIconScreen } from './screens/ForbiddenIconScreen';

const screens = {
  KOFText: KOFTextScreen,
  KOFButton: KOFButtonScreen,
  StatusLabel: StatusLabelScreen,
  AlertTriangleIcon: AlertTriangleIconScreen,
  ForbiddenIcon: ForbiddenIconScreen,
};

type Section = keyof typeof screens;
const sections = Object.keys(screens) as Section[];

export default function App() {
  const [section, setSection] = useState<Section | null>(null);
  const Screen = section ? screens[section] : null;

  useEffect(() => {
    if (!section) return;
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setSection(null);
        return true;
      }
    );
    return () => subscription.remove();
  }, [section]);

  return (
    <SafeAreaProvider>
      <KOFProvider theme={defaultTheme}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            {section && (
              <KOFButton
                label="Volver al inicio"
                variant="secondary"
                accessibilityRole="button"
                onPress={() => setSection(null)}
              />
            )}
            <KOFText variant="title" weight="bold" accessibilityRole="header">
              {section ?? 'Componentes'}
            </KOFText>
          </View>
          <ScrollView
            key={section ?? 'home'}
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            contentInsetAdjustmentBehavior="never"
          >
            {Screen ? (
              <Screen />
            ) : (
              sections.map((name) => (
                <KOFButton
                  key={name}
                  label={name}
                  accessibilityRole="button"
                  onPress={() => setSection(name)}
                />
              ))
            )}
          </ScrollView>
        </SafeAreaView>
      </KOFProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
  },
  header: {
    padding: 24,
    gap: 16,
    alignItems: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingTop: 0,
    gap: 24,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
});
