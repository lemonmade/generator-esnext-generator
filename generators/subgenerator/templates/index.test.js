import '../../helper';

import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('<%- generatorName %>:<%- namespace %>', () => {
  const generatorIndex = path.join(__dirname, '../../../src/<%- namespace %>');

  describe('defaults', () => {
    beforeEach((done) => {
      helpers
        .run(generatorIndex)
        .withOptions({someOption: true})
        .withPrompts({somePrompt: true})
        .on('end', done);
    });

    it('creates the required files', () => {
      assert.file([
        'dummyfile.txt',
      ]);
    });
  });
});
