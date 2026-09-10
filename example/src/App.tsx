import { Text, View, StyleSheet } from 'react-native';
import {
  AlertTriangleIcon,
  defaultTheme,
  ForbiddenIcon,
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
    <KOFProvider theme={theme}>
      <View style={styles.container}>
        <KOFText weight="bold" color="red" variant="title" testID="title-text">
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
      </View>
    </KOFProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
