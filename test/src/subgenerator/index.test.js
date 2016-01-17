import _ from 'lodash';
import path from 'path';
import helpers from 'yeoman-test';

describe('generator:subgenerator', () => {
  const generator = 'foo';
  const namespace = 'bar';

  context('when it is a subgenerator', () => {
    beforeEach((done) => {
      helpers
        .run(path.join(__dirname, '../../../src/subgenerator'))
        .withArguments([namespace])
        .on('ready', (gen) => gen.fs.writeJSON('package.json', {name: `generator-${generator}`}))
        .on('end', done);
    });

    it('creates the subgenerator files', () => {
      assert.file([
        `src/${namespace}/index.js`,
        `src/${namespace}/templates/dummyfile.txt`,
        `test/src/${namespace}/index.test.js`,
      ]);
    });

    it('sets up the generator class', () => {
      let file = `src/${namespace}/index.js`;

      assert.fileContent(file, `import {Base as BaseGenerator} from 'yeoman-generator';`);
      assert.fileContent(file, `module.exports = class ${_.capitalize(generator)}${_.capitalize(namespace)}Generator extends BaseGenerator {`);
    });

    it('configures the test file', () => {
      assert.fileContent(`test/src/${namespace}/index.test.js`, 'import \'../../helper\'');
      assert.fileContent(`test/src/${namespace}/index.test.js`, `describe('generator-${generator}:${namespace}`);
      assert.fileContent(`test/src/${namespace}/index.test.js`, `../../../src/${namespace}`);
    });
  });

  context('when it is the root generator', () => {
    beforeEach((done) => {
      helpers
        .run(path.join(__dirname, '../../../src/subgenerator'))
        .withArguments(['app'])
        .on('ready', (gen) => gen.fs.writeJSON('package.json', {name: `generator-${generator}`}))
        .on('end', done);
    });

    it('creates the subgenerator files', () => {
      assert.file([
        `src/app/index.js`,
        `src/app/templates/dummyfile.txt`,
        `test/src/app/index.test.js`,
      ]);
    });

    it('sets up the generator class', () => {
      let file = `src/app/index.js`;

      assert.fileContent(file, `import {Base as BaseGenerator} from 'yeoman-generator';`);
      assert.fileContent(file, `module.exports = class ${_.capitalize(generator)}Generator extends BaseGenerator {`);
    });

    it('configures the test file', () => {
      assert.fileContent(`test/src/app/index.test.js`, 'import \'../../helper\'');
      assert.fileContent(`test/src/app/index.test.js`, `describe('generator-${generator}:app`);
      assert.fileContent(`test/src/app/index.test.js`, `../../../src/app`);
    });
  });
});
