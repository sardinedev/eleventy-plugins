# eleventy-plugin-tinycss

An 11ty plugin to optimise CSS.

## Features

- Improves [First Contentful Paint](https://web.dev/first-contentful-paint/) by reducing the potential number of render-blocking resources. It replaces relative external CSS files and inlines them in the page.

  Original HTML:

  ```html
  <html>
    <head>
      <link href="/assets/styles.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>
  ```

  Optimised HTML:

  ```html
  <html>
    <head>
      <style>
        .a {
          font-size: large;
        }
      </style>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>
  ```

- Finds multiple `<style>` elements and merge them together.

  Original HTML:

  ```html
  <html>
    <head>
      <style>
        body {
          font-size: large;
        }
      </style>
    </head>
    <body>
      <style>
        .a {
          color: #ccc;
        }
      </style>
      <h1 class="a">Hello!</h1>
    </body>
  </html>
  ```

  Optimised HTML:

  ```html
  <html>
    <head>
      <style>
        body {
          font-size: large;
        }
        .a {
          color: #ccc;
        }
      </style>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>
  ```

- Uses [PurgeCSS](https://purgecss.com/) to remove unused CSS in the page.

  You can pass [PurgeCSS configuration object](https://purgecss.com/plugins/postcss.html#options) in the [plugin's options](./Configuration)

- Uses [Autoprefixer](https://autoprefixer.github.io/) to add vendor specific prefixes.

  You can pass [Autoprefixer options](https://github.com/postcss/autoprefixer#options) in the [plugin's options](./Configuration)

- Uses [CSSNano](https://cssnano.co/) to minify and optimise the final CSS.

  You can config CSSNano with the default [config files](https://cssnano.co/docs/config-file/#cssnano-config-files)

## Requirements

- [Node.js](https://nodejs.org/en/download/) 12 and up

- [11ty](https://www.11ty.dev/) 0.11

## Installation

```bash
npm install --save-dev @greyskullrocks/eleventy-plugin-tinycss
```

## How to use it

```javascript
const tinyCSS = require('@greyskullrocks/eleventy-plugin-tinycss');
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(tinyCSS);
};
```

## Configuration

### Ouput directory

By default the plugin uses `_site` as the 11ty output directory. If you're using other directory you'll need to tell the plugin:

```javascript
const tinyCSS = require('@greyskullrocks/eleventy-plugin-tinycss');
module.exports = function (eleventyConfig) {
  const tinyOptions = {
    output: 'dist',
  };

  eleventyConfig.addPlugin(tinyCSS, tinyOptions);
};
```

### PurgeCSS options

By default the following options are used:

```javascript
{
  content: [
    {
      raw: html,
      extension: "html",
    },
  ],
  extractors: [
    {
      extractor: purgeHtml,
      extensions: ["html"],
    },
  ],
};
```

You can pass your own options just like in [the official documentation](https://purgecss.com/plugins/postcss.html#options) :

```javascript
const tinyCSS = require('@greyskullrocks/eleventy-plugin-tinycss');
module.exports = function (eleventyConfig) {
  const tinyOptions = {
    purgeCSS: {
      // Remove them keyframes
      keyframes: true,
    },
  };

  eleventyConfig.addPlugin(tinyCSS, tinyOptions);
};
```

### Autoprefixer options

You can pass your own options just like in [the official documentation](https://github.com/postcss/autoprefixer#options) :

```javascript
const tinyCSS = require('@greyskullrocks/eleventy-plugin-tinycss');
module.exports = function (eleventyConfig) {
  const tinyOptions = {
    autoprefixer: {
      // keep browser prefixes
      remove: false,
    },
  };

  eleventyConfig.addPlugin(tinyCSS, tinyOptions);
};
```

## License

[MIT](./LICENSE)
