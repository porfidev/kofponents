# @porfidev/kofponents

Libreria de componentes visuales reutilizables para React Native.

## Instalacion

```sh
npm install @porfidev/kofponents
```

Tambien puedes instalarla con Yarn:

```sh
yarn add @porfidev/kofponents
```

La libreria declara `react` y `react-native` como peer dependencies, por lo que deben existir en la aplicacion donde se instale.

## Uso

Envuelve tu aplicacion con `KOFProvider` para que los componentes puedan leer el tema:

```tsx
import { KOFProvider, KOFText } from '@porfidev/kofponents';

export default function App() {
  return (
    <KOFProvider>
      <KOFText variant="title" weight={700}>
        Kofponents
      </KOFText>

      <KOFText variant="body" weight="regular">
        Componentes reutilizables para React Native.
      </KOFText>
    </KOFProvider>
  );
}
```

Tambien puedes personalizar el tema:

```tsx
import {
  defaultTheme,
  KOFProvider,
  KOFText,
  type KOFTheme,
} from '@porfidev/kofponents';

const theme: KOFTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    text: '#111827',
    background: '#ffffff',
  },
  typography: {
    ...defaultTheme.typography,
    fontFamily: {
      ...defaultTheme.typography.fontFamily,
      regular: 'Inter18pt-Regular',
      bold: 'Inter18pt-Bold',
    },
  },
};

export default function App() {
  return (
    <KOFProvider theme={theme}>
      <KOFText variant="title" weight="bold">
        Texto con tema personalizado
      </KOFText>
    </KOFProvider>
  );
}
```

## Componentes Disponibles

### KOFText

Componente de texto conectado al tema de KOF.

```tsx
import { KOFText } from '@porfidev/kofponents';

export function Example() {
  return (
    <>
      <KOFText variant="title" weight="bold" color="text">
        Titulo
      </KOFText>

      <KOFText variant="body" weight={400} color="#666666">
        Texto de cuerpo
      </KOFText>
    </>
  );
}
```

Variantes disponibles:

```ts
variant: 'body' | 'title';
```

Pesos disponibles por nombre:

```ts
weight: 'thin' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
```

Pesos disponibles por numero:

```ts
weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
```

Mapeo de pesos numericos:

```txt
100, 200 -> thin
300, 400 -> regular
500      -> medium
600      -> semibold
700      -> bold
800, 900 -> extrabold
```

Colores:

```tsx
<KOFText color="text">Color desde el tema</KOFText>
<KOFText color="background">Otro token del tema</KOFText>
<KOFText color="#ff0000">Color literal</KOFText>
```

## Tipografias

La libreria usa familias tipograficas desde el tema. La aplicacion que consume la libreria debe cargar las fuentes nativas antes de usarlas.

En una app React Native CLI, puedes colocar las fuentes en:

```txt
assets/fonts/
```

y configurar:

```js
// react-native.config.js
module.exports = {
  assets: ['./assets/fonts'],
};
```

Despues enlaza los assets y reconstruye la app:

```sh
npx react-native-asset
yarn ios
```

o:

```sh
npx react-native-asset
yarn android
```

En iOS normalmente se usa el PostScript name de la fuente, mientras que en Android suele usarse el nombre del archivo. Por eso el tema default resuelve las familias con `Platform.select`.

## Desarrollo

### Requisitos

- Node.js `>= 22.11.0`
- Yarn `4.11.0`
- React Native `0.85.0`
- Xcode para ejecutar iOS
- Android Studio / Android SDK para ejecutar Android

Instala dependencias desde la raiz del repositorio:

```sh
yarn install
```

### Scripts Principales

Ejecutar typecheck:

```sh
yarn typecheck
```

Ejecutar tests:

```sh
yarn test --runInBand --watchman=false
```

El flag `--watchman=false` evita errores locales cuando Watchman no tiene permisos para escribir en su directorio de estado.

Construir la libreria:

```sh
yarn prepare
```

Limpiar builds:

```sh
yarn clean
```

### Ejecutar El Example

Desde la raiz:

```sh
yarn example ios
```

```sh
yarn example android
```

Para web:

```sh
yarn example web
```

El `example` consume la libreria local con:

```json
"@porfidev/kofponents": "workspace:*"
```

### Publicacion

La libreria se publica como paquete scoped:

```json
"name": "@porfidev/kofponents"
```

Puede publicarse en dos registros:

- npm publico: `https://registry.npmjs.org/`
- Azure Artifacts privado:
  `https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/`

Agrega un archivo `.npmrc` en la raiz del proyecto, junto a `package.json`, con
la configuracion de registros:

```ini
registry=https://registry.npmjs.org/

@porfidev:registry=https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/
always-auth=true
```

No agregues tokens ni credenciales en el `.npmrc` del proyecto. La autenticacion
personal debe vivir en el `.npmrc` del usuario:

```txt
~/.npmrc
```

Antes de publicar:

```sh
yarn install
yarn typecheck
yarn test --runInBand --watchman=false
yarn prepare
npm pack --dry-run
```

Sube la version segun el tipo de cambio:

```sh
npm version patch
```

```sh
npm version minor
```

```sh
npm version major
```

Publica en npm publico:

```sh
npm publish --access public --registry=https://registry.npmjs.org/
```

Publica en Azure Artifacts:

```sh
npm publish --registry=https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/
```

Para publicar en ambos registros, usa la misma version y publica una vez en cada
registro:

```sh
npm publish --access public --registry=https://registry.npmjs.org/
npm publish --registry=https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/
```

Despues sube el commit y el tag:

```sh
git push
git push --tags
```

Para una version patch completa:

```sh
yarn install
yarn typecheck
yarn test --runInBand --watchman=false
yarn prepare
npm pack --dry-run
npm version patch
npm publish --access public --registry=https://registry.npmjs.org/
npm publish --registry=https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/
git push
git push --tags
```

## Contribucion

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## Licencia

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
