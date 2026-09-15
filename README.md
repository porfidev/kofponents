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

La libreria declara `react` y `react-native` como peer dependencies, por lo que deben existir en la aplicacion donde se instale. Para usar los iconos, instala tambien `react-native-svg`:

```sh
npm install react-native-svg
```

## Uso

Los componentes funcionan sin `KOFProvider`: usan `defaultTheme` automaticamente.
Agrega el provider cuando quieras personalizar el tema de tu aplicacion o de una
seccion. Tambien puedes usarlo sin pasar `theme`, como en este ejemplo:

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

### KOFButton

Boton con etiqueta `KOFText`, variantes `primary` y `secondary`, cuatro tamaños
y colores por estado. Usa `label` para el texto del boton.

```tsx
import { KOFButton } from '@porfidev/kofponents';

export function ButtonExample() {
  return (
    <>
      <KOFButton
        label="Guardar"
        variant="primary"
        size="large"
        onPress={() => console.log('Guardar')}
      />
      <KOFButton
        label="Cancelar"
        variant="secondary"
        size="medium"
        onPress={() => console.log('Cancelar')}
      />
      <KOFButton label="Ver detalle" variant="secondary" size="small" />
      <KOFButton label="Agregar" size="x-small" />
      <KOFButton label="Guardar" variant="primary" disabled />
      <KOFButton label="Cancelar" variant="secondary" disabled />
    </>
  );
}
```

Propiedades principales:

| Propiedad   | Tipo                                          | Valor predeterminado / uso                                 |
| ----------- | --------------------------------------------- | ---------------------------------------------------------- |
| `label`     | `string`                                      | Obligatoria; etiqueta del boton                            |
| `variant`   | `'primary' \| 'secondary'`                    | `'primary'`                                                |
| `size`      | `'large' \| 'medium' \| 'small' \| 'x-small'` | `'medium'`                                                 |
| `disabled`  | `boolean`                                     | Sin deshabilitar; bloquea la interaccion al activarse      |
| `style`     | `PressableProps['style']`                     | Estilos del contenedor o callback que recibe `{ pressed }` |
| `textStyle` | `StyleProp<TextStyle>`                        | Estilos de la etiqueta                                     |

Tambien acepta propiedades de `Pressable`, como `onPress`, `onLongPress`,
`onHoverIn`, `onHoverOut`, `accessibilityLabel` y `testID`. El contenido visible
se construye con `label`; no uses `children` para reemplazarlo.

#### Tamaños

`size` controla las dimensiones del contenedor y el tamaño de la etiqueta:

| Tamaño    | Altura del contenedor | Padding horizontal | Padding vertical | Font size |
| --------- | --------------------- | ------------------ | ---------------- | --------- |
| `large`   | Fija: 48              | 16                 | 12               | 16        |
| `medium`  | Minima: 40            | 16                 | 10               | 16        |
| `small`   | Minima: 36            | 16                 | 6                | 12        |
| `x-small` | Minima: 28            | 16                 | 4                | 12        |

Los valores son unidades de layout de React Native. La etiqueta usa el peso
`regular` y no fija `lineHeight`: anula el valor de `KOFText` para usar la altura
natural de la fuente. Puedes sobrescribirlo con `textStyle`.

#### Estados y tema

Cada variante usa `theme.buttons[variant]`, con los estados `default`, `hover`,
`pressed` y `disabled`. La prioridad es `disabled` → `pressed` → `hover` →
`default`. El hover se activa al pasar un puntero sobre el boton, y `pressed`
mientras se mantiene presionado.

Cada estado define `bgColor`, `textColor` y, opcionalmente, `borderColor`. El
borde tiene ancho 1 y es transparente cuando no se define su color.

Para personalizar un estado, conserva el resto de las variantes y colores:

```tsx
import { defaultTheme, KOFButton, KOFProvider } from '@porfidev/kofponents';

const theme = {
  buttons: {
    ...defaultTheme.buttons,
    secondary: {
      ...defaultTheme.buttons.secondary,
      pressed: {
        bgColor: '#FFF0F2',
        textColor: '#BD021C',
        borderColor: '#BD021C',
      },
    },
  },
};

export function ThemedButtonExample() {
  return (
    <KOFProvider theme={theme}>
      <KOFButton label="Continuar" variant="secondary" />
    </KOFProvider>
  );
}
```

El provider no combina profundamente `buttons`: si lo personalizas, incluye
ambas variantes y todos sus estados, como en el ejemplo anterior.

#### Estilos personalizados

```tsx
<KOFButton
  label="Continuar"
  style={({ pressed }) => ({
    alignSelf: 'stretch',
    opacity: pressed ? 0.9 : 1,
  })}
  textStyle={{ fontSize: 18, lineHeight: 24 }}
/>
```

`style` y `textStyle` se aplican al final; pueden sobrescribir las dimensiones,
la tipografia y los colores del estado actual.

### StatusLabel

Etiqueta para mostrar estados de advertencia o error. Usa los tokens
`labels` del tema y puede incluir un icono a la izquierda.

```tsx
import {
  AlertTriangleIcon,
  ForbiddenIcon,
  StatusLabel,
} from '@porfidev/kofponents';

export function StatusExample() {
  return (
    <>
      <StatusLabel
        variant="warn"
        text="Revisa la informacion antes de continuar"
        icon={<AlertTriangleIcon color="#222222" />}
      />

      <StatusLabel
        variant="error"
        text="No tienes permiso para realizar esta accion"
        icon={<ForbiddenIcon color="#FCFCFC" />}
      />
    </>
  );
}
```

Propiedades principales:

```ts
variant: 'warn' | 'error'; // Por defecto: 'warn'
text: string;
icon?: ReactNode;
textStyle?: TextStyle;
textProps?: TextProps;
```

### Iconos

Los iconos disponibles son `AlertTriangleIcon` y `ForbiddenIcon`. Ambos tienen
un tamaño predeterminado de `12 × 12` y aceptan `color`, `width`, `height` y
las propiedades de `Svg` de `react-native-svg`.

```tsx
import { AlertTriangleIcon, ForbiddenIcon } from '@porfidev/kofponents';

export function IconExample() {
  return (
    <>
      <AlertTriangleIcon color="#F59E0B" />
      <ForbiddenIcon color="#DC2626" width={20} height={20} />
    </>
  );
}
```

## Tipografias

La libreria usa familias tipograficas desde el tema. La aplicacion que consume la libreria debe cargar las fuentes nativas antes de usarlas.

`KOFProvider` selecciona nombres de fuentes; no instala ni carga sus archivos.
El tema predeterminado referencia Inter. Incluye los archivos de los pesos que
utilices; `KOFButton` usa `regular`. Tambien puedes cargar otra familia en tu
aplicacion y configurar sus nombres en `theme.typography.fontFamily`. Sin los
archivos correspondientes, la apariencia puede cambiar por el uso de una fuente
de respaldo, incluso si utilizas el provider.

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

### Validacion antes de publicar en Azure Artifacts

Antes de publicar en el registro privado, confirma que el scope `@porfidev`
resuelve al feed de Azure Artifacts y que tienes una sesion autenticada:

```sh
npm config get @porfidev:registry
npm whoami --registry=https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/
```

El primer comando debe mostrar el endpoint de Azure Artifacts y el segundo debe
mostrar tu usuario. Un error `E401` indica que faltan credenciales o que ya no
son validas; un `E403` indica que la cuenta no tiene permiso para publicar en
el feed. Configura o renueva la autenticacion en `~/.npmrc`, nunca en el
`.npmrc` del proyecto.

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
yarn version patch
```

```sh
yarn version minor
```

```sh
yarn version major
```

El proyecto ya incluye scripts para publicar en cada registro desde
`package.json`.

Para publicar en npm publico:

```sh
yarn publish:public
```

Si el `.npmrc` del proyecto tiene activo el endpoint privado para `@porfidev`,
comentalo temporalmente antes de publicar en npm publico:

```ini
registry=https://registry.npmjs.org/

# @porfidev:registry=https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/
# always-auth=true
```

Despues publica con:

```sh
yarn publish:public
```

Publica en Azure Artifacts:

```sh
yarn publish:private
```

Para publicar en ambos registros, usa la misma version y publica una vez en cada
registro:

```sh
yarn publish:public
yarn publish:private
```

Tambien puedes usar el script que publica ambos registros:

```sh
yarn publish:all
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
yarn version patch
yarn publish:public
yarn publish:private
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
