const { DataTypes } =require('sequelize');
const sequelize = require('../config/db.js');

 const Login_History = sequelize.define('Login_History', {
  LoginID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

module.exports=Login_History;