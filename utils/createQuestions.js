const Fuse = require('fuse.js');

const { formatHead } = require('./format');
const getEmojiChoices = require('./getEmojiChoices');

/**
 * Create inquirer.js questions object trying to read `types` and `scopes` from the current project
 * `package.json` falling back to nice default :)
 *
 * @param {Object} config Result of the `getConfig` returned promise
 * @return {Array} Return an array of `inquirer.js` questions
 * @private
 */
function createQuestions(config) {
  const choices = getEmojiChoices(config);

  const fuzzy = new Fuse(choices, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: ['name', 'code'],
  });

  const questions = [
    {
      type: 'autocomplete',
      name: 'type',
      message:
        config.questions && config.questions.type
          ? config.questions.type
          : "Select the type of change you're committing:",
      source: (_, query) =>
        Promise.resolve(
          query
            ? fuzzy.search(query).map((response) => response.item)
            : choices,
        ),
    },
    {
      type: config.scopes ? 'list' : 'input',
      name: 'scope',
      message:
        config.questions && config.questions.scope
          ? config.questions.scope
          : 'Specify a scope:',
      choices:
        config.scopes && [{ name: '[none]', value: '' }].concat(config.scopes),
      when: !config.skipQuestions.includes('scope'),
    },
    {
      type: 'maxlength-input',
      name: 'subject',
      message:
        config.questions && config.questions.subject
          ? config.questions.subject
          : 'Write a short description:',
      maxLength: config.subjectMaxLength,
      filter: (subject, answers) => formatHead({ ...answers, subject }),
    },
    {
      type: 'input',
      name: 'body',
      message:
        config.questions && config.questions.body
          ? config.questions.body
          : 'Provide a longer description:',
      when: !config.skipQuestions.includes('body'),
    },
    // TODO BREAKING CHANGE commit
    {
      type: 'input',
      name: 'issues',
      message:
        config.questions && config.questions.issues
          ? config.questions.issues
          : 'List any issue closed (#1, #2, ...):',
      when: !config.skipQuestions.includes('issues'),
    },
  ];

  return questions;
}

module.exports = createQuestions;
