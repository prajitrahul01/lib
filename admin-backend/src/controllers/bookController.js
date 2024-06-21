const {
    getBooksService,
    getBookByIdService,
    createBookService,
    updateBookService,
    deleteBookService,
    bulkCreateBooksService,
    getBookCountsByMonthService
  } = require('../service/bookService');
  
  // Controller function to get all books
  const getBooks = async (req, res) => {
    try {
      const books = await getBooksService();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  async function bulkCreateBooks(req, res) {
    try {
        const books = req.body; // assuming request body contains an array of book objects
        const createdBooks = await bulkCreateBooksService(books);
        res.status(201).json(createdBooks);
    } catch (error) {
        console.error("Error creating books:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  // Controller function to get a book by ID
  const getBookById = async (req, res) => {
    try {
      const book = await getBookByIdService(req.params.id);
      res.json(book);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  // Controller function to create a new book
  const createBook = async (req, res) => {
    try {
      const newBook = await createBookService(req.body);
      res.json(newBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller function to update a book by ID
  const updateBook = async (req, res) => {
    try {
      const book = await updateBookService(req.params.id, req.body);
      res.json(book);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  // Controller function to delete a book by ID
  const deleteBook = async (req, res) => {
    try {
      const message = await deleteBookService(req.params.id);
      res.json({ message });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  const getBookCountsByMonth = async (req, res) => {
    try {
      const books = await getBookCountsByMonthService();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    bulkCreateBooks,
    getBookCountsByMonth
  };
  