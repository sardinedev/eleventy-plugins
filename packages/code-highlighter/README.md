# `@sardine/eleventy-plugin-code-highlighter`

An 11ty plugin to style your `<code>`.

## Features

This plugin uses [Prism](https://prismjs.com/) to style `<code>` blocks at build time and inlines Prism CSS theme in the page `<head>`.

Because styling is done at build time, you don't need to asynchronously load CSS and Javascript on the browser.

## Requirements

- [Node.js](https://nodejs.org/en/download/) 12 and up

- [11ty](https://www.11ty.dev/) 0.11

## Installation

```bash
npm install --save-dev @sardine/eleventy-plugin-code-highlighter
```

## How to use it

```javascript
// .eleventy.js
const codeHighlighter = require('@sardine/eleventy-plugin-code-highlighter');
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(codeHighlighter);
};
```

### Options

By default the [Tomorrow](https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css) theme is used. You can use any Prism theme by passing the theme URL as an option.

```javascript
// .eleventy.js
const codeHighlighter = require('@sardine/eleventy-plugin-code-highlighter');

const PRISM_THEME = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-twilight.min.css';

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(codeHighlighter, { urlTheme: PRISM_THEME });
};
```

## License

[MIT](./LICENSE)
