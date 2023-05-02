// imports
const express = require('express');
const bodyParser = require('body-parser');

// Import API ENDPOINTS ROUTES
const booksRouter = require('./routes/book.route');
const usersRouter = require('./routes/user.route');
const borrowsRouter = require('./routes/borrow.route');
const authRouter = require('./routes/authenication.route');

// Create App
const app = express();
const PORT = process.env.PORT || 4600;
const HOST = process.env.HOST || "localhost";

// Parse request body data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middlewares (Send request to specific endpoints)
app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/borrows", borrowsRouter);
app.use("/api/auth", authRouter);

// Listen to requests
app.listen(PORT, HOST, (res) => {
    console.log(`SERVER IS RUNNING ON HTTP://${HOST}:${PORT}`);
})