const { Role } = require('../models');

const roleData = [
  { //1
    title: 'Salesman',
    salary: '$2000/wk',
    department_id: 1,
  },
  { //2
    title: 'Junior Dev',
    salary: '$1900/wk',
    department_id: 2,
  },
  { //3
    title: 'CEO',
    salary: '$5000/wk',
    department_id: 3,
  },
  { //4
    title: 'Tester',
    salary: '$1400/wk',
    department_id: 4,
  },
  { //5
    title: 'Senior Dev',
    salary: '$2500/wk',
    department_id: 2,
  },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;
