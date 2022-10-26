import fs from 'fs';
import inquirer from 'inquirer';
import { MainMenu, DeptMenu } from './libs/questions.cjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Dept, Emp, Role } = require('./models');

async function searchInfo(keyword, attributes, includes) {
  const searchData = await keyword.findAll({
    attributes: attributes,
    include: includes
  });
  const dataClean = searchData.map((obj) => obj.get({ plain: true }));
  return console.table(dataClean);
};

async function startup() {
    inquirer.prompt(MainMenu)
    .then((answers) => {

        // Convert user input into plain string
        let theAnswer = (Object.values(answers))[0];

        // If user choses Quit, app is terminated
        if (theAnswer === 'Quit') { return console.log('Good bye') };
        
        // -- DEPARTMENTS --
        if (theAnswer === 'Departments') {

          inquirer.prompt(DeptMenu)
            .then((answers) => {
              let theAnswer = (Object.values(answers))[0];
      
              if (theAnswer === 'Return to Main Menu') { startup() };

              if (theAnswer === 'View All') { 
                let searchArea = Dept;
                let searchAtt = [ ['name','Departments'] ];
                searchInfo(searchArea, searchAtt);
              };
            })
            .catch((error) => {
              if (error.isTtyError) {
                console.log("ERROR DEPT1: Prompt couldn't be rendered in the current environment");
              } else {
                console.log("ERROR DEPT2: Something else went wrong in Dept Menu");
              }
          });
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