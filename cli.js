#!/usr/bin/env node

'use strict';

const { author } = require('./package.json');
const chalk = require('chalk');
const boxen = require('boxen');
const exitHook = require('exit-hook');
const opn = require('opn');
const Select = require('./prompt-select');

const selectConfig = { pointer: chalk.dim.cyan('❯') };
const welcomeConfig = { 
  padding: 1, 
  borderColor: 'cyan', 
  borderStyle: 'round', 
  dimBorder: true, 
  margin: { bottom: 1 }
};


const choices = new Select.Choices([{
  name: 'Github',
  url: `https://${author.url}`
}, {
  name: 'Npm',
  url: `https://www.npmjs.com/~kronicker`
}, {
  name: 'LinkedIn',
  url: 'https://www.linkedin.com/in/tomazelic/'
}, {
  name: 'Mail',
  url: `mailto:${author.email}`
}, {
  name: 'Skype',
  url: `skype:toma_zelic?chat`
}, {
  name: 'Quit',
  action: () => process.exit()
}], selectConfig);

const name = chalk.blue.underline('Toma Zelic');
const gitHubAcc = chalk.dim('@kronicker');
const welcome = `
  Hey,
  I'm ${name} (also known as ${gitHubAcc})

  I'm a developer who enjoys learning, writing and playing with 
  javascript and converting fun ideas to code. 
`;

console.log(boxen(welcome, welcomeConfig));

const select = new Select({ choices });
select.on('select', onSelect);
exitHook(() => select.end());
select.ask();

function onSelect(choice) {
  if (choice.url) return opn(choice.url);
  return choice.action && choice.action(choice, select);
}
