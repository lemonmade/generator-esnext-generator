import _ from 'lodash';
import path from 'path';
import {Base as BaseGenerator} from 'yeoman-generator';

module.exports = class ESNextGeneratorSubgeneratorGenerator extends BaseGenerator {
  constructor(...args) {
    super(...args);

    this.argument('namespace', {
      type: String,
      required: true,
      description: 'Generator namespace',
    });

    this.option('generatorName', {
      type: String,
      required: false,
      description: 'Generator name',
    });
  }

  writing() {
    let {namespace} = this;

    let generatorName = this.options.generatorName || this.fs.readJSON(this.destinationPath('package.json')).name;
    let generatorClassName = generatorName
      .replace('generator-', '')
      .split('-')
      .map(_.capitalize)
      .join('');

    if (namespace !== 'app') { generatorClassName += _.capitalize(namespace); }
    generatorClassName += 'Generator';

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path.join('src', namespace, 'index.js')),
      {generatorName, generatorClassName, yoName: generatorName.replace('generator-', '')}
    );

    this.fs.copy(
      this.templatePath('templates/**'),
      this.destinationPath(path.join('src', namespace, 'templates'))
    );

    this.fs.copyTpl(
      this.templatePath('index.test.js'),
      this.destinationPath(path.join('test', 'src', namespace, 'index.test.js')),
      {namespace, generatorName}
    );
  }
};
