'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _yeomanGenerator = require('yeoman-generator');

var _inquirerNpmName = require('inquirer-npm-name');

var _inquirerNpmName2 = _interopRequireDefault(_inquirerNpmName);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeGeneratorName(name) {
  name = _lodash2.default.kebabCase(name);
  return name.indexOf('generator-') === 0 ? name : 'generator-' + name;
}

var requiredScripts = ['clean', 'check', 'copy', 'build:lib', 'build', 'preversion', 'version', 'postversion', 'prepublish'];

module.exports = function (_BaseGenerator) {
  _inherits(ESNextGeneratorGenerator, _BaseGenerator);

  function ESNextGeneratorGenerator() {
    _classCallCheck(this, ESNextGeneratorGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ESNextGeneratorGenerator).apply(this, arguments));
  }

  _createClass(ESNextGeneratorGenerator, [{
    key: 'initializing',
    value: function initializing() {
      this.props = {};
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      var done = this.async();

      if (!this.options.skipWelcomeMessage) {
        this.log((0, _yosay2.default)('Welcome to the ' + _chalk2.default.red('esnext-generator') + ' generator!'));
      }

      (0, _inquirerNpmName2.default)({
        name: 'name',
        message: 'Your generator name',
        filter: makeGeneratorName,
        default: makeGeneratorName(_path2.default.basename(_process2.default.cwd())),
        validate: function validate(str) {
          return str.length > 0;
        }
      }, this, function (name) {
        _this2.props.name = name;
        done();
      });
    }
  }, {
    key: 'default',
    value: function _default() {
      var name = this.props.name;

      var readmeTemplate = _lodash2.default.template(this.fs.read(this.templatePath('README.md')));
      var skipInstall = this.options.skipInstall;
      var skipWelcomeMessage = true;

      var projectOptions = {
        name: name,
        eslint: false,
        editorconfig: true,
        travis: true,
        coveralls: false,
        skipInstall: skipInstall,
        skipWelcomeMessage: skipWelcomeMessage,
        readme: readmeTemplate({
          generatorName: name,
          yoName: name.replace('generator-', '')
        })
      };

      var babelOptions = {
        skipInstall: skipInstall,
        config: {
          presets: ['es2015', 'stage-0'],
          sourceMaps: true
        }
      };

      var eslintOptions = {
        skipInstall: skipInstall,
        skipWelcomeMessage: skipWelcomeMessage,
        extends: 'eslint:recommended',
        plugins: [],
        envs: ['es6', 'node'],
        babel: true,
        testDir: 'test',
        testFramework: 'mocha',
        ignore: ['generators'],
        disableRules: []
      };

      var testOptions = {
        skipInstall: skipInstall,
        skipWelcomeMessage: skipWelcomeMessage,
        testDir: 'test',
        coverage: false,
        helper: true
      };

      this.composeWith('esnext-project:app', { options: projectOptions }, { local: require.resolve('generator-esnext-project/generators/app') });

      this.composeWith('babel:app', { options: babelOptions }, { local: require.resolve('generator-babel/generators/app') });

      this.composeWith('eslint-config:app', { options: eslintOptions }, { local: require.resolve('generator-eslint-config/generators/app') });

      this.composeWith('esnext-test:app', { options: testOptions }, { local: require.resolve('generator-esnext-test/generators/app') });

      this.composeWith('generator:subgenerator', { arguments: ['app'], options: { generatorName: name } }, { local: require.resolve('../subgenerator') });
    }
  }, {
    key: 'writing',
    value: function writing() {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      pkg.scripts = pkg.scripts || {};
      requiredScripts.forEach(function (script) {
        pkg.scripts[script] = pkg.scripts[script] || _package2.default.scripts[script];
      });

      pkg.main = 'generators/app/index.js';
      pkg['jsnext:main'] = 'src/app/index.js';

      pkg.files = pkg.files || [];
      ['src', 'generators'].forEach(function (dir) {
        if (pkg.files.indexOf(dir) < 0) {
          pkg.files.push(dir);
        }
      });

      pkg.keywords = pkg.keywords || [];
      ['yeoman', 'yeoman-generator'].forEach(function (keyword) {
        if (pkg.keywords.indexOf(keyword) < 0) {
          pkg.keywords.push(keyword);
        }
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);

      var gitignoreContent = this.fs.read('.gitignore', { defaults: '' });
      this.fs.write(this.destinationPath('.gitignore'), gitignoreContent.replace(/(\s*)$/, function (match) {
        return '\ngenerators' + match;
      }));
    }
  }, {
    key: 'install',
    value: function install() {
      if (this.options.skipInstall) {
        return;
      }

      var dependencies = ['yeoman-generator', 'chalk', 'yosay'];

      var devDependencies = ['yeoman-assert', 'yeoman-test', 'copyfiles', 'rimraf'];

      this.npmInstall(devDependencies, { saveDev: true });
      this.npmInstall(dependencies, { save: true });
    }
  }]);

  return ESNextGeneratorGenerator;
}(_yeomanGenerator.Base);