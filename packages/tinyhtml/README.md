# eleventy-plugin-tinyHTML

An 11ty plugin to optimise HTML.

## Features


- Uses [html-minifier](https://github.com/kangax/html-minifier) to optimise HTML.

  You can pass [html-minifier configuration object](https://github.com/kangax/html-minifier#options-quick-reference) in the [plugin's options](./Configuration)


## Requirements

- [Node.js](https://nodejs.org/en/download/) 12 and up

- [11ty](https://www.11ty.dev/) 0.11

## Installation

```bash
npm install --save-dev @sardine/eleventy-plugin-tinyhtml
```

## How to use it

```javascript
const tinyHTML = require('@sardine/eleventy-plugin-tinyhtml');
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(tinyHTML);
};
```

## Configuration

```javascript
const tinyHTML = require('@sardine/eleventy-plugin-tinyhtml');
module.exports = function (eleventyConfig) {
  const tinyHTMLOptions = {
    html5: true,
    removeRedundantAttributes : true,
  };

  eleventyConfig.addPlugin(tinyHTML, tinyHTMLOptions);
};
```

### html-minifier options

By default the following options are used:

```javascript
{
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  decodeEntities: true,
  html5: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  sortAttributes: true,
  sortClassName: true,
};
```

## License

[MIT](./LICENSE)
