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

// SEARCH INFO
// Blueprint function that builds a query which returns all data for that table
async function searchInfo(table, attributes, includes) {
  const searchData = await table.findAll({
    attributes: attributes,
    include: includes
  });
  const dataClean = searchData.map((obj) => obj.get({ plain: true }));
  return dataClean;
};

// MAKE NEW
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

// PICK ENTITY TO CHANGE
// Blueprint function that builds a Inquirer prompt for renaming any entity
function pickToChange(entity, choices) {
  let PickEntity = [
    {
        type: 'list',
        name: `chosenEntity`,
        message: `Pick the ${entity} to change.`,
        choices: choices,
    },
  ];
  return inquirer.prompt(PickEntity).then((answer) => Object.values(answer)[0] );
};

// INPUT NEW NAME
// Blueprint function that builds a Inquirer prompt for typing in the new entity name
function typeUpdatedEntity(entity) {
  if (entity == 'employee') {
    let NewName = [
      {
          type: 'input',
          name: `newFirstName`,
          message: `Type in the updated ${entity} first name.`,
      },
      {
          type: 'input',
          name: `newLastName`,
          message: `Type in the updated ${entity} last name.`,
      },
    ];
    return inquirer.prompt(NewName).then((answer) => Object.values(answer) );
  } else if (entity == 'employee role') {
    let NewName = [
      {
          type: 'input',
          name: `newEmpRole`,
          message: `Type in the index of the ${entity} to update to.
          Only a single number character will be accepted.`,
      },
    ]
    return inquirer.prompt(NewName).then((answer) => Object.values(answer)[0] );
  } else {
    let NewName = [
      {
          type: 'input',
          name: `newEntityName`,
          message: `Type in the updated ${entity} name.`,
      },
    ]
    return inquirer.prompt(NewName).then((answer) => Object.values(answer)[0] );
  }
}

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
    let arrDept = deptData.map((obj) => obj.Departments);
    arrDept.unshift('~Return Previous Menu~');

    // --- VIEW ALL DEPARTMENTS
    if (theAnswer === 'View All') { 
      console.log('The Current Departments: ')
      console.table(deptData);
      gotoDeptMenu();
    };

    // --- MAKE NEW DEPARTMENT
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

    // --- EDIT DEPARTMENT
    if (theAnswer === 'Edit') { 
      console.log('The Current Departments: ');
      console.table(deptData);

      let deptChoice;

      await pickToChange('department', arrDept)
      .then((answer) => {
        deptChoice = arrDept.indexOf(answer);
      });

      if (deptChoice == 0) { return gotoDeptMenu() }
    
      await typeUpdatedEntity('department')
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

    // --- DELETE DEPARTMENT
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
    // Format and tidy up that Employee data
    let tidyEmpData = empData.map((obj) => {
        
      let theTitle = obj['Company Role'].title;
      let updatedObj1 = Object.assign({}, obj, {['Company Role']:theTitle});

      let updatedObj2 = {
        Name: `${updatedObj1['First Name']} ${updatedObj1['Last Name']}`,
        'Company Role': updatedObj1['Company Role'],
        Manager: updatedObj1.Manager,
      };

      if (obj.Manager) {
        let theManagerName = `${obj.Manager['First Name']} ${obj.Manager['Last Name']}`;
        let updatedObj3 = Object.assign({}, updatedObj2, {Manager:theManagerName});
        return updatedObj3;
      } else {
        return updatedObj2;
      }
    }) 


    let arrEmp = empData.map((obj) => (obj['First Name']+' '+obj['Last Name']));
    arrEmp.unshift('~Return Previous Menu~');

    // --- VIEW ALL EMPLOYEES
    if (theAnswer === 'View All') {
      console.log('The Current Employees: ')
      console.table(tidyEmpData);
      gotoEmpMenu();
    };

    // --- VIEW ALL (RAW)
    if (theAnswer === 'Raw Emp Db Data') {
      console.table(empData);
      gotoEmpMenu();
    };

    // --- HIRE NEW
    if (theAnswer === 'Hire New') {
      gotoEmpMenu();
    };

    // --- CHANGE EMPLOYEE NAME
    if (theAnswer === 'Change Name') { 
      let empChoice;

      await pickToChange('employee',arrEmp)
      .then((answer) => {
        empChoice = arrEmp.indexOf(answer);
      });

      if (empChoice == 0) { return gotoEmpMenu() }
      
      await typeUpdatedEntity('employee')
      .then(async(answerArr) => {
        try{
          const updateEmpName = await Emp.update(
            {
              first_name: answerArr[0],
              last_name: answerArr[1],
            },
            {
              where:  { id: empChoice}
            }
          );
          console.assert(updateEmpName, 'Update Emp Name Error: updateEmpName failed')
        } catch (err) {
          console.log(err);
        }
      })
      .then((result) => { gotoEmpMenu() });
    };

    // --- EDIT EMPLOYEE ROLE
    if (theAnswer === 'Edit Role') { 
      let empChoice;

      await pickToChange('employee',arrEmp)
      .then((answer) => {
        empChoice = arrEmp.indexOf(answer);
      });

      if (empChoice == 0) { return gotoEmpMenu() }

      // Hold onto Role Data
      let searchArea = Role;
      let searchAtt = [ 'title', 'salary' ];
      let searchIncl = [{ model: Dept, as: 'Department', attributes: [ ['name','Dept'] ] }];
      let roleData = await searchInfo(searchArea, searchAtt, searchIncl);
      console.log('The Current Roles: ')
      console.table(roleData);

      await typeUpdatedEntity('employee role')
      .then(async(rollAnswer) => {
        if (!/^[0-9]$/.test(rollAnswer)) {
          return console.log("User Error: Only input updated role index as a single whole integer")
        }
        if (rollAnswer > roleData.length - 1) {
          return console.log("User Error: That index is not found")
        }
        let bumpRoleID = (Number(rollAnswer) + 1);
        // console.log(bumpRoleID);
        try{
          const updateEmpRole = await Emp.update(
            {
              role_id: bumpRoleID,
            },
            {
              where:  { id: empChoice}
            }
          );
          console.assert(updateEmpRole, 'Update Emp Role Error: updateEmpRole failed')
        } catch (err) {
          console.log(err);
        }
      })
      .then((result) => { gotoEmpMenu() });
    };

    // --- FIRE EMPLOYEE
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

    // --- VIEW ALL ROLES
    if (theAnswer === 'View All') { 
      console.log('The Current Roles: ')
      console.table(roleData);
      gotoRoleMenu();
    };

    // --- ADD NEW ROLE
    if (theAnswer === 'Add New') { 

      gotoRoleMenu();
    };

    // --- EDIT ROLE
    if (theAnswer === 'Edit') { 

      gotoRoleMenu();
    };

    // --- DELETE ROLE
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