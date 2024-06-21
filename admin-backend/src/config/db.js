const Sequelize = require('sequelize');
// const { Pool } = require('pg');
const dotenv = require('dotenv');
const {DataTypes, Op} = Sequelize;

// dotenv.config({path: '../../.env'});
dotenv.config();


const sequelize = new Sequelize({
    database: process.env.databaseName,
    username: process.env.User,
    password: process.env.Pass,
    host: process.env.DBConfigLink,
    port: 5432,
    dialect: "postgres",
    define: {
      freezeTableName: true,
    },
    dialectOptions: {
    },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports=sequelize;