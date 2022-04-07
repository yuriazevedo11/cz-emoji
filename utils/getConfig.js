const fs = require('fs');
const path = require('path');
const util = require('util');

const findUp = require('find-up');
const homeDir = require('home-dir');

const commitTypes = require('../lib/types.json');

const readFile = util.promisify(fs.readFile);

function loadConfig(filename) {
  return readFile(filename, 'utf8')
    .then(JSON.parse)
    .then((obj) => obj && obj.config && obj.config['cz-emoji'])
    .catch(() => null);
}

function loadConfigUpwards(filename) {
  return findUp(filename).then(loadConfig);
}

async function getConfig() {
  const defaultConfig = {
    types: commitTypes,
    symbol: true,
    skipQuestions: [''],
    subjectMaxLength: 75,
  };

  const config =
    (await loadConfigUpwards('package.json')) ||
    (await loadConfigUpwards('.czrc')) ||
    (await loadConfig(path.join(homeDir(), '.czrc')));

  return { ...defaultConfig, ...config };
}

module.exports = getConfig;
