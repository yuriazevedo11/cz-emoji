const truncate = require('cli-truncate');
const wrap = require('wrap-ansi');

function formatScope(scope) {
  return scope ? `(${scope})` : '';
}

function formatHead({ type, scope, subject }) {
  const prelude = `${type.emoji} ${type.name}${formatScope(scope)}:`;
  return `${prelude} ${subject}`;
}

function formatIssues(issues) {
  return issues
    ? 'Closes ' + (issues.match(/#\d+/g) || []).join(', closes ')
    : '';
}

/**
 * Format the git commit message from given answers.
 *
 * @param {Object} answers Answers provide by `inquirer.js`
 * @return {String} Formated git commit message
 */
function formatMessage(answers) {
  const { columns } = process.stdout;

  const head = truncate(answers.subject, columns);
  const body = wrap(answers.body || '', columns);
  // TODO format breaking change
  const footer = formatIssues(answers.issues);

  return [head, body, footer].filter(Boolean).join('\n\n').trim();
}

module.exports = {
  formatHead,
  formatMessage,
};
