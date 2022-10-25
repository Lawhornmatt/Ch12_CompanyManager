const { Dept } = require('../models');

const deptData = [
  {
    name: "Marketing",
  },
  {
    name: "Production",
  },
  {
    name: "Upper Management",
  },
  {
    name: "Quality Assurance",
  },
];

const seedDept = () => Dept.bulkCreate(deptData);

module.exports = seedDept;
