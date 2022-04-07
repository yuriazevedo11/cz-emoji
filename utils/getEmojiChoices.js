const pad = require('pad');

function getEmojiChoices({ types, symbol }) {
  const maxNameLength = types.reduce(
    (maxLength, type) =>
      type.name.length > maxLength ? type.name.length : maxLength,
    0,
  );

  return types.map((choice) => ({
    name: `${pad(choice.name, maxNameLength)}  ${choice.emoji}  ${
      choice.description
    }`,
    value: {
      emoji: symbol ? `${choice.emoji} ` : choice.code,
      name: choice.name,
    },
    code: choice.code,
  }));
}

module.exports = getEmojiChoices;
