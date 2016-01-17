# generator-esnext-generator

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Build Status][travis-image]][travis-url]

> A Yeoman generator generating a Yeoman generator using what's next in JavaScript.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-esnext-generator using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-esnext-generator
```

Then generate your new project:

```bash
yo esnext-generator
```

## Commands

* `yo esnext-generator` shows a wizard for generating a new generator
* `yo esnext-generator:subgenerator <name>` generates a subgenerator with the name `<name>`

## What You Get

The following directory structure is installed by this generator:

```
|-- src/
  |-- app/
    |-- index.js
    |-- templates/
      |-- dummyfile.txt
|-- test/
  |-- src/
    |-- app/
      |-- index.test.js
  |-- .eslintrc
  |-- helper.js
|-- .babelrc
|-- .editorconfig
|-- .eslintrc
|-- .gitattributes
|-- .gitignore
|-- .travis.yml
|-- README.md
|-- LICENSE
|-- package.json
```

You will get a variety of scripts added to `package.json` by this generator. This includes all of the required hooks to build the ES5 version of this package, standalone `build` command, and `test` and `lint` commands.

## Contributing

To build the ES5 (and, thus, Yeoman-compatible) version of your generator, run `npm run build`. This is automatically run at the correct times when updating/ publishing your package.

To run tests and linting, run `npm run check`. You can also run tests that watch for changes by running `npm run test:watch`, and you can run tests that track code coverage by running `npm run test:cover`.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).


## License

MIT © Chris Sauve

[npm-image]: https://badge.fury.io/js/generator-esnext-generator.svg
[npm-url]: https://npmjs.org/package/generator-esnext-generator

[daviddm-image]: https://david-dm.org/lemonmade/generator-esnext-generator.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/lemonmade/generator-esnext-generator

[travis-image]: https://travis-ci.org/lemonmade/generator-esnext-generator.svg?branch=master
[travis-url]: https://travis-ci.org/lemonmade/generator-esnext-generator

