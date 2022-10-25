// import models
const Dept = require('./Dept');
const Emp = require('./Emp');
const Role = require('./Role');

Role.belongsTo(Dept, {
  foreignKey: 'department_id',
});

Emp.belongsTo(Role, {
  foreignKey: 'role_id',
});

Emp.hasMany(Emp, {
  foreignKey: 'manager_id',
});

module.exports = {
  Dept,
  Emp,
  Role,
};
