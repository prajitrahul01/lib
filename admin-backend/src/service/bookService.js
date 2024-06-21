const Book = require('../models/book');
const sequelize = require('../config/db.js');
const {  DataTypes, QueryTypes } = require('sequelize');

// Service function to get all books
async function getBooksService() {
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
}

// Service function to get a book by ID
async function getBookByIdService(id) {
  try {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');
    return book;
  } catch (error) {
    throw new Error('Error fetching book: ' + error.message);
  }
}

// Service function to create a new book
async function createBookService(bookData) {
  try {
    const book = await Book.create(bookData);
    return book;
  } catch (error) {
    throw new Error('Error creating book: ' + error.message);
  }
}

// Service function to update a book by ID
async function updateBookService(id, newData) {
  try {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');

    await book.update(newData);

    return book;
  } catch (error) {
    throw new Error('Error updating book: ' + error.message);
  }
}

// Service function to delete a book by ID
async function deleteBookService(id) {
  try {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');

    await book.destroy();

    return 'Book deleted successfully';
  } catch (error) {
    throw new Error('Error deleting book: ' + error.message);
  }
}

async function bulkCreateBooksService(books) {
    try {
        const createdBooks = await Book.bulkCreate(books);
        return createdBooks;
    } catch (error) {
        throw new Error("Error creating books: " + error.message);
    }
}

async function getBookCountsByMonthService() {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start date of the last year
  const lastYearStartDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), 1);
  // const query = 'Select * from book';
  // const query = `
  //   SELECT
  //   TO_CHAR("createdAt", 'Month') AS month,
  //     COUNT(*) AS count
  //   FROM
  //     book
  //   WHERE
  //     "createdAt" >= :lastYearStartDate
  //   GROUP BY
  //     month
  //   ORDER BY
  //     FIELD(month, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
  // `;
  
  // const bookCounts = await sequelize.query(query, {
  //   replacements: { lastYearStartDate },
  //   type: QueryTypes.SELECT
  // });
  const bookCounts = await sequelize.query(
    `SELECT
        TO_CHAR("createdAt", 'Month') AS month_name,
        COUNT(*) AS count
      FROM
        book
      WHERE
        "createdAt" >= :lastYearStartDate
      GROUP BY
        "createdAt", month_name
      ORDER BY
        EXTRACT(MONTH FROM "createdAt")`,
    {
      replacements: { lastYearStartDate },
      type: QueryTypes.SELECT
    }
  );
  const monthsOfYear = Array.from({ length: 12 }, (_, index) => ({
    month_name: new Date(currentDate.getFullYear(), index, 1).toLocaleString('en-US', { month: 'long' }),
    count: 0
  }));

  // Update counts for existing months
  for (const item of bookCounts) {
    const monthIndex = monthsOfYear.findIndex(month => month.month_name === item.month_name.trim());
    if (monthIndex !== -1) {
      monthsOfYear[monthIndex].count = parseInt(item.count, 10);
    }
  }

  const mockLineData = [{
    id: "library",
    color: "hsl(240, 70%, 50%)",
    data: monthsOfYear.map(item => ({
      x: item.month_name,
      y: parseInt(item.count, 10)
    }))
  }];
  
  // return monthsOfYear.map(item => ({
  //   x: item.month_name,
  //   y: item.count
  // }));

  return mockLineData;
  // return bookCounts.map(item => ({
  //   x: item.month_name,
  //   y: item.count
  // }));
}

module.exports = {
  getBooksService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService,
  bulkCreateBooksService,
  getBookCountsByMonthService
};
