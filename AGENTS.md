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
