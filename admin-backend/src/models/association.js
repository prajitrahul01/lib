// sequelize.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

// Import models
// const StudentModel = require('./user');
// const BooksModel = require('./book');
// const AdminModel = require('./admin');
// const BookPicksModel = require('./bookpicks.js');

const Student = require('./user');
const Book = require('./book');
const Admin = require('./admin');
const Book_Picks = require('./bookpicks.js');
const Login_History = require('./logging.js')
// Initialize models
// const Student = new StudentModel(sequelize, Sequelize);
// const Book = new BooksModel(sequelize, Sequelize);
// const Admin = new AdminModel(sequelize, Sequelize);
// const Book_Picks = new BookPicksModel(sequelize, Sequelize);

// Associations
// Book.hasMany(Book_Picks, { foreignKey: 'bookid' });
// Book_Picks.belongsTo(Book);
// Student.hasMany(Book_Picks, { foreignKey: 'studentid' });
// Book_Picks.belongsTo(Student);
Student.belongsToMany(Book, { through: Book_Picks, foreignKey: 'studentid' });
Book.belongsToMany(Student, { through: Book_Picks, foreignKey: 'bookid' });
// Student.hasMany(Login_History);
// Login_History.belongsTo(Student);

async function syncModels() {
    try {
      await sequelize.sync({ alter: true });
      console.log('All models synced successfully.');
    } catch (error) {
      console.error('Error syncing models:', error);
    }
}

// syncModels();

module.exports = {
  Student,
  Book,
  Admin,
  Book_Picks
};
