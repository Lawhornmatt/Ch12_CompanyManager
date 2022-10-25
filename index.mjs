import fs from 'fs';
import inquirer from 'inquirer';
import { READYorNOT, questions, intro, outro, nothanks, goahead } from './libs/questions.cjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Dept, Emp, Role } = require('./models');

async function startup() {
    inquirer.prompt(READYorNOT)
    .then((answers) => {

        // console.log(answers);
        let theAnswer = Object.values(answers);

        if (theAnswer == 'Quit') {
          return;
        } else {
          startup();
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log('Uh oh 1');
        } else {
          // Something else went wrong
          console.log('Uh oh 2');
        }
    });
};

startup();