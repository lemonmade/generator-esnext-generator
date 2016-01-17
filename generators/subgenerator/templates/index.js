import {Base as BaseGenerator} from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

module.exports = class <%= generatorClassName %> extends BaseGenerator {
  constructor(...args) {
    super(...args);

    this.option('someOption', {
      type: Boolean,
      required: false,
      desc: 'Would you like to enable this option?',
    });
  }

  initializing() {
    let {options} = this;

    this.props = {
      someOption: options.someOption,
    };
  }

  prompting() {
    let {props, options} = this;
    let done = this.async();

    if (!options.skipWelcomeMessage) {
      this.log(yosay(`Welcome to the ${chalk.red('<%= yoName %>')} generator!`));
    }

    let prompts = [
      {
        type: 'confirm',
        name: 'somePrompt',
        message: 'Would you like to enable this option?',
        default: true,
      },
    ];

    this.prompt(prompts, (newProps) => {
      this.props = {...props, ...newProps};
      done();
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }
};
