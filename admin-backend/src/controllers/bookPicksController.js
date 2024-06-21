const {consolidateGenre} = require("../service/bookPicksService");

const getConsolidatedGenre1 = async (req, res) => {
    try {
      const books = await consolidateGenre();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getConsolidatedGenre1
};