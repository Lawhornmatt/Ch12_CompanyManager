const { Emp } = require('../models');

const empData = [
  { //1
    first_name: 'Hugo',
    last_name: 'Bossman',
    role_id: 3,
  },
  { //2
    first_name: 'Jimmy',
    last_name: 'Doofus',
    role_id: 1,
    manager_id: 1,
  },
  { //3
    first_name: 'Kyle',
    last_name: 'Hacko',
    role_id: 5,
    manager_id: 1,
  },
  {
    first_name: 'John',
    last_name: 'Testy',
    role_id: 4,
    manager_id: 3,
  },
  {
    first_name: 'Rob',
    last_name: 'Codemunki',
    role_id: 2,
    manager_id: 3,
  },
  {
    first_name: 'Lucy',
    last_name: 'Scripty',
    role_id: 2,
    manager_id: 3,
  },
  {
    first_name: 'Esmeralda',
    last_name: 'Jayess',
    role_id: 4,
    manager_id: 3,
  },
  {
    first_name: 'Mary',
    last_name: 'Hypeman',
    role_id: 1,
    manager_id: 1,
  },
];

const seedEmp = () => Emp.bulkCreate(empData);

module.exports = seedEmp;
