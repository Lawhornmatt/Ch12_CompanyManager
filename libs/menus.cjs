const MainMenu = [
    {
        type: 'list',
        name: 'View Info:',
        message: 'What info do you want to see?',
        choices: ['Departments', 'Employees', 'Roles', 'Quit'],
    },
];

const DeptMenu = [
    {
        type: 'list',
        name: 'View Info:',
        message: 'What would you like to do with Departments?',
        choices: ['View All', 'Make New', 'Edit', 'Delete', '~Return to Main Menu~'],
    },
];

const EmpMenu = [
    {
        type: 'list',
        name: 'View Info:',
        message: 'What would you like to do with Employee Data?',
        choices: ['View All', 'Raw Emp Db Data', 'Hire New', 'Change Name', 'Edit Role', 'Fire', '~Return to Main Menu~'],
    },
];

const RoleMenu = [
    {
        type: 'list',
        name: 'View Info:',
        message: 'What would you like to do with Role Data?',
        choices: ['View All', 'Add New', 'Edit', 'Delete', '~Return to Main Menu~'],
    },
];

module.exports = { 
    MainMenu, 
    DeptMenu,
    EmpMenu,
    RoleMenu
};