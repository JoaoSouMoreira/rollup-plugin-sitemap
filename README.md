# rollup-plugin-sitemap

A Rollup plugin which takes a list of routes and generates a sitemap.xml file in a specified directory, normally your `public` folder.

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Rollup v1.20.0+.

## Install

Using npm:

```console
npm install --save-dev rollup-plugin-sitemap
```

Using yarn:
```console
yarn add --dev rollup-plugin-sitemap
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import SitemapPlugin from 'rollup-plugin-sitemap';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/test', name: 'Test' },
];

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    SitemapPlugin({
      baseUrl: 'https://example.com',
      contentBase: 'public',
      routes,
    })
  ]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

### `baseUrl`

Type: `String`<br>
Default: `null`

A string to define what the base URL for the website of the sitemap.

### `contentBase`

Type: `String`<br>
Default: `'public'`

This will be the directory in your project where the `sitemap.xml` file will be generated. Normally this is named either `public` or `dist`.

### `routes`

Type: `Array[...Object]`<br>
Default: `null`

A list of routes with two required properties, `path` and `name`. Name is there in case you want to define a route but not make it show up on the sitemap file. See the code above for an example of this value.
