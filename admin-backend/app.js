const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createStudent, getStudentById, getStudents, bulkCreateStudents, updateStudent
,getStudentsByDepartment} = require('./src/controllers/studentController');
const { createAdmin, getAdmins, getAdminById, bulkCreateAdmins } = require('./src/controllers/adminController');
const {getBooks,getBookById,createBook,deleteBook,updateBook, bulkCreateBooks, getBookCountsByMonth}=require('./src/controllers/bookController');
const {getConsolidatedGenre1} = require('./src/controllers/bookPicksController');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials: true, orgin: 'http://localhost:3000'}))

// app.post('/login',LoginApi)
app.post('/register/student',createStudent)
app.post('/update/student',updateStudent)
app.post('/register/students',bulkCreateStudents)
app.get('/books',getBooks)
app.get('/book/:id',getBookById)
app.put('/book/:id',updateBook)
app.post('/book',createBook)
app.post('/register/books',bulkCreateBooks)
app.delete('/book/:id',deleteBook)
// app.get('/book',AuthenticateToken,getBook)
// app.get('/book/:id',AuthenticateToken,getBookById)
// app.put('/book/:id',AuthenticateToken,updateBook)
// app.post('/book',AuthenticateToken,createBook)
// app.delete('/book/:id',AuthenticateToken,deleteBook)
app.post('/register/admin',createAdmin);
app.post('/register/admins',bulkCreateAdmins);
app.get('/admin',getAdmins);
app.get('/admin/:id',getAdminById);
// app.get('/logout',Logout);
app.get('/student/:id',getStudentById);
app.get('/students',getStudents);
// app.get('/logout',AuthenticateToken,Logout);
// app.get('/student/:id',AuthenticateToken,getStudentById);

//Pie
app.get('/students/departments', getStudentsByDepartment);
// bookPicks
app.get('/genre',getConsolidatedGenre1);
//getBookCountsByMonth
app.get('/bookMonth', getBookCountsByMonth);


app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is successfully running and app is listening on port "+PORT);
    else
        console.log("Error occured, server cannot start", error);
})