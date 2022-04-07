const getConfig = require('./utils/getConfig');
const createQuestions = require('./utils/createQuestions');
const { formatMessage } = require('./utils/format');

/**
 * Export an object containing a `prompter` method. This object is used by `commitizen`.
 *
 * @type {Object}
 */
module.exports = {
  prompter(cz, commit) {
    cz.prompt.registerPrompt(
      'autocomplete',
      require('inquirer-autocomplete-prompt'),
    );

    cz.prompt.registerPrompt(
      'maxlength-input',
      require('inquirer-maxlength-input-prompt'),
    );

    getConfig()
      .then(createQuestions)
      .then(cz.prompt)
      .then(formatMessage)
      .then(commit);
  },
};
