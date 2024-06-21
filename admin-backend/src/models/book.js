const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Book = sequelize.define('book', {
  bookid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookAuthor: {
    type: DataTypes.STRING,
  },
  bookGenre: {
    type: DataTypes.STRING,
  },
  bookSubject: {
    type: DataTypes.STRING,
  },
  bookPublisher: {
    type: DataTypes.STRING,
  },
  bookImg: {
    type: DataTypes.STRING,
  },
  bookUrl: {
    type: DataTypes.STRING,
  },
  bookType: {
    type: DataTypes.STRING,
  },
  bookDescription: {
    type: DataTypes.STRING,
  },
  bookPublishedDate: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    // allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    // allowNull: false,
  }
//   ,updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: Date.now()
//   }
}, {timestamps: false});
// Book.sync();
module.exports = Book;
