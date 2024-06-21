const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Student = sequelize.define('student', {
    studentid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },  
  studentname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentemail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  studentpassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentdepartment: {
    type: DataTypes.STRING,
    allowNull: false
  }
//   ,updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: Date.now()
//   }
});
// Student.findByEmail = async function(email) {
//     try {
//       const student = await Student.findOne({ where: { email } });
//       return student;
//     } catch (error) {
//       throw new Error('Error finding student by email: ' + error.message);
//     }
// };

module.exports=Student;