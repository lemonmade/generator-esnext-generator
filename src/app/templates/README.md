## Installation

First, install [Yeoman](http://yeoman.io) and <%- generatorName %> using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g <%- generatorName %>
```

Then generate your new project:

```bash
yo <%- yoName %>
```

## What You Get

The following is installed by this generator:

```
|-- dummyfile.txt
```

## Contributing

To build the ES5 (and, thus, Yeoman-compatible) version of your generator, run `npm run build`. This is automatically run at the correct times when updating/ publishing your package.

To run tests and linting, run `npm run check`. You can also run tests that watch for changes by running `npm run test:watch`, and you can run tests that track code coverage by running `npm run test:cover`.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).
