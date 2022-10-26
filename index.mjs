import fs from 'fs';
import inquirer from 'inquirer';
import { MainMenu, } from './libs/questions.cjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Dept, Emp, Role } = require('./models');

async function startup() {
    inquirer.prompt(MainMenu)
    .then((answers) => {

        // console.log(answers);
        let theAnswer = (Object.values(answers))[0];

        console.log(theAnswer);

        if (theAnswer === 'Quit') { return console.log('Good bye') };

        async function searchInfo(keyword, attributes, includes) {
          const searchData = await keyword.findAll({
            attributes: attributes,
            include: includes
          });
          const dataClean = searchData.map((obj) => obj.get({ plain: true }));
          return console.table(dataClean);
        };
        
        if (theAnswer === 'Departments') {
          let searchArea = Dept;
          let searchAtt = [ ['name','Departments'] ];
          searchInfo(searchArea, searchAtt);
        };
        
        if (theAnswer === 'Employees') {
          let searchArea = Emp;
          let searchAtt = [ ['first_name','First Name'], ['last_name','Last Name'] ];
          let searchIncl = [
            { model: Role, as: 'Company Role', attributes: [ 'title' ] }, 
            { model: Emp, as: 'Manager', attributes: [ ['first_name', 'First Name'], ['last_name','Last Name'] ] }
          ];
          searchInfo(searchArea, searchAtt, searchIncl);
        };
        
        if (theAnswer === 'Roles') {
          let searchArea = Role;
          let searchAtt = [ 'title', 'salary' ];
          let searchIncl = [{ model: Dept, as: 'Department', attributes: [ ['name','Dept'] ] }];
          searchInfo(searchArea, searchAtt, searchIncl);
        };
        
        

    })
    .catch((error) => {
        if (error.isTtyError) {
          console.log("ERROR1: Prompt couldn't be rendered in the current environment");
        } else {
          console.log("ERROR2: Something else went wrong in startup()");
        }
    });
};

startup();