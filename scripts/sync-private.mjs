import { spawnSync } from 'node:child_process';
import { realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = realpathSync(fileURLToPath(new URL('..', import.meta.url)));

function git(cwd, args, input) {
  const result = spawnSync('git', args, {
    cwd,
    input,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const error = new Error(result.stderr.trim() || `git ${args[0]} falló`);
    error.exitCode = result.status;
    throw error;
  }
  return result.stdout;
}

try {
  const args = process.argv.slice(2);
  let destination;
  let from;
  let apply = false;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--apply') apply = true;
    else if (arg === '--to' || arg === '--from') {
      const value = args[++i];
      if (!value || value.startsWith('-')) {
        throw new Error(`Falta el valor de ${arg}`);
      }
      if (arg === '--to') destination = value;
      else from = value;
    } else {
      throw new Error(`Argumento desconocido: ${arg}`);
    }
  }
  if (!destination || !from) {
    throw new Error(
      'Uso: yarn sync:private --to /ruta/AdvisorApp-Commons --from <commit-público-base> [--apply]'
    );
  }

  const target = realpathSync(destination);
  if (
    target === source ||
    target.startsWith(source + path.sep) ||
    source.startsWith(target + path.sep)
  ) {
    throw new Error('Usa dos repositorios separados, sin carpetas anidadas.');
  }
  if (
    realpathSync(git(target, ['rev-parse', '--show-toplevel']).trim()) !==
    target
  ) {
    throw new Error('--to debe apuntar a la raíz del repositorio privado.');
  }
  if (
    git(source, [
      'status',
      '--porcelain',
      '--untracked-files=all',
      '--',
      'src',
    ]).trim()
  ) {
    throw new Error(
      'Guarda en un commit los cambios públicos de src antes de sincronizar.'
    );
  }
  if (git(target, ['status', '--porcelain', '--untracked-files=all']).trim()) {
    throw new Error(
      'El repositorio privado debe tener el árbol de trabajo limpio.'
    );
  }

  const base = git(source, [
    'rev-parse',
    '--verify',
    '--end-of-options',
    `${from}^{commit}`,
  ]).trim();
  const head = git(source, ['rev-parse', 'HEAD']).trim();
  try {
    git(source, ['merge-base', '--is-ancestor', base, head]);
  } catch (error) {
    if (error.exitCode !== 1) throw error;
    throw new Error(
      `La base --from ${from} (${base}) no es antecesora del HEAD público ${head} en el historial local.\n` +
        'Usa el último commit del repositorio público que ya incorporaste al privado, no el HEAD del privado. ' +
        'Revisa también que estés en la rama pública correcta. Si el clon es superficial, puede faltar historial.\n' +
        'No se modificó el destino. Si no conoces la base pública, primero hay que comparar y conciliar ambos repositorios.'
    );
  }
  const patch = git(source, [
    'diff',
    '--binary',
    '--full-index',
    '--no-ext-diff',
    '--no-textconv',
    '--no-renames',
    '--src-prefix=a/',
    '--dst-prefix=b/',
    base,
    head,
    '--',
    'src',
  ]);
  console.log(`Público: ${base} → ${head}\nDestino: ${target}\nAlcance: src/`);
  if (!patch) {
    console.log('No hay cambios públicos que transferir.');
  } else {
    console.log(git(target, ['apply', '--stat', '-'], patch));
    git(target, ['apply', '--check', '--whitespace=nowarn', '-'], patch);
    if (apply) {
      git(target, ['apply', '--whitespace=nowarn', '-'], patch);
      console.log(
        `Cambios aplicados sin commit ni push. Revisa el diff y valida el proyecto privado.\nDespués de integrar estos cambios, usa ${head} como --from de la próxima sincronización.`
      );
    } else {
      console.log(
        'Vista previa correcta. Repite con --apply para modificar el destino.'
      );
    }
  }
} catch (error) {
  console.error(`Sincronización detenida: ${error.message}`);
  process.exitCode = 1;
}
