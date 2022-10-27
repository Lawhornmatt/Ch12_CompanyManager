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
//   BLUEPRINTS
// ====================

// Blueprint function that builds a query which returns all data for that table
async function searchInfo(table, attributes, includes) {
  const searchData = await table.findAll({
    attributes: attributes,
    include: includes
  });
  const dataClean = searchData.map((obj) => obj.get({ plain: true }));
  return dataClean;
};

// Blueprint function that builds a Inquirer prompt making a new Role/Dept/Employee
function makeNew(tableName) {

  let theMessage;

  // Becuase of awkward English, we make a seperate sentence for Employees
  if(tableName == 'employee'){
    theMessage = `What is the name of the new ${tableName}?`;
  } else {
    theMessage = `What is the new ${tableName} called?`;
  };

  // Construct our Inquirer prompt
  let MakeNew = [
    {
        type: 'input',
        name: `new-${tableName}`,
        message: theMessage,
    },
  ];

  // Return back a prompt with a proper formatted answer
  return inquirer.prompt(MakeNew).then((answer) => Object.values(answer)[0] );
};

// ====================
//    MAIN FUNCTIONS
// ====================

// -- START UP: MAIN MENU --
// Main body function that takes you to the Main Menu of the app
function startup() {
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

    if (theAnswer === '~Return to Main Menu~') { startup() };

    // Hold onto Dept Data
    let searchArea = Dept;
    let searchAtt = [ ['name','Departments'] ];
    let deptData = await searchInfo(searchArea, searchAtt);

    // --- VIEW ALL
    if (theAnswer === 'View All') { 
      console.table(deptData);
      gotoDeptMenu();
    };

    // --- MAKE NEW
    if (theAnswer === 'Make New') { 
      console.log('The Current Departments: ');
      console.table(deptData);

      makeNew('department').then(async(answer) => {
          try{
            const newDeptData = await Dept.create(
              {
              name: answer,
              }
            );
            console.assert(newDeptData, 'MakeNew Department Error: newDeptData failed')
          } catch (err) {
            console.log(err);
          }
        })
        .then((result) => { gotoDeptMenu() });
    };

    // --- EDIT
    if (theAnswer === 'Edit') { 
      console.log('The Current Departments: ');
      console.table(deptData);

      // Make an array of all dept titles for the PickDept prompt choices
      let arrDept = deptData.map((obj) => obj.Departments);
      // Provide a way for the user to back out of their choice
      arrDept.unshift('~Return Previous Menu~');

      let PickDept = [
        {
            type: 'list',
            name: `chosenDept`,
            message: `Pick the department to rename.`,
            choices: arrDept,
        },
      ];

      let deptChoice;

      await inquirer.prompt(PickDept)
      .then((answer) => {
        deptChoice = arrDept.indexOf(Object.values(answer)[0]);
        // Gives us the index of the user's chosen dept. 
        // NOTE: MySQL indexes the table starting at 1, unlike arrays starting at 0
        // CONT: So to get the chosen dept in the SQL table one must add 1
        // CONT: Coincidentally, unshifting an option to go backwards does this for us
      });

      if (deptChoice == 0) { return gotoDeptMenu() }

      let MakeEdit = [
        {
            type: 'input',
            name: `newDeptName`,
            message: `Type in a new department name.`,
        },
      ];
    
      await inquirer.prompt(MakeEdit)
      //  .then((answer) => console.log({ deptChoice }))
      .then((answer) => Object.values(answer)[0] )
      .then(async(cleanAnswer) => {
        try{
          const updateDept = await Dept.update(
            {
              name: cleanAnswer,
            },
            {
              where:  { id: deptChoice}
            }
          );
          console.assert(updateDept, 'Edit Department Error: updateDept failed')
        } catch (err) {
          console.log(err);
        }
      })
      .then((result) => { gotoDeptMenu() });
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
  
    if (theAnswer === '~Return to Main Menu~') { startup() };

    // Hold onto Employee Data
    let searchArea = Emp;
    let searchAtt = [ ['first_name','First Name'], ['last_name','Last Name'] ];
    let searchIncl = [
      { model: Role, as: 'Company Role', attributes: [ 'title' ] }, 
      { model: Emp, as: 'Manager', attributes: [ ['first_name', 'First Name'], ['last_name','Last Name'] ] }
    ];
    let empData = await searchInfo(searchArea, searchAtt, searchIncl);

    // --- VIEW ALL
    if (theAnswer === 'View All') { 
      console.table(empData);
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

    if (theAnswer === '~Return to Main Menu~') { startup() };

    // Hold onto Role Data
    let searchArea = Role;
    let searchAtt = [ 'title', 'salary' ];
    let searchIncl = [{ model: Dept, as: 'Department', attributes: [ ['name','Dept'] ] }];
    let roleData = await searchInfo(searchArea, searchAtt, searchIncl);

    // --- VIEW ALL
    if (theAnswer === 'View All') { 
      console.table(roleData);
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