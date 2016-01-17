'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yeomanGenerator = require('yeoman-generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_BaseGenerator) {
  _inherits(ESNextGeneratorSubgeneratorGenerator, _BaseGenerator);

  function ESNextGeneratorSubgeneratorGenerator() {
    var _Object$getPrototypeO;

    _classCallCheck(this, ESNextGeneratorSubgeneratorGenerator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ESNextGeneratorSubgeneratorGenerator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.argument('namespace', {
      type: String,
      required: true,
      description: 'Generator namespace'
    });

    _this.option('generatorName', {
      type: String,
      required: false,
      description: 'Generator name'
    });
    return _this;
  }

  _createClass(ESNextGeneratorSubgeneratorGenerator, [{
    key: 'writing',
    value: function writing() {
      var namespace = this.namespace;

      var generatorName = this.options.generatorName || this.fs.readJSON(this.destinationPath('package.json')).name;
      var generatorClassName = generatorName.replace('generator-', '').split('-').map(_lodash2.default.capitalize).join('');

      if (namespace !== 'app') {
        generatorClassName += _lodash2.default.capitalize(namespace);
      }
      generatorClassName += 'Generator';

      this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath(_path2.default.join('src', namespace, 'index.js')), { generatorName: generatorName, generatorClassName: generatorClassName, yoName: generatorName.replace('generator-', '') });

      this.fs.copy(this.templatePath('templates/**'), this.destinationPath(_path2.default.join('src', namespace, 'templates')));

      this.fs.copyTpl(this.templatePath('index.test.js'), this.destinationPath(_path2.default.join('test', 'src', namespace, 'index.test.js')), { namespace: namespace, generatorName: generatorName });
    }
  }]);

  return ESNextGeneratorSubgeneratorGenerator;
}(_yeomanGenerator.Base);