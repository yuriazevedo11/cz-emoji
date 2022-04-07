const fs = require('fs');
const path = require('path');
const util = require('util');

const readPkg = require('read-pkg-up');
const homeDir = require('home-dir');

const commitTypes = require('../lib/types.json');

const defaultConfig = {
  types: commitTypes,
  symbol: true,
  skipQuestions: [''],
  subjectMaxLength: 75,
};

async function getConfig() {
  const loadConfig = (obj) => obj && obj.config && obj.config['cz-emoji'];

  const readFromPkg = async () =>
    readPkg().then((res) => (res ? loadConfig(res.packageJson) : null));

  const readFromCzrc = (dir) =>
    util
      .promisify(fs.readFile)(dir, 'utf8')
      .then(JSON.parse, () => null)
      .then(loadConfig);

  const readFromLocalCzrc = () =>
    readPkg().then((res) =>
      res && res.path ? readFromCzrc(`${path.dirname(res.path)}/.czrc`) : null,
    );

  const readFromGlobalCzrc = () => readFromCzrc(homeDir('.czrc'));

  const config =
    (await readFromPkg()) ||
    (await readFromLocalCzrc()) ||
    (await readFromGlobalCzrc());

  return { ...defaultConfig, ...config };
}

module.exports = getConfig;
