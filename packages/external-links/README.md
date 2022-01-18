# `@sardine/eleventy-plugin-external-links`

An 11ty plugin to protect you external links.

## Features

Adds `target="_blank" rel="noreferrer"` to all external links to [make them safer](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noreferrer).

Original Anchor tags:

```html
<html>
  <body>
    <a href="https://www.external.com">Hello to the outside!</a>
    <a href="/internal/link/">Hello to me!</a>
  </body>
</html>
```

Generated Anchor tags:

```html
<html>
  <body>
    <a href="https://www.external.com" target="_blank" rel="noreferrer">Hello to the outside!</a>
    <a href="/internal/link/">Hello to me!</a>
  </body>
</html>
```

## Requirements

- [Node.js](https://nodejs.org/en/download/) 12 and up

- [11ty](https://www.11ty.dev/) 0.11

## Installation

```bash
npm install --save-dev @sardine/eleventy-plugin-external-links
```

## How to use it

```javascript
const safeLinks = require('@sardine/eleventy-plugin-external-links').default;
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(safeLinks);
};
```

## License

[MIT](./LICENSE)
