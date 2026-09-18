# Sincronizar cambios públicos hacia el repositorio privado

`yarn sync:private` transfiere los cambios de `src/` entre un commit público
base y el `HEAD` público. Ambos repositorios deben estar clonados localmente
y tener la misma estructura de `src/`. No necesitan compartir historial Git.

Se usa un parche incremental en lugar de copiar archivos completos para conservar
las modificaciones privadas compatibles. Si un cambio no se puede aplicar, el
script se detiene sin aplicar el parche. No resuelve conflictos automáticamente.

## Elegir la base

`--from` es el commit **del repositorio público** cuyo contenido ya fue incorporado
al privado. No es un commit cualquiera del privado. En la primera sincronización,
identifica la versión pública de la que partió la copia privada. Si no existe una
base conocida, primero hay que comparar y conciliar ambas implementaciones;
este script no realiza esa importación inicial.

La base debe ser antecesora del `HEAD` público. El script usa cambios confirmados
en commits y exige que `src/` esté limpio en el público y que todo el árbol de
trabajo esté limpio en el privado.

## Uso

Desde el repositorio público, muestra y comprueba los cambios sin escribir:

```sh
yarn sync:private --to ../AdvisorApp-Commons --from <commit-publico-base>
```

Trabaja en una rama del repositorio privado y aplica:

```sh
yarn sync:private --to ../AdvisorApp-Commons --from <commit-publico-base> --apply
```

Revisa `git diff` en el privado, ejecuta sus validaciones y crea el commit y PR
con su flujo habitual. Registra en ese commit o PR el SHA público de destino
que imprime el script. Cuando se integre, ese SHA será el próximo `--from`.
No avances la base si la sincronización no se integró completamente.

## Alcance y conflictos

- Solo se transfieren cambios de archivos en `src/`, incluidos tests, altas y
  eliminaciones públicas. Los archivos exclusivamente privados no se borran.
- No se copian `.git`, credenciales, `.npmrc`, `package.json`, lockfiles,
  configuración, documentación ni artefactos de compilación.
- Los cambios públicos de dependencias o configuración deben incorporarse
  explícitamente en el privado cuando sean necesarios para el código transferido.
- Los commits de terceros permanecen en el historial privado. Sus cambios en
  otras partes de los archivos se conservan cuando el parche es compatible.
- Si ambos lados modificaron la misma zona, o un archivo nuevo ya existe en
  el privado, la comprobación puede fallar. Reconcilia esos cambios manualmente
  en una rama privada; no sobrescribas el archivo completo para evitar el conflicto.
- Una comprobación correcta no garantiza compatibilidad funcional: revisa el
  diff y ejecuta las pruebas privadas antes de integrar.

El script no hace fetch, commit, push ni publica paquetes. La publicación pública
sigue realizándose desde este repositorio con `yarn publish:public`.
