# commitlint-config-yarn-scopes

Commitlint config to enforce packages' name in a workspace as commit scope.

## Why

This library takes inspiration from `@commitlint/config-lerna-scopes`. Although the mentioned library does a great job on extrapolating scopes from a workspace, it forces to be bound to `lerna` even if the project is not actively using it. This means installing `lerna` just to respect a peer dependency.

Since `yarn` already offers a way to extract the packages involved in a workspace, we can leverage this feature in our favour. Precisely for this goal, this library exists. It lets to be `lerna-free`, without having unresolved peer dependencies warnings, while maintaining the ability to extract scopes from the workspace.

## Installation

```bash
yarn install -D commitlint-config-yarn-scopes
```

## Usage

Add the following snippet in the `commitlint.config.js` file of your project

```suggestion
{
  extends: ['yarn-scopes']
}
```

Optionally, this package exports a function `getPackages` that can be used to extract the scopes manually. The usage is the following

```javascript
const { utils: { getPackages } } = require('commitlint-config-yarn-scopes')

modules.exports = {
  ...,
  'scope-enum': async (context) => [
    2,
    'always',
    [
      ...(await getPackages(context)),
      'other-package-outside-the-workspace',
    ],
  ],
}
```
