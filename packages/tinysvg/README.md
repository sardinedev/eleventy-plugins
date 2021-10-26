# `@sardine/eleventy-plugin-tinysvg`

An eleventy plugin to minify and optimise SVG

## Features

Inlines SVG files and optimises it with [SVGO](https://github.com/svg/svgo) to keep it as small as possible

## Requirements

- [Node.js](https://nodejs.org/en/download/) 12 and up

- [11ty](https://www.11ty.dev/) 0.11.0

## Installation

```bash
npm install --save-dev @sardine/eleventy-plugin-tinysvg
```

## How to use it

```javascript
const tinysvg = require('@sardine/eleventy-plugin-tinysvg');
eleventyConfig.addPlugin(tinysvg, {
  baseUrl: 'site/_assets/svg/',
});
```

## License

[MIT](./LICENSE)
