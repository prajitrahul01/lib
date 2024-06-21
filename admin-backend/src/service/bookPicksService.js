const { Op, cast } = require('sequelize');
// const Book = require('../models/book');
// const Student = require('../models/user');
const sequelize = require('../config/db');
// const Book_Picks  = require('../models/bookpicks');
const {Book_Picks}  = require('../models/association');
const Student = require('../models/association');
const {Book} = require('../models/association');

async function consolidateGenre() {
  try {
    // Calculate start date (365 days ago) and end date (today)
    const cutoffDate = new Date(new Date() - 24 * 60 * 60 * 1000 * 365);

    // Retrieve the counts of students for each book ID within the specified time range
    const bookCounts = await Book_Picks.findAll({
      attributes: ['bookid', [sequelize.fn('COUNT', sequelize.col('studentid')), 'total']],
      where: {
        updatedAt: {
          [Op.gt]: cutoffDate
        }
      },
      group: ['bookid']
    });

    const bookCountsJSON = bookCounts.map(book => book.toJSON());
    
    const genreTotals = {};
    for (const { bookid, total } of bookCountsJSON) {
      
      // Retrieve the genre for the current book
      const book = await Book.findByPk(bookid);
      if (book) {
        const genre = book.bookGenre;
        
        // Accumulate the total count for the genre
        genreTotals[genre] = (genreTotals[genre] || 0) + parseInt(total, 10);
      }
    }
    // You can return both bookCounts and genres, or merge them as needed
    const formattedData = Object.entries(genreTotals).map(([genre, value], index) => ({
      id: genre,
      label: genre,
      value: value,
      // color: `hsl(${index * 60}, 70%, 50%)`, // Adjust color based on index
    }));

    return formattedData;
  } catch (error) {
    throw new Error('Error getting consolidated number of students by book genre: ' + error.message);
  }
}
  
module.exports = { consolidateGenre };