// ====================
//      IMPORTS
// ====================
import fs from 'fs';
import inquirer from 'inquirer';
import { MainMenu, DeptMenu, EmpMenu, RoleMenu } from './libs/menus.cjs';

// Following 2 lines allow a .mjs file to use Node's require(), instead of ES6's import
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Dept, Emp, Role } = require('./models');

// ====================
//   QUERY BLUEPRINTS
// ====================

// Blueprint function that builds a query which returns all data for that table
async function searchInfo(table, attributes, includes) {
  const searchData = await table.findAll({
    attributes: attributes,
    include: includes
  });
  const dataClean = searchData.map((obj) => obj.get({ plain: true }));
  return console.table(dataClean);
};

// ====================
//    MAIN FUNCTIONS
// ====================

// -- START UP --
// Main body function that takes you to the Main Menu of the app
async function startup() {
    inquirer.prompt(MainMenu)
    .then((answers) => {

        // Convert user input into plain string
        let theAnswer = (Object.values(answers))[0];

        // If user choses Quit, app is terminated
        if (theAnswer === 'Quit') { 
          return console.log('Good bye');
        };
        
        // Takes user to the Department Menu
        if (theAnswer === 'Departments') {
          gotoDeptMenu();
        };
        
        // Takes user to the Employee Menu
        if (theAnswer === 'Employees') {
          gotoEmpMenu();
        };

        // Takes user to the Roles Menu
        if (theAnswer === 'Roles') {
          gotoRoleMenu();
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

// -- DEPARTMENT MENU --
// =====================
function gotoDeptMenu() {
  inquirer.prompt(DeptMenu)
  .then(async(answers) => {
    let theAnswer = (Object.values(answers))[0];

    if (theAnswer === 'Return to Main Menu') { startup() };

    // --- VIEW ALL
    if (theAnswer === 'View All') { 
      let searchArea = Dept;
      let searchAtt = [ ['name','Departments'] ];
      await searchInfo(searchArea, searchAtt);
      gotoDeptMenu();
    };

    // --- MAKE NEW
    if (theAnswer === 'Make New') { 

      gotoDeptMenu();
    };

    // --- EDIT
    if (theAnswer === 'Edit') { 

      gotoDeptMenu();
    };
    
    // --- DELETE
    if (theAnswer === 'Delete') { 

      gotoDeptMenu();
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

// -- EMPLOYEES MENU --
// ====================
function gotoEmpMenu() {
  inquirer.prompt(EmpMenu)
  .then(async(answers) => {
    let theAnswer = (Object.values(answers))[0];
  
    if (theAnswer === 'Return to Main Menu') { startup() };

    // --- VIEW ALL
    if (theAnswer === 'View All') { 
      let searchArea = Emp;
      let searchAtt = [ ['first_name','First Name'], ['last_name','Last Name'] ];
      let searchIncl = [
        { model: Role, as: 'Company Role', attributes: [ 'title' ] }, 
        { model: Emp, as: 'Manager', attributes: [ ['first_name', 'First Name'], ['last_name','Last Name'] ] }
      ];
      await searchInfo(searchArea, searchAtt, searchIncl);
      gotoEmpMenu();
    };

    // --- HIRE NEW
    if (theAnswer === 'Hire New') {
      gotoEmpMenu();
    };

    // --- EDIT
    if (theAnswer === 'Edit') { 

      gotoEmpMenu();
    };

    // --- FIRE
    if (theAnswer === 'Fire') { 

      gotoEmpMenu();
    };
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("ERROR EMP1: Prompt couldn't be rendered in the current environment");
    } else {
      console.log("ERROR EMP2: Something else went wrong in Emp Menu");
    }
  });
};

// -- ROLES MENU --
// =====================
function gotoRoleMenu() {
  inquirer.prompt(DeptMenu)
  .then(async(answers) => {
    let theAnswer = (Object.values(answers))[0];

    if (theAnswer === 'Return to Main Menu') { startup() };

    // --- VIEW ALL
    if (theAnswer === 'View All') { 
      let searchArea = Role;
      let searchAtt = [ 'title', 'salary' ];
      let searchIncl = [{ model: Dept, as: 'Department', attributes: [ ['name','Dept'] ] }];
      await searchInfo(searchArea, searchAtt, searchIncl);
      gotoRoleMenu();
    };

    // --- ADD NEW
    if (theAnswer === 'Add New') { 

      gotoRoleMenu();
    };

    // --- EDIT
    if (theAnswer === 'Edit') { 

      gotoRoleMenu();
    };

    // --- DELETE
    if (theAnswer === 'Delete') { 

      gotoRoleMenu();
    };
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("ERROR ROLE1: Prompt couldn't be rendered in the current environment");
    } else {
      console.log("ERROR ROLE2: Something else went wrong in Role Menu");
    }
  });
};

startup();