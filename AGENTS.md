# AGENTS.md

## Formatting

- Use the Prettier configuration defined in `package.json` for all code changes.
- Before finishing edits to TypeScript, TSX, JavaScript, JSON, Markdown, or other Prettier-supported files, run Prettier on the modified files.
- Current Prettier settings:
  - `singleQuote: true`
  - `trailingComma: "es5"`
  - `tabWidth: 2`
  - `useTabs: false`
  - `quoteProps: "consistent"`

## Validation

- Run `yarn typecheck` after TypeScript or TSX changes.
- Run `yarn test --runInBand --watchman=false` after changing tested behavior.

## Publishing

- The package is published as `@porfidev/kofponents`.
- The project can publish to both npm public and Azure Artifacts private.
- Use the existing package scripts when documenting or running publish commands:
  - `yarn publish:public`
  - `yarn publish:private`
  - `yarn publish:all`
- The project `.npmrc` may map the `@porfidev` scope to Azure Artifacts:

  ```ini
  registry=https://registry.npmjs.org/

  @porfidev:registry=https://pkgs.dev.azure.com/SFA-Advisor/SFACore-App/_packaging/kofponents/npm/registry/
  always-auth=true
  ```

- Do not put tokens or personal credentials in the project `.npmrc`.
- User-level npm credentials belong in `~/.npmrc`.
- Before publishing to npm public, the Azure Artifacts `@porfidev:registry=...`
  line may need to be commented temporarily so npm does not route the scoped
  package to the private feed.
- Before publishing a new build, bump the package version first. npm and Azure
  Artifacts do not allow overwriting an already published version.
