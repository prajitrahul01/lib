// bookpicks.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Book_Picks = sequelize.define('Book_Picks', {
  PickID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentid: {
    type: DataTypes.INTEGER
  },
  bookid: {
    type: DataTypes.INTEGER
  }
});

module.exports = Book_Picks;
