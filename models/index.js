// import models
const Dept = require('./Dept');
const Emp = require('./Emp');
const Role = require('./Role');

Role.belongsTo(Dept, {
  as: 'Department',
  foreignKey: 'department_id',
});

Emp.belongsTo(Role, {
  as: 'Company Role',
  foreignKey: 'role_id',
});

Emp.belongsTo(Emp, {
  as: 'Manager',
  foreignKey: 'manager_id',
});

module.exports = {
  Dept,
  Emp,
  Role,
};
