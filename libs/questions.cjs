// This could be acheived with a 'when' but I like this readability better
// Also could use type: confirm but I think list still has better UX
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
        choices: ['View All', 'Make New', 'Edit', 'Delete', 'Return to Main Menu'],
    },
];

const EmpMenu = [
    {
        type: 'list',
        name: 'View Info:',
        message: 'What would you like to do with Employee Data?',
        choices: ['View All', 'Add New', 'Edit', 'Delete', 'Return to Main Menu'],
    },
];

module.exports = { 
    MainMenu, 
};