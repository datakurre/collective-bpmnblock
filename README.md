# collective-bpmnblock

[![Storybook](https://img.shields.io/badge/-Storybook-ff4785?logo=storybook&logoColor=white&style=flat-square)](https://collective.github.io/collective-bpmnblock/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

BPMN 2.0 diagram block for [Plone Aurora](https://github.com/plone/aurora) with interactive token simulation support.

## Features

- **BPMN 2.0 Visual Modeler & Viewer**: Create and display BPMN 2.0 process workflows using `bpmn-js`.
- **Token Simulation**: Built-in support for `bpmn-js-token-simulation`, with auto-start capability and simplified, streamlined UI.
- **Aurora Block Anatomy Widths**: Supports standard Aurora width alignments (`narrow`, `default`, `layout`, `full`).
- **Flexible Sizing Vocabulary**: Responsive height vocabulary (`s`: 40vh, `m`: 60vh, `l`: 80vh) using CSS custom properties with fallback defaults.
- **Diagram Fit Control**: One-click diagram fitting in both view and simulation modes.
- **Storybook Support**: Includes interactive Storybook stories deployed automatically to GitHub Pages.

## Installation

Add `collective-bpmnblock` to your Aurora project's `package.json`:

```bash
pnpm add collective-bpmnblock
```

Register the add-on in your project's `registry.config.ts`:

```ts
import { addons } from '@plone/aurora/registry.config';

addons.push('collective-bpmnblock');

export { addons };
```

## Development

```bash
# Install dependencies and build core dependencies
make install

# Start development server
make start

# Run unit tests
make test

# Run code analysis (ESLint, Prettier, Stylelint)
make lint
make format

# Start Storybook
make storybook-start

# Build Storybook static documentation
make storybook-build
```

## License

MIT License. Copyright (c) Plone Community.
