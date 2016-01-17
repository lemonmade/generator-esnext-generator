import _ from 'lodash';
import {Base as BaseGenerator} from 'yeoman-generator';
import checkName from 'inquirer-npm-name';
import yosay from 'yosay';
import chalk from 'chalk';
import path from 'path';
import process from 'process';

import ownPackage from '../../package.json';

function makeGeneratorName(name) {
  name = _.kebabCase(name);
  return name.indexOf('generator-') === 0 ? name : `generator-${name}`;
}

const requiredScripts = [
  'clean',
  'check',
  'copy',
  'build:lib',
  'build',
  'preversion',
  'version',
  'postversion',
  'prepublish',
];

module.exports = class ESNextGeneratorGenerator extends BaseGenerator {
  initializing() {
    this.props = {};
  }

  prompting() {
    let done = this.async();

    if (!this.options.skipWelcomeMessage) {
      this.log(yosay(`Welcome to the ${chalk.red('esnext-generator')} generator!`));
    }

    checkName({
      name: 'name',
      message: 'Your generator name',
      filter: makeGeneratorName,
      default: makeGeneratorName(path.basename(process.cwd())),
      validate(str) { return str.length > 0; },
    }, this, (name) => {
      this.props.name = name;
      done();
    });
  }

  default() {
    let {name} = this.props;

    let readmeTemplate = _.template(this.fs.read(this.templatePath('README.md')));
    let skipInstall = this.options.skipInstall;
    let skipWelcomeMessage = true;

    let projectOptions = {
      name,
      eslint: false,
      editorconfig: true,
      travis: true,
      coveralls: false,
      skipInstall,
      skipWelcomeMessage,
      readme: readmeTemplate({
        generatorName: name,
        yoName: name.replace('generator-', ''),
      }),
    };

    let babelOptions = {
      skipInstall,
      config: {
        presets: ['es2015', 'stage-0'],
        sourceMaps: true,
      },
    };

    let eslintOptions = {
      skipInstall,
      skipWelcomeMessage,
      extends: 'eslint:recommended',
      plugins: [],
      envs: ['es6', 'node'],
      babel: true,
      testDir: 'test',
      testFramework: 'mocha',
      ignore: ['generators'],
      disableRules: [],
    };

    let testOptions = {
      skipInstall,
      skipWelcomeMessage,
      testDir: 'test',
      coverage: false,
      helper: true,
    };

    this.composeWith(
      'esnext-project:app',
      {options: projectOptions},
      {local: require.resolve('generator-esnext-project/generators/app')}
    );

    this.composeWith(
      'babel:app',
      {options: babelOptions},
      {local: require.resolve('generator-babel/generators/app')}
    );

    this.composeWith(
      'eslint-config:app',
      {options: eslintOptions},
      {local: require.resolve('generator-eslint-config/generators/app')}
    );

    this.composeWith(
      'esnext-test:app',
      {options: testOptions},
      {local: require.resolve('generator-esnext-test/generators/app')}
    );

    this.composeWith(
      'generator:subgenerator',
      {arguments: ['app'], options: {generatorName: name}},
      {local: require.resolve('../subgenerator')}
    );
  }

  writing() {
    let pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    pkg.scripts = pkg.scripts || {};
    requiredScripts.forEach((script) => {
      pkg.scripts[script] = pkg.scripts[script] || ownPackage.scripts[script];
    });

    pkg.main = 'generators/app/index.js';
    pkg['jsnext:main'] = 'src/app/index.js';

    pkg.files = pkg.files || [];
    ['src', 'generators'].forEach((dir) => {
      if (pkg.files.indexOf(dir) < 0) { pkg.files.push(dir); }
    });

    pkg.keywords = pkg.keywords || [];
    ['yeoman', 'yeoman-generator'].forEach((keyword) => {
      if (pkg.keywords.indexOf(keyword) < 0) { pkg.keywords.push(keyword); }
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    let gitignoreContent = this.fs.read('.gitignore', {defaults: ''});
    this.fs.write(
      this.destinationPath('.gitignore'),
      gitignoreContent.replace(/(\s*)$/, (match) => `\ngenerators${match}`)
    );
  }

  install() {
    if (this.options.skipInstall) { return; }

    let dependencies = [
      'yeoman-generator',
      'chalk',
      'yosay',
    ];

    let devDependencies = [
      'yeoman-assert',
      'yeoman-test',
      'copyfiles',
      'rimraf',
    ];

    this.npmInstall(devDependencies, {saveDev: true});
    this.npmInstall(dependencies, {save: true});
  }
};
